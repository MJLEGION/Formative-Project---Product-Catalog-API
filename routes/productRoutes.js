// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateRequest, productValidationRules } = require('../middleware/validator');

// GET /api/products - Get all products
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Get a specific product
router.get('/:id', productController.getProductById);

// POST /api/products - Create a new product
router.post('/', 
  productValidationRules.create, 
  validateRequest, 
  productController.createProduct
);

// PUT /api/products/:id - Update a product
router.put('/:id', 
  productValidationRules.update, 
  validateRequest, 
  productController.updateProduct
);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', productController.deleteProduct);

// GET /api/products/:id/variants - Get all variants for a product
router.get('/:id/variants', productController.getProductVariants);

// POST /api/products/:id/variants - Add a variant to a product
router.post('/:id/variants', 
  productValidationRules.addVariant, 
  validateRequest, 
  productController.addProductVariant
);

module.exports = router;