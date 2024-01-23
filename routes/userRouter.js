const User = require("../models/USer");
const userController = require("../controllers/userControllers");
const express = require("express");
const route = express.Router();
const JWt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
route.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      let data = await userController.Register(name, email, hash);
      console.log(data);
      res.send("register is done");
    });
  } catch (e) {
    res.status(500).send("server error");
  }
});

const secret_Key = "My secret key for authentication";
route.post("/login", async (req, res) => {
  try {
    let { name, password } = req.body;
    let data = await userController.Login(name, password);
    bcrypt.compare(password, data.password, function (err, result) {
      if (res) {
        const token = JWt.sign(
          JSON.stringify(data),
          secret_Key,
          (err, token) => {
            res.json({ token });
          }
        );
      } else {
        res.status(403).send("error");
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});
route.get("/get-users", verifyToken, async (req, res) => {
  try {
    let data = await userController.getAllUsers();
    JWt.verify(req.token, secret_Key, (err, authorData) => {
      if (err) {
        res.status(403).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (e) {
    res.status(500).json({ e });
  }
});
route.delete("/delete-user/:id", async (req, res) => {
  console.log(req.params.id);
  let _id = req.params.id;
  let data = await userController.deleteUser(_id);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(404).send("error");
  }
});
route.patch("/update-user/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let { name, email, password } = req.body;
    let data = await userController.updateUser(_id, name, email, password);
    console.log(data);
    if (data) {
      res.send(data);
    } else {
      console.log(err);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});
//Verify token middleware
function verifyToken(req, res, next) {
  //Get auth header value
  try {
    const authorHeader = req.headers["authorization"];
    //check if authHeader not undefined
    if (authorHeader !== undefined) {
      console.log(authorHeader);
      const author = authorHeader.split(" ");
      const authToken = author[1];
      req.token = authToken;
      //Next middleware
      next();
    } else {
      res.status(403);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
module.exports = route;
