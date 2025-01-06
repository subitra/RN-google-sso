"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const codegenNativeComponent_1 = __importDefault(require("react-native/Libraries/Utilities/codegenNativeComponent"));
exports.default = (0, codegenNativeComponent_1.default)('RNGoogleSigninButton', {
    // @ts-expect-error we would like to not generate anything on macos but this doesn't work. Maybe it will later
    excludedPlatforms: ['macos'],
});
