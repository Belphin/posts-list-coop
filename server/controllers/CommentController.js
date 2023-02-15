const Comment = require("../models/Comment");
const CommentsList = require("../models/CommentsList");

class CommentController {
	async create(req, res) {
		try {
			const comment = await Comment.create(req.body);
			const { id } = req.params;
			const commentsList = await CommentsList.findById(id);
			await CommentsList.findByIdAndUpdate(
				id,
				{
					...commentsList.comments,
					comments: [comment._id, ...commentsList.comments],
				},
				{
					new: true,
				}
			);
			return res.json(comment);
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}

	async getList(req, res) {
		try {
			const { id } = req.params;
			const commentsList = await CommentsList.findById(id);
			return res.json(commentsList);
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			const comment = await Comment.findById(id);
			return res.json(comment);
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}

	async getPage(req, res) {
		try {
			const { id } = req.params;
			const { limit, page } = req.query;
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
			return res.json(response);
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}
}

module.exports = new CommentController();
