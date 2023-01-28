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
app.listen(PORT, () => {
  connect();
  console.log(`Server Running at http://localhost:${PORT}`);
});
