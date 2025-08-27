const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 7658;


// Parse JSON
app.use(express.json());


// Routes
app.use('/tasks', taskRoutes);


// Global error handler
app.use((err, req, res, next) => {
console.error(err);
if (err.name === 'CastError' && err.kind === 'ObjectId') {
return res.status(400).json({ message: 'Invalid task id' });
}
if (err.name === 'ValidationError') {
return res.status(400).json({ message: err.message });
}
res.status(500).json({ message: 'Something went wrong!' });
});


async function start() {
try {
await mongoose.connect(process.env.MONGODB_URI, {
autoIndex: true,
});
console.log('MongoDB connected');


app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
} catch (err) {
console.error('MongoDB connection error:', err.message);
process.exit(1);
}
}


start();