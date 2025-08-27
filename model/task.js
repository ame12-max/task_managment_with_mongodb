const mongoose = require('mongoose');


const validStatuses = ['pending', 'in_progress', 'completed'];


const TaskSchema = new mongoose.Schema(
{
title: {
type: String,
required: [true, 'title is required'],
trim: true,
minlength: [1, 'title cannot be empty'],
maxlength: [200, 'title is too long'],
},
description: {
type: String,
required: [true, 'description is required'],
trim: true,
maxlength: [2000, 'description is too long'],
},
dueDate: {
type: Date,
required: [true, 'dueDate is required'],
},
status: {
type: String,
enum: validStatuses,
default: 'pending',
},
},
{
timestamps: true,
toJSON: {
virtuals: true,
versionKey: false,
transform: (_, ret) => {
ret.id = ret._id.toString();
delete ret._id; // keep response shape consistent
return ret;
},
},
}
);


module.exports = {
Task: mongoose.model('Task', TaskSchema),
validStatuses,
};