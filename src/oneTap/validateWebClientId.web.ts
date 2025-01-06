import type { WebClientId } from '../types';

export const validateWebClientId = (params: {
  webClientId?: WebClientId;
}): void => {
  if (process.env.NODE_ENV !== 'production') {
    const { webClientId } = params;
    if (webClientId && !webClientId.endsWith('.apps.googleusercontent.com')) {
      console.error(
        `RNGoogleSignIn: You provided an invalid webClientId. It should end with '.apps.googleusercontent.com'. 'autoDetect' is not supported on Web.`,
      );
    }
  }
};
