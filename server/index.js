// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working ✅');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));


  const User = require('./models/User');

app.get('/test-user', async (req, res) => {
  const user = new User({ name: "Test", email: "test@example.com", password: "123456" });
  await user.save();
  res.send('User saved!');
});
console.log("MONGO_URI:", process.env.MONGO_URI);
