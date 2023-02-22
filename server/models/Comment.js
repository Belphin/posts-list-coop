const { Schema, model } = require("mongoose");

const Comment = new Schema({
	author: { type: String, require: true },
	content: { type: String, require: true },
});

module.exports = model("Comment", Comment);
