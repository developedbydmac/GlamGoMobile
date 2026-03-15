import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface GlamGoLogoProps {
  size?: "small" | "medium" | "large";
}

export default function GlamGoLogo({ size = "medium" }: GlamGoLogoProps) {
  const sizeStyles = {
    small: {
      container: 80,
      crownTop: 16,
      crownMiddle: 24,
      titleFont: 24,
      taglineFont: 8,
    },
    medium: {
      container: 120,
      crownTop: 24,
      crownMiddle: 36,
      titleFont: 36,
      taglineFont: 11,
    },
    large: {
      container: 160,
      crownTop: 32,
      crownMiddle: 48,
      titleFont: 48,
      taglineFont: 14,
    },
  }[size];

  return (
    <View style={styles.logoContainer}>
      {/* Crown Icon */}
      <View
        style={[
          styles.crownContainer,
          { width: sizeStyles.container, height: sizeStyles.container },
        ]}
      >
        <View style={styles.crownOuter}>
          {/* Crown Top Curves */}
          <View style={styles.crownTopRow}>
            <View
              style={[
                styles.crownCurve,
                { width: sizeStyles.crownTop, height: sizeStyles.crownTop },
              ]}
            />
            <View
              style={[
                styles.crownCurve,
                { width: sizeStyles.crownTop, height: sizeStyles.crownTop },
              ]}
            />
            <View
              style={[
                styles.crownCurve,
                { width: sizeStyles.crownTop, height: sizeStyles.crownTop },
              ]}
            />
          </View>
          {/* Crown Circle Background */}
          <View
            style={[
              styles.crownCircle,
              { width: sizeStyles.crownMiddle, height: sizeStyles.crownMiddle },
            ]}
          >
            <Text
              style={[
                styles.crownLetter,
                { fontSize: sizeStyles.crownMiddle * 0.6 },
              ]}
            >
              G
            </Text>
          </View>
        </View>
      </View>

      {/* Brand Text */}
      <Text style={[styles.brandTitle, { fontSize: sizeStyles.titleFont }]}>
        GLAMGO
      </Text>
      <Text style={[styles.tagline, { fontSize: sizeStyles.taglineFont }]}>
        FROM ROOTS TO DOORSTEP
      </Text>
      <Text style={[styles.byLine, { fontSize: sizeStyles.taglineFont }]}>
        by TwistItUpWhit
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  crownContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  crownOuter: {
    alignItems: "center",
    justifyContent: "center",
  },
  crownTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: -8,
  },
  crownCurve: {
    backgroundColor: "#C9A961", // GlamGo Gold
    borderRadius: 100,
  },
  crownCircle: {
    backgroundColor: "#4A2B7C", // GlamGo Purple
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#C9A961", // GlamGo Gold
    alignItems: "center",
    justifyContent: "center",
  },
  crownLetter: {
    color: "#C9A961", // GlamGo Gold
    fontWeight: "bold",
    marginTop: 2,
  },
  brandTitle: {
    fontWeight: "bold",
    color: "#4A2B7C", // GlamGo Purple
    letterSpacing: 2,
    marginTop: 8,
  },
  tagline: {
    color: "#C9A961", // GlamGo Gold
    letterSpacing: 1,
    marginTop: 4,
  },
  byLine: {
    color: "#4A2B7C", // GlamGo Purple
    fontStyle: "italic",
    marginTop: 2,
  },
});
