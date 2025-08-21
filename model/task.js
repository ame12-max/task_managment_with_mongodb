class Task {
  constructor(id, title, description, dueDate, status = "pending") {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
  }
}

module.exports = Task;
