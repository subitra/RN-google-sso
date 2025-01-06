import { Platform } from 'react-native';
export const warnBadApiUsage = callbacks => {
  if (process.env.NODE_ENV !== 'production') {
    if (callbacks && Platform.OS !== 'web') {
      console.error('RNGoogleSignIn: callback-based implementation is not supported on native platforms, only on web. Use Promise-based implementation.');
    }
  }
};
//# sourceMappingURL=warnBadApiUsage.js.map