// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { validateRequest, categoryValidationRules } = require('../middleware/validator');

// GET /api/categories - Get all categories
router.get('/', categoryController.getAllCategories);

// GET /api/categories/:id - Get a specific category
router.get('/:id', categoryController.getCategoryById);

// POST /api/categories - Create a new category
router.post('/', 
  categoryValidationRules.create, 
  validateRequest, 
  categoryController.createCategory
);

// PUT /api/categories/:id - Update a category
router.put('/:id', 
  categoryValidationRules.update, 
  validateRequest, 
  categoryController.updateCategory
);

// DELETE /api/categories/:id - Delete a category
router.delete('/:id', categoryController.deleteCategory);

// GET /api/categories/:id/products - Get all products in a category
router.get('/:id/products', categoryController.getCategoryProducts);

module.exports = router;