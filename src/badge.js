import path from "path";
import fs from "fs";
import { badgen } from "badgen";
import { percentage } from "./lcov";

const badge = (option, pct) => {
    const { label = "coverage", style = "classic" } = option || {};
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
        status: `${pct < 0 ? "Unknown" : `${pct}%`}`,
        color: color || "e5e5e5",
    };
    return badgen(badgenArgs);
};

export const createBadges = (badgePath, toCheck, options) => {
    const dirName = path.resolve(badgePath);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
    } else if (!fs.statSync(dirName).isDirectory()) {
        throw new Error("badge path is not a directory");
    }
    for (const lcovObj of toCheck) {
        const coverage = percentage(lcovObj.lcov);
        const svgStr = badge(options, coverage.toFixed(2));
        const fileName = path.join(dirName, `${lcovObj.packageName}.svg`);
        console.log("writing badge", fileName);
        try {
            fs.writeFileSync(fileName, svgStr);
        } catch (err) {
            console.error("Error writing badge", fileName, err.toString());
        }
    }
};
