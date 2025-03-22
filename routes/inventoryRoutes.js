// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { validateRequest, inventoryValidationRules } = require('../middleware/validator');

// GET /api/inventory - Get all inventory items
router.get('/', inventoryController.getAllInventory);

// GET /api/inventory/:productId - Get inventory for a specific product
router.get('/:productId', inventoryController.getProductInventory);

// GET /api/inventory/:productId/:variantId - Get inventory for a specific variant
router.get('/:productId/:variantId', inventoryController.getVariantInventory);

// PUT /api/inventory/:productId - Update inventory for a product or variant
router.put('/:productId', 
  inventoryValidationRules.update, 
  validateRequest, 
  inventoryController.updateInventory
);

module.exports = router;