const CONSTANTS = require('../constants');


// Custom error handler function
const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;  // To differentiate between operational errors and programming errors
    return error;
};

// Global error handling middleware
const globalErrorHandler = (err, req, res, next) => {
    // Set default status and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // // For development, you might want to log detailed error information
    // if (process.env.NODE_ENV === 'development') {
    //     console.error(err);
    // }

    // Respond with error information
    res.status(statusCode).json({
        status:CONSTANTS.STATUS.ERROR,
        message: message,
        statusCode: statusCode
        // ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace only in development
    });
};

module.exports = {
    createError,
    globalErrorHandler,
};
