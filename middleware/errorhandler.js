const CONSTANTS = require('../constants');


const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true; 
    return error;
};

const globalErrorHandler = (err, req, res, next) => {
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
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
