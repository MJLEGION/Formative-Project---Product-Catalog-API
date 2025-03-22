// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// GET /api/reports/low-stock - Get report of low stock items
router.get('/low-stock', reportController.getLowStockReport);

module.exports = router;