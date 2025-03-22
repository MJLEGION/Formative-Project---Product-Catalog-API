// controllers/categoryController.js
const Category = require('../models/Category');
const Product = require('../models/Product');

// Get all categories
exports.getAllCategories = (req, res) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const categories = Category.findAll(includeInactive);
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Get a single category by ID
exports.getCategoryById = (req, res) => {
  try {
    const category = Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No category found with id ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error getting category:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Create a new category
exports.createCategory = (req, res) => {
  try {
    // If a parentId is provided, verify it exists
    if (req.body.parentId) {
      const parentCategory = Category.findById(req.body.parentId);
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: `Parent category with id ${req.body.parentId} not found`
        });
      }
    }
    
    const newCategory = Category.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newCategory
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: error.message
    });
  }
};

// Update a category
exports.updateCategory = (req, res) => {
  try {
    // If a parentId is provided, verify it exists and isn't itself
    if (req.body.parentId) {
      if (req.body.parentId === req.params.id) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'A category cannot be its own parent'
        });
      }
      
      const parentCategory = Category.findById(req.body.parentId);
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: `Parent category with id ${req.body.parentId} not found`
        });
      }
    }
    
    const updatedCategory = Category.update(req.params.id, req.body);
    
    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No category found with id ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedCategory
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: error.message
    });
  }
};

// Delete a category
exports.deleteCategory = (req, res) => {
  try {
    // Check if category has subcategories
    const hasSubcategories = Category.hasSubcategories(req.params.id);
    if (hasSubcategories) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Cannot delete category with subcategories. Delete or reassign subcategories first.'
      });
    }
    
    const deleted = Category.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No category found with id ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Get all products in a category
exports.getCategoryProducts = (req, res) => {
  try {
    const category = Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No category found with id ${req.params.id}`
      });
    }
    
    const products = Product.findAll({ category: req.params.id });
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error getting category products:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};