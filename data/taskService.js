const Task = require("../model/task");

//sample tasks to get first at /tasks route
let tasks = [
  {
    id: 1,
    title: "Finish refferal app project ",
    description: "Complete API implementation",
    dueDate: "2025-08-30",
    status: "completed"
  }
]
// i can use third party module uuid for unique id , for now i use my own variable
let currentId = 1;

// Get all tasks
function getAllTasks() {
  return tasks;
}

// Get task by ID
function getTaskById(id) {
  return tasks.find(task => task.id === id);
}

// Create new task
function createTask(title, description, dueDate, status) {
  const task = new Task(currentId++, title, description, dueDate, status);
  tasks.push(task);
  return task;
}

// Update task
function updateTask(id, updatedData) {
  const task = getTaskById(id);
  if (!task) return null;

  Object.assign(task, updatedData);
  return task;
}

// Delete task
function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return null;

  const deletedTask = tasks.splice(index, 1);
  return deletedTask[0];
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
