import { details, summary, b, fragment, table, tbody, tr, th } from "./html";
import { percentage } from "./lcov";
import { tabulate } from "./tabulate";

export function commentForMonorepo(lcovArrayForMonorepo, options) {
	const html = lcovArrayForMonorepo.map(lcovObj => {
		return `${table(
			tbody(
				tr(
					th(lcovObj.packageName),
					th(percentage(lcovObj.lcov).toFixed(2), "%"),
				),
			),
		)} \n\n ${details(
			summary("Coverage Report"),
			tabulate(lcovObj.lcov, options),
		)} <br/>`;
	});

	return fragment(
		`Coverage after merging into ${b(options.base)} <p></p>`,
		html.join(""),
	);
}

export function comment(lcov, options) {
	return fragment(
		`Coverage after merging ${b(options.head)} into ${b(options.base)}`,
		table(tbody(tr(th(percentage(lcov).toFixed(2), "%")))),
		"\n\n",
		details(summary("Coverage Report"), tabulate(lcov, options)),
	);
}

export function diff(lcov, lcovArrayForMonorepo, before, options) {
	if (!before) {
		if (lcovArrayForMonorepo.length) {
			return commentForMonorepo(lcovArrayForMonorepo, options);
		} else {
			return comment(lcov, lcovArrayForMonorepo, options);
		}
	}

	const pbefore = percentage(before);
	const pafter = percentage(lcov);
	const pdiff = pafter - pbefore;
	const plus = pdiff > 0 ? "+" : "";
	const arrow = pdiff === 0 ? "" : pdiff < 0 ? "▾" : "▴";

	return fragment(
		`Coverage after merging ${b(options.head)} into ${b(options.base)}`,
		table(
			tbody(
				tr(
					th(pafter.toFixed(2), "%"),
					th(arrow, " ", plus, pdiff.toFixed(2), "%"),
				),
			),
		),
		"\n\n",
		details(summary("Coverage Report"), tabulate(lcov, options)),
	);
}
