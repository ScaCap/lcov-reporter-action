const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");
const resolve = require("@rollup/plugin-node-resolve");
const json = require("@rollup/plugin-json");
const externals = require("rollup-plugin-node-externals");
const builtins = require("rollup-plugin-node-builtins");

module.exports = {
    input: "src/index.js",
    output: {
        file: "dist/main.js",
        format: "cjs",
    },
    externals: ["fs"],
    treeshake: true,
    plugins: [
        terser(),
        builtins(),
        externals({
            builtin: true,
            deps: false,
        }),
        resolve({
            mainFields: ["module", "browser", "main"],
        }),
        commonjs(),
        json(),
    ],
};
