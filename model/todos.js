const mongoose = require("mongoose");

// Create a schema-like a blueprint

var todoSchema = new mongoose.Schema(
  {
    todo: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

var todo = mongoose.model("todo", todoSchema);

module.exports = todo;
