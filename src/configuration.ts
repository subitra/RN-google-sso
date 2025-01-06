import type { ConfigureParams } from './types';
import type { OneTapConfigureParams } from './oneTap/types';
import { validateWebClientId } from './oneTap/validateWebClientId';

let currentConfiguration: OneTapConfigureParams | ConfigureParams | undefined;

export const setConfiguration = (
  configuration: OneTapConfigureParams | ConfigureParams,
  requireWebClientId: boolean,
) => {
  if (requireWebClientId && !('webClientId' in configuration)) {
    throwMissingWebClientId();
  }
  validateWebClientId(configuration);
  currentConfiguration = configuration;
};

export const getConfiguration = () => {
  return currentConfiguration;
};

export const unsetConfigurationTestsOnly = () => {
  currentConfiguration = undefined;
};

export function throwMissingConfig(): never {
  const err = new Error(
    'You must call `configure()` before attempting authentication or authorization.',
  );
  Object.assign(err, {
    code: 'configure',
  });
  throw err;
}

export function throwMissingWebClientId(): never {
  const err = new Error(
    '`webClientId` is required for OneTap sign-in. Please provide it in the `configure` method.',
  );
  Object.assign(err, {
    code: 'configure',
  });
  throw err;
}
// TODO `asserts value is not undefined`?
export function throwIfNoConfigSet() {
  if (!currentConfiguration) {
    throwMissingConfig();
  }
}
