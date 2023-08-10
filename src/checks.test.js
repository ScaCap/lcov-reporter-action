import { checks } from "./check";

describe("checks", function () {
    test("should success if fully covered", () => {
        const setFailed = jest.fn();
        const info = jest.fn();
        checks({
            rootLcov: [
                {
                    lines: {
                        found: 23,
                        hit: 21,
                    },
                },
            ],
            lcovArray: undefined,
            options: { minCoverage: 10 },
            setFailed,
            info,
        });
        expect(setFailed).not.toBeCalled();
        expect(info).toBeCalledWith(
            "Coverage: 91.30% is greater than or equal to min_coverage 10.",
        );
    });
    test("should checks root", () => {
        const setFailed = jest.fn();
        const info = jest.fn();
        checks({
            rootLcov: [
                {
                    lines: {
                        found: 23,
                        hit: 23,
                    },
                },
                {
                    lines: {
                        found: 10,
                        hit: 5,
                    },
                },
            ],
            lcovArray: undefined,
            options: {},
            setFailed,
            info,
        });
        expect(setFailed).toBeCalledWith(
            "84.85% for root_package is less than min_coverage 100.",
        );
        expect(info).not.toBeCalled();
    });
    test("should checks lcovArray", () => {
        const setFailed = jest.fn();
        const info = jest.fn();
        checks({
            rootLcov: undefined,
            lcovArray: [
                {
                    packageName: "FULL_COVERAGE",
                    lcov: [
                        {
                            lines: {
                                found: 23,
                                hit: 23,
                            },
                        },
                    ],
                },
                {
                    packageName: "SOME_PACKAGE2",
                    lcov: [
                        {
                            lines: {
                                found: 23,
                                hit: 23,
                            },
                        },
                        {
                            lines: {
                                found: 10,
                                hit: 5,
                            },
                        },
                    ],
                },
            ],
            options: {},
            setFailed,
            info,
        });
        expect(setFailed).toBeCalledWith(
            "84.85% for SOME_PACKAGE2 is less than min_coverage 100.",
        );
        expect(info).not.toBeCalled();
    });
    test("should do nothing if no data", () => {
        const setFailed = jest.fn();
        const info = jest.fn();
        checks({
            rootLcov: undefined,
            lcovArray: undefined,
            options: { minCoverage: 10 },
            setFailed,
            info,
        });
        expect(setFailed).not.toBeCalled();
        expect(info).not.toBeCalled();
    });
});
