import { pre, code } from "./html";

const makeRow = (...strings) =>
    `${strings
        .map((str, index) => (`${str}` || "").padEnd(index === 0 ? 30 : 9))
        .join("| ")}\n`;

const filename = (file, options) => {
    const relative = file.file.replace(options.prefix, "");
    const parts = relative.split("/");
    const last = parts[parts.length - 1];

    return last;
};

const percentage = item => {
    if (!item) {
        return "N/A";
    }

    const value = item.found === 0 ? 100 : (item.hit / item.found) * 100;
    const rounded = value.toFixed(2).replace(/\.0*$/u, "");

    return `${rounded}%`;
};

const toRow = (file, options) =>
    makeRow(
        filename(file, options),
        percentage(file.branches, options),
        percentage(file.functions, options),
        percentage(file.lines, options),
    );

const toFolder = path => {
    if (path === "") {
        return "";
    }

    return `[${path}]\n`;
};

// Display the lcov data in a code table.
export const codelate = (lcov, options) => {
    const head = makeRow("File", "Branches", "Funcs", "Lines");

    const folders = {};
    for (const file of lcov) {
        const parts = file.file.replace(options.prefix, "").split("/");
        const folder = parts.slice(0, -1).join("/");
        folders[folder] = folders[folder] || [];
        folders[folder].push(file);
    }

    const rows = Object.keys(folders)
        .sort()
        .reduce(
            (acc, key) => [
                ...acc,
                toFolder(key, options),
                ...folders[key].map(file => toRow(file, options)),
            ],
            [],
        );

    return pre(code([head, ...rows].join("")));
};
