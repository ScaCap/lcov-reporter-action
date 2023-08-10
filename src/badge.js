import { badgen } from "badgen";
import path from "path";
import { percentage } from "./lcov";

export const badge = (option, pct) => {
    const { label = "coverage", style = "classic" } = option;
    const colorData = {
        "49c31a": [100],
        "97c40f": [99.99, 90],
        a0a127: [89.99, 80],
        cba317: [79.99, 60],
        ce0000: [59.99, 0],
    };
    const color = Object.keys(colorData).find(
        (value) =>
            (colorData[value].length === 1 && pct >= colorData[value][0]) ||
            (colorData[value].length === 2 &&
                pct <= colorData[value][0] &&
                pct >= colorData[value][1]),
    );
    const badgenArgs = {
        style,
        label,
        status: `${pct}%`,
        color: color,
    };
    return badgen(badgenArgs);
};

export const badges = ({ rootLcov, lcovArray, options, mkDir, writeBadge }) => {
    const badgeOptions = {
        label: options.badgeLabel,
        style: options.badgeStyle,
    };
    const toBadge = [];
    if (lcovArray) lcovArray.forEach((x) => toBadge.push(x));
    if (rootLcov) {
        toBadge.push({
            packageName: "root_package",
            lcov: rootLcov,
        });
    }
    if (toBadge.length === 0) {
        return;
    }
    const dirName = path.resolve(options.badgePath);
    mkDir(dirName);
    for (const lcovObj of toBadge) {
        const coverage = percentage(lcovObj.lcov);
        const svgStr = badge(badgeOptions, coverage.toFixed(2));
        const fileName = path.join(dirName, `${lcovObj.packageName}.svg`);
        console.log("writing badge", fileName);
        try {
            writeBadge(fileName, svgStr);
        } catch (err) {
            console.error("Error writing badge", fileName, err.toString());
        }
    }
};
