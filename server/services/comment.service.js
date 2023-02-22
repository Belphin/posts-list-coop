const Comment = require("../models/Comment");
const CommentsList = require("../models/CommentsList");

class CommentService {
	async create(comment, _id) {
		const newComment = await Comment.create(comment);
		const updatedCommentList = await CommentsList.updateOne(
			{ _id },
			{ $push: { comments: newComment._id } }
		);
		return newComment;
	}

	async getOne(id) {
		const comment = await Comment.findById(id);
		return comment;
	}

	async getPage(id, limit = 10, page = 1) {
		const commentsList = await CommentsList.findById(id);
		const comments = {
			maxCount: commentsList.comments.length,
			comments: commentsList.comments.slice(limit * (page - 1), limit * page),
		};
		const response = [];
		for (const i in comments.comments) {
			if (comments.comments[i]) {
				const comment = await Comment.findById(comments.comments[i] + "");
				response.push(comment);
			}
		}
		return response;
	}
}

module.exports = new CommentService();
