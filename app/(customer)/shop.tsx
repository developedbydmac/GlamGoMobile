import type { Schema } from "@/amplify/data/resource";
import {
    BorderRadius,
    Colors,
    Spacing,
    Typography,
    Shadows,
} from "@/constants/DesignSystem";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { generateClient } from "aws-amplify/data";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { getCurrentCognitoUser } from "@/services/cognitoAuth";

const { width } = Dimensions.get('window');

const client = generateClient<Schema>();

// DEMO MODE: Set to true to bypass authentication and use mock data
const DEMO_MODE = true;

// Category filter options
const categories = [
  "All",
  "Hair Care",
  "Nails",
  "Skin Care",
  "Makeup",
  "Tools & Accessories",
  "Fragrances",
];

// Mock beauty supply products with Unsplash images (fallback if no real data)
const mockServices = [
  {
    id: "1",
    name: "Professional Hair Dryer 2000W",
    storeName: "Beauty Pro Supply",
    price: 89.99,
    rating: 4.8,
    category: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Gel Nail Polish Set (12 Colors)",
    storeName: "Nail Artistry Supplies",
    price: 34.99,
    rating: 4.9,
    category: "Nails",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Vitamin C Serum 30ml",
    storeName: "Skincare Essentials",
    price: 24.99,
    rating: 4.7,
    category: "Skin Care",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Makeup Brush Set (15 Pieces)",
    storeName: "Glamour Beauty Supply",
    price: 45.99,
    rating: 4.9,
    category: "Makeup",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Massage Oil Collection",
    storeName: "Wellness & Beauty Co",
    price: 28.99,
    rating: 4.8,
    category: "Skin Care",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "False Eyelash Kit with Glue",
    storeName: "Lash Beauty Supply",
    price: 18.99,
    rating: 4.9,
    category: "Makeup",
    image:
      "https://images.unsplash.com/photo-1583001308144-a096c91d9c1c?w=400&h=300&fit=crop",
  },
  {
    id: "7",
    name: "Curling Iron Set (3 Sizes)",
    storeName: "Hair Tools Pro",
    price: 65.99,
    rating: 4.7,
    category: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    name: "Luxury Perfume Gift Set",
    storeName: "Fragrance Boutique",
    price: 120.00,
    rating: 4.9,
    category: "Fragrances",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop",
  },
];

export default function CustomerShopScreen() {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [useMockData, setUseMockData] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchQuery, selectedCategory, services]);

  async function fetchUser() {
    try {
      const currentUser = await getCurrentCognitoUser();
      setUser(currentUser);
    } catch (error) {
      console.log('Could not fetch user:', error);
    }
  }

  async function fetchProducts() {
    try {
      setLoading(true);

      // DEMO MODE: Use mock data immediately
      if (DEMO_MODE) {
        console.log("🎬 DEMO MODE: Using mock services");
        setServices(mockServices);
        setFilteredServices(mockServices);
        setUseMockData(true);
        setLoading(false);
        return;
      }

      const result = await client.models.Product.list({
        filter: {
          isAvailable: {
            eq: true,
          },
        },
      });

      if (result.data && result.data.length > 0) {
        // Transform GraphQL data to match our UI format
        const transformedServices = await Promise.all(
          result.data.map(async (product) => {
            // Fetch store details for each product
            let storeName = "Store";
            if (product.storeId) {
              try {
                const storeResult = await client.models.Store.get({
                  id: product.storeId,
                });
                storeName = storeResult.data?.name || "Store";
              } catch (error) {
                console.log("Could not fetch store details:", error);
              }
            }

            return {
              id: product.id,
              name: product.name || "Service",
              storeName: storeName,
              price: product.price || 0,
              rating: 4.8, // Default rating since it's not in Product model
              category: product.category || "Other",
              image: product.imageKey
                ? `https://your-s3-bucket.s3.amazonaws.com/${product.imageKey}`
                : getMockImageForCategory(product.category || "Other"),
            };
          }),
        );
        setServices(transformedServices);
        setUseMockData(false);
      } else {
        // No products in database, use mock data
        console.log("No products found, using mock data");
        setServices(mockServices);
        setUseMockData(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to mock data on error
      setServices(mockServices);
      setUseMockData(true);
    } finally {
      setLoading(false);
    }
  }

  function getMockImageForCategory(category: string): string {
    const imageMap: Record<string, string> = {
      "Hair Care":
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
      Nails:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
      "Skin Care":
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
      Makeup:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
      Massage:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
      Lashes:
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop",
    };
    return (
      imageMap[category] ||
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop"
    );
  }

  function filterServices() {
    let filtered = [...services];

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory,
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.storeName.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query),
      );
    }

    setFilteredServices(filtered);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.deepPlum} />
          <Text style={styles.loadingText}>Loading services...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Dashboard Section */}
        <View style={styles.dashboardSection}>
          <View style={styles.welcomeHeader}>
            <View>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.userName}>
                {user?.email?.split('@')[0] || 'Customer'} 🛍️
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => router.push('/(customer)/profile' as any)}
            >
              <LinearGradient
                colors={[Colors.primary.lightPlum, Colors.primary.deepPlum]}
                style={styles.profileGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.profileInitial}>
                  {(user?.email?.charAt(0) || 'C').toUpperCase()}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="cart" size={20} color={Colors.primary.deepPlum} />
              </View>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Cart Items</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="receipt" size={20} color={Colors.secondary.softGold} />
              </View>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Active Orders</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="heart" size={20} color="#E94B8B" />
              </View>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Browse Services</Text>
          <Text style={styles.subtitle}>
            {useMockData
              ? "Demo services (add real products in Vendor portal)"
              : "Beauty services near you"}
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.neutral.mediumGrey} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            placeholderTextColor={Colors.neutral.mediumGrey}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={Colors.neutral.mediumGrey}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredServices.length}{" "}
            {filteredServices.length === 1 ? "service" : "services"} found
          </Text>
        </View>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <View style={styles.servicesGrid}>
            {filteredServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                activeOpacity={0.7}
                onPress={() => router.push(`/product-detail?id=${service.id}` as any)}
              >
                <Image
                  source={{ uri: service.image }}
                  style={styles.serviceImage}
                  resizeMode="cover"
                />
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName} numberOfLines={1}>
                    {service.name}
                  </Text>
                  <View style={styles.storeRow}>
                    <Ionicons
                      name="storefront"
                      size={12}
                      color={Colors.neutral.mediumGrey}
                    />
                    <Text style={styles.storeName} numberOfLines={1}>
                      {service.storeName}
                    </Text>
                  </View>
                  <View style={styles.bottomRow}>
                    <Text style={styles.price}>${service.price}</Text>
                    <View style={styles.rating}>
                      <Ionicons
                        name="star"
                        size={12}
                        color={Colors.secondary.champagneGold}
                      />
                      <Text style={styles.ratingText}>{service.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="search-outline"
              size={64}
              color={Colors.neutral.lightGrey}
            />
            <Text style={styles.emptyTitle}>No services found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize["3xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.deepPlum,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.darkText,
    paddingVertical: Spacing.xs,
  },
  categoryContainer: {
    marginBottom: Spacing.md,
  },
  categoryContent: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary.deepPlum,
    borderColor: Colors.primary.deepPlum,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.mediumGrey,
  },
  categoryTextActive: {
    color: Colors.neutral.white,
  },
  resultsHeader: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  resultsText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    fontWeight: Typography.fontWeight.medium,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  serviceCard: {
    width: "47%",
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.md,
    overflow: "hidden",
    marginBottom: Spacing.md,
  },
  serviceImage: {
    width: "100%",
    height: 140,
    backgroundColor: Colors.neutral.lightGrey,
  },
  serviceInfo: {
    padding: Spacing.md,
  },
  serviceName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.xs,
  },
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  storeName: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    flex: 1,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.deepPlum,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.darkText,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing["5xl"],
  },
  loadingText: {
    marginTop: Spacing.lg,
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing["5xl"],
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkText,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    textAlign: "center",
  },
  // Dashboard Section Styles
  dashboardSection: {
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGrey,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  welcomeText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    fontFamily: Typography.fontFamily.body,
  },
  userName: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.darkText,
    fontFamily: Typography.fontFamily.heading,
    marginTop: Spacing.xs,
  },
  profileButton: {
    borderRadius: 25,
    ...Shadows.medium,
  },
  profileGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.white,
    fontFamily: Typography.fontFamily.heading,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
    ...Shadows.subtle,
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.darkText,
    fontFamily: Typography.fontFamily.heading,
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    fontFamily: Typography.fontFamily.body,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});
