import {
    BorderRadius,
    Colors,
    Spacing,
    Typography,
} from "@/constants/DesignSystem";
import { getInventory, updateProduct } from "@/services/inventoryService";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  "Hair Care",
  "Nails",
  "Skin Care",
  "Makeup",
  "Wigs & Extensions",
  "Tools & Equipment",
  "Other",
];

export default function EditProductScreen() {
  const params = useLocalSearchParams();
  const productId = params.productId as string;

  const [product, setProduct] = useState<any>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inventoryCount, setInventoryCount] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [category, setCategory] = useState("Hair Care");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const inventory = await getInventory();
      const foundProduct = inventory.find((p: any) => p.id === productId);

      if (foundProduct) {
        setProduct(foundProduct);
        setName(foundProduct.name);
        setPrice(String(foundProduct.price));
        setDescription(foundProduct.description || "");
        setInventoryCount(String(foundProduct.inventoryCount));
        setIsAvailable(foundProduct.isAvailable ?? true);
        setCategory(foundProduct.category);
      } else {
        Alert.alert("Error", "Product not found", [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", "Could not load product", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert("Required Fields", "Product name and price are required");
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert("Invalid Price", "Please enter a valid price");
      return;
    }

    const inventoryNum = parseInt(inventoryCount);
    if (isNaN(inventoryNum) || inventoryNum < 0) {
      Alert.alert("Invalid Inventory", "Please enter a valid inventory count");
      return;
    }

    setSaving(true);
    try {
      await updateProduct({
        ...product,
        name: name.trim(),
        price: priceNum,
        description: description.trim() || undefined,
        inventoryCount: inventoryNum,
        isAvailable,
        category,
      });

      Alert.alert("All set! ✨", "Your changes are live", [
        { text: "Perfect", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "Could not update product. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.deepPlum} />
          <Text style={styles.loadingText}>Loading product...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={Colors.primary.deepPlum}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Product</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.form}>
            <Text style={styles.label}>Product Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor={Colors.neutral.mediumGrey}
            />

            <Text style={styles.label}>Price (USD) *</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              placeholderTextColor={Colors.neutral.mediumGrey}
            />

            <Text style={styles.label}>Category *</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
            >
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

            <Text style={styles.label}>Inventory Count *</Text>
            <TextInput
              style={styles.input}
              value={inventoryCount}
              onChangeText={setInventoryCount}
              keyboardType="number-pad"
              placeholderTextColor={Colors.neutral.mediumGrey}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={Colors.neutral.mediumGrey}
            />

            <View style={styles.switchRow}>
              <View>
                <Text style={styles.label}>Available for Sale</Text>
                <Text style={styles.switchSubtext}>
                  Toggle off to hide from customers
                </Text>
              </View>
              <Switch
                value={isAvailable}
                onValueChange={setIsAvailable}
                trackColor={{
                  true: Colors.primary.deepPlum,
                  false: Colors.neutral.lightGrey,
                }}
                thumbColor="#fff"
              />
            </View>

            <TouchableOpacity
              style={[styles.updateButton, saving && styles.buttonDisabled]}
              onPress={handleUpdate}
              disabled={saving}
            >
              {saving ? (
                <Text style={styles.updateButtonText}>Updating...</Text>
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  <Text style={styles.updateButtonText}>Update Product</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: Typography.fontSize.base,
    color: Colors.neutral.mediumGrey,
  },
  keyboardView: {
    flex: 1,
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
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.primary.deepPlum,
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
    color: Colors.neutral.darkText,
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
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGrey,
    backgroundColor: Colors.neutral.white,
    marginRight: Spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary.deepPlum,
    borderColor: Colors.primary.deepPlum,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.darkText,
  },
  categoryTextActive: {
    color: Colors.neutral.white,
    fontWeight: Typography.fontWeight.semibold as any,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  updateButton: {
    backgroundColor: Colors.primary.deepPlum,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing["2xl"],
    marginBottom: Spacing.xl,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
  updateButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
  },
});
