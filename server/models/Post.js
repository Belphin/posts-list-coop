const { Schema, model } = require("mongoose");

const Post = new Schema({
	comments: { type: String, require: true, unique: true },
	title: { type: String, require: true },
	body: { type: String, require: true },
	author: { type: String, require: true },
	tags: { type: Array },
});

module.exports = model("Post", Post);
