const { Task } = require('../model/task');
const mongoose = require('mongoose');


function isValidObjectId(id) {
return mongoose.Types.ObjectId.isValid(id);
}


async function getAllTasks() {
const tasks = await Task.find({}).sort({ createdAt: -1 }).lean();
// .lean() uses transform in schema's toJSON only on docs; so map manually
return tasks.map((t) => ({
id: t._id.toString(),
title: t.title,
description: t.description,
dueDate: t.dueDate,
status: t.status,
createdAt: t.createdAt,
updatedAt: t.updatedAt,
}));
}


async function getTaskById(id) {
if (!isValidObjectId(id)) return null;
const t = await Task.findById(id).lean();
if (!t) return null;
return {
id: t._id.toString(),
title: t.title,
description: t.description,
dueDate: t.dueDate,
status: t.status,
createdAt: t.createdAt,
updatedAt: t.updatedAt,
};
}


async function createTask({ title, description, dueDate, status }) {
const doc = await Task.create({ title, description, dueDate, status });
return doc.toJSON();
}


async function updateTask(id, data) {
if (!isValidObjectId(id)) return null;
const allowed = ['title', 'description', 'dueDate', 'status'];
const update = {};
for (const k of allowed) if (data[k] !== undefined) update[k] = data[k];


const doc = await Task.findByIdAndUpdate(id, update, { new: true, runValidators: true });
return doc ? doc.toJSON() : null;
}


async function deleteTask(id) {
if (!isValidObjectId(id)) return null;
const doc = await Task.findByIdAndDelete(id);
return !!doc;
}


module.exports = {
getAllTasks,
getTaskById,
createTask,
updateTask,
deleteTask,
};