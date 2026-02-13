import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/DesignSystem';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

// Category filter options
const categories = ['All', 'Hair Care', 'Nails', 'Skin Care', 'Makeup', 'Massage', 'Lashes'];

// Mock beauty services with Unsplash images (fallback if no real data)
const mockServices = [
  {
    id: '1',
    name: 'Luxury Hair Styling',
    storeName: 'Elegant Salon & Spa',
    price: 85,
    rating: 4.8,
    category: 'Hair Care',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Premium Manicure',
    storeName: 'Polished Nails Studio',
    price: 45,
    rating: 4.9,
    category: 'Nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Facial Treatment',
    storeName: 'Glow Skincare Bar',
    price: 120,
    rating: 4.7,
    category: 'Skin Care',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Makeup Application',
    storeName: 'Glamour Beauty Studio',
    price: 95,
    rating: 4.9,
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Massage Therapy',
    storeName: 'Serenity Wellness Spa',
    price: 110,
    rating: 4.8,
    category: 'Massage',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'Eyelash Extensions',
    storeName: 'Lash & Brow Boutique',
    price: 150,
    rating: 4.9,
    category: 'Lashes',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop',
  },
];

export default function CustomerShopScreen() {
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchQuery, selectedCategory, services]);

  async function fetchProducts() {
    try {
      setLoading(true);
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
            let storeName = 'Store';
            if (product.storeId) {
              try {
                const storeResult = await client.models.Store.get({ id: product.storeId });
                storeName = storeResult.data?.name || 'Store';
              } catch (error) {
                console.log('Could not fetch store details:', error);
              }
            }

            return {
              id: product.id,
              name: product.name || 'Service',
              storeName: storeName,
              price: product.price || 0,
              rating: 4.8, // Default rating since it's not in Product model
              category: product.category || 'Other',
              image: product.imageKey 
                ? `https://your-s3-bucket.s3.amazonaws.com/${product.imageKey}` 
                : getMockImageForCategory(product.category || 'Other'),
            };
          })
        );
        setServices(transformedServices);
        setUseMockData(false);
      } else {
        // No products in database, use mock data
        console.log('No products found, using mock data');
        setServices(mockServices);
        setUseMockData(true);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data on error
      setServices(mockServices);
      setUseMockData(true);
    } finally {
      setLoading(false);
    }
  }

  function getMockImageForCategory(category: string): string {
    const imageMap: Record<string, string> = {
      'Hair Care': 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
      'Nails': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
      'Skin Care': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
      'Makeup': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
      'Massage': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
      'Lashes': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop',
    };
    return imageMap[category] || 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop';
  }

  function filterServices() {
    let filtered = [...services];

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.storeName.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query)
      );
    }

    setFilteredServices(filtered);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.royalPurple} />
          <Text style={styles.loadingText}>Loading services...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Discover Services</Text>
          <Text style={styles.subtitle}>
            {useMockData ? 'Demo services (add real products in Vendor portal)' : 'Beauty services near you'}
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
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.neutral.mediumGrey} />
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
            {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
          </Text>
        </View>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <View style={styles.servicesGrid}>
            {filteredServices.map((service) => (
              <TouchableOpacity key={service.id} style={styles.serviceCard} activeOpacity={0.7}>
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
                    <Ionicons name="storefront" size={12} color={Colors.neutral.mediumGrey} />
                    <Text style={styles.storeName} numberOfLines={1}>
                      {service.storeName}
                    </Text>
                  </View>
                  <View style={styles.bottomRow}>
                    <Text style={styles.price}>${service.price}</Text>
                    <View style={styles.rating}>
                      <Ionicons name="star" size={12} color={Colors.secondary.champagneGold} />
                      <Text style={styles.ratingText}>{service.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={Colors.neutral.lightGrey} />
            <Text style={styles.emptyTitle}>No services found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.softWhite,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.royalPurple,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: Colors.neutral.darkGrey,
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
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary.royalPurple,
    borderColor: Colors.primary.royalPurple,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  serviceCard: {
    width: '47%',
    backgroundColor: Colors.neutral.white,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  serviceImage: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.neutral.lightGrey,
  },
  serviceInfo: {
    padding: Spacing.md,
  },
  serviceName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.xs,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  storeName: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    flex: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary.royalPurple,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.neutral.darkGrey,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['5xl'],
  },
  loadingText: {
    marginTop: Spacing.lg,
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['5xl'],
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.neutral.darkGrey,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    textAlign: 'center',
  },
});
