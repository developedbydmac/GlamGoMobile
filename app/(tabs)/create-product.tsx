import type { Schema } from "@/amplify/data/resource";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const client = generateClient<Schema>();

/**
 * CreateProduct Screen
 *
 * Allows vendors to create new products for their store.
 * This is a test form to verify the Amplify Data schema is working correctly.
 */
export default function CreateProductScreen() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventoryCount, setInventoryCount] = useState("");
  const [category, setCategory] = useState("Hair Care");

  const categories = [
    "Hair Care",
    "Nails",
    "Skin Care",
    "Makeup",
    "Spa Services",
    "Beauty Tools",
    "Other",
  ];

  useEffect(() => {
    loadUserAndStores();
  }, []);

  const loadUserAndStores = async () => {
    try {
      const user = await getCurrentUser();
      setUserInfo({ userId: user.userId, username: user.username });

      // Load user's stores
      const { data: userStores } = await client.models.Store.list({
        filter: {
          owner: { eq: user.userId },
        },
      });

      setStores(userStores || []);
      if (userStores && userStores.length > 0) {
        setSelectedStoreId(userStores[0].id);
      }
    } catch (error) {
      console.error("Error loading user info:", error);
      Alert.alert("Error", "Failed to load user information");
    }
  };

  const handleCreateStore = async () => {
    if (!userInfo) {
      Alert.alert("Error", "User information not loaded");
      return;
    }

    Alert.prompt("Create Store", "Enter store name:", async (storeName) => {
      if (!storeName) return;

      try {
        setLoading(true);
        const { data: newStore } = await client.models.Store.create({
          name: storeName,
          description: "A beautiful beauty store",
          address: "123 Main St",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90001",
          phoneNumber: "(555) 123-4567",
          owner: userInfo.userId,
          vendorId: userInfo.userId,
          vendorName: userInfo.username || "Vendor",
          vendorEmail: userInfo.userId + "@glamgo.com",
        });

        if (newStore) {
          setStores([...stores, newStore]);
          setSelectedStoreId(newStore.id);
          Alert.alert("Success", "Store created successfully!");
        }
      } catch (error: any) {
        console.error("Error creating store:", error);
        Alert.alert("Error", error.message || "Failed to create store");
      } finally {
        setLoading(false);
      }
    });
  };

  const handleCreateProduct = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a product name");
      return;
    }

    if (!price || isNaN(parseFloat(price))) {
      Alert.alert("Error", "Please enter a valid price");
      return;
    }

    if (!inventoryCount || isNaN(parseInt(inventoryCount))) {
      Alert.alert("Error", "Please enter a valid inventory count");
      return;
    }

    if (!selectedStoreId) {
      Alert.alert("Error", "Please select a store or create one first");
      return;
    }

    if (!userInfo) {
      Alert.alert("Error", "User information not loaded");
      return;
    }

    setLoading(true);

    try {
      const { data: newProduct, errors } = await client.models.Product.create({
        name: name.trim(),
        description: description.trim() || undefined,
        price: parseFloat(price),
        inventoryCount: parseInt(inventoryCount),
        isAvailable: true,
        category,
        storeId: selectedStoreId,
        owner: userInfo.userId,
        vendorId: userInfo.userId,
      });

      if (errors) {
        console.error("Product creation errors:", errors);
        Alert.alert("Error", errors[0]?.message || "Failed to create product");
        return;
      }

      if (newProduct) {
        Alert.alert(
          "Success! ✨",
          `Product "${newProduct.name}" created successfully!`,
          [
            {
              text: "Create Another",
              onPress: () => {
                setName("");
                setDescription("");
                setPrice("");
                setInventoryCount("");
              },
            },
            {
              text: "View Products",
              onPress: () => router.push("/(tabs)"),
            },
          ],
        );
      }
    } catch (error: any) {
      console.error("Error creating product:", error);
      Alert.alert("Error", error.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>

              <Text style={styles.title}>Create Product</Text>
              <Text style={styles.subtitle}>
                Add a new product to your store
              </Text>
            </View>

            {/* Store Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Store</Text>
              {stores.length === 0 ? (
                <View style={styles.noStoreContainer}>
                  <Text style={styles.noStoreText}>
                    You need to create a store first
                  </Text>
                  <TouchableOpacity
                    style={styles.createStoreButton}
                    onPress={handleCreateStore}
                    disabled={loading}
                  >
                    <Text style={styles.createStoreButtonText}>
                      Create Store
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.storeList}>
                  {stores.map((store) => (
                    <TouchableOpacity
                      key={store.id}
                      style={[
                        styles.storeCard,
                        selectedStoreId === store.id &&
                          styles.storeCardSelected,
                      ]}
                      onPress={() => setSelectedStoreId(store.id)}
                    >
                      <Text style={styles.storeName}>{store.name}</Text>
                      <Text style={styles.storeAddress}>
                        {store.city}, {store.state}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.addStoreButton}
                    onPress={handleCreateStore}
                  >
                    <Text style={styles.addStoreText}>+ Add Store</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Product Form */}
            <View style={styles.form}>
              {/* Product Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Product Name *</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g., Premium Hair Treatment"
                  editable={!loading}
                />
              </View>

              {/* Description */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Describe your product..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  editable={!loading}
                />
              </View>

              {/* Category */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Category *</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryScroll}
                >
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.categoryChip,
                        category === cat && styles.categoryChipSelected,
                      ]}
                      onPress={() => setCategory(cat)}
                      disabled={loading}
                    >
                      <Text
                        style={[
                          styles.categoryChipText,
                          category === cat && styles.categoryChipTextSelected,
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Price */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Price ($) *</Text>
                <TextInput
                  style={styles.input}
                  value={price}
                  onChangeText={setPrice}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  editable={!loading}
                />
              </View>

              {/* Inventory Count */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Inventory Count *</Text>
                <TextInput
                  style={styles.input}
                  value={inventoryCount}
                  onChangeText={setInventoryCount}
                  placeholder="0"
                  keyboardType="number-pad"
                  editable={!loading}
                />
              </View>

              {/* Create Button */}
              <TouchableOpacity
                style={[
                  styles.createButton,
                  loading && styles.createButtonDisabled,
                ]}
                onPress={handleCreateProduct}
                disabled={loading || !selectedStoreId}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.createButtonText}>CREATE PRODUCT</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F7",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  content: {
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#4A2B7C",
    fontWeight: "600",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#4A2B7C",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 17,
    color: "#6B6B6B",
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  noStoreContainer: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
  },
  noStoreText: {
    fontSize: 15,
    color: "#6B6B6B",
    marginBottom: 16,
    textAlign: "center",
  },
  createStoreButton: {
    backgroundColor: "#4A2B7C",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createStoreButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  storeList: {
    gap: 12,
  },
  storeCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E8E8E8",
  },
  storeCardSelected: {
    borderColor: "#4A2B7C",
    backgroundColor: "#F5F3FF",
  },
  storeName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 14,
    color: "#6B6B6B",
  },
  addStoreButton: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    borderStyle: "dashed",
    alignItems: "center",
  },
  addStoreText: {
    fontSize: 15,
    color: "#4A2B7C",
    fontWeight: "600",
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2C2C2C",
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: "#2C2C2C",
    ...Platform.select({
      ios: {
        shadowColor: "#4A2B7C",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  textArea: {
    height: 100,
    paddingTop: 16,
  },
  categoryScroll: {
    marginTop: 8,
  },
  categoryChip: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
  },
  categoryChipSelected: {
    backgroundColor: "#4A2B7C",
    borderColor: "#4A2B7C",
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C2C2C",
  },
  categoryChipTextSelected: {
    color: "#FFFFFF",
  },
  createButton: {
    backgroundColor: "#4A2B7C",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#4A2B7C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: "0 4px 8px rgba(74, 43, 124, 0.3)",
      },
    }),
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
});
