const User = require("../models/USer");
const Register = async (_name, _email, _password) => {
  try {
    let data = await User.create({
      name: _name,
      email: _email,
      password: _password,
    });
    if (data) {
      return data;
    } else {
      console.log("error in creating");
    }
  } catch (error) {
    console.log(error);
  }
};
const Login = async (_name, _password) => {
  try {
    let data = await User.findOne({ name: _name }, { password: _password });
    if (data) {
      return data;
    } else {
      console.log("error in login");
    }
  } catch (e) {
    console.log(e);
  }
};
const getAllUsers = async () => {
  let data = await User.find();
  if (data.length != 0) {
    return data;
  } else {
    console.log("error");
  }
};
const deleteUser = async (id) => {
  try {
    let data = await User.deleteOne({ _id: id });
    if (data) {
      console.log(data);
      return data;
    } else {
      return "error in deleting";
    }
  } catch (e) {
    console.log("error");
  }
};
const updateUser = async (id, _name, _email, _password) => {
  try {
    let data = await User.findOneAndUpdate(
      { _id: id },
      { name: _name, email: _email, password: _password }
    );
    if (data) {
      console.log("user updating done");
      return data;
    } else {
      console.log("error");
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = { Register, Login, getAllUsers, deleteUser, updateUser };
