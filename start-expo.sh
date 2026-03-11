#!/bin/bash

# Suppress the iOS simulator error permanently
export EXPO_NO_METRO_LAZY=1
export CI=1

# Start Expo and filter out the specific simulator error
npx expo start 2>&1 | grep -v "Unable to run simctl" | grep -v "xcrun simctl help exited with non-zero code"
