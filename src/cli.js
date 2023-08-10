import process from "process";
import fs from "fs";
import path from "path";
import { diff, diffForMonorepo } from "./comment";
import { getLcovArray, readLcov } from "./monorepo";
import { checkCoverage } from "./check";
import { createBadges } from "./badge";

const addPackageName = (x) => ({
    ...x,
    ...{ packageName: x.dir.split("/").slice(-2)[0] },
});
const main = async () => {
    const file = process.argv[2];
    const beforeFile = process.argv[3];

    const prefix = `${path.dirname(path.dirname(path.resolve(file)))}/`;
    const options = {
        repository: "example/foo",
        commit: "f9d42291812ed03bb197e48050ac38ac6befe4e5",
        prefix,
        head: "feat/test",
        base: "master",
        maxLines: "10",
    };

    if (fs.statSync(file).isDirectory()) {
        const lcovArrayForMonorepo = (
            await getLcovArray(file, "lcov.info")
        ).map(addPackageName);
        console.log(
            diffForMonorepo(
                lcovArrayForMonorepo,
                await getLcovArray(file, "lcov-base"),
                options,
            ),
        );
        createBadges("./badges", lcovArrayForMonorepo, {});
        console.log(checkCoverage(90, lcovArrayForMonorepo));
    } else {
        const lcov = await readLcov(file);
        console.log(
            diff(lcov, beforeFile && (await readLcov(beforeFile)), options),
        );
        createBadges(
            "./build",
            {
                packageName: "root",
                lcov,
            },
            {},
        );
        console.log(
            checkCoverage(90, [
                {
                    packageName: "root",
                    lcov,
                },
            ]),
        );
    }
};

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
