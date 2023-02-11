const { Schema, model } = require("mongoose");

const CommentsList = new Schema({
	comments: { type: Array, require: true },
});

module.exports = model("CommentsList", CommentsList);
