// utils/responseFormatter.js

/**
 * Formats a successful response
 * @param {Object} data - The data to include in the response
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {Object} Formatted response object
 */
exports.formatSuccess = (data, statusCode = 200) => {
    return {
      status: statusCode,
      body: {
        success: true,
        ...(Array.isArray(data) ? { count: data.length } : {}),
        data
      }
    };
  };
  
  /**
   * Formats an error response
   * @param {string} message - Error message
   * @param {string} errorType - Type of error
   * @param {number} statusCode - HTTP status code (default: 500)
   * @param {Array} errors - Optional array of detailed errors
   * @returns {Object} Formatted error response object
   */
  exports.formatError = (message, errorType = 'Server Error', statusCode = 500, errors = null) => {
    return {
      status: statusCode,
      body: {
        success: false,
        error: errorType,
        message,
        ...(errors ? { errors } : {})
      }
    };
  };