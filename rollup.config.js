import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-node-polyfills";
import json from "@rollup/plugin-json";
import externals from "rollup-plugin-node-externals";
import globals from "rollup-plugin-node-globals";

export default {
    input: "src/index.js",
    output: {
        file: "dist/main.js",
        format: "cjs",
    },
    treeshake: true,
    plugins: [
        commonjs(),
        terser(),
        globals(),
        externals({
            builtin: true,
            deps: false,
        }),
        nodePolyfills(),
        resolve({
            preferBuiltins: false,
            mainFields: ["module", "browser", "main"],
        }),
        json(),
    ],
};
