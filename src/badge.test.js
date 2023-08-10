import { badges } from "./badge";
import path from "path";

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
const SOME_PATH = "SOME_PATH/";
describe("badges", function () {
    test("should render badges rootLcov", () => {
        const mkDir = jest.fn();
        const writeBadge = jest.fn();
        badges({
            rootLcov: someLcov,
            lcovArray: undefined,
            options: { badgePath: SOME_PATH },
            mkDir,
            writeBadge,
        });
        expect(mkDir).toBeCalledWith(path.resolve(SOME_PATH));
        expect(writeBadge).toBeCalledWith(
            expect.stringContaining("root_package.svg"),
            expect.stringContaining("<svg"),
        );
    });
    test("should render badges lcovArray", () => {
        const mkDir = jest.fn();
        const writeBadge = jest.fn();
        badges({
            rootLcov: undefined,
            lcovArray,
            options: { badgePath: SOME_PATH },
            mkDir,
            writeBadge,
        });
        expect(mkDir).toBeCalledWith(path.resolve(SOME_PATH));
        for (let i = 0; i < lcovArray.length; i++) {
            expect(writeBadge).toHaveBeenNthCalledWith(
                i + 1,
                expect.stringContaining(`${lcovArray[i].packageName}.svg`),
                expect.stringContaining("<svg"),
            );
        }
    });
    test("should do nothing with no data", () => {
        const mkDir = jest.fn();
        const writeBadge = jest.fn();
        badges({
            rootLcov: undefined,
            lcovArray: undefined,
            options: { badgePath: SOME_PATH },
            mkDir,
            writeBadge,
        });
        expect(mkDir).not.toBeCalled();
        expect(writeBadge).not.toBeCalled();
    });
    test("should catch errors when writting", () => {
        const mkDir = jest.fn();
        const writeBadge = () => {
            throw new Error();
        };
        expect(() =>
            badges({
                rootLcov: undefined,
                lcovArray,
                options: {
                    badgePath: SOME_PATH,
                    label: "other",
                    style: "flat",
                },
                mkDir,
                writeBadge,
            }),
        ).not.toThrowError();
        expect(mkDir).toBeCalledWith(path.resolve(SOME_PATH));
    });
});
