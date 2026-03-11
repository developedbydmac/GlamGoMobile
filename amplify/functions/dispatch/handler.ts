import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

interface Driver {
  driverId: string;
  name: string;
  email: string;
  phoneNumber?: string;
  currentLat: number;
  currentLng: number;
  status: "AVAILABLE" | "BUSY" | "OFFLINE";
  rating: number;
  totalDeliveries: number;
  vehicleType?: string;
  distance?: number; // Distance in miles (calculated)
}

/**
 * Calculate Haversine distance between two lat/lng coordinates
 * Returns distance in miles
 */
function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate geohash for a given lat/lng (simplified 6-character implementation)
 * In production, use a proper geohash library like 'ngeohash'
 */
function calculateGeohash(lat: number, lng: number, precision: number = 6): string {
  // This is a simplified geohash implementation
  // For production, use: npm install ngeohash
  const latRange = [-90, 90];
  const lngRange = [-180, 180];
  let hash = "";
  const base32 = "0123456789bcdefghjkmnpqrstuvwxyz";

  let isEven = true;
  let bit = 0;
  let ch = 0;

  while (hash.length < precision) {
    let mid;
    if (isEven) {
      mid = (lngRange[0] + lngRange[1]) / 2;
      if (lng > mid) {
        ch |= (1 << (4 - bit));
        lngRange[0] = mid;
      } else {
        lngRange[1] = mid;
      }
    } else {
      mid = (latRange[0] + latRange[1]) / 2;
      if (lat > mid) {
        ch |= (1 << (4 - bit));
        latRange[0] = mid;
      } else {
        latRange[1] = mid;
      }
    }

    isEven = !isEven;

    if (bit < 4) {
      bit++;
    } else {
      hash += base32[ch];
      bit = 0;
      ch = 0;
    }
  }

  return hash;
}

/**
 * Query available drivers from DynamoDB
 * In production, this would use GSI: status-geohash-index
 */
async function queryAvailableDrivers(): Promise<Driver[]> {
  // TODO: Replace with actual DynamoDB/AppSync query using GSI
  // const response = await fetch(process.env.API_ENDPOINT!, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     query: `query ListDriversByStatus($status: DriverStatus!) {
  //       listDriversByStatus(status: $status) {
  //         items {
  //           driverId
  //           name
  //           email
  //           phoneNumber
  //           currentLat
  //           currentLng
  //           status
  //           rating
  //           totalDeliveries
  //           vehicleType
  //         }
  //       }
  //     }`,
  //     variables: { status: 'AVAILABLE' }
  //   })
  // });

  // Mock data for testing
  const mockDrivers: Driver[] = [
    {
      driverId: "driver1",
      name: "John Driver",
      email: "john@example.com",
      phoneNumber: "555-0101",
      currentLat: 34.0522,
      currentLng: -118.2437,
      status: "AVAILABLE",
      rating: 4.8,
      totalDeliveries: 150,
      vehicleType: "Car",
    },
    {
      driverId: "driver2",
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "555-0102",
      currentLat: 34.0622,
      currentLng: -118.2537,
      status: "AVAILABLE",
      rating: 4.9,
      totalDeliveries: 200,
      vehicleType: "Car",
    },
    {
      driverId: "driver3",
      name: "Mike Johnson",
      email: "mike@example.com",
      phoneNumber: "555-0103",
      currentLat: 34.0422,
      currentLng: -118.2337,
      status: "AVAILABLE",
      rating: 4.7,
      totalDeliveries: 120,
      vehicleType: "Motorcycle",
    },
  ];

  return mockDrivers;
}

/**
 * Main handler for finding nearby drivers
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("🚗 Find Nearby Drivers - Request received", {
    path: event.path,
    method: event.httpMethod,
    queryParams: event.queryStringParameters,
  });

  try {
    // Get lat/lng from query parameters
    const lat = event.queryStringParameters?.lat;
    const lng = event.queryStringParameters?.lng;
    const maxDistance = event.queryStringParameters?.maxDistance || "10"; // Default 10 miles

    if (!lat || !lng) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Missing required query parameters",
          required: ["lat", "lng"],
          example: "/dispatch/find-nearby-drivers?lat=34.0522&lng=-118.2437",
        }),
      };
    }

    const deliveryLat = parseFloat(lat);
    const deliveryLng = parseFloat(lng);
    const maxDistanceMiles = parseFloat(maxDistance);

    // Validate coordinates
    if (
      isNaN(deliveryLat) ||
      isNaN(deliveryLng) ||
      deliveryLat < -90 ||
      deliveryLat > 90 ||
      deliveryLng < -180 ||
      deliveryLng > 180
    ) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Invalid coordinates",
          message: "Latitude must be between -90 and 90, longitude between -180 and 180",
        }),
      };
    }

    // Calculate geohash for the delivery location (for logging/debugging)
    const deliveryGeohash = calculateGeohash(deliveryLat, deliveryLng);
    console.log("📍 Delivery location geohash:", deliveryGeohash);

    // Query available drivers
    const availableDrivers = await queryAvailableDrivers();
    console.log(`✅ Found ${availableDrivers.length} available drivers`);

    // Calculate distance for each driver
    const driversWithDistance = availableDrivers.map((driver) => ({
      ...driver,
      distance: calculateHaversineDistance(
        deliveryLat,
        deliveryLng,
        driver.currentLat,
        driver.currentLng
      ),
    }));

    // Filter drivers within max distance (default 10 miles)
    const nearbyDrivers = driversWithDistance.filter(
      (driver) => driver.distance! <= maxDistanceMiles
    );

    // Sort by distance (ascending)
    const sortedDrivers = nearbyDrivers.sort((a, b) => a.distance! - b.distance!);

    // Return top 10 drivers
    const top10Drivers = sortedDrivers.slice(0, 10);

    console.log(`✅ Found ${top10Drivers.length} drivers within ${maxDistanceMiles} miles`);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        deliveryLocation: {
          lat: deliveryLat,
          lng: deliveryLng,
          geohash: deliveryGeohash,
        },
        searchRadius: maxDistanceMiles,
        totalAvailableDrivers: availableDrivers.length,
        nearbyDriversCount: top10Drivers.length,
        drivers: top10Drivers.map((driver) => ({
          driverId: driver.driverId,
          name: driver.name,
          phoneNumber: driver.phoneNumber,
          distance: Math.round(driver.distance! * 100) / 100, // Round to 2 decimals
          rating: driver.rating,
          totalDeliveries: driver.totalDeliveries,
          vehicleType: driver.vehicleType,
          currentLocation: {
            lat: driver.currentLat,
            lng: driver.currentLng,
          },
        })),
      }),
    };
  } catch (error) {
    console.error("❌ Error finding nearby drivers:", error);

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
