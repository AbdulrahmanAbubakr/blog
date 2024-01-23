const Blog = require("../models/Blogs");

const createBlog = async (_title, _body, _photo, _author, _tags) => {
  try {
    let data = await Blog.create({
      title: _title,
      body: _body,
      photo: _photo,
      author: _author,
      tags: _tags,
    });
    if (data) {
      console.log("Blog creation is done");
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
};
/**Edit blog */
const updateBlog = async (_userId, _blogId, _title, _body, _photo, _tags) => {
  try {
    let data = await Blog.findByIdAndUpdate(
      { userId: _userId, blogId: _blogId },
      {
        title: _title,
        body: _body,
        photo: _photo,
        tags: _tags,
      }
    );
    if (data) {
      console.log(`${data} updating done`);
      return data;
    } else {
      return "Error";
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteBlog = async (id) => {
  try {
    let data = await Blog.deleteOne({ _id: id });
    if (data) {
      console.log("Blog is deleted");
      return data;
    } else {
      return "error in deleting ";
    }
  } catch (e) {
    console.log(e);
  }
};
const searchBlog = async();
Blog.createIndexes({ title: 1 }, { tags: 1 }, { author: 1 });
module.exports = { createBlog, updateBlog, deleteBlog };
