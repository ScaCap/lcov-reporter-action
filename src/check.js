import { percentage } from "./lcov";

export const checkCoverage = (minCoverage, toCheck) => {
    let accum = 0;
    for (const lcovObj of toCheck) {
        const coverage = percentage(lcovObj.lcov);
        const isValidBuild = coverage >= minCoverage;
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
