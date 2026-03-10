import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { createStore } from '@/services/storeService';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/DesignSystem';
import { Ionicons } from '@expo/vector-icons';

export default function CreateStoreScreen() {
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!storeName.trim() || !address.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      Alert.alert('Hold up! 👋', 'We need at least your store name and address to get started');
      return;
    }

    setSaving(true);
    try {
      await createStore({
        name: storeName.trim(),
        description: description.trim() || undefined,
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        zipCode: zipCode.trim(),
        phoneNumber: phoneNumber.trim() || undefined,
      });

      Alert.alert(
        'Welcome to GlamGo! 🎉',
        `${storeName} is now live. Ready to add some products?`,
        [{ text: "Let's go!", onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.error('Create store error:', error);
      Alert.alert('Oops!', 'Something went wrong. Mind trying again?');
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
          <View style={styles.headerContent}>
            <Ionicons name="storefront" size={32} color={Colors.primary.deepPlum} />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Set up your store</Text>
              <Text style={styles.headerSubtitle}>
                This is how customers will find you
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.form}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>The basics</Text>
              
              <Text style={styles.label}>What's your store called? *</Text>
              <TextInput
                style={styles.input}
                value={storeName}
                onChangeText={setStoreName}
                placeholder="e.g. Glam Studio, Luxe Hair Bar..."
                placeholderTextColor={Colors.neutral.mediumGrey}
              />

              <Text style={styles.label}>Tell customers about your vibe</Text>
              <TextInput
                style={[styles.input, styles.multiline]}
                value={description}
                onChangeText={setDescription}
                placeholder="What makes your store special? What should customers expect?"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                placeholderTextColor={Colors.neutral.mediumGrey}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Where are you?</Text>
              
              <Text style={styles.label}>Street address *</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="123 Main Street"
                placeholderTextColor={Colors.neutral.mediumGrey}
              />

              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <Text style={styles.label}>City *</Text>
                  <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={setCity}
                    placeholder="Los Angeles"
                    placeholderTextColor={Colors.neutral.mediumGrey}
                  />
                </View>
                <View style={styles.quarterWidth}>
                  <Text style={styles.label}>State *</Text>
                  <TextInput
                    style={styles.input}
                    value={state}
                    onChangeText={setState}
                    placeholder="CA"
                    maxLength={2}
                    autoCapitalize="characters"
                    placeholderTextColor={Colors.neutral.mediumGrey}
                  />
                </View>
              </View>

              <Text style={styles.label}>ZIP code *</Text>
              <TextInput
                style={styles.input}
                value={zipCode}
                onChangeText={setZipCode}
                placeholder="90001"
                keyboardType="number-pad"
                maxLength={5}
                placeholderTextColor={Colors.neutral.mediumGrey}
              />

              <Text style={styles.label}>Phone (customers can call you)</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="(555) 123-4567"
                keyboardType="phone-pad"
                placeholderTextColor={Colors.neutral.mediumGrey}
              />
            </View>

            <TouchableOpacity
              style={[styles.createButton, saving && styles.buttonDisabled]}
              onPress={handleCreate}
              disabled={saving}
            >
              {saving ? (
                <Text style={styles.createButtonText}>Setting up your store...</Text>
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  <Text style={styles.createButtonText}>Create My Store</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              You can always update these details later in your profile
            </Text>
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
    backgroundColor: '#F3E8FF',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.deepPlum,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.primary.deepPlum,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: Spacing.xl,
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkText,
    marginBottom: Spacing.xs,
    marginTop: Spacing.md,
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
    height: 80,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfWidth: {
    flex: 2,
  },
  quarterWidth: {
    flex: 1,
  },
  createButton: {
    backgroundColor: Colors.primary.deepPlum,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.xl,
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
  createButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
  },
  disclaimer: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    textAlign: 'center',
    marginTop: Spacing.lg,
    lineHeight: 20,
  },
});
