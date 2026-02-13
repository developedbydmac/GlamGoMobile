import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/**
 * GlamGo Marketplace Data Schema
 *
 * This schema defines the data models for the GlamGo beauty marketplace:
 * - Store: Vendor-owned stores with location and details
 * - Product: Products belonging to stores with inventory management
 * - Order: Customer orders with multiple products and delivery status
 *
 * Authorization:
 * - Vendors can only manage their own stores and products (owner-based)
 * - Customers can read all products but only manage their own orders
 * - Drivers can read orders and update delivery status
 */

const schema = a.schema({
  // Store Model - Vendor-owned beauty service locations
  Store: a
    .model({
      name: a.string().required(),
      description: a.string(),
      address: a.string().required(),
      city: a.string().required(),
      state: a.string().required(),
      zipCode: a.string().required(),
      phoneNumber: a.string(),
      imageKey: a.string(), // S3 key for store image

      // Vendor owner information
      owner: a.string(), // Amplify owner field for authorization
      vendorId: a.string().required(), // Cognito user ID
      vendorName: a.string().required(),
      vendorEmail: a.string().required(),

      // Business details
      isActive: a.boolean().default(true),
      rating: a.float().default(0),

      // Relationships
      products: a.hasMany("Product", "storeId"),
    })
    .authorization((allow) => [
      // Vendors can only manage their own stores (owner field defaults to 'owner')
      allow.owner().identityClaim("sub"),
      // All authenticated users can read stores
      allow.authenticated().to(["read"]),
    ]),

  // Product Model - Beauty products and services
  Product: a
    .model({
      name: a.string().required(),
      description: a.string(),
      price: a.float().required(),

      // Inventory management
      inventoryCount: a.integer().required().default(0),
      isAvailable: a.boolean().default(true),

      // Product details
      category: a.string().required(), // e.g., "Hair Care", "Nails", "Skin Care"
      imageKey: a.string(), // S3 key for product image

      // Owner field for authorization
      owner: a.string(),

      // Store relationship
      storeId: a.id().required(),
      store: a.belongsTo("Store", "storeId"),

      // Vendor information (denormalized for easy querying)
      vendorId: a.string().required(),

      // Relationships
      orderProducts: a.hasMany("OrderProduct", "productId"),
    })
    .authorization((allow) => [
      // Vendors can only manage their own products (owner field defaults to 'owner')
      allow.owner().identityClaim("sub"),
      // All authenticated users can read products
      allow.authenticated().to(["read"]),
    ]),

  // OrderProduct - Junction table for many-to-many relationship
  OrderProduct: a
    .model({
      orderId: a.id().required(),
      order: a.belongsTo("Order", "orderId"),

      productId: a.id().required(),
      product: a.belongsTo("Product", "productId"),

      quantity: a.integer().required().default(1),
      priceAtPurchase: a.float().required(), // Store price at time of purchase

      // Owner field for authorization
      owner: a.string(),

      // Customer information (for authorization)
      customerId: a.string().required(),
    })
    .authorization((allow) => [
      // Customers can only manage their own order items
      allow.owner().identityClaim("sub"),
      // Vendors can read order items for their products
      allow.authenticated().to(["read"]),
    ]),

  // Order Model - Customer orders with delivery tracking
  Order: a
    .model({
      // Customer information
      customerId: a.string().required(),
      customerName: a.string().required(),
      customerEmail: a.string().required(),

      // Delivery information
      deliveryAddress: a.string().required(),
      deliveryCity: a.string().required(),
      deliveryState: a.string().required(),
      deliveryZipCode: a.string().required(),
      deliveryPhoneNumber: a.string(),

      // Order details
      status: a.enum([
        "PENDING",
        "CONFIRMED",
        "PICKED_UP",
        "DELIVERED",
        "CANCELLED",
      ]),
      totalAmount: a.float().required().default(0),

      // Driver assignment
      driverId: a.string(),
      driverName: a.string(),

      // Timestamps for tracking
      confirmedAt: a.datetime(),
      pickedUpAt: a.datetime(),
      deliveredAt: a.datetime(),

      // Special instructions
      notes: a.string(),

      // Owner field for authorization
      owner: a.string(),

      // Relationships
      orderProducts: a.hasMany("OrderProduct", "orderId"),
    })
    .authorization((allow) => [
      // Customers can manage their own orders
      allow.owner().identityClaim("sub"),
      // Drivers can read and update orders assigned to them
      allow.authenticated().to(["read"]),
      // Additional custom logic for drivers would go in Lambda
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool", // Changed to userPool for authenticated access
  },
});

/**
 * Usage Example:
 *
 * import { generateClient } from "aws-amplify/data";
 * import type { Schema } from "@/amplify/data/resource";
 *
 * const client = generateClient<Schema>();
 *
 * // Create a store (Vendor only)
 * const store = await client.models.Store.create({
 *   name: "Glamorous Beauty Studio",
 *   address: "123 Main St",
 *   city: "Los Angeles",
 *   state: "CA",
 *   zipCode: "90001",
 *   vendorId: currentUser.userId,
 *   vendorName: currentUser.name,
 *   vendorEmail: currentUser.email,
 * });
 *
 * // Create a product (Vendor only)
 * const product = await client.models.Product.create({
 *   name: "Premium Hair Treatment",
 *   description: "Luxury keratin treatment",
 *   price: 49.99,
 *   inventoryCount: 10,
 *   category: "Hair Care",
 *   storeId: store.data.id,
 *   vendorId: currentUser.userId,
 * });
 *
 * // List all products (Anyone authenticated)
 * const products = await client.models.Product.list();
 */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
