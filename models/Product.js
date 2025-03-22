// models/Product.js
const { v4: uuidv4 } = require('uuid');

// In-memory storage for products (would be replaced with a database in production)
let products = [];

class Product {
  constructor(productData) {
    this.id = productData.id || uuidv4();
    this.name = productData.name;
    this.description = productData.description || '';
    this.price = productData.price;
    this.categoryIds = productData.categoryIds || [];
    this.imageUrl = productData.imageUrl || null;
    this.sku = productData.sku || `SKU-${this.id.substring(0, 8).toUpperCase()}`;
    this.dateCreated = productData.dateCreated || new Date().toISOString();
    this.dateUpdated = productData.dateUpdated || new Date().toISOString();
    this.isActive = productData.isActive !== undefined ? productData.isActive : true;
    this.variants = productData.variants || [];
    this.discounts = productData.discounts || [];
    this.attributes = productData.attributes || {};
  }

  static create(productData) {
    const newProduct = new Product(productData);
    products.push(newProduct);
    return newProduct;
  }

  static findAll(filters = {}) {
    let result = [...products];
    
    // Apply filters if provided
    if (filters.category) {
      result = result.filter(p => p.categoryIds.includes(filters.category));
    }
    
    if (filters.minPrice !== undefined) {
      result = result.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filters.maxPrice);
    }
    
    if (filters.isActive !== undefined) {
      result = result.filter(p => p.isActive === filters.isActive);
    }

    // Apply search if provided
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower) ||
        p.sku.toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination if provided
    if (filters.limit !== undefined && filters.page !== undefined) {
      const startIndex = (filters.page - 1) * filters.limit;
      const endIndex = startIndex + filters.limit;
      result = result.slice(startIndex, endIndex);
    }
    
    return result;
  }

  static findById(id) {
    return products.find(p => p.id === id);
  }

  static update(id, updateData) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    // Update only the provided fields
    const updatedProduct = { 
      ...products[index], 
      ...updateData,
      dateUpdated: new Date().toISOString()
    };
    
    products[index] = updatedProduct;
    return updatedProduct;
  }

  static delete(id) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    products.splice(index, 1);
    return true;
  }

  static addVariant(productId, variantData) {
    const product = this.findById(productId);
    if (!product) return null;
    
    const variant = {
      id: variantData.id || uuidv4(),
      name: variantData.name,
      price: variantData.price || product.price,
      sku: variantData.sku || `${product.sku}-VAR-${product.variants.length + 1}`,
      attributes: variantData.attributes || {},
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
      isActive: variantData.isActive !== undefined ? variantData.isActive : true
    };
    
    product.variants.push(variant);
    return variant;
  }

  static getVariants(productId) {
    const product = this.findById(productId);
    return product ? product.variants : null;
  }

  static updateVariant(productId, variantId, updateData) {
    const product = this.findById(productId);
    if (!product) return null;
    
    const variantIndex = product.variants.findIndex(v => v.id === variantId);
    if (variantIndex === -1) return null;
    
    // Update only the provided fields
    const updatedVariant = { 
      ...product.variants[variantIndex], 
      ...updateData,
      dateUpdated: new Date().toISOString()
    };
    
    product.variants[variantIndex] = updatedVariant;
    return updatedVariant;
  }

  static deleteVariant(productId, variantId) {
    const product = this.findById(productId);
    if (!product) return false;
    
    const variantIndex = product.variants.findIndex(v => v.id === variantId);
    if (variantIndex === -1) return false;
    
    product.variants.splice(variantIndex, 1);
    return true;
  }

  static search(query, options = {}) {
    if (!query) return [];
    
    const searchLower = query.toLowerCase();
    let results = products.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.sku.toLowerCase().includes(searchLower) ||
      // Search in attributes
      Object.values(product.attributes).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(searchLower)
      )
    );
    
    // Apply additional filters
    if (options.category) {
      results = results.filter(p => p.categoryIds.includes(options.category));
    }
    
    if (options.minPrice !== undefined) {
      results = results.filter(p => p.price >= options.minPrice);
    }
    
    if (options.maxPrice !== undefined) {
      results = results.filter(p => p.price <= options.maxPrice);
    }
    
    // Apply sorting if provided
    if (options.sort) {
      const [field, direction] = options.sort.split(':');
      const sortMultiplier = direction === 'desc' ? -1 : 1;
      
      results.sort((a, b) => {
        if (field === 'price') {
          return (a.price - b.price) * sortMultiplier;
        } else if (field === 'name') {
          return a.name.localeCompare(b.name) * sortMultiplier;
        } else if (field === 'date') {
          return (new Date(a.dateCreated) - new Date(b.dateCreated)) * sortMultiplier;
        }
        return 0;
      });
    }
    
    return results;
  }

  // For testing and development
  static _clearAll() {
    products = [];
  }
}

module.exports = Product;