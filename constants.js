// constants.js
const CONSTANTS = {
  
    // Error messages
    ERRORS: {
      USER_NOT_FOUND: 'User not found',
      INVALID_CREDENTIALS: 'Invalid credentials',
      USER_ALREADY_EXISTS: 'User already exists',
      SOMETHING_WENT_WRONG:'Something went wrong'
    },
  
    // Success messages
    MESSAGES: {
      USER_CREATED: 'User registered successfully!',
      USER_UPDATED: 'User updated successfully!',
      USER_DELETED: 'User deleted successfully!',
    },
  
    // Status Codes
    STATUS_CODES: {
      SUCCESS: 200,
      CREATED: 201,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      NOT_FOUND: 404,
      CONFLICT: 409,
      INTERNAL_ERROR: 500
    },
    STATUS:{
      SUCCESS:"SUCCESS",
      ERROR:"ERROR"
    }
  };
  
  module.exports = CONSTANTS;
  