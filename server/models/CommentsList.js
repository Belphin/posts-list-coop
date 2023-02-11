const { Schema, model } = require("mongoose");

const CommentsList = new Schema({
	post: { type: String, require: true, unique: true },
	comments: { type: Array },
});

module.exports = model("CommentsList", CommentsList);
