import { details, summary, b, fragment, table, tbody, tr, th } from "./html";
import { percentage } from "./lcov";
import { codelate } from "./codelate";

/**
 * Compares two arrays of objects and returns with unique lines update
 * @param {number} pdiff value from diff percentage
 * @returns {string} emoji string for negative/positive pdiff
 */
const renderEmoji = pdiff => {
    if (pdiff.toFixed(2) < 0) return "❌";

    return "✅";
};

/**
 * Compares two arrays of objects and returns with unique lines update
 * @param {Array} otherArray
 * @returns {Function} function with filtering non original lines
 */
const comparer = otherArray => current =>
    otherArray.filter(
        other =>
            other.lines.found === current.lines.found &&
            other.lines.hit === current.lines.hit,
    ).length === 0;

/**
 * Github comment for monorepo
 * @param {Array<{packageName, lcovPath}>} lcovArrayForMonorepo
 * @param {{Array<{packageName, lcovBasePath}>}} lcovBaseArrayForMonorepo
 * @param {*} options
 */
const commentForMonorepo = (
    lcovArrayForMonorepo,
    lcovBaseArrayForMonorepo,
    options,
) => {
    const { base } = options;
    const getHtml = (showDetail = true) =>
        lcovArrayForMonorepo.map(lcovObj => {
            const baseLcov = lcovBaseArrayForMonorepo.find(
                el => el.packageName === lcovObj.packageName,
            );

            const pbefore = baseLcov ? percentage(baseLcov.lcov) : 0;
            const pafter = baseLcov ? percentage(lcovObj.lcov) : 0;
            const pdiff = pafter - pbefore;
            const plus = pdiff > 0 ? "+" : "";

            let arrow = "";
            if (pdiff < 0) {
                arrow = "▾";
            } else if (pdiff > 0) {
                arrow = "▴";
            }

            const pdiffHtml = baseLcov
                ? th(
                      renderEmoji(pdiff),
                      " ",
                      arrow,
                      " ",
                      plus,
                      pdiff.toFixed(2),
                      "%",
                  )
                : "";
            let report = lcovObj.lcov;

            if (baseLcov) {
                const onlyInLcov = lcovObj.lcov.filter(comparer(baseLcov));
                const onlyInBefore = baseLcov.filter(comparer(lcovObj.lcov));
                report = onlyInBefore.concat(onlyInLcov);
            }

            return `${table(
                tbody(
                    tr(
                        th(lcovObj.packageName),
                        th(percentage(lcovObj.lcov).toFixed(2), "%"),
                        pdiffHtml,
                    ),
                ),
            )} \n\n ${
                showDetail
                    ? `${details(
                          summary("Detail"),
                          codelate(report, options),
                      )}<br/>`
                    : ""
            }`;
        });

    const title = `Coverage after merging into ${b(base)} <p></p>`;

    let res = fragment(title, getHtml().join(""));

    const maxinum = 65536;
    if (res.length <= maxinum) {
        return res;
    }

    res = fragment(
        title,
        getHtml(false).join(""),
        `No details are displayed because the detail info exceeds ${maxinum} characters<p></p>`,
    );

    return res;
};

/**
 * Github comment for single repo
 * @param {raw lcov} lcov
 * @param {*} options
 */
const comment = (lcov, before, options) => {
    const { appName, base } = options;
    const pbefore = before ? percentage(before) : 0;
    const pafter = before ? percentage(lcov) : 0;
    const pdiff = pafter - pbefore;
    const plus = pdiff > 0 ? "+" : "";

    let arrow = "";
    if (pdiff < 0) {
        arrow = "▾";
    } else if (pdiff > 0) {
        arrow = "▴";
    }

    const pdiffHtml = before
        ? th(renderEmoji(pdiff), " ", arrow, " ", plus, pdiff.toFixed(2), "%")
        : "";

    let report = lcov;

    if (before) {
        const onlyInLcov = lcov.filter(comparer(before));
        const onlyInBefore = before.filter(comparer(lcov));
        report = onlyInBefore.concat(onlyInLcov);
    }

    const title = `Coverage after merging into ${b(base)} <p></p>`;
    const header = appName
        ? tbody(
              tr(th(appName), th(percentage(lcov).toFixed(2), "%"), pdiffHtml),
          )
        : tbody(tr(th(percentage(lcov).toFixed(2), "%"), pdiffHtml));

    return fragment(
        title,
        table(header),
        "\n\n",
        details(summary("Detail"), codelate(report, options)),
    );
};

/**
 * Diff in coverage percentage for single repo
 * @param {raw lcov} lcov
 * @param {raw base lcov} before
 * @param {*} options
 */
export const diff = (lcov, before, options) => comment(lcov, before, options);

/**
 * Diff in coverage percentage for monorepo
 * @param {Array<{packageName, lcovPath}>} lcovArrayForMonorepo
 * @param {{Array<{packageName, lcovBasePath}>}} lcovBaseArrayForMonorepo
 * @param {*} options
 */
export const diffForMonorepo = (
    lcovArrayForMonorepo,
    lcovBaseArrayForMonorepo,
    options,
) =>
    commentForMonorepo(lcovArrayForMonorepo, lcovBaseArrayForMonorepo, options);
