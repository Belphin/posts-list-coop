const { Schema, model } = require("mongoose");

const Comment = new Schema({
	author: { type: String, require: true },
	title: { type: String },
});

module.exports = model("Comment", Comment);
