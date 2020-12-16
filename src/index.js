import fs, { promises } from "fs";
import core from "@actions/core";
import path from "path";
import { GitHub, context } from "@actions/github";
import { parse } from "./lcov";
import { diff } from "./comment";

const walkSync = (dir, filelist = []) => {
	fs.readdirSync(dir).forEach(file => {
		filelist = fs.statSync(path.join(dir, file)).isDirectory()
			? walkSync(path.join(dir, file), filelist)
			: filelist
					.filter(file => {
						return file.path.includes("lcov.info");
					})
					.concat({
						name: dir.split("/")[1],
						path: path.join(dir, file),
					});
	});
	return filelist;
};

async function main() {
	const token = core.getInput("github-token");
	const lcovFile = core.getInput("lcov-file") || "./coverage/lcov.info";
	const baseFile = core.getInput("lcov-base");

	const raw = await promises.readFile(lcovFile, "utf-8").catch(err => null);
	if (!raw) {
		console.log(`No coverage report found at '${lcovFile}', exiting...`);
		return;
	}

	const baseRaw =
		baseFile && (await promises.readFile(baseFile, "utf-8").catch(err => null));
	if (baseFile && !baseRaw) {
		console.log(`No coverage report found at '${baseFile}', ignoring...`);
	}

	// Add base path for monorepo
	const monorepoBasePath = core.getInput("monorepo-base-path") || "./packages";
	let lcovArray = walkSync(monorepoBasePath);

	const lcovArrayWithRaw = [];
	for (const file of lcovArray) {
		if (file.path.includes(".info")) {
			const raw = await promises.readFile(file.path, "utf8");
			const data = await parse(raw);
			lcovArrayWithRaw.push({
				packageName: file.name,
				lcov: data,
			});
		}
	}

	const options = {
		repository: context.payload.repository.full_name,
		commit: context.payload.pull_request.head.sha,
		prefix: `${process.env.GITHUB_WORKSPACE}/`,
		head: context.payload.pull_request.head.ref,
		base: context.payload.pull_request.base.ref,
	};

	const lcov = await parse(raw);
	const baselcov = baseRaw && (await parse(baseRaw));
	const body = diff(lcov, baselcov, options);

	await new GitHub(token).issues.createComment({
		repo: context.repo.repo,
		owner: context.repo.owner,
		issue_number: context.payload.pull_request.number,
		body: diff(lcov, lcovArrayWithRaw, baselcov, options),
	});
}

main().catch(function(err) {
	console.log(err);
	core.setFailed(err.message);
});
