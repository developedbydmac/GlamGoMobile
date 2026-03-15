module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      // Removed 'react-native-worklets' to fix Babel compatibility issue
      // Not needed for this demo
    ],
  };
};
