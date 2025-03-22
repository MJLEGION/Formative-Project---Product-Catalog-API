// controllers/inventoryController.js
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

// Get all inventory items
exports.getAllInventory = (req, res) => {
  try {
    const inventoryItems = Inventory.findAll();
    
    res.status(200).json({
      success: true,
      count: inventoryItems.length,
      data: inventoryItems
    });
  } catch (error) {
    console.error('Error getting inventory:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Get inventory for a specific product
exports.getProductInventory = (req, res) => {
  try {
    const product = Product.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No product found with id ${req.params.productId}`
      });
    }
    
    const includeVariants = req.query.includeVariants !== 'false';
    const inventoryItems = Inventory.findByProduct(req.params.productId, includeVariants);
    
    if (!inventoryItems || (Array.isArray(inventoryItems) && inventoryItems.length === 0)) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No inventory found for product with id ${req.params.productId}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: Array.isArray(inventoryItems) ? inventoryItems : [inventoryItems]
    });
  } catch (error) {
    console.error('Error getting product inventory:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Get inventory for a specific variant
exports.getVariantInventory = (req, res) => {
  try {
    const product = Product.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No product found with id ${req.params.productId}`
      });
    }
    
    // Check if variant exists
    const variantExists = product.variants.some(v => v.id === req.params.variantId);
    if (!variantExists) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No variant found with id ${req.params.variantId} for product ${req.params.productId}`
      });
    }
    
    const inventoryItem = Inventory.findByVariant(req.params.productId, req.params.variantId);
    
    if (!inventoryItem) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No inventory found for variant with id ${req.params.variantId}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: inventoryItem
    });
  } catch (error) {
    console.error('Error getting variant inventory:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Update inventory for a product or variant
exports.updateInventory = (req, res) => {
  try {
    const productId = req.params.productId;
    const variantId = req.body.variantId || null;
    
    // Check if product exists
    const product = Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `No product found with id ${productId}`
      });
    }
    
    // If variantId is provided, check if variant exists
    if (variantId) {
      const variantExists = product.variants.some(v => v.id === variantId);
      if (!variantExists) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: `No variant found with id ${variantId} for product ${productId}`
        });
      }
    }
    
    // Find or create inventory item
    let inventoryItem = variantId 
      ? Inventory.findByVariant(productId, variantId)
      : Inventory.findByProduct(productId, false);
    
    if (inventoryItem) {
      // Update existing inventory
      inventoryItem = Inventory.update(inventoryItem.id, {
        quantity: req.body.quantity,
        lowStockThreshold: req.body.lowStockThreshold,
        location: req.body.location
      });
    } else {
      // Create new inventory
      inventoryItem = Inventory.create({
        productId,
        variantId,
        quantity: req.body.quantity,
        lowStockThreshold: req.body.lowStockThreshold,
        location: req.body.location
      });
    }
    
    res.status(200).json({
      success: true,
      data: inventoryItem
    });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: error.message
    });
  }
};