// middleware/errorHandler.js
const config = require('../config/config');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for server-side debugging
  console.error(err.stack);
  
  // Default status code and error message
  const statusCode = err.statusCode || 500;
  const message = config.app.isDev || statusCode !== 500 
    ? err.message 
    : 'An unexpected error occurred';
  
  // Format the error response
  const errorResponse = {
    success: false,
    error: statusCode === 500 ? 'Server Error' : err.name || 'Error',
    message,
    ...(config.app.isDev && { stack: err.stack })
  };
  
  // Send the error response
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;