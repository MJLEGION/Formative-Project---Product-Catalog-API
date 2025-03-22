// config/config.js

/**
 * Application configuration
 */
module.exports = {
    app: {
      port: process.env.PORT || 3000,
      env: process.env.NODE_ENV || 'development',
      isDev: process.env.NODE_ENV !== 'production',
    },
    // Add other configuration settings as needed
    pagination: {
      defaultLimit: 20,
      maxLimit: 100
    },
    inventory: {
      defaultLowStockThreshold: 5
    }
  };