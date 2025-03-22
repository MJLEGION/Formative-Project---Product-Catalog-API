// controllers/reportController.js
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

// Get low stock items report
exports.getLowStockReport = (req, res) => {
  try {
    const lowStockItems = Inventory.getLowStockItems();
    
    // Enrich with product details
    const enrichedItems = lowStockItems.map(item => {
      const product = Product.findById(item.productId);
      if (!product) return item;
      
      let variantInfo = {};
      if (item.variantId) {
        const variant = product.variants.find(v => v.id === item.variantId);
        if (variant) {
          variantInfo = {
            variantName: variant.name,
            variantAttributes: variant.attributes
          };
        }
      }
      
      return {
        ...item,
        productName: product.name,
        sku: product.sku,
        ...variantInfo
      };
    });
    
    res.status(200).json({
      success: true,
      count: enrichedItems.length,
      data: enrichedItems
    });
  } catch (error) {
    console.error('Error generating low stock report:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};