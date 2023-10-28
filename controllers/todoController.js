const Todo = require("../model/todos");

module.exports = (app) => {
  app.get("/", async (req, res) => {
    try {
      const todos = await Todo.find().sort({ timestaps: -1 });
      if (todos.length < 1) {
        return res.status(200).json({ message: "No todos yet: Add one now" });
      }
      return res.status(200).json({ message: todos });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  app.get("/todos/completed", async (req, res) => {
    try {
      const todos = await Todo.find({ completed: true });

      return res.status(200).json({ message: todos });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  app.get("/todos/not-completed", async (req, res) => {
    try {
      const todos = await Todo.find({ completed: false });

      return res.status(200).json({ message: todos });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  app.post("/todo", async (req, res) => {
    const { item } = req.body;
    if (item == null) {
      res.status(200).json({ message: "Please enter a todo item." });
    }
    try {
      await Todo.create({ todo: item });
      return res.status(200).json({ message: "Task saved" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });

  app.put("/todo/:id/set-completed", async (req, res) => {
    const { id } = req.params;

    try {
      // Find the todo by ID
      const todo = await Todo.findById(id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      // Update the 'completed' field and save the changes
      todo.completed = !todo.completed;
      await todo.save();

      if (todo.completed) {
        res.status(200).json({ message: "Task completed", todo });
      } else {
        res.status(200).json({ message: "Task not completed", todo });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });

  app.delete("/todo/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Todo.deleteOne({ _id: id });
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  app.delete("/todos/completed", async (req, res) => {
    try {
      const completedTodos = await Todo.find({ completed: true });

      // Delete all completed todos.
      await Todo.deleteMany({
        _id: { $in: completedTodos.map((todo) => todo._id) },
      });

      // Return a JSON response indicating that the operation was successful.
      res
        .status(200)
        .json({ message: "All completed todos have been deleted." });
    } catch (error) {
      // Handle any errors here.
      res.status(500).json({ message: error.message });
    }
  });
};
