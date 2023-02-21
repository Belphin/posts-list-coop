const CommentsList = require("../models/CommentsList");
const Post = require("../models/Post");

class PostService {
	async create(post) {
		const comments = await CommentsList.create({ comments: [] });
		const newPost = await Post.create({
			...post,
			comments: comments._id,
		});
		return newPost;
	}

	async getAll(limit, page) {
		const posts = await Post.find()
			.skip((page - 1) * limit)
			.limit(limit);
		const maxCount = await Post.count();
		return { maxCount, posts };
	}

	async getOne(id) {
		const post = await Post.findById(id);
		return post;
	}

	async update(post) {
		if (!post._id) throw new Error("id not found");
		const newPost = await Post.findByIdAndUpdate(post._id, post, {
			new: true,
		});
		return newPost;
	}

	async delete(id) {
		const post = await Post.findByIdAndDelete(id);
		await CommentsList.findByIdAndDelete(post.comments);
		return post;
	}
}

module.exports = new PostService();
