import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/DesignSystem';

// Mock beauty services with Unsplash images
const mockServices = [
  {
    id: '1',
    name: 'Luxury Hair Styling',
    storeName: 'Elegant Salon & Spa',
    price: 85,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Premium Manicure',
    storeName: 'Polished Nails Studio',
    price: 45,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Facial Treatment',
    storeName: 'Glow Skincare Bar',
    price: 120,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Makeup Application',
    storeName: 'Glamour Beauty Studio',
    price: 95,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Massage Therapy',
    storeName: 'Serenity Wellness Spa',
    price: 110,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'Eyelash Extensions',
    storeName: 'Lash & Brow Boutique',
    price: 150,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop',
  },
];

export default function CustomerShopScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Discover Services</Text>
          <Text style={styles.subtitle}>Beauty services near you</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.neutral.mediumGrey} />
          <Text style={styles.searchPlaceholder}>Search services...</Text>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          {mockServices.map((service) => (
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
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  searchPlaceholder: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
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
});
