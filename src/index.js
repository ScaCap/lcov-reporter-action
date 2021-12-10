import fs, { promises } from "fs";
import path from "path";
import core from "@actions/core";
import github from "@actions/github";
import { parse } from "./lcov";
import { diff, diffForMonorepo } from "./comment";
import { upsertComment } from "./github";

/**
 * Find all files inside a dir, recursively.
 * @function getLcovFiles
 * @param  {string} dir Dir path string.
 * @return {string[{<package_name>: <path_to_lcov_file>}]} Array with lcove file names with package names as key.
 */
const getLcovFiles = (dir, filelist) => {
    let fileArray = filelist || [];
    fs.readdirSync(dir).forEach(file => {
        fileArray = fs.statSync(path.join(dir, file)).isDirectory()
            ? getLcovFiles(path.join(dir, file), fileArray)
            : fileArray
                  .filter(f => f.path.includes("lcov.info"))
                  .concat({
                      name: dir.split("/")[1],
                      path: path.join(dir, file),
                  });
    });

    return fileArray;
};

/**
 * Find all files inside a dir, recursively for base branch.
 * @function getLcovBaseFiles
 * @param  {string} dir Dir path string.
 * @return {string[{<package_name>: <path_to_lcov_file>}]} Array with lcove file names with package names as key.
 */
const getLcovBaseFiles = (dir, filelist) => {
    let fileArray = filelist || [];
    console.log(filelist, "filelist");
    console.log(dir, "dir");
    fs.readdirSync(dir).forEach(file => {
        console.log(file, "file");
        fileArray = fs.statSync(path.join(dir, file)).isDirectory()
            ? getLcovBaseFiles(path.join(dir, file), fileArray)
            : fileArray
                  .filter(f => f.path.includes("lcov-base"))
                  .concat({
                      name: dir.split("/")[1],
                      path: path.join(dir, file),
                  });
    });

    return fileArray;
};

const toLcovForMonorepo = lcovFiles =>
    Promise.all(
        lcovFiles
            .filter(file => file.path.includes(".info"))
            .map(async file => {
                const rLcove = await promises.readFile(file.path, "utf8");
                const data = await parse(rLcove);

                return {
                    packageName: file.name,
                    lcov: data,
                };
            }),
    );

const main = async () => {
    const { context = {} } = github || {};

    const token = core.getInput("github-token");
    const lcovFile = core.getInput("lcov-file") || "./coverage/lcov.info";
    const baseFile = core.getInput("lcov-base");
    const appName = core.getInput("app-name");
    // Add base path for monorepo
    const monorepoBasePath = core.getInput("monorepo-base-path");

    const raw =
        !monorepoBasePath &&
        (await promises
            .readFile(lcovFile, "utf-8")
            .catch(err => console.error(err)));
    if (!monorepoBasePath && !raw) {
        console.log(`No coverage report found at '${lcovFile}', exiting...`);

        return;
    }

    const baseRaw =
        baseFile &&
        (await promises
            .readFile(baseFile, "utf-8")
            .catch(err => console.error(err)));
    if (!monorepoBasePath && baseFile && !baseRaw) {
        console.log(`No coverage report found at '${baseFile}', ignoring...`);
    }

    const lcovArrayForMonorepo = monorepoBasePath
        ? await toLcovForMonorepo(getLcovFiles(monorepoBasePath))
        : [];
    const lcovBaseArrayForMonorepo =
        baseFile && monorepoBasePath
            ? await toLcovForMonorepo(getLcovBaseFiles(monorepoBasePath))
            : [];

    const options = {
        repository: context.payload.repository.full_name,
        commit: context.payload.pull_request.head.sha,
        workspace: `${process.env.GITHUB_WORKSPACE}/`,
        basePath: monorepoBasePath || "",
        head: context.payload.pull_request.head.ref,
        base: context.payload.pull_request.base.ref,
        appName,
        condense: false,
    };

    const lcov = !monorepoBasePath && (await parse(raw));
    const baselcov = baseRaw && (await parse(baseRaw));

    const client = github.getOctokit(token);

    await upsertComment({
        client,
        context,
        prNumber: context.payload.pull_request.number,
        body: !lcovArrayForMonorepo.length
            ? diff(lcov, baselcov, options)
            : diffForMonorepo(
                  lcovArrayForMonorepo,
                  lcovBaseArrayForMonorepo,
                  options,
              ),
        hiddenHeader: appName
            ? `<!-- ${appName}-code-coverage-assistant -->`
            : `<!-- monorepo-code-coverage-assistant -->`,
    });
};

main().catch(err => {
    console.log(err);
    core.setFailed(err.message);
});
