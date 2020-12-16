import { details, summary, b, fragment, table, tbody, tr, th } from "./html";

import { percentage } from "./lcov";
import { tabulate } from "./tabulate";

export function comment(lcov, lcovArrayWithRaw, options) {
	const tableHTML = lcovArrayWithRaw.map(lcovObj => {
		return `${lcovObj.packageName} - ${table(
			tbody(tr(th(percentage(lcovObj.lcov).toFixed(2), "%"))),
		)} \n\n`;
	});

	const detailsHTML = lcovArrayWithRaw.map(lcovObj => {
		return details(summary("Coverage Report"), tabulate(lcovObj.lcov, options));
	});

	return fragment(
		`Coverage after merging ${b(options.head)} into ${b(options.base)}`,
		tableHTML.join(""),
		"\n\n",
		detailsHTML.join(""),
	);
}

export function diff(lcov, lcovArrayWithRaw, before, options) {
	if (!before) {
		return comment(lcov, lcovArrayWithRaw, options);
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
