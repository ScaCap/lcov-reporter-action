import { percentage } from "./lcov";

const checkCoverage = (toCheck) => {
    let accum = 0;
    for (const lcovObj of toCheck) {
        const coverage = percentage(lcovObj.lcov);
        const isValidBuild = coverage >= toCheck.minCoverage;
        if (!isValidBuild) {
            return { isValidBuild, coverage, name: lcovObj.packageName };
        }
        accum += coverage;
    }
    return {
        isValidBuild: true,
        coverage: toCheck.length === 0 ? 0 : accum / toCheck.length,
        name: "average",
    };
};

export const checks = ({ rootLcov, lcovArray, options, setFailed, info }) => {
    const excludedFiles = (options.excluded || "")
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x.length > 0);
    const toCheck = lcovArray
        .filter((x) => !excludedFiles.some((y) => x.packageName === y))
        .map((x) => ({ minCoverage: options.minCoverage, ...x }));
    if (rootLcov && !options.excludeRoot) {
        toCheck.unshift({
            packageName: "root_package",
            lcov: rootLcov,
            minCoverage: options.minCoverage,
        });
    }
    const { isValidBuild, coverage, name } = checkCoverage(toCheck);
    if (!isValidBuild) {
        setFailed(
            `${coverage.toFixed(2)}% for ${name} is less than min_coverage ${
                options.minCoverage
            }.`,
        );
    } else {
        info(
            `Coverage: ${coverage.toFixed(
                2,
            )}% is greater than or equal to min_coverage ${
                options.minCoverage
            }.`,
        );
    }
};
