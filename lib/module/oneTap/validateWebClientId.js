export const validateWebClientId = params => {
  // in Modern sign in, the presence of webClientId is verified later
  if (process.env.NODE_ENV !== 'production') {
    const {
      webClientId
    } = params;
    if (webClientId && webClientId !== 'autoDetect' && !webClientId.endsWith('.apps.googleusercontent.com')) {
      console.error(`RNGoogleSignIn: You provided an invalid webClientId. It should be either 'autoDetect' or it should end with '.apps.googleusercontent.com'.`);
    }
  }
};
//# sourceMappingURL=validateWebClientId.js.map