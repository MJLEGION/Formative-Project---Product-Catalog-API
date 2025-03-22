// models/Inventory.js
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');

// In-memory storage for inventory
let inventory = [];

class Inventory {
  constructor(inventoryData) {
    this.id = inventoryData.id || uuidv4();
    this.productId = inventoryData.productId;
    this.variantId = inventoryData.variantId || null;
    this.quantity = inventoryData.quantity || 0;
    this.lowStockThreshold = inventoryData.lowStockThreshold || config.inventory.defaultLowStockThreshold;
    this.reservedQuantity = inventoryData.reservedQuantity || 0;
    this.lastUpdated = inventoryData.lastUpdated || new Date().toISOString();
    this.location = inventoryData.location || 'default';
  }

  static create(inventoryData) {
    // Check if inventory for this product/variant already exists
    const existingIndex = inventory.findIndex(i => 
      i.productId === inventoryData.productId && 
      i.variantId === (inventoryData.variantId || null)
    );

    if (existingIndex !== -1) {
      // Update existing inventory
      return this.update(inventory[existingIndex].id, inventoryData);
    }

    const newInventory = new Inventory(inventoryData);
    inventory.push(newInventory);
    return newInventory;
  }

  static findAll() {
    return [...inventory];
  }

  static findById(id) {
    return inventory.find(i => i.id === id);
  }

  static findByProduct(productId, includeVariants = true) {
    if (includeVariants) {
      return inventory.filter(i => i.productId === productId);
    }
    return inventory.find(i => i.productId === productId && i.variantId === null);
  }

  static findByVariant(productId, variantId) {
    return inventory.find(i => i.productId === productId && i.variantId === variantId);
  }

  static update(id, updateData) {
    const index = inventory.findIndex(i => i.id === id);
    if (index === -1) return null;
    
    // Update only the provided fields
    const updatedInventory = { 
      ...inventory[index], 
      ...updateData,
      lastUpdated: new Date().toISOString()
    };
    
    inventory[index] = updatedInventory;
    return updatedInventory;
  }

  static updateQuantity(productId, variantId, quantityChange) {
    const invItem = inventory.find(i => 
      i.productId === productId && 
      i.variantId === (variantId || null)
    );
    
    if (!invItem) return null;
    
    // Ensure we don't go below zero
    const newQuantity = Math.max(0, invItem.quantity + quantityChange);
    
    return this.update(invItem.id, { quantity: newQuantity });
  }

  static getLowStockItems() {
    return inventory.filter(i => i.quantity <= i.lowStockThreshold);
  }

  static delete(id) {
    const index = inventory.findIndex(i => i.id === id);
    if (index === -1) return false;
    
    inventory.splice(index, 1);
    return true;
  }

  // For testing and development
  static _clearAll() {
    inventory = [];
  }
}

module.exports = Inventory;