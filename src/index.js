import fs from "fs";
import core from "@actions/core";
import github from "@actions/github";
import { codeCoverageAssistant } from "./codeCoverageAssistant";
import { upsertComment } from "./github";
import { getLcovArray } from "./monorepo";

const { context = {} } = github || {};
const token = core.getInput("github-token");
const githubClient = github.getOctokit(token);
const appName = core.getInput("app-name") || "noname";
const monorepoBasePath = core.getInput("monorepo-base-path") || "./packages";
const client = {
    readLCovs: (fileFilter) => {
        const arr = getLcovArray(monorepoBasePath, fileFilter);
        return arr.map((x) => ({ ...x, packageName: x.dir.split("/")[1] }));
    },
    // Lcov root file
    lcovFile: core.getInput("lcov-file") || "./coverage/lcov.info",
    // Lcov base file to compare against
    baseFile: core.getInput("lcov-base"),
    upsert: async (title, body) => {
        const prNumber = context.payload.pull_request.number;
        const hiddenHeader = `<!-- ${appName}-${title}-code-coverage-assistant -->`;
        await upsertComment({
            githubClient,
            context,
            prNumber,
            body,
            hiddenHeader,
        });
    },
    mkDir: (dirName) => {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        } else if (!fs.statSync(dirName).isDirectory()) {
            throw new Error("badge path is not a directory");
        }
    },
    writeBadge: (fileName, svgStr) => fs.writeFileSync(fileName, svgStr),
    setFailed: core.setFailed,
    info: core.info,
    options: {
        // Used to generate the comment that is added
        repository: context.payload.repository.full_name,
        prefix: `${process.env.GITHUB_WORKSPACE}/`,
        pullRequest: context.payload.pull_request,
        // Render multiple comment lines
        multipleComment: core.getInput("multiple-comment"),
        // Maximum number of lines in a comment, used to limit the comment size
        maxLines: core.getInput("max_lines") || 100,
        // Minimum coverage, 0 == disable coverage check
        minCoverage: core.getInput("min_coverage"),
        // directories to be excluded from coverage check
        excluded: core.getInput("exclude"),
        // if true exclude the lcovFile from coverage
        excludeRoot: core.getInput("exclude_root"),
        // path to the directory where the badges will be written
        badgePath: core.getInput("badge_path"),
        // see https://www.npmjs.com/package/badgen options
        badgeLabel: core.getInput("badge_label") || "coverage",
        badgeStyle: core.getInput("badge_style") || "classic",
    },
};
codeCoverageAssistant(client).catch((err) => {
    console.log(err);
    core.setFailed(err.message);
});
