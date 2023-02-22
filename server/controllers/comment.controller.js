const CommentService = require("../services/comment.service");

class CommentController {
	async create(req, res) {
		try {
			const { id } = req.params;
			const comment = await CommentService.create(req.body, id);
			return res.json(comment);
		} catch (e) {
			console.log(e);
			res
				.status(400)
				.send({ message: "Server error", place: "comment/create" });
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			const comment = await CommentService.getOne(id);
			return res.json(comment);
		} catch (e) {
			console.log(e);
			res
				.status(400)
				.send({ message: "Server error", place: "comment/getOne" });
		}
	}

	async getPage(req, res) {
		try {
			const { id } = req.params;
			const { limit, page } = req.query;
			const comments = await CommentService.getPage(id, limit, page);
			return res.json(comments);
		} catch (e) {
			console.log(e);
			res
				.status(400)
				.send({ message: "Server error", place: "comment/getPage" });
		}
	}
}

module.exports = new CommentController();
