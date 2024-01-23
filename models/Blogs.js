const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  title: String,
  body: String,
  photo: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [String],
});

const Blog = mongoose.model("Blogs", blogSchema);
module.exports = Blog;
