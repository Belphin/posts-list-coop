const PostService = require("../services/post.service");

class PostController {
	async create(req, res) {
		try {
			const post = await PostService.create(req.body);
			res.json(post);
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: "Server error", place: "post/create" });
		}
	}

	async getAll(req, res) {
		try {
			const { limit, page } = req.query;
			const { maxCount, posts } = await PostService.getAll(limit, page);
			res.send({ maxCount, posts });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: "Server error", place: "post/getAll" });
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			const post = await PostService.getOne(id);
			return res.json(post);
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: "Server error", place: "post/getOne" });
		}
	}

	async update(req, res) {
		try {
			const post = await PostService.update(req.body);
			return res.json(post);
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: "Server error", place: "post/update" });
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params;
			const post = await PostService.delete(id);
			return res.json(post);
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: "Server error", place: "post/delete" });
		}
	}
}

module.exports = new PostController();
