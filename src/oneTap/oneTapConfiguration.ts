import type {
  OneTapConfigureParams,
  OneTapSignInParams,
  WebOneTapSignInCallbacks,
} from './types';
import { validateWebClientId } from './validateWebClientId';
import { warnBadApiUsage } from './warnBadApiUsage';
import {
  getConfiguration,
  throwMissingConfig,
  throwMissingWebClientId,
} from '../configuration';

export const createdValidatedOneTapConfig = (
  extendWith: OneTapSignInParams | undefined,
  callbacks?: WebOneTapSignInCallbacks,
): OneTapConfigureParams => {
  warnBadApiUsage(callbacks);
  const configuration = getConfiguration();
  if (!configuration) {
    throwMissingConfig();
  }
  validateWebClientId(configuration);
  const webClientId = configuration?.webClientId;
  if (!webClientId) {
    throwMissingWebClientId();
  }
  if (process.env.NODE_ENV !== 'production') {
    if ('androidClientId' in configuration) {
      console.error(
        'RNGoogleSignIn: `androidClientId` is not a valid configuration parameter, please remove it.',
      );
    }
  }
  return {
    ...configuration,
    ...extendWith,
    webClientId,
  };
};

export function validateOneTapConfig(callbacks?: WebOneTapSignInCallbacks) {
  // even if native module would reject, we can already reject here
  // this makes the test behavior more in line with reality
  // and provides unified error messages across platforms
  createdValidatedOneTapConfig(undefined, callbacks);
}
