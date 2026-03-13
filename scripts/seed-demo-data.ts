/**
 * Seed Demo Data Script
 * Run this to populate the database with test data for the demo
 *
 * Usage:
 * 1. Make sure Amplify sandbox is running: npx ampx sandbox
 * 2. Run this script: npx tsx scripts/seed-demo-data.ts
 */

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import outputs from "../amplify_outputs.json";

// Configure Amplify
Amplify.configure(outputs);

const client = generateClient<Schema>();

async function seedData() {
  console.log("🌱 Starting data seeding...\n");

  try {
    // Step 1: Create a Store
    console.log("📦 Creating store...");
    const storeData = {
      name: "Glam Beauty Boutique",
      description: "Luxury beauty products and premium cosmetics",
      address: "123 Sunset Boulevard",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      phoneNumber: "(310) 555-0123",
      vendorId: "demo-vendor-id", // Replace with actual vendor user ID if available
      vendorName: "Vendor Demo",
      vendorEmail: "vendor@test.com",
      isActive: true,
      rating: 4.8,
    };

    const { data: store, errors: storeErrors } =
      await client.models.Store.create(storeData);

    if (storeErrors) {
      console.error("❌ Error creating store:", storeErrors);
      return;
    }

    console.log("✅ Store created:", store?.name);
    const storeId = store?.id;

    if (!storeId) {
      console.error("❌ Store ID not found");
      return;
    }

    // Step 2: Create Products
    console.log("\n💄 Creating products...");

    const products = [
      {
        name: "Luxury Matte Lipstick",
        description: "Long-lasting premium matte lipstick in Ruby Red",
        price: 35.0,
        category: "Makeup",
        inventoryCount: 50,
        isAvailable: true,
        imageKey:
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
        storeId: storeId,
        vendorId: "demo-vendor-id",
      },
      {
        name: "Anti-Aging Night Serum",
        description: "Advanced retinol serum for overnight skin renewal",
        price: 65.0,
        category: "Skincare",
        inventoryCount: 30,
        isAvailable: true,
        imageKey:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        storeId: storeId,
        vendorId: "demo-vendor-id",
      },
      {
        name: "Volumizing Shampoo",
        description: "Professional salon-quality volumizing shampoo",
        price: 28.0,
        category: "Haircare",
        inventoryCount: 40,
        isAvailable: true,
        imageKey:
          "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop",
        storeId: storeId,
        vendorId: "demo-vendor-id",
      },
      {
        name: "Midnight Musk Perfume",
        description:
          "Elegant evening fragrance with notes of amber and vanilla",
        price: 85.0,
        category: "Fragrance",
        inventoryCount: 25,
        isAvailable: true,
        imageKey:
          "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
        storeId: storeId,
        vendorId: "demo-vendor-id",
      },
      {
        name: "Gold Hoop Earrings",
        description: "Classic 18K gold-plated statement earrings",
        price: 45.0,
        category: "Accessories",
        inventoryCount: 20,
        isAvailable: true,
        imageKey:
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
        storeId: storeId,
        vendorId: "demo-vendor-id",
      },
    ];

    let successCount = 0;
    for (const productData of products) {
      const { data: product, errors: productErrors } =
        await client.models.Product.create(productData);

      if (productErrors) {
        console.error(
          `❌ Error creating product ${productData.name}:`,
          productErrors,
        );
      } else {
        console.log(`✅ Created: ${product?.name} - $${product?.price}`);
        successCount++;
      }
    }

    console.log(
      `\n🎉 Seeding complete! Created ${successCount}/${products.length} products`,
    );
    console.log("\n📝 Next steps:");
    console.log("1. Login as vendor@test.com to see products");
    console.log("2. Login as customer@test.com to browse and shop");
    console.log(
      "3. Run Phase A tasks A1, A4, A5 to enable full customer flow\n",
    );
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

// Run the seeder
seedData()
  .then(() => {
    console.log("✅ Script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
