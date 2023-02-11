const Comment = require("../models/Comment");
const CommentsList = require("../models/CommentsList");

class CommentController {
	async create(req, res) {
		try {
			const comment = await new Comment(req.body);
			const { id } = req.params;
			const commentsList = await CommentsList.findById(id);
			await CommentsList.findByIdAndUpdate(
				id,
				{
					...commentsList.comments,
					comments: [...commentsList.comments, comment._id],
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
			const commments = {
				maxCount: commentsList.comments.length,
				comments: commentsList.comments.slice(limit * (page - 1), limit * page),
			};
			return res.json(commments);
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}
}

module.exports = new CommentController();
