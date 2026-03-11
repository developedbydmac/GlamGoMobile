import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

interface OrderItem {
  productId: string;
  quantity: number;
}

interface CreateOrderRequest {
  customerId: string;
  customerName: string;
  customerEmail: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZipCode: string;
  deliveryPhoneNumber?: string;
  deliveryLat?: number;
  deliveryLng?: number;
  items: OrderItem[];
  notes?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  inventoryCount: number;
  isAvailable: boolean;
}

/**
 * Calculate delivery fee based on order total
 * 10% of order total, minimum $5
 */
function calculateDeliveryFee(orderTotal: number): number {
  const calculatedFee = orderTotal * 0.1;
  return Math.max(calculatedFee, 5.0);
}

/**
 * Validate product inventory and availability
 */
async function validateInventory(items: OrderItem[]): Promise<{
  valid: boolean;
  products: Product[];
  errors: string[];
}> {
  const errors: string[] = [];
  const products: Product[] = [];

  // In production, this would query DynamoDB via AppSync
  // For now, we'll simulate the validation
  
  // TODO: Replace with actual DynamoDB/AppSync query
  // const response = await fetch(process.env.API_ENDPOINT!, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     query: `query GetProducts($ids: [ID!]!) {
  //       listProducts(filter: { id: { in: $ids } }) {
  //         items { id name price inventoryCount isAvailable }
  //       }
  //     }`,
  //     variables: { ids: items.map(i => i.productId) }
  //   })
  // });

  for (const item of items) {
    // Simulate product lookup
    // In production, this data would come from the query above
    const product: Product = {
      id: item.productId,
      name: `Product ${item.productId}`,
      price: 29.99,
      inventoryCount: 10,
      isAvailable: true,
    };

    // Validate availability
    if (!product.isAvailable) {
      errors.push(`Product ${product.name} is not available`);
      continue;
    }

    // Validate inventory
    if (product.inventoryCount < item.quantity) {
      errors.push(
        `Insufficient inventory for ${product.name}. Available: ${product.inventoryCount}, Requested: ${item.quantity}`
      );
      continue;
    }

    products.push(product);
  }

  return {
    valid: errors.length === 0,
    products,
    errors,
  };
}

/**
 * Create order in DynamoDB
 */
async function createOrderRecord(
  request: CreateOrderRequest,
  products: Product[],
  orderTotal: number,
  deliveryFee: number
): Promise<string> {
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // TODO: Replace with actual DynamoDB/AppSync mutation
  // const response = await fetch(process.env.API_ENDPOINT!, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     query: `mutation CreateOrder($input: CreateOrderInput!) {
  //       createOrder(input: $input) { id }
  //     }`,
  //     variables: {
  //       input: {
  //         customerId: request.customerId,
  //         customerName: request.customerName,
  //         customerEmail: request.customerEmail,
  //         deliveryAddress: request.deliveryAddress,
  //         deliveryCity: request.deliveryCity,
  //         deliveryState: request.deliveryState,
  //         deliveryZipCode: request.deliveryZipCode,
  //         deliveryPhoneNumber: request.deliveryPhoneNumber,
  //         deliveryLat: request.deliveryLat,
  //         deliveryLng: request.deliveryLng,
  //         status: 'PENDING',
  //         totalAmount: orderTotal,
  //         deliveryFee,
  //         notes: request.notes,
  //       }
  //     }
  //   })
  // });

  console.log("✅ Order created:", {
    orderId,
    customerId: request.customerId,
    totalAmount: orderTotal,
    deliveryFee,
    itemCount: request.items.length,
  });

  return orderId;
}

/**
 * Main handler for creating orders
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("📦 Create Order - Request received", {
    path: event.path,
    method: event.httpMethod,
  });

  try {
    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Missing request body",
        }),
      };
    }

    const request: CreateOrderRequest = JSON.parse(event.body);

    // Validate required fields
    if (
      !request.customerId ||
      !request.customerName ||
      !request.customerEmail ||
      !request.deliveryAddress ||
      !request.items ||
      request.items.length === 0
    ) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Missing required fields",
          required: [
            "customerId",
            "customerName",
            "customerEmail",
            "deliveryAddress",
            "items",
          ],
        }),
      };
    }

    // Validate inventory
    const inventoryCheck = await validateInventory(request.items);
    if (!inventoryCheck.valid) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Inventory validation failed",
          details: inventoryCheck.errors,
        }),
      };
    }

    // Calculate order total
    const orderTotal = inventoryCheck.products.reduce((total, product, index) => {
      const quantity = request.items[index].quantity;
      return total + product.price * quantity;
    }, 0);

    // Calculate delivery fee (10% of total, min $5)
    const deliveryFee = calculateDeliveryFee(orderTotal);

    // Create order record
    const orderId = await createOrderRecord(
      request,
      inventoryCheck.products,
      orderTotal,
      deliveryFee
    );

    // Return success response
    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        orderId,
        status: "PENDING",
        totalAmount: orderTotal,
        deliveryFee,
        grandTotal: orderTotal + deliveryFee,
        itemCount: request.items.length,
        message: "Order created successfully",
      }),
    };
  } catch (error) {
    console.error("❌ Error creating order:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
