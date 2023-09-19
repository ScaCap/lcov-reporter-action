import { comments } from "./comment";

const someLcov = [
    {
        file: "/files/project/src/foo.js",
        lines: {
            found: 23,
            hit: 21,
            details: [
                {
                    line: 20,
                    hit: 3,
                },
                {
                    line: 21,
                    hit: 3,
                },
                {
                    line: 22,
                    hit: 3,
                },
            ],
        },
        functions: {
            hit: 2,
            found: 3,
            details: [
                {
                    name: "foo",
                    line: 19,
                },
                {
                    name: "bar",
                    line: 33,
                },
                {
                    name: "baz",
                    line: 54,
                },
            ],
        },
        branches: {
            hit: 3,
            found: 3,
            details: [
                {
                    line: 21,
                    block: 0,
                    branch: 0,
                    taken: 1,
                },
                {
                    line: 21,
                    block: 0,
                    branch: 1,
                    taken: 2,
                },
                {
                    line: 37,
                    block: 1,
                    branch: 0,
                    taken: 0,
                },
            ],
        },
    },
    {
        file: "/files/project/src/bar/baz.js",
        lines: {
            found: 10,
            hit: 5,
            details: [
                {
                    line: 20,
                    hit: 0,
                },
                {
                    line: 21,
                    hit: 0,
                },
                {
                    line: 22,
                    hit: 3,
                },
            ],
        },
        functions: {
            hit: 2,
            found: 3,
            details: [
                {
                    name: "foo",
                    line: 19,
                },
                {
                    name: "bar",
                    line: 33,
                },
                {
                    name: "baz",
                    line: 54,
                },
            ],
        },
    },
];
const lcovArray = [
    {
        packageName: "SOME_PACKAGE",
        lcov: someLcov,
    },
    {
        packageName: "SOME_PACKAGE2",
        lcov: someLcov,
    },
    {
        packageName: "SOME_PACKAGE3",
        lcov: someLcov,
    },
];
const lcovBaseArray = [
    {
        packageName: "SOME_PACKAGE",
        lcov: someLcov.map((x) => ({
            file: x.file,
            lines: x.lines && { ...x.lines, hit: x.lines.hit * 2 },
        })),
    },
    {
        packageName: "SOME_PACKAGE2",
        lcov: someLcov.map((x) => ({
            file: x.file,
            lines: x.lines && { ...x.lines, hit: x.lines.hit / 2 },
        })),
    },
    {
        packageName: "SOME_PACKAGE3",
        lcov: someLcov,
    },
];
const renderOptions = {
    maxLines: 10,
    prefix: "/files/project/",
    repository: "SOME_REPOSITORY",
    pullRequest: {
        head: {
            sha: "SOME_COMMIT",
            ref: "SOME_HEAD",
        },
        base: { ref: "SOME_BASE" },
    },
};
describe("comments", function () {
    test("should render rooLcov", async () => {
        const upsert = jest.fn();
        await comments({
            rootLcov: someLcov,
            rootBaseLcov: undefined,
            lcovArray: undefined,
            lcovBaseArray: undefined,
            options: renderOptions,
            upsert,
        });
        expect(upsert).toBeCalledWith(
            "root-comment",
            expect.not.stringContaining("undefined"),
        );
    });
    test("should render lcovArray single comment", async () => {
        const upsert = jest.fn();
        await comments({
            rootLcov: undefined,
            rootBaseLcov: undefined,
            lcovArray,
            lcovBaseArray: undefined,
            options: { ...renderOptions, singleComment: true },
            upsert,
        });
        expect(upsert).toBeCalledWith(
            "single-comment",
            expect.not.stringContaining("undefined"),
        );
    });
    test("should render lcovArray multiple comments", async () => {
        const upsert = jest.fn();
        await comments({
            rootLcov: undefined,
            rootBaseLcov: undefined,
            lcovArray,
            lcovBaseArray: undefined,
            options: renderOptions,
            upsert,
        });
        expect(upsert).toHaveBeenNthCalledWith(
            1,
            "m-SOME_PACKAGE",
            expect.not.stringContaining("undefined"),
        );
        expect(upsert).toHaveBeenNthCalledWith(
            2,
            "m-SOME_PACKAGE2",
            expect.not.stringContaining("undefined"),
        );
    });

    test("should render lcovArray single comment with base", async () => {
        const upsert = jest.fn();
        await comments({
            rootLcov: undefined,
            rootBaseLcov: undefined,
            lcovArray,
            lcovBaseArray,
            options: { ...renderOptions, singleComment: true },
            upsert,
        });
        expect(upsert).toBeCalledWith(
            "single-comment",
            expect.not.stringContaining("undefined"),
        );
    });
    test("should render lcovArray multiple comments with base", async () => {
        const upsert = jest.fn();
        await comments({
            rootLcov: undefined,
            rootBaseLcov: undefined,
            lcovArray,
            lcovBaseArray,
            options: renderOptions,
            upsert,
        });
        expect(upsert).toHaveBeenNthCalledWith(
            1,
            "m-SOME_PACKAGE",
            expect.not.stringContaining("undefined"),
        );
        expect(upsert).toHaveBeenNthCalledWith(
            2,
            "m-SOME_PACKAGE2",
            expect.not.stringContaining("undefined"),
        );
    });

    test("should break coverage if too large", async () => {
        const upsert = jest.fn();
        await comments({
            rootLcov: someLcov,
            rootBaseLcov: undefined,
            lcovArray: undefined,
            lcovBaseArray: undefined,
            options: { ...renderOptions, maxLines: 1 },
            upsert,
        });
        expect(upsert).toBeCalledWith(
            "root-comment",
            expect.stringContaining("Coverage Report too long to display"),
        );
    });

    test("should do nothing if not on pull request", async () => {
        const upsert = jest.fn();
        await comments({
            rootLcov: undefined,
            rootBaseLcov: undefined,
            lcovArray: undefined,
            lcovBaseArray: undefined,
            options: { ...renderOptions, pullRequest: undefined },
            upsert,
        });
        expect(upsert).not.toBeCalled();
    });
});
