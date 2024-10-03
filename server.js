// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enables CORS
app.use(express.json()); // Parses incoming JSON requests

// Import routes
const authRoutes = require('./routes/auth');

// Use routes (IMPORTANT: Place this after middleware)
app.use('/api/auth', authRoutes);

// Test route for auth
app.get('/api/auth/test', (req, res) => {
  res.send('Auth route is working');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('Password Manager API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
