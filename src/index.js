import core from "@actions/core";
import github from "@actions/github";
import { diff, diffForMonorepo } from "./comment";
import { upsertComment } from "./github";
import { getLcovArray, readLcov } from "./monorepo";
import { checkCoverage } from "./check";
import { createBadges } from "./badge";

const main = async () => {
    const addPackageName = (x) => ({
        ...x,
        ...{ packageName: x.dir.split("/")[1] },
    });
    const { context = {} } = github || {};
    const token = core.getInput("github-token");
    const lcovFile = core.getInput("lcov-file") || "./coverage/lcov.info";
    const baseFile = core.getInput("lcov-base");
    const appName = core.getInput("app-name");
    const maxLines = core.getInput("max_lines");

    // Add base path for monorepo
    const monorepoBasePath =
        core.getInput("monorepo-base-path") || "./packages";

    const options = {
        repository: context.payload.repository.full_name,
        commit: context.payload.pull_request.head.sha,
        prefix: `${process.env.GITHUB_WORKSPACE}/`,
        head: context.payload.pull_request.head.ref,
        base: context.payload.pull_request.base.ref,
        maxLines,
        appName,
    };
    const client = github.getOctokit(token);

    const lcovArrayForMonorepo = (
        monorepoBasePath
            ? await getLcovArray(monorepoBasePath, "lcov.info")
            : []
    ).map(addPackageName);
    // Always process root file if exists.
    const rootLcov = await readLcov(lcovFile);

    // Comments
    if (maxLines > 0) {
        if (lcovArrayForMonorepo.length > 0) {
            await upsertComment({
                client,
                context,
                prNumber: context.payload.pull_request.number,
                body: diffForMonorepo(
                    lcovArrayForMonorepo,
                    (
                        await getLcovArray(monorepoBasePath, "lcov-base")
                    ).map(addPackageName),
                    options,
                ),
                hiddenHeader: appName
                    ? `<!-- ${appName}-code-coverage-assistant -->`
                    : `<!-- monorepo-code-coverage-assistant -->`,
            });
        }
        if (rootLcov) {
            await upsertComment({
                client,
                context,
                prNumber: context.payload.pull_request.number,
                body: diff(
                    rootLcov,
                    baseFile && (await readLcov(baseFile)),
                    options,
                ),
                hiddenHeader: appName
                    ? `<!-- ${appName}-root-code-coverage-assistant -->`
                    : `<!-- monorepo-root-code-coverage-assistant -->`,
            });
        }
    }
    // Badge
    const badgePath = core.getInput("badge_path");
    if (badgePath) {
        const badgeOptions = {
            label: core.getInput("badge_label") || "coverage",
            style: core.getInput("badge_style") || "classic",
        };
        const toBadge = lcovArrayForMonorepo;
        if (rootLcov) {
            toBadge.push({
                packageName: "root_package",
                lcov: rootLcov,
            });
        }
        createBadges(badgePath, toBadge, badgeOptions);
    }
    // Check coverage
    const minCoverage = core.getInput("min_coverage");
    if (minCoverage) {
        const excluded = core.getInput("exclude") || "";
        const excludedFiles = excluded
            .split(" ")
            .map((x) => x.trim())
            .filter((x) => x.length > 0);
        console.log("excludedFiles", excludedFiles);
        const toCheck = lcovArrayForMonorepo.filter(
            (x) => !excludedFiles.some((y) => x.packageName === y),
        );
        const excludeRoot = core.getInput("exclude_root");
        console.log("excludeRoot", excludedFiles);
        if (rootLcov && !excludeRoot) {
            toCheck.unshift({
                packageName: "root_package",
                lcov: rootLcov,
            });
        }
        const { isValidBuild, coverage, name } = checkCoverage(
            minCoverage,
            toCheck,
        );
        if (!isValidBuild) {
            core.setFailed(
                `${coverage.toFixed(
                    2,
                )}% for ${name} is less than min_coverage ${minCoverage}.`,
            );
        } else {
            core.info(
                `Coverage: ${coverage.toFixed(
                    2,
                )}% is greater than or equal to min_coverage ${minCoverage}.`,
            );
        }
    }
};

main().catch((err) => {
    console.log(err);
    core.setFailed(err.message);
});
