/**
 * Amplify Configuration for React Native
 * 
 * This file properly configures Amplify with AsyncStorage for token persistence
 */

import { Amplify } from 'aws-amplify';
import amplifyConfig from './amplify_outputs.json';

// Configure Amplify for React Native
// Note: Amplify v6 auto-detects AsyncStorage in React Native environments
Amplify.configure(amplifyConfig);

export default Amplify;
