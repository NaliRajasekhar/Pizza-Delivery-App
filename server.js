// server.js
require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index'); 
const { globalErrorHandler } = require('./middleware/errorhandler');
const CONSTANTS = require('./constants');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes); 


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
