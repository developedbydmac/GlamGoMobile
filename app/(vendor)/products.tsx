import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { signOutFromCognito } from '@/services/cognitoAuth';
import { getInventory, getVendorStore } from '@/services/inventoryService';
import ProductCard from '@/components/vendor/ProductCard';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/DesignSystem';
import { Ionicons } from '@expo/vector-icons';

export default function VendorProductsScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasStore, setHasStore] = useState(false);
  const router = useRouter();

  const loadInventory = async () => {
    try {
      // PHASE 2: Use mock data (no AppSync yet)
      // Simulate checking for store - for now, assume vendor has a store
      setHasStore(true);
      
      // Mock products data
      const mockProducts = [
        {
          id: '1',
          name: 'Silk Press & Style',
          price: 65,
          category: 'Hair',
          inventory: 10,
          description: 'Professional silk press with heat protectant',
        },
        {
          id: '2',
          name: 'Full Set Acrylic Nails',
          price: 45,
          category: 'Nails',
          inventory: 8,
          description: 'Custom acrylic nails with your choice of design',
        },
        {
          id: '3',
          name: 'Glam Makeup Application',
          price: 75,
          category: 'Makeup',
          inventory: 5,
          description: 'Full face makeup for any occasion',
        },
      ];
      
      setProducts(mockProducts);
    } catch (error: any) {
      console.error('Error loading inventory:', error);
      Alert.alert('Error', 'Could not load products. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Reload when screen comes into focus (e.g., after adding/editing product)
  useFocusEffect(
    useCallback(() => {
      loadInventory();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadInventory();
  };

  const handleSignOut = async () => {
    try {
      await signOutFromCognito();
      router.replace('/browse' as any);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!hasStore && !loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Products</Text>
          <TouchableOpacity onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color="#E74C3C" />
          </TouchableOpacity>
        </View>

        <View style={styles.noStoreContainer}>
          <Ionicons name="storefront-outline" size={80} color={Colors.neutral.lightGrey} />
          <Text style={styles.noStoreTitle}>No Store Yet</Text>
          <Text style={styles.noStoreText}>
            You need to create a store before adding products.{'\n\n'}
            This is a demo limitation - in production, stores would be created during vendor onboarding.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Products</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={24} color="#E74C3C" />
        </TouchableOpacity>
      </View>

      {/* Add Product Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/add-product' as any)}
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add New Product</Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.deepPlum} />
          <Text style={styles.loadingText}>Loading inventory...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onEdit={() => router.push({
                pathname: '/edit-product' as any,
                params: { productId: item.id }
              })}
            />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="bag-handle-outline" size={64} color={Colors.neutral.lightGrey} />
              <Text style={styles.emptyText}>Ready to start selling?</Text>
              <Text style={styles.emptySubtext}>
                Tap the button above to add your first product.{'\n'}
                It only takes a minute! 💅
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.blushCream,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGrey,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.deepPlum,
  },
  addButtonContainer: {
    padding: Spacing.lg,
  },
  addButton: {
    backgroundColor: Colors.primary.deepPlum,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addButtonText: {
    color: '#fff',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold as any,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.lg,
  },
  emptySubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  noStoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  noStoreTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.deepPlum,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  noStoreText: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
    textAlign: 'center',
    lineHeight: 24,
  },
});
