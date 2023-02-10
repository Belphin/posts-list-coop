const { Schema, model } = require("mongoose");

const Post = new Schema({
	title: { type: String, require: true },
	body: { type: String, require: true },
	author: { type: String, require: true },
});

module.exports = model("Post", Post);
