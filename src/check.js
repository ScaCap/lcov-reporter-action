import { percentage } from "./lcov";

const checkCoverage = (toCheck) => {
    let accum = 0;
    for (const lcovObj of toCheck) {
        const coverage = percentage(lcovObj.lcov);
        const isValidBuild = coverage >= lcovObj.minCoverage;
        if (!isValidBuild) {
            return { isValidBuild, coverage, name: lcovObj.packageName };
        }
        accum += coverage;
    }
    return {
        isValidBuild: true,
        coverage: accum / toCheck.length,
        name: "average",
    };
};

export const checks = ({ rootLcov, lcovArray, options, setFailed, info }) => {
    const minCoverage = options.minCoverage || 100;
    const excludedFiles = (options.excluded || "")
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x.length > 0);
    const toCheck = [];
    if (lcovArray) {
        lcovArray
            .filter((x) => !excludedFiles.some((y) => x.packageName === y))
            .forEach((x) => toCheck.push({ minCoverage, ...x }));
    }
    if (rootLcov && !options.excludeRoot) {
        toCheck.unshift({
            packageName: "root_package",
            lcov: rootLcov,
            minCoverage,
        });
    }
    if (toCheck.length === 0) {
        return;
    }
    const { isValidBuild, coverage, name } = checkCoverage(toCheck);
    if (!isValidBuild) {
        setFailed(
            `${coverage.toFixed(
                2,
            )}% for ${name} is less than min_coverage ${minCoverage}.`,
        );
    } else {
        info(
            `Coverage: ${coverage.toFixed(
                2,
            )}% is greater than or equal to min_coverage ${minCoverage}.`,
        );
    }
};
