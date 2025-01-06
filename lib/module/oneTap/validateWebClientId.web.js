export const validateWebClientId = params => {
  if (process.env.NODE_ENV !== 'production') {
    const {
      webClientId
    } = params;
    if (webClientId && !webClientId.endsWith('.apps.googleusercontent.com')) {
      console.error(`RNGoogleSignIn: You provided an invalid webClientId. It should end with '.apps.googleusercontent.com'. 'autoDetect' is not supported on Web.`);
    }
  }
};
//# sourceMappingURL=validateWebClientId.web.js.map