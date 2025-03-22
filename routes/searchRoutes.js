// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { validateRequest, searchValidationRules } = require('../middleware/validator');

// GET /api/search - Search products
router.get('/', 
  searchValidationRules.search, 
  validateRequest, 
  (req, res) => {
    try {
      const query = req.query.q || '';
      const options = {
        category: req.query.category,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
        sort: req.query.sort,
        limit: req.query.limit ? parseInt(req.query.limit) : undefined,
        page: req.query.page ? parseInt(req.query.page) : undefined
      };
      
      const results = Product.search(query, options);
      
      res.status(200).json({
        success: true,
        count: results.length,
        data: results
      });
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({
        success: false,
        error: 'Server Error',
        message: error.message
      });
    }
  }
);

module.exports = router;