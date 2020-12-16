// Modified from: https://github.com/slavcodev/coverage-monitor-action

// Not needed for now, but could be useful
// const createStatus = async ({ client, context, sha, status }) =>
// 	client.repos.createCommitStatus({
// 		...context.repo,
// 		sha,
// 		...status,
// 	})

// Every comment written by our action will have this hidden
// header on top, and will be used to identify which comments
// to update/delete etc
const hiddenHeader = `<!-- monorepo-jest-reporter-action -->`;

const appendHiddenHeaderToComment = body => hiddenHeader + body;

const listComments = async ({ client, context, prNumber, commentHeader }) => {
	const { data: existingComments } = await client.issues.listComments({
		...context.repo,
		issue_number: prNumber,
	});

	return existingComments.filter(({ body }) => body.startsWith(hiddenHeader));
};

const insertComment = async ({ client, context, prNumber, body }) =>
	client.issues.createComment({
		...context.repo,
		issue_number: prNumber,
		body: appendHiddenHeaderToComment(body),
	});

const updateComment = async ({ client, context, body, commentId }) =>
	client.issues.updateComment({
		...context.repo,
		comment_id: commentId,
		body: appendHiddenHeaderToComment(body),
	});

const deleteComments = async ({ client, context, comments }) =>
	Promise.all(
		comments.map(({ id }) =>
			client.issues.deleteComment({
				...context.repo,
				comment_id: id,
			}),
		),
	);

const upsertComment = async ({ client, context, prNumber, body }) => {
	const existingComments = await listComments({
		client,
		context,
		prNumber,
	});
	const last = existingComments.pop();

	await deleteComments({
		client,
		context,
		comments: existingComments,
	});

	return last
		? updateComment({
				client,
				context,
				body,
				commentId: last.id,
		  })
		: insertComment({
				client,
				context,
				prNumber,
				body,
		  });
};

module.exports = {
	upsertComment,
};
