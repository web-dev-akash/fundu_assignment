const connect = require("./database/db");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const User = require("./models/user.model");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const body = await User.find();
  try {
    res.status(200).send({
      data: body,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
    });
    console.log(error);
  }
});
app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const body = new User({ email, password, name });
  await body.save();
  try {
    res.status(200).send({
      data: body,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
    });
    console.log(error);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email: email, password: password });
  try {
    if (user.length > 0) {
      res.status(200).send({
        message: "Login Successful",
        data: user,
      });
    } else {
      res.status(404).send({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error,
    });
    console.log(error);
  }
});
app.listen(PORT, () => {
  connect();
  console.log(`Server Running at http://localhost:${PORT}`);
});
