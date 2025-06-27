const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import and use auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Protected route
const protect = require('./middleware/authMiddleware');
app.get('/api/protected', protect, (req, res) => {
  res.send(`Hello ${req.user.name}, this is a protected route.`);
});

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// MongoDB connection and server start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
