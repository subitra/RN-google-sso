"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warnBadApiUsage = void 0;
const react_native_1 = require("react-native");
const warnBadApiUsage = (callbacks) => {
    if (process.env.NODE_ENV !== 'production') {
        if (callbacks && react_native_1.Platform.OS !== 'web') {
            console.error('RNGoogleSignIn: callback-based implementation is not supported on native platforms, only on web. Use Promise-based implementation.');
        }
    }
};
exports.warnBadApiUsage = warnBadApiUsage;
