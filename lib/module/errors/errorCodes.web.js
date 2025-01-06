const statusCodesRaw = {
  ONE_TAP_START_FAILED: 'start_failed',
  // NOTE the following codes are arbitrary, but they are used to match the native module
  IN_PROGRESS: 'IN_PROGRESS',
  PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE'
};
export const SIGN_IN_CANCELLED_CODE = 'cancel_called';

// keep separate variable statusCodesRaw because if passed directly to Object.freeze,
// the types for web and native would differ
export const statusCodes = Object.freeze(statusCodesRaw);
export const createGoogleSdkNotFoundError = () => {
  const err = new Error('Google identity SDK script not found. Are you sure it is loaded?');
  Object.assign(err, {
    code: statusCodes.PLAY_SERVICES_NOT_AVAILABLE
  });
  return err;
};
export const createSignOutFailedError = error => {
  const err = new Error(`Sign out failed: ${error}`);
  Object.assign(err, {
    code: 'signOut'
  });
  return err;
};
//# sourceMappingURL=errorCodes.web.js.map