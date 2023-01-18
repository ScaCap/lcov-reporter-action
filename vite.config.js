import { resolve as pathResolve } from "path";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import externals from "rollup-plugin-node-externals";
import { defineConfig } from "vite";

// eslint-disable-next-line import/no-unused-modules
export default defineConfig({
    root: ".",
    build: {
        outDir: "dist",
        target: "node16",
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: pathResolve(__dirname, "src/index.js"),
            formats: ["cjs"],
            fileName: "main",
        },
    },
    rollupOptions: {
        input: "src/index.js",
        output: {
            file: "dist/main.js",
            format: "cjs",
        },
        plugins: [
            terser(),
            externals({
                builtin: true,
                deps: false,
            }),
            resolve({
                preferBuiltins: true,
                mainFields: ["module", "browser", "main"],
            }),
            commonjs(),
            json(),
        ],
    },
});
