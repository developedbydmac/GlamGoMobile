/**
 * GlamGo Landing Page - Luxury Welcome Experience
 * 
 * Design: Featuring the actual GlamGo logo with elegant script
 * Colors: Soft purple gradient background matching logo aesthetic
 * Typography: Large, readable, luxury-focused
 * Layout: Clean, spacious, easy to navigate
 */

import { Colors, Typography, Spacing, BorderRadius, Shadows } from "@/constants/DesignSystem";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { getCurrentCognitoUser } from "@/services/cognitoAuth";

const { width, height } = Dimensions.get("window");

export default function LandingPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  useEffect(() => {
    // Check if user is authenticated
    checkAuth();
    
    // Staggered entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getCurrentCognitoUser();
      if (user) {
        setUserRole(user.role);
      }
    } catch (error) {
      setUserRole(null);
    }
  };

  const handleGoToDashboard = () => {
    if (userRole) {
      const roleLower = userRole.toLowerCase();
      if (roleLower === "vendor") {
        router.push("/(vendor)/dashboard" as any);
      } else if (roleLower === "customer") {
        router.push("/(customer)/dashboard" as any);
      } else if (roleLower === "driver") {
        router.push("/(driver)/dashboard" as any);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Soft Purple Gradient Background */}
      <LinearGradient
        colors={['#E8D5E8', '#F5E6F5', '#FFFFFF']}
        style={styles.gradientBackground}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section with Logo */}
          <Animated.View 
            style={[
              styles.heroSection,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            {/* Actual GlamGo Logo Image */}
            <View style={styles.logoWrapper}>
              <Image
                source={require('@/assets/images/glamgo-logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            
            {/* Main Tagline - Matching logo aesthetic */}
            <Text style={styles.mainTagline}>
              Beauty Delivered
            </Text>
            
            {/* Subtitle - Clear & Simple */}
            <Text style={styles.subtitle}>
              Premium beauty products and services,{"\n"}
              delivered directly to your door
            </Text>
          </Animated.View>

          {/* Feature Cards - Elegant & Spacious */}
          <Animated.View 
            style={[
              styles.featuresSection,
              { opacity: fadeAnim }
            ]}
          >
            <FeatureCard
              icon="sparkles"
              title="Curated Selection"
              description="Premium beauty products from top-rated professionals"
            />
            
            <FeatureCard
              icon="flash"
              title="Fast Delivery"
              description="Get your beauty essentials delivered in under an hour"
            />
            
            <FeatureCard
              icon="shield-checkmark"
              title="Quality Guaranteed"
              description="Every vendor is verified, rated, and trusted"
            />
          </Animated.View>

          {/* Call-to-Action Section */}
          <Animated.View 
            style={[
              styles.ctaSection,
              { opacity: fadeAnim }
            ]}
          >
            {/* If authenticated, show dashboard button */}
            {userRole && (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleGoToDashboard}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#C8A870', '#B8985A']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
                  <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            )}

            {/* Primary CTA - Browse Products */}
            <TouchableOpacity
              style={userRole ? styles.secondaryButton : styles.primaryButton}
              onPress={() => router.push("/browse" as any)}
              activeOpacity={0.85}
            >
              {userRole ? (
                <View style={styles.secondaryButtonContent}>
                  <Text style={styles.secondaryButtonText}>Explore Products</Text>
                  <Ionicons name="arrow-forward" size={22} color="#6B4C8A" />
                </View>
              ) : (
                <LinearGradient
                  colors={['#C8A870', '#B8985A']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.primaryButtonText}>Explore Products</Text>
                  <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
                </LinearGradient>
              )}
            </TouchableOpacity>

            {/* Show authentication options if not logged in */}
            {!userRole && (
              <>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => router.push("/(auth)/sign-up" as any)}
                  activeOpacity={0.85}
                >
                  <View style={styles.secondaryButtonContent}>
                    <Text style={styles.secondaryButtonText}>Create Account</Text>
                    <Ionicons name="person-add" size={20} color="#6B4C8A" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-in" as any)}
                  style={styles.signInLink}
                  activeOpacity={0.7}
                >
                  <Text style={styles.signInText}>
                    Already have an account? <Text style={styles.signInTextBold}>Sign In →</Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>

          {/* Bottom Spacer for iPhone notch */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

// Feature Card Component - Clean & Modern
interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIconContainer}>
        <Ionicons name={icon} size={32} color="#6B4C8A" />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : Spacing["2xl"],
  },
  heroSection: {
    alignItems: "center",
    paddingHorizontal: Spacing["2xl"],
    paddingTop: Spacing["3xl"],
    paddingBottom: Spacing["2xl"],
  },
  logoWrapper: {
    marginBottom: Spacing["2xl"],
    alignItems: "center",
    width: '100%',
  },
  logoImage: {
    width: width * 0.8, // 80% of screen width
    height: 200,
    maxWidth: 400,
  },
  mainTagline: {
    fontSize: 32,
    fontWeight: Typography.fontWeight.semibold as any,
    color: '#6B4C8A', // Purple from logo
    textAlign: "center",
    marginBottom: Spacing.lg,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    color: '#5A5A5A',
    textAlign: "center",
    lineHeight: Typography.fontSize.lg * 1.6,
    paddingHorizontal: Spacing.md,
  },
  featuresSection: {
    paddingHorizontal: Spacing["2xl"],
    paddingVertical: Spacing["2xl"],
    gap: Spacing.xl,
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    ...Shadows.light,
    borderWidth: 1,
    borderColor: '#F0E6F5',
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#F5E6F5',
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.lg,
  },
  featureContent: {
    flex: 1,
    justifyContent: "center",
  },
  featureTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold as any,
    color: '#2D2D2D',
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    fontSize: Typography.fontSize.base,
    color: '#6A6A6A',
    lineHeight: Typography.fontSize.base * 1.5,
  },
  ctaSection: {
    paddingHorizontal: Spacing["2xl"],
    paddingVertical: Spacing.xl,
    gap: Spacing.lg,
  },
  primaryButton: {
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    ...Shadows.medium,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg + 2,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  primaryButtonText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold as any,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg + 2,
    paddingHorizontal: Spacing.xl,
    backgroundColor: '#FFFFFF',
    alignItems: "center",
    borderWidth: 2,
    borderColor: '#6B4C8A',
    ...Shadows.subtle,
  },
  secondaryButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  secondaryButtonText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold as any,
    color: '#6B4C8A',
    letterSpacing: 0.3,
  },
  signInLink: {
    paddingVertical: Spacing.lg,
    alignItems: "center",
  },
  signInText: {
    fontSize: Typography.fontSize.lg,
    color: '#5A5A5A',
    textAlign: "center",
  },
  signInTextBold: {
    fontWeight: Typography.fontWeight.bold as any,
    color: '#6B4C8A',
  },
  bottomSpacer: {
    height: Spacing["3xl"],
  },
});
