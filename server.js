// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index'); // Import routes
const { globalErrorHandler } = require('./middleware/errorhandler');
const CONSTANTS = require('./constants');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Middleware
app.use(bodyParser.json());

// Route setup
app.use('/api', routes); 
// Prefix all routes with /api

// 404 Error Middleware (for unmatched routes)
app.use((req, res, next) => {
  const error = {
    status: CONSTANTS.STATUS.ERROR,
    statusCode: 404,
    message: CONSTANTS.STATUS_CODES.NOT_FOUND,
  };
  next(error);
});

app.use(globalErrorHandler);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
