import { readLcov } from "./monorepo";
import { comments } from "./comment";
import { checks } from "./check";
import { badges } from "./badge";

export const codeCoverageAssistant = async ({
    readLCovs,
    lcovFile,
    baseFile,
    options,
    upsert,
    mkDir,
    writeBadge,
    setFailed,
    info,
}) => {
    const lcovArray = await readLCovs("lcov.info");
    const lcovBaseArray =
        lcovArray.length > 0 && (await readLCovs("lcov-base"));
    // Always process root file if exists.
    const rootLcov = lcovFile && (await readLcov(lcovFile));
    const rootBaseLcov = rootLcov && baseFile && (await readLcov(baseFile));
    // We cannot comment if is not a pull_request
    if (options.maxLines > 0) {
        await comments({
            rootLcov,
            rootBaseLcov,
            lcovArray,
            lcovBaseArray,
            options,
            upsert,
        });
    }
    if (options.badgePath) {
        await badges({ rootLcov, lcovArray, options, mkDir, writeBadge });
    }
    if (options.minCoverage) {
        await checks({ rootLcov, lcovArray, options, setFailed, info });
    }
};
