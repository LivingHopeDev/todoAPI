const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var mongoose = require("mongoose");
require("dotenv").config();
var todoController = require("./controllers/todoController");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connecting to mongoDb
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then((result) => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

// Fire todo controller
todoController(app);
app.listen(process.env.PORT, () => {
  console.log(`Backend server is running on port ${process.env.PORT}`);
});
