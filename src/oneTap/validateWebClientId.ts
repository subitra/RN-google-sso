import type { WebClientId } from '../types';

export const validateWebClientId = (params: {
  webClientId?: WebClientId | undefined;
}): void => {
  // in Modern sign in, the presence of webClientId is verified later
  if (process.env.NODE_ENV !== 'production') {
    const { webClientId } = params;
    if (
      webClientId &&
      webClientId !== 'autoDetect' &&
      !webClientId.endsWith('.apps.googleusercontent.com')
    ) {
      console.error(
        `RNGoogleSignIn: You provided an invalid webClientId. It should be either 'autoDetect' or it should end with '.apps.googleusercontent.com'.`,
      );
    }
  }
};
