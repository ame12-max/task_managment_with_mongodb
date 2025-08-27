const taskService = require('../data/taskService');


exports.getTasks = async (req, res, next) => {
try {
const tasks = await taskService.getAllTasks();
res.json(tasks);
} catch (err) {
next(err);
}
};


exports.getTaskById = async (req, res, next) => {
try {
const task = await taskService.getTaskById(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json(task);
} catch (err) {
next(err);
}
};


exports.createTask = async (req, res, next) => {
try {
const { title, description, dueDate, status } = req.body || {};
if (!title || !description || !dueDate) {
return res.status(400).json({ message: 'Missing required fields: title, description, dueDate' });
}
const newTask = await taskService.createTask({ title, description, dueDate, status });
res.status(201).json(newTask);
} catch (err) {
next(err);
}
};


exports.updateTask = async (req, res, next) => {
try {
const updatedTask = await taskService.updateTask(req.params.id, req.body || {});
if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
res.json(updatedTask);
} catch (err) {
next(err);
}
};


exports.deleteTask = async (req, res, next) => {
try {
const ok = await taskService.deleteTask(req.params.id);
if (!ok) return res.status(404).json({ message: 'Task not found' });
res.json({ message: 'Task deleted successfully' });
} catch (err) {
next(err);
}
};