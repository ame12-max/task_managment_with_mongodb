const express = require("express");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
