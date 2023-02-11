const CommentsList = require("../models/CommentsList");
const Post = require("../models/Post");

class PostController {
	async create(req, res) {
		try {
			const post = await Post.create(req.body);
			const commnetList = await CommentsList.create({ post: post._id });
			res.json(post);
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}

	async getAll(req, res) {
		try {
			const { limit, page } = req.query;
			const posts = await Post.find()
				.skip((page - 1) * limit)
				.limit(limit);
			const maxCount = await Post.find().count();
			res.send({ maxCount, posts });
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			const post = await Post.findById(id);
			return res.json(post);
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}

	async update(req, res) {
		try {
			const post = req.body;
			if (!post._id) throw new Error("id not found");
			const newPost = await Post.findByIdAndUpdate(post._id, post, {
				new: true,
			});
			return res.json(post);
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params;
			const post = await Post.findByIdAndDelete(id);
			return res.json(post);
		} catch (e) {
			console.log(e);
			res.send({ message: "Server error" });
		}
	}
}

module.exports = new PostController();
