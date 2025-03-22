# Product Catalog API - Usage Examples

This document provides detailed examples of how to use the Product Catalog API endpoints, including example requests and responses.

## Table of Contents
- [Products](#products)
- [Categories](#categories)
- [Inventory](#inventory)
- [Search](#search)
- [Reports](#reports)

## Products

### Get All Products

**Request:**
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "5f8e7d6c-c567-4410-a89c-d5d1c9b05a6e",
      "name": "Wireless Headphones",
      "description": "Premium noise-cancelling wireless headphones",
      "price": 199.99,
      "categoryIds": ["3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a"],
      "imageUrl": "https://example.com/images/headphones.jpg",
      "sku": "SKU-5F8E7D6C",
      "dateCreated": "2025-03-22T06:30:00.000Z",
      "dateUpdated": "2025-03-22T06:30:00.000Z",
      "isActive": true,
      "variants": [],
      "discounts": [],
      "attributes": {
        "brand": "AudioTech",
        "connectivity": "Bluetooth 5.0",
        "batteryLife": "30 hours"
      }
    },
    {
      "id": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
      "name": "Smartphone Case",
      "description": "Protective case for smartphones",
      "price": 24.99,
      "categoryIds": ["7b8c9d0e-1f2g-3h4i-5j6k-7l8m9n0o1p2q"],
      "imageUrl": "https://example.com/images/phone-case.jpg",
      "sku": "SKU-1A2B3C4D",
      "dateCreated": "2025-03-21T08:15:00.000Z",
      "dateUpdated": "2025-03-21T08:15:00.000Z",
      "isActive": true,
      "variants": [
        {
          "id": "2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r",
          "name": "Black",
          "price": 24.99,
          "sku": "SKU-1A2B3C4D-VAR-1",
          "attributes": {
            "color": "Black",
            "material": "Silicone"
          },
          "dateCreated": "2025-03-21T08:15:00.000Z",
          "dateUpdated": "2025-03-21T08:15:00.000Z",
          "isActive": true
        },
        {
          "id": "3d4e5f6g-7h8i-9j0k-1l2m-3n4o5p6q7r8s",
          "name": "Clear",
          "price": 19.99,
          "sku": "SKU-1A2B3C4D-VAR-2",
          "attributes": {
            "color": "Clear",
            "material": "TPU"
          },
          "dateCreated": "2025-03-21T08:15:00.000Z",
          "dateUpdated": "2025-03-21T08:15:00.000Z",
          "isActive": true
        }
      ],
      "discounts": [],
      "attributes": {
        "brand": "CasePro",
        "compatibility": "Universal"
      }
    }
  ]
}
```

### Get Product by ID

**Request:**
```http
GET /api/products/5f8e7d6c-c567-4410-a89c-d5d1c9b05a6e
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "5f8e7d6c-c567-4410-a89c-d5d1c9b05a6e",
    "name": "Wireless Headphones",
    "description": "Premium noise-cancelling wireless headphones",
    "price": 199.99,
    "categoryIds": ["3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a"],
    "imageUrl": "https://example.com/images/headphones.jpg",
    "sku": "SKU-5F8E7D6C",
    "dateCreated": "2025-03-22T06:30:00.000Z",
    "dateUpdated": "2025-03-22T06:30:00.000Z",
    "isActive": true,
    "variants": [],
    "discounts": [],
    "attributes": {
      "brand": "AudioTech",
      "connectivity": "Bluetooth 5.0",
      "batteryLife": "30 hours"
    }
  }
}
```

### Create a Product

**Request:**
```http
POST /api/products
Content-Type: application/json

{
  "name": "Wireless Keyboard",
  "description": "Ergonomic wireless keyboard with backlight",
  "price": 79.99,
  "categoryIds": ["3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a"],
  "initialStock": 50,
  "lowStockThreshold": 10,
  "attributes": {
    "brand": "TechPro",
    "connectivity": "Bluetooth 5.0",
    "batteryLife": "2 months"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "6a7b8c9d-0e1f-2g3h-4i5j-6k7l8m9n0o1p",
    "name": "Wireless Keyboard",
    "description": "Ergonomic wireless keyboard with backlight",
    "price": 79.99,
    "categoryIds": ["3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a"],
    "imageUrl": null,
    "sku": "SKU-6A7B8C9D",
    "dateCreated": "2025-03-22T09:45:00.000Z",
    "dateUpdated": "2025-03-22T09:45:00.000Z",
    "isActive": true,
    "variants": [],
    "discounts": [],
    "attributes": {
      "brand": "TechPro",
      "connectivity": "Bluetooth 5.0",
      "batteryLife": "2 months"
    }
  }
}
```

### Update a Product

**Request:**
```http
PUT /api/products/6a7b8c9d-0e1f-2g3h-4i5j-6k7l8m9n0o1p
Content-Type: application/json

{
  "price": 69.99,
  "description": "Ergonomic wireless keyboard with RGB backlight"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "6a7b8c9d-0e1f-2g3h-4i5j-6k7l8m9n0o1p",
    "name": "Wireless Keyboard",
    "description": "Ergonomic wireless keyboard with RGB backlight",
    "price": 69.99,
    "categoryIds": ["3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a"],
    "imageUrl": null,
    "sku": "SKU-6A7B8C9D",
    "dateCreated": "2025-03-22T09:45:00.000Z",
    "dateUpdated": "2025-03-22T10:15:00.000Z",
    "isActive": true,
    "variants": [],
    "discounts": [],
    "attributes": {
      "brand": "TechPro",
      "connectivity": "Bluetooth 5.0",
      "batteryLife": "2 months"
    }
  }
}
```

### Delete a Product

**Request:**
```http
DELETE /api/products/6a7b8c9d-0e1f-2g3h-4i5j-6k7l8m9n0o1p
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### Add a Product Variant

**Request:**
```http
POST /api/products/5f8e7d6c-c567-4410-a89c-d5d1c9b05a6e/variants
Content-Type: application/json

{
  "name": "Limited Edition",
  "price": 249.99,
  "initialStock": 20,
  "attributes": {
    "color": "Gold",
    "special": "Limited Edition",
    "extras": "Carrying case included"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "8e9f0a1b-2c3d-4e5f-6g7h-8i9j0k1l2m3n",
    "name": "Limited Edition",
    "price": 249.99,
    "sku": "SKU-5F8E7D6C-VAR-1",
    "attributes": {
      "color": "Gold",
      "special": "Limited Edition",
      "extras": "Carrying case included"
    },
    "dateCreated": "2025-03-22T11:00:00.000Z",
    "dateUpdated": "2025-03-22T11:00:00.000Z",
    "isActive": true
  }
}
```

## Categories

### Get All Categories

**Request:**
```http
GET /api/categories
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a",
      "name": "Electronics",
      "description": "Electronic devices and accessories",
      "parentId": null,
      "imageUrl": null,
      "dateCreated": "2025-03-20T12:00:00.000Z",
      "dateUpdated": "2025-03-20T12:00:00.000Z",
      "isActive": true,
      "attributes": {}
    },
    {
      "id": "7b8c9d0e-1f2g-3h4i-5j6k-7l8m9n0o1p2q",
      "name": "Phone Accessories",
      "description": "Accessories for smartphones and tablets",
      "parentId": "3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a",
      "imageUrl": null,
      "dateCreated": "2025-03-20T12:15:00.000Z",
      "dateUpdated": "2025-03-20T12:15:00.000Z",
      "isActive": true,
      "attributes": {}
    }
  ]
}
```

### Create a Category

**Request:**
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Audio",
  "description": "Audio equipment and accessories",
  "parentId": "3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "9d0e1f2g-3h4i-5j6k-7l8m-9n0o1p2q3r4s",
    "name": "Audio",
    "description": "Audio equipment and accessories",
    "parentId": "3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a",
    "imageUrl": null,
    "dateCreated": "2025-03-22T12:30:00.000Z",
    "dateUpdated": "2025-03-22T12:30:00.000Z",
    "isActive": true,
    "attributes": {}
  }
}
```

## Inventory

### Get All Inventory Items

**Request:**
```http
GET /api/inventory
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "1d2e3f4g-5h6i-7j8k-9l0m-1n2o3p4q5r6s",
      "productId": "5f8e7d6c-c567-4410-a89c-d5d1c9b05a6e",
      "variantId": null,
      "quantity": 45,
      "lowStockThreshold": 10,
      "reservedQuantity": 0,
      "lastUpdated": "2025-03-22T06:30:00.000Z",
      "location": "default"
    },
    {
      "id": "2e3f4g5h-6i7j-8k9l-0m1n-2o3p4q5r6s7t",
      "productId": "5f8e7d6c-c567-4410-a89c-d5d1c9b05a6e",
      "variantId": "8e9f0a1b-2c3d-4e5f-6g7h-8i9j0k1l2m3n",
      "quantity": 20,
      "lowStockThreshold": 5,
      "reservedQuantity": 0,
      "lastUpdated": "2025-03-22T11:00:00.000Z",
      "location": "default"
    },
    {
      "id": "3f4g5h6i-7j8k-9l0m-1n2o-3p4q5r6s7t8u",
      "productId": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
      "variantId": null,
      "quantity": 120,
      "lowStockThreshold": 20,
      "reservedQuantity": 0,
      "lastUpdated": "2025-03-21T08:15:00.000Z",
      "location": "default"
    }
  ]
}
```

### Update Inventory for a Product

**Request:**
```http
PUT /api/inventory/5f8e7d6c-c567-4410-a89c-d5d1c9b05a6e
Content-Type: application/json

{
  "quantity": 40,
  "lowStockThreshold": 15
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1d2e3f4g-5h6i-7j8k-9l0m-1n2o3p4q5r6s",
    "productId": "5f8e7d6c-c567-4410-a89c-d5d1c9b05a6e",
    "variantId": null,
    "quantity": 40,
    "lowStockThreshold": 15,
    "reservedQuantity": 0,
    "lastUpdated": "2025-03-22T13:45:00.000Z",
    "location": "default"
  }
}
```

## Search

### Search Products

**Request:**
```http
GET /api/search?q=wireless&minPrice=50&maxPrice=300
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "5f8e7d6c-c567-4410-a89c-d5d1c9b05a6e",
      "name": "Wireless Headphones",
      "description": "Premium noise-cancelling wireless headphones",
      "price": 199.99,
      "categoryIds": ["3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a"],
      "imageUrl": "https://example.com/images/headphones.jpg",
      "sku": "SKU-5F8E7D6C",
      "dateCreated": "2025-03-22T06:30:00.000Z",
      "dateUpdated": "2025-03-22T06:30:00.000Z",
      "isActive": true,
      "variants": [],
      "discounts": [],
      "attributes": {
        "brand": "AudioTech",
        "connectivity": "Bluetooth 5.0",
        "batteryLife": "30 hours"
      }
    },
    {
      "id": "6a7b8c9d-0e1f-2g3h-4i5j-6k7l8m9n0o1p",
      "name": "Wireless Keyboard",
      "description": "Ergonomic wireless keyboard with RGB backlight",
      "price": 69.99,
      "categoryIds": ["3a9f8e5d-6b7c-5d4e-3f2a-1b0c9d8e7f6a"],
      "imageUrl": null,
      "sku": "SKU-6A7B8C9D",
      "dateCreated": "2025-03-22T09:45:00.000Z",
      "dateUpdated": "2025-03-22T10:15:00.000Z",
      "isActive": true,
      "variants": [],
      "discounts": [],
      "attributes": {
        "brand": "TechPro",
        "connectivity": "Bluetooth 5.0",
        "batteryLife": "2 months"
      }
    }
  ]
}
```

## Reports

### Get Low Stock Report

**Request:**
```http
GET /api/reports/low-stock
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "2e3f4g5h-6i7j-8k9l-0m1n-2o3p4q5r6s7t",
      "productId": "5f8e7d6c-c567-4410-a89c-d5d1c9b05a6e",
      "variantId": "8e9f0a1b-2c3d-4e5f-6g7h-8i9j0k1l2m3n",
      "quantity": 4,
      "lowStockThreshold": 5,
      "reservedQuantity": 0,
      "lastUpdated": "2025-03-22T11:00:00.000Z",
      "location": "default",
      "productName": "Wireless Headphones",
      "sku": "SKU-5F8E7D6C",
      "variantName": "Limited Edition",
      "variantAttributes": {
        "color": "Gold",
        "special": "Limited Edition",
        "extras": "Carrying case included"
      }
    }
  ]
}
```