// middleware/validator.js
const { body, param, query, validationResult } = require('express-validator');

/**
 * Processes validation results and sends error response if validation fails
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Invalid input data',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * Validation rules for product-related requests
 */
const productValidationRules = {
  create: [
    body('name')
      .trim()
      .notEmpty().withMessage('Product name is required')
      .isLength({ min: 2, max: 100 }).withMessage('Product name must be between 2 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('categoryIds')
      .optional()
      .isArray().withMessage('Category IDs must be an array'),
    body('initialStock')
      .optional()
      .isInt({ min: 0 }).withMessage('Initial stock must be a non-negative integer'),
    body('lowStockThreshold')
      .optional()
      .isInt({ min: 1 }).withMessage('Low stock threshold must be at least 1')
  ],
  update: [
    param('id')
      .notEmpty().withMessage('Product ID is required'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 }).withMessage('Product name must be between 2 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('price')
      .optional()
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('categoryIds')
      .optional()
      .isArray().withMessage('Category IDs must be an array'),
    body('isActive')
      .optional()
      .isBoolean().withMessage('isActive must be a boolean')
  ],
  addVariant: [
    param('id')
      .notEmpty().withMessage('Product ID is required'),
    body('name')
      .notEmpty().withMessage('Variant name is required')
      .trim()
      .isLength({ min: 2, max: 100 }).withMessage('Variant name must be between 2 and 100 characters'),
    body('attributes')
      .notEmpty().withMessage('Variant attributes are required')
      .isObject().withMessage('Attributes must be an object'),
    body('price')
      .optional()
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('initialStock')
      .optional()
      .isInt({ min: 0 }).withMessage('Initial stock must be a non-negative integer')
  ]
};

/**
 * Validation rules for category-related requests
 */
const categoryValidationRules = {
  create: [
    body('name')
      .trim()
      .notEmpty().withMessage('Category name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Category name must be between 2 and 50 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    body('parentId')
      .optional()
  ],
  update: [
    param('id')
      .notEmpty().withMessage('Category ID is required'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 }).withMessage('Category name must be between 2 and 50 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    body('parentId')
      .optional(),
    body('isActive')
      .optional()
      .isBoolean().withMessage('isActive must be a boolean')
  ]
};

/**
 * Validation rules for inventory-related requests
 */
const inventoryValidationRules = {
  update: [
    param('productId')
      .notEmpty().withMessage('Product ID is required'),
    body('quantity')
      .notEmpty().withMessage('Quantity is required')
      .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    body('variantId')
      .optional(),
    body('lowStockThreshold')
      .optional()
      .isInt({ min: 1 }).withMessage('Low stock threshold must be at least 1')
  ]
};

/**
 * Validation rules for search-related requests
 */
const searchValidationRules = {
  search: [
    query('q')
      .optional()
      .trim(),
    query('category')
      .optional(),
    query('minPrice')
      .optional()
      .isFloat({ min: 0 }).withMessage('Minimum price must be a positive number'),
    query('maxPrice')
      .optional()
      .isFloat({ min: 0 }).withMessage('Maximum price must be a positive number'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('page')
      .optional()
      .isInt({ min: 1 }).withMessage('Page must be at least 1')
  ]
};

module.exports = {
  validateRequest,
  productValidationRules,
  categoryValidationRules,
  inventoryValidationRules,
  searchValidationRules
};