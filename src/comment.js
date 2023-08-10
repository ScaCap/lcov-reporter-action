import { b, details, fragment, p, summary, table, tbody, th, tr } from "./html";
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
            other.lines &&
            current.lines &&
            other.lines.found === current.lines.found &&
            other.lines.hit === current.lines.hit,
    ).length === 0;

const renderLcov = (lcov, base, appTitle, options) => {
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
    row.push(th(appTitle));
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
        report.length > options.maxLines
            ? p("Coverage Report too long to display")
            : details(summary("Coverage Report"), tabulate(report, options)),
        "<br/>",
    ].join("");
};

/**
 * Github comment for monorepo
 * @param {Array<{packageName, lcovPath}>} lcovArrayForMonorepo
 * @param {Array<{packageName, lcovPath}>} lcovBaseArrayForMonorepo
 * @param {*} options
 */
const renderCommentArray = (
    lcovArrayForMonorepo,
    lcovBaseArrayForMonorepo,
    options,
) => {
    const body = lcovArrayForMonorepo
        .map((lcovObj) => {
            const baseLcov =
                lcovBaseArrayForMonorepo &&
                lcovBaseArrayForMonorepo.find(
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
 * @param {raw} lcov
 * @param {raw} baseLcov
 * @param {string} appTitle
 * @param {*} options
 */
const renderCommentLine = (lcov, baseLcov, appTitle, options) => {
    const inner = renderLcov(lcov, baseLcov, appTitle, options);
    const { base } = options;
    const title = `Coverage after merging into ${b(base)} <p></p>`;
    return fragment(title, inner);
};

export const comments = async ({
    rootLcov,
    rootBaseLcov,
    lcovArray,
    lcovBaseArray,
    options,
    upsert,
}) => {
    if (!options.pullRequest) {
        return;
    }
    const renderOptions = {
        maxLines: options.maxLines,
        prefix: options.prefix,
        repository: options.repository,
        commit: options.pullRequest.head.sha,
        head: options.pullRequest.head.ref,
        base: options.pullRequest.base.ref,
    };
    // Comments
    if (lcovArray && lcovArray.length > 0) {
        if (options.multipleComment) {
            for (const lcovObj of lcovArray) {
                const baseLcov =
                    lcovBaseArray &&
                    lcovBaseArray.find(
                        (el) => el.packageName === lcovObj.packageName,
                    );
                const body = renderCommentLine(
                    lcovObj.lcov,
                    baseLcov && baseLcov.lcov,
                    lcovObj.packageName,
                    renderOptions,
                );
                await upsert(`m-${lcovObj.packageName}`, body);
            }
        } else {
            const body = renderCommentArray(
                lcovArray,
                lcovBaseArray,
                renderOptions,
            );
            await upsert("single-comment", body);
        }
    }
    if (rootLcov) {
        const body = renderCommentLine(
            rootLcov,
            rootBaseLcov,
            "root",
            renderOptions,
        );
        await upsert(`root-comment`, body);
    }
};
