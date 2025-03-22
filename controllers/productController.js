// controllers/productController.js
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

// Get all products with optional filtering
exports.getAllProducts = (req, res) => {
  try {
    // Extract query parameters for filtering
    const filters = {
      category: req.query.category,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      isActive: req.query.isActive === 'true' ? true : 
                req.query.isActive === 'false' ? false : undefined,
      search: req.query.search,
      limit: req.query.limit ? parseInt(req.query.limit) : undefined,
      page: req.query.page ? parseInt(req.query.page) : undefined
    };
    
    const products = Product.findAll(filters);
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Get a single product by ID
exports.getProductById = (req, res) => {
  try {
    const product = Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No product found with id ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Create a new product
exports.createProduct = (req, res) => {
  try {
    const newProduct = Product.create(req.body);
    
    // Create inventory for the product if initialStock is provided
    if (req.body.initialStock !== undefined) {
      Inventory.create({
        productId: newProduct.id,
        quantity: req.body.initialStock,
        lowStockThreshold: req.body.lowStockThreshold
      });
    }
    
    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: error.message
    });
  }
};

// Update a product
exports.updateProduct = (req, res) => {
  try {
    const updatedProduct = Product.update(req.params.id, req.body);
    
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No product found with id ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: error.message
    });
  }
};

// Delete a product
exports.deleteProduct = (req, res) => {
  try {
    const deleted = Product.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No product found with id ${req.params.id}`
      });
    }
    
    // Also delete associated inventory records
    const inventoryItems = Inventory.findByProduct(req.params.id);
    if (Array.isArray(inventoryItems)) {
      inventoryItems.forEach(item => {
        Inventory.delete(item.id);
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Get all variants for a product
exports.getProductVariants = (req, res) => {
  try {
    const variants = Product.getVariants(req.params.id);
    
    if (variants === null) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No product found with id ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      count: variants.length,
      data: variants
    });
  } catch (error) {
    console.error('Error getting variants:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Add a variant to a product
exports.addProductVariant = (req, res) => {
  try {
    const newVariant = Product.addVariant(req.params.id, req.body);
    
    if (!newVariant) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No product found with id ${req.params.id}`
      });
    }
    
    // Create inventory for the variant if initialStock is provided
    if (req.body.initialStock !== undefined) {
      Inventory.create({
        productId: req.params.id,
        variantId: newVariant.id,
        quantity: req.body.initialStock,
        lowStockThreshold: req.body.lowStockThreshold
      });
    }
    
    res.status(201).json({
      success: true,
      data: newVariant
    });
  } catch (error) {
    console.error('Error adding variant:', error);
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: error.message
    });
  }
};