import fs, { promises } from "fs";
import path from "path";
import { parse } from "./lcov";

/**
 * Find all files inside a dir, recursively.
 * @function getLcovFiles
 * @param {string} fileFilter filenames must include this
 * @param  {string} dir Dir path string.
 * @param {string[]} fileList accumulated result
 * @return {{name: string, path: string}[]} Array with lcove file names with package names as key.
 */
const getLcovFiles = (fileFilter, dir) => {
    const fileArray = [];
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && file !== "node_modules") {
            fileArray.push(...getLcovFiles(fileFilter, fullPath));
        } else if (fullPath.includes(fileFilter)) {
            fileArray.push({
                dir,
                path: fullPath,
            });
        }
    }

    return fileArray;
};

export const readLcov = async (lcovFile) => {
    const raw = await promises
        .readFile(lcovFile, "utf-8")
        .catch((err) => console.error(err));
    if (raw) {
        console.log("readLcov read", lcovFile);
        return parse(raw);
    }
    console.log(`No coverage report found at '${lcovFile}', ignoring...`);
    return raw;
};
export const getLcovArray = async (monorepoBasePath, fileFilter) => {
    const lcovArray = getLcovFiles(fileFilter, monorepoBasePath);
    console.log("getLcovArray read", lcovArray);
    const lcovArrayForMonorepo = [];
    for (const file of lcovArray) {
        if (file.path.includes(".info")) {
            const rLcove = await promises.readFile(file.path, "utf8");
            const data = await parse(rLcove);
            lcovArrayForMonorepo.push({
                ...file,
                lcov: data,
            });
        }
    }

    return lcovArrayForMonorepo;
};
