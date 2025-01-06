"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnBadApiUsage = void 0;
var _reactNative = require("react-native");
const warnBadApiUsage = callbacks => {
  if (process.env.NODE_ENV !== 'production') {
    if (callbacks && _reactNative.Platform.OS !== 'web') {
      console.error('RNGoogleSignIn: callback-based implementation is not supported on native platforms, only on web. Use Promise-based implementation.');
    }
  }
};
exports.warnBadApiUsage = warnBadApiUsage;
//# sourceMappingURL=warnBadApiUsage.js.map