const blogController = require("../controllers/blogControllers");
const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: Storage });

route.post("/create-blog", upload.single("image"), async (req, res) => {
  let photo = req.file.filename;
  const { title, body, author, tags } = req.body;
  let data = await blogController.createBlog(title, body, photo, author, tags);

  res.send(data);
});

/**Edit blog */
route.patch("/:userId/:blogId", upload.single("image"), async (req, res) => {
  try {
    let { userId, blogId } = req.params;

    if (!req.file || !req.body) {
      return res
        .status(400)
        .json({ error: "400", message: "Missing required data" });
    }

    let photo = req.file.filename;
    const { title, body, tags } = req.body;

    let data = await blogController.updateBlog(
      userId,
      blogId,
      title,
      body,
      photo,
      tags
    );
    if (!data) {
      return res.status(404).json({ error: "404", message: "Blog not found" });
    }

    res.status(200).json({ data, message: "Editing done" });
  } catch (e) {
    console.log(e);

    // Always good to send error back in a structured JSON format.
    res.status(500).json({ error: "500", message: e.message });
  }
});
//Delete blog
route.delete("/:id", async (req, res) => {
  let data = await blogController.deleteBlog(req.params.id);
  console.log(data);
  res.send(data);
});
module.exports = route;
