import { Colors } from "@/constants/DesignSystem";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

/**
 * Browse/Explore Screen - Pre-Authentication
 *
 * Allows users to browse the marketplace before signing up.
 * Shows featured products, categories, and a gentle CTA to join.
 */

// DEMO MODE: Set to true to bypass authentication for demos
const DEMO_MODE = true;

const categories = [
  {
    id: "hair",
    name: "Hair Care",
    icon: "cut",
    iconType: "FontAwesome",
    color: "#E8C78A",
  },
  {
    id: "nails",
    name: "Nails",
    icon: "hand-sparkles",
    iconType: "MaterialCommunityIcons",
    color: "#C9A961",
  },
  {
    id: "skincare",
    name: "Skin Care",
    icon: "spa",
    iconType: "FontAwesome",
    color: "#4A2B7C",
  },
  {
    id: "makeup",
    name: "Makeup",
    icon: "makeup-brush",
    iconType: "MaterialCommunityIcons",
    color: "#E8C78A",
  },
  {
    id: "spa",
    name: "Spa",
    icon: "spa",
    iconType: "MaterialCommunityIcons",
    color: "#C9A961",
  },
  {
    id: "tools",
    name: "Tools",
    icon: "scissors",
    iconType: "MaterialCommunityIcons",
    color: "#4A2B7C",
  },
];

const mockProducts = [
  {
    id: "1",
    name: "Premium Hair Styling",
    price: 85.0,
    category: "Hair Care",
    storeName: "Glam Studio",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Luxury Manicure",
    price: 45.0,
    category: "Nails",
    storeName: "Polished Nails",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Facial Treatment",
    price: 120.0,
    category: "Skin Care",
    storeName: "Glow Skincare",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Makeup Session",
    price: 95.0,
    category: "Makeup",
    storeName: "Glamour Studio",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
  },
];

export default function BrowseScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products based on search and category
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header with Auth CTAs */}
      <View style={styles.header}>
        <Text style={styles.logo}>GlamGo</Text>
        <View style={styles.authButtons}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.push("/(auth)/sign-in")}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => router.push("/(auth)/role-selection")}
          >
            <Text style={styles.joinText}>Join Free</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Discover Beauty{"\n"}Services Near You
          </Text>
          <Text style={styles.heroSubtitle}>
            Browse thousands of beauty professionals and products
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <FontAwesome
              name="search"
              size={18}
              color="#999"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products, services, or salons..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id &&
                    styles.categoryCardSelected,
                ]}
                onPress={() => {
                  // Toggle category selection - click again to deselect
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id,
                  );
                }}
              >
                <View style={styles.categoryIconContainer}>
                  {category.iconType === "FontAwesome" ? (
                    <FontAwesome
                      name={category.icon as any}
                      size={24}
                      color={
                        selectedCategory === category.id ? "#FFFFFF" : "#4A2B7C"
                      }
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={category.icon as any}
                      size={24}
                      color={
                        selectedCategory === category.id ? "#FFFFFF" : "#4A2B7C"
                      }
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.categoryName,
                    selectedCategory === category.id &&
                      styles.categoryNameSelected,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery || selectedCategory
                ? "Search Results"
                : "Featured Products"}
            </Text>
            <Text style={styles.viewAll}>View All →</Text>
          </View>

          {filteredProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No products found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or browse all products
              </Text>
            </View>
          ) : (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product-detail?id=${product.id}`}
                asChild
              >
                <TouchableOpacity
                  style={styles.productCard}
                  activeOpacity={0.7}
                  onPress={() => {
                    console.log(
                      "🎯 Product clicked:",
                      product.id,
                      product.name,
                    );
                  }}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <Text style={styles.storeName} numberOfLines={1}>
                      {product.storeName}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <FontAwesome name="star" size={14} color="#FFB800" />
                      <Text style={styles.ratingText}>{product.rating}</Text>
                    </View>
                    <Text style={styles.productPrice}>
                      ${product.price.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.productArrow}>
                    <FontAwesome
                      name="chevron-right"
                      size={16}
                      color="#9CA3AF"
                    />
                  </View>
                </TouchableOpacity>
              </Link>
            ))
          )}
        </View>

        {/* CTA to Join */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
            <Text style={styles.ctaSubtitle}>
              Join GlamGo to book services, shop products, or grow your beauty
              business
            </Text>

            {/* Role Preview Buttons */}
            <View style={styles.rolePreviewSection}>
              <Text style={styles.rolePreviewTitle}>
                Choose Your Experience:
              </Text>

              <TouchableOpacity
                style={styles.rolePreviewButton}
                onPress={() => router.push("/role-preview-customer")}
              >
                <View style={styles.rolePreviewIcon}>
                  <MaterialCommunityIcons
                    name="account-heart"
                    size={24}
                    color={Colors.primary.royalPurple}
                  />
                </View>
                <View style={styles.rolePreviewText}>
                  <Text style={styles.rolePreviewName}>Customer</Text>
                  <Text style={styles.rolePreviewDesc}>
                    Book & shop services
                  </Text>
                </View>
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  color={Colors.neutral.mediumGrey}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rolePreviewButton}
                onPress={() => router.push("/role-preview-vendor")}
              >
                <View style={styles.rolePreviewIcon}>
                  <MaterialCommunityIcons
                    name="store"
                    size={24}
                    color={Colors.primary.royalPurple}
                  />
                </View>
                <View style={styles.rolePreviewText}>
                  <Text style={styles.rolePreviewName}>Vendor</Text>
                  <Text style={styles.rolePreviewDesc}>Grow your business</Text>
                </View>
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  color={Colors.neutral.mediumGrey}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rolePreviewButton}
                onPress={() => router.push("/role-preview-driver")}
              >
                <View style={styles.rolePreviewIcon}>
                  <MaterialCommunityIcons
                    name="car"
                    size={24}
                    color={Colors.primary.royalPurple}
                  />
                </View>
                <View style={styles.rolePreviewText}>
                  <Text style={styles.rolePreviewName}>Driver</Text>
                  <Text style={styles.rolePreviewDesc}>
                    Earn on your schedule
                  </Text>
                </View>
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  color={Colors.neutral.mediumGrey}
                />
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <TouchableOpacity
              style={styles.ctaSecondary}
              onPress={() => router.push("/(auth)/sign-in")}
            >
              <Text style={styles.ctaSecondaryText}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4A2B7C",
    letterSpacing: -0.5,
  },
  authButtons: {
    flexDirection: "row",
    gap: 12,
  },
  signInButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  signInText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4A2B7C",
  },
  joinButton: {
    backgroundColor: "#4A2B7C",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1A1A1A",
    lineHeight: 42,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 17,
    color: "#666",
    lineHeight: 24,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    ...Platform.select({
      ios: {
        shadowColor: "#4A2B7C",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1A1A1A",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4A2B7C",
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    minWidth: 100,
  },
  categoryCardSelected: {
    backgroundColor: "#4A2B7C",
    borderColor: "#4A2B7C",
  },
  categoryIconContainer: {
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  categoryNameSelected: {
    color: "#FFFFFF",
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#4A2B7C",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  storeName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginLeft: 4,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4A2B7C",
  },
  productArrow: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 12,
  },
  lockBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 32,
  },
  ctaCard: {
    backgroundColor: "#4A2B7C",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#4A2B7C",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  ctaTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 28,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  ctaButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#4A2B7C",
  },
  ctaSecondary: {
    paddingVertical: 12,
  },
  ctaSecondaryText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
  },
  // Role preview styles
  rolePreviewSection: {
    marginBottom: 24,
  },
  rolePreviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.95)",
    marginBottom: 16,
  },
  rolePreviewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  rolePreviewIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rolePreviewText: {
    flex: 1,
  },
  rolePreviewName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 2,
  },
  rolePreviewDesc: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
  },
  // Empty state styles
  emptyState: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
