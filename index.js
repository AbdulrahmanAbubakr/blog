const mongoose = require("mongoose");
const express = require("express");
const blogRoutes = require("./routes/blogRouters");
const userRoutes = require("./routes/userRouter");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use("/", blogRoutes);
app.use("/", userRoutes);
mongoose
  .connect("mongodb://127.0.0.1:27017/Blog")
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => console.log(`server is listening in port ${port}`));
