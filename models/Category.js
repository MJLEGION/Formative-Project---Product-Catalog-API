// models/Category.js
const { v4: uuidv4 } = require('uuid');

// In-memory storage for categories
let categories = [];

class Category {
  constructor(categoryData) {
    this.id = categoryData.id || uuidv4();
    this.name = categoryData.name;
    this.description = categoryData.description || '';
    this.parentId = categoryData.parentId || null;
    this.imageUrl = categoryData.imageUrl || null;
    this.dateCreated = categoryData.dateCreated || new Date().toISOString();
    this.dateUpdated = categoryData.dateUpdated || new Date().toISOString();
    this.isActive = categoryData.isActive !== undefined ? categoryData.isActive : true;
    this.attributes = categoryData.attributes || {};
  }

  static create(categoryData) {
    const newCategory = new Category(categoryData);
    categories.push(newCategory);
    return newCategory;
  }

  static findAll(includeInactive = false) {
    if (includeInactive) {
      return [...categories];
    }
    return categories.filter(c => c.isActive);
  }

  static findById(id) {
    return categories.find(c => c.id === id);
  }

  static update(id, updateData) {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    // Update only the provided fields
    const updatedCategory = { 
      ...categories[index], 
      ...updateData,
      dateUpdated: new Date().toISOString()
    };
    
    categories[index] = updatedCategory;
    return updatedCategory;
  }

  static delete(id) {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    categories.splice(index, 1);
    return true;
  }
  
  static getSubcategories(parentId) {
    return categories.filter(c => c.parentId === parentId);
  }

  // Check if a category has subcategories
  static hasSubcategories(id) {
    return categories.some(c => c.parentId === id);
  }

  // Get full category path (breadcrumb)
  static getCategoryPath(id) {
    const path = [];
    let currentId = id;
    
    while (currentId) {
      const category = this.findById(currentId);
      if (!category) break;
      
      path.unshift(category);
      currentId = category.parentId;
    }
    
    return path;
  }

  // For testing and development
  static _clearAll() {
    categories = [];
  }
}

module.exports = Category;