const taskService = require("../data/taskService");

// Get all tasks
exports.getTasks = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
};

// Get task by ID
exports.getTaskById = (req, res) => {
  const task = taskService.getTaskById(parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

// Create new task
exports.createTask = (req, res) => {
  const { title, description, dueDate, status } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newTask = taskService.createTask(title, description, dueDate, status);
  res.status(201).json(newTask);
};

// Update task
exports.updateTask = (req, res) => {
  const updatedTask = taskService.updateTask(parseInt(req.params.id), req.body);
  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(updatedTask);
};

// Delete task
exports.deleteTask = (req, res) => {
  const deletedTask = taskService.deleteTask(parseInt(req.params.id));
  if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json({ message: "Task deleted successfully" });
};
