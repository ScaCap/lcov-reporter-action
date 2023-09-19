import process from "process";
import fs from "fs";
import path from "path";
import { codeCoverageAssistant } from "./codeCoverageAssistant";
import { getLcovArray } from "./monorepo";

const main = async () => {
    const file = process.argv[2];
    const prefix = `${path.dirname(path.dirname(path.resolve(file)))}/`;
    const baseClient = {
        upsert: (title, body) => {
            console.log("--> COMMENT", "title:", title, "body:", body);
        },
        mkDir: (dirName) => console.log("Creating directory", dirName),
        writeBadge: (fileName) => console.log("written", fileName),
        setFailed: (...x) => console.error("ERROR", ...x),
        info: (...x) => console.log("INFO:", ...x),
        options: {
            repository: "example/foo",
            prefix,
            pullRequest: {
                commit: "f9d42291812ed03bb197e48050ac38ac6befe4e5",
                head: "feat/test",
                base: "master",
            },
            maxLines: 100,
            badgePath: "./badges",
            appName: "someAppName",
            minCoverage: 80,
            singleComment: false,
        },
    };
    if (fs.statSync(file).isDirectory()) {
        await codeCoverageAssistant({
            ...baseClient,
            readLCovs: async (fileFilter) => {
                const arr = await getLcovArray(file, fileFilter);
                return arr.map((x) => ({
                    ...x,
                    packageName: x.dir.split("/").slice(-2)[0],
                }));
            },
        });
    } else {
        await codeCoverageAssistant({
            ...baseClient,
            readLCovs: () => [],
            lcovFile: file,
            baseFile: "lcov-base",
        });
    }
};

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
