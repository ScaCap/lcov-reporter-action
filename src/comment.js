import { details, summary, b, fragment, table, tbody, tr, th, p } from "./html";
import { percentage } from "./lcov";
import { tabulate } from "./tabulate";

/**
 * Compares two arrays of objects and returns with unique lines update
 * @param {number} pdiff value from diff percentage
 * @returns {string} emoji string for negative/positive pdiff
 */
const renderEmoji = (pdiff) => {
    if (pdiff.toFixed(2) < 0) return "❌";
    return "✅";
};

const renderArrow = (pdiff) => {
    if (pdiff < 0) {
        return "▾";
    }
    if (pdiff > 0) {
        return "▴";
    }
    return "";
};

/**
 * Compares two arrays of objects and returns with unique lines update
 * @param {Array} otherArray
 * @returns {Function} function with filtering non original lines
 */
const comparer = (otherArray) => (current) =>
    otherArray.filter(
        (other) =>
            other.lines.found === current.lines.found &&
            other.lines.hit === current.lines.hit,
    ).length === 0;

const renderLcov = (lcov, base, appTitle, options) => {
    const maxLines = options.maxLines || 15;
    const pbefore = base ? percentage(base) : 0;
    const pafter = base ? percentage(lcov) : 0;
    const pdiff = pafter - pbefore;
    const plus = pdiff > 0 ? "+" : "";

    let report = lcov;
    if (base) {
        const onlyInLcov = lcov.filter(comparer(base));
        const onlyInBefore = base.filter(comparer(lcov));
        report = onlyInBefore.concat(onlyInLcov);
    }

    const h = th(percentage(lcov).toFixed(2), "%");

    const row = [];
    if (appTitle) {
        row.push(th(appTitle));
    }
    row.push(h);
    if (base) {
        const arrow = renderArrow(pdiff);
        row.push(
            th(
                renderEmoji(pdiff),
                " ",
                arrow,
                " ",
                plus,
                pdiff.toFixed(2),
                "%",
            ),
        );
    }
    return [
        table(tbody(tr(...row))),
        report.length > maxLines
            ? p("Coverage Report too long to display")
            : details(summary("Coverage Report"), tabulate(report, options)),
        "<br/>",
    ].join("");
};

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
    const body = lcovArrayForMonorepo
        .map((lcovObj) => {
            const baseLcov = lcovBaseArrayForMonorepo.find(
                (el) => el.packageName === lcovObj.packageName,
            );
            return renderLcov(
                lcovObj.lcov,
                baseLcov && baseLcov.lcov,
                lcovObj.packageName,
                options,
            );
        })
        .join("");

    const { base } = options;
    const title = `Coverage after merging into ${b(base)} <p></p>`;
    return fragment(title, body);
};

/**
 * Github comment for single repo
 * @param {raw lcov} lcov
 * @param {*} options
 */
const comment = (lcov, before, options) => {
    const { appName, base } = options;
    const title = `Coverage after merging into ${b(base)} <p></p>`;
    return fragment(title, renderLcov(lcov, before, appName, options));
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
