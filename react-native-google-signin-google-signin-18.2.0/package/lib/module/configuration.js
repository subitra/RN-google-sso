import { validateWebClientId } from './oneTap/validateWebClientId';
let currentConfiguration;
export const setConfiguration = (configuration, requireWebClientId) => {
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
export function throwMissingConfig() {
  const err = new Error('You must call `configure()` before attempting authentication or authorization.');
  Object.assign(err, {
    code: 'configure'
  });
  throw err;
}
export function throwMissingWebClientId() {
  const err = new Error('`webClientId` is required for OneTap sign-in. Please provide it in the `configure` method.');
  Object.assign(err, {
    code: 'configure'
  });
  throw err;
}
// TODO `asserts value is not undefined`?
export function throwIfNoConfigSet() {
  if (!currentConfiguration) {
    throwMissingConfig();
  }
}
//# sourceMappingURL=configuration.js.map