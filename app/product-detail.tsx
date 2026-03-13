import {
    BorderRadius,
    Colors,
    Shadows,
    Spacing,
    Typography,
} from "@/constants/DesignSystem";
import useCartStore from "@/contexts/CartContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// DEMO MODE: Mock product details
const mockProductDetails: any = {
  "1": {
    id: "1",
    name: "Premium Hair Styling",
    storeName: "Glam Studio",
    price: 85,
    rating: 4.8,
    reviews: 124,
    category: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
    description:
      "Experience premium hair styling with our expert stylists. Includes consultation, wash, cut, style, and finishing products.",
    duration: "90 minutes",
    address: "123 Beauty Lane, Downtown",
    amenities: ["WiFi", "Parking", "Refreshments", "Music"],
  },
  "2": {
    id: "2",
    name: "Luxury Manicure",
    storeName: "Polished Nails",
    price: 45,
    rating: 4.9,
    reviews: 203,
    category: "Nails",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop",
    description:
      "Pamper your hands with our signature manicure service. Includes nail shaping, cuticle care, massage, and polish application.",
    duration: "45 minutes",
    address: "456 Glamour Street, Midtown",
    amenities: ["WiFi", "Magazines", "Beverages"],
  },
  "3": {
    id: "3",
    name: "Facial Treatment",
    storeName: "Glow Skincare",
    price: 120,
    rating: 4.7,
    reviews: 89,
    category: "Skin Care",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop",
    description:
      "Rejuvenate your skin with our deep cleansing facial. Includes exfoliation, extractions, mask, and moisturizing treatment.",
    duration: "60 minutes",
    address: "789 Wellness Ave, Uptown",
    amenities: ["Relaxation Room", "Aromatherapy", "Organic Products"],
  },
  "4": {
    id: "4",
    name: "Makeup Session",
    storeName: "Glamour Studio",
    price: 95,
    rating: 4.9,
    reviews: 156,
    category: "Makeup",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
    description:
      "Professional makeup application for any occasion. Includes consultation, full face makeup, and touch-up kit.",
    duration: "75 minutes",
    address: "321 Glam Boulevard, Fashion District",
    amenities: ["Ring Light", "Professional Products", "Photos"],
  },
};

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const productId = params.id as string;
  const [isAdding, setIsAdding] = useState(false);

  // Get product details from mock data
  const product = mockProductDetails[productId] || mockProductDetails["1"];

  // Cart functionality
  const { addItem } = useCartStore();

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.image,
        storeName: product.storeName,
        storeId: product.id,
      });

      Alert.alert(
        "✅ Added to Cart",
        `${product.name} has been added to your cart!`,
        [
          { text: "Continue Shopping", onPress: () => router.back() },
          {
            text: "View Cart",
            onPress: () => router.push("/(customer)/cart" as any),
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to add item to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.neutral.darkText}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Store */}
          <View style={styles.titleSection}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.storeRow}>
              <Ionicons
                name="business"
                size={16}
                color={Colors.neutral.mediumGrey}
              />
              <Text style={styles.storeName}>{product.storeName}</Text>
            </View>
          </View>

          {/* Rating and Category */}
          <View style={styles.metaRow}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="#FFB800" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewsText}>
                ({product.reviews} reviews)
              </Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          </View>

          {/* Price and Duration */}
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.durationContainer}>
              <Ionicons
                name="time-outline"
                size={20}
                color={Colors.primary.deepPlum}
              />
              <Text style={styles.duration}>{product.duration}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationRow}>
              <Ionicons
                name="location"
                size={20}
                color={Colors.primary.deepPlum}
              />
              <Text style={styles.address}>{product.address}</Text>
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {product.amenities.map((amenity: string, index: number) => (
                <View key={index} style={styles.amenityChip}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={Colors.primary.deepPlum}
                  />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Demo Notice */}
          <View style={styles.demoNotice}>
            <Ionicons
              name="information-circle"
              size={24}
              color={Colors.primary.deepPlum}
            />
            <Text style={styles.demoText}>
              In the full app, customers can book appointments, add to cart, and
              view availability here.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={isAdding}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[Colors.primary.lightPlum, Colors.primary.deepPlum] as any}
            style={styles.addToCartGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons
              name={isAdding ? "hourglass" : "cart"}
              size={22}
              color="#FFF"
              style={styles.buttonIcon}
            />
            <Text style={styles.addToCartButtonText}>
              {isAdding ? "Adding..." : "Add to Cart"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGrey,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkText,
  },
  placeholder: {
    width: 40,
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: Colors.neutral.lightGrey,
  },
  content: {
    padding: Spacing.xl,
  },
  titleSection: {
    marginBottom: Spacing.lg,
  },
  productName: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.sm,
    lineHeight: Typography.lineHeight.tight,
  },
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  storeName: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkText,
  },
  reviewsText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
  },
  categoryBadge: {
    backgroundColor: "#F3E8FF",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.primary.deepPlum,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.neutral.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginBottom: Spacing.xs,
  },
  price: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.deepPlum,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  duration: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.darkText,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    lineHeight: 24,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  address: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    lineHeight: 22,
  },
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  amenityChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
  },
  amenityText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.darkText,
  },
  demoNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    backgroundColor: "#F3E8FF",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.lg,
  },
  demoText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.primary.deepPlum,
    lineHeight: 20,
  },
  bottomBar: {
    backgroundColor: Colors.neutral.white,
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.lightGrey,
    ...Shadows.medium,
  },
  addToCartButton: {
    overflow: "hidden",
    borderRadius: BorderRadius.lg,
  },
  addToCartGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing["2xl"],
    gap: Spacing.md,
  },
  addToCartButtonText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.neutral.white,
  },
  buttonIcon: {
    marginLeft: Spacing.xs,
  },
});
