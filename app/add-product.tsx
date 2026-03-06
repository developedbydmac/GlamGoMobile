import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { addProduct, getVendorStore } from '@/services/inventoryService';
import { getCurrentCognitoUser } from '@/services/cognitoAuth';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/DesignSystem';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = [
  'Hair Care',
  'Nails',
  'Skin Care',
  'Makeup',
  'Wigs & Extensions',
  'Tools & Equipment',
  'Other',
];

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [inventoryCount, setInventoryCount] = useState('10');
  const [isAvailable, setIsAvailable] = useState(true);
  const [category, setCategory] = useState('Hair Care');
  const [saving, setSaving] = useState(false);
  const [store, setStore] = useState<any>(null);
  const [vendorId, setVendorId] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadStoreAndUser();
  }, []);

  const loadStoreAndUser = async () => {
    try {
      const user = await getCurrentCognitoUser();
      if (!user) {
        Alert.alert('Error', 'Please sign in again');
        router.back();
        return;
      }
      setVendorId(user.userId);

      const vendorStore = await getVendorStore();
      setStore(vendorStore);
    } catch (error: any) {
      if (error.message === 'NO_STORE_FOUND') {
        Alert.alert(
          'No Store Found',
          'You need to create a store before adding products. This is a demo limitation.',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      } else {
        Alert.alert('Error', 'Could not load store information');
      }
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Required Fields', 'Product name and price are required');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price');
      return;
    }

    const inventoryNum = parseInt(inventoryCount);
    if (isNaN(inventoryNum) || inventoryNum < 0) {
      Alert.alert('Invalid Inventory', 'Please enter a valid inventory count');
      return;
    }

    if (!store || !vendorId) {
      Alert.alert('Error', 'Store information not loaded');
      return;
    }

    setSaving(true);
    try {
      await addProduct({
        name: name.trim(),
        price: priceNum,
        description: description.trim() || undefined,
        inventoryCount: inventoryNum,
        isAvailable,
        category,
        storeId: store.id,
        vendorId,
      });
      
      Alert.alert('Nice! 🎉', `${name.trim()} is now live in your store`, [
        { text: 'Sweet!', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      console.error('Add product error:', error);
      Alert.alert('Error', error.message || 'Could not save product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.neutral.darkGrey} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Product</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.form}>
            <Text style={styles.label}>What are you selling? *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Edge Control 4oz, Silk Press, Lace Wig Install..."
              placeholderTextColor={Colors.neutral.mediumGrey}
            />

            <Text style={styles.label}>How much? *</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="12.99"
              keyboardType="decimal-pad"
              placeholderTextColor={Colors.neutral.mediumGrey}
            />

            <Text style={styles.label}>Category *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    category === cat && styles.categoryChipActive,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === cat && styles.categoryTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>How many do you have? *</Text>
            <TextInput
              style={styles.input}
              value={inventoryCount}
              onChangeText={setInventoryCount}
              placeholder="10"
              keyboardType="number-pad"
              placeholderTextColor={Colors.neutral.mediumGrey}
            />

            <Text style={styles.label}>Tell customers about it</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              value={description}
              onChangeText={setDescription}
              placeholder="What makes this special? Any ingredients or techniques they should know about?"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={Colors.neutral.mediumGrey}
            />

            <View style={styles.switchRow}>
              <View>
                <Text style={styles.label}>Ready to sell?</Text>
                <Text style={styles.switchSubtext}>
                  Turn this off if you're not ready for customers to buy yet
                </Text>
              </View>
              <Switch
                value={isAvailable}
                onValueChange={setIsAvailable}
                trackColor={{ true: Colors.primary.royalPurple, false: Colors.neutral.lightGrey }}
                thumbColor="#fff"
              />
            </View>

            <TouchableOpacity
              style={[styles.saveButton, saving && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <Text style={styles.saveButtonText}>Adding to your store...</Text>
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  <Text style={styles.saveButtonText}>Add to My Store</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGrey,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkGrey,
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: Spacing.xl,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.xs,
    marginTop: Spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: Typography.fontSize.base,
    backgroundColor: Colors.neutral.white,
  },
  multiline: {
    height: 100,
  },
  categoryScroll: {
    marginBottom: Spacing.md,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
    backgroundColor: Colors.neutral.white,
    marginRight: Spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary.royalPurple,
    borderColor: Colors.primary.royalPurple,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.darkGrey,
  },
  categoryTextActive: {
    color: Colors.neutral.white,
    fontWeight: Typography.fontWeight.semibold as any,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.lightGrey,
    marginTop: Spacing.lg,
  },
  switchSubtext: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  saveButton: {
    backgroundColor: Colors.primary.royalPurple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing['2xl'],
    marginBottom: Spacing.xl,
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
  buttonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
  },
});
