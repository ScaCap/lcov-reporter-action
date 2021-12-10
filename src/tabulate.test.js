import { tabulate } from "./tabulate";
import { th, tr, td, table, tbody, a, b } from "./html";

test("tabulate should generate a correct table", () => {
    const data = [
        {
            file: "/files/project/index.js",
            functions: {
                found: 0,
                hit: 0,
                details: [],
            },
        },
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

    const options = {
        repository: "example/foo",
        commit: "2e15bee6fe0df5003389aa5ec894ec0fea2d874a",
        workspace: "/files/project/",
        basePath: "",
    };
    const sha = options.commit.substring(0, 7);

    const html = table(
        tbody(
            tr(
                th("File"),
                th("Branches"),
                th("Funcs"),
                th("Lines"),
                th("Uncovered Lines"),
            ),
            tr(
                td(
                    a(
                        {
                            href: `/${options.repository}/blob/${sha}/index.js`,
                        },
                        "index.js",
                    ),
                ),
                td("N/A"),
                td("100%"),
                td("N/A"),
                td(),
            ),
            tr(td({ colspan: 5 }, b("src"))),
            tr(
                td(
                    "&nbsp; &nbsp;",
                    a(
                        {
                            href: `/${options.repository}/blob/${sha}/src/foo.js`,
                        },
                        "foo.js",
                    ),
                ),
                td("100%"),
                td(b("66.67%")),
                td(b("91.30%")),
                td(
                    a(
                        {
                            href: `/${options.repository}/blob/${sha}/src/foo.js#L37`,
                        },
                        37,
                    ),
                ),
            ),
            tr(td({ colspan: 5 }, b("src/bar"))),
            tr(
                td(
                    "&nbsp; &nbsp;",
                    a(
                        {
                            href: `/${options.repository}/blob/${sha}/src/bar/baz.js`,
                        },
                        "baz.js",
                    ),
                ),
                td("N/A"),
                td(b("66.67%")),
                td(b("50%")),
                td(
                    a(
                        {
                            href: `/${options.repository}/blob/${sha}/src/bar/baz.js#L20`,
                        },
                        20,
                    ),
                    ", ",
                    a(
                        {
                            href: `/${options.repository}/blob/${sha}/src/bar/baz.js#L21`,
                        },
                        21,
                    ),
                ),
            ),
        ),
    );
    expect(tabulate(data, options)).toBe(html);
});

test("tabulate should generate file href for monorepo package", () => {
    const data = [
        {
            file: "/files/project/src/foo.js",
            lines: {
                found: 23,
                hit: 21,
                details: [
                    {
                        line: 20,
                        hit: 1,
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
    ];

    const options = {
        repository: "example/foo",
        commit: "2e15bee6fe0df5003389aa5ec894ec0fea2d874a",
        workspace: "/files/project/",
        basePath: "packages",
    };
    const pkg1Path = `packages/pkg-1`;
    const sha = options.commit.substring(0, 7);

    const html = table(
        tbody(
            tr(
                th("File"),
                th("Branches"),
                th("Funcs"),
                th("Lines"),
                th("Uncovered Lines"),
            ),
            tr(td({ colspan: 5 }, b("src"))),
            tr(
                td(
                    "&nbsp; &nbsp;",
                    a(
                        {
                            href: `/${options.repository}/blob/${sha}/${pkg1Path}/src/foo.js`,
                        },
                        "foo.js",
                    ),
                ),
                td("100%"),
                td(b("66.67%")),
                td(b("91.30%")),
                td(
                    a(
                        {
                            href: `/${options.repository}/blob/${sha}/${pkg1Path}/src/foo.js#L37`,
                        },
                        37,
                    ),
                ),
            ),
        ),
    );
    expect(tabulate(data, { ...options, basePath: pkg1Path })).toBe(html);
});
