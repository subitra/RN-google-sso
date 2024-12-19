"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateWebClientId = void 0;
const validateWebClientId = params => {
  if (process.env.NODE_ENV !== 'production') {
    const {
      webClientId
    } = params;
    if (webClientId && !webClientId.endsWith('.apps.googleusercontent.com')) {
      console.error(`RNGoogleSignIn: You provided an invalid webClientId. It should end with '.apps.googleusercontent.com'. 'autoDetect' is not supported on Web.`);
    }
  }
};
exports.validateWebClientId = validateWebClientId;
//# sourceMappingURL=validateWebClientId.web.js.map