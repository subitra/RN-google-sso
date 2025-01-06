"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusCodes = exports.createSignOutFailedError = exports.createGoogleSdkNotFoundError = exports.SIGN_IN_CANCELLED_CODE = void 0;
const statusCodesRaw = {
  ONE_TAP_START_FAILED: 'start_failed',
  // NOTE the following codes are arbitrary, but they are used to match the native module
  IN_PROGRESS: 'IN_PROGRESS',
  PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE'
};
const SIGN_IN_CANCELLED_CODE = exports.SIGN_IN_CANCELLED_CODE = 'cancel_called';

// keep separate variable statusCodesRaw because if passed directly to Object.freeze,
// the types for web and native would differ
const statusCodes = exports.statusCodes = Object.freeze(statusCodesRaw);
const createGoogleSdkNotFoundError = () => {
  const err = new Error('Google identity SDK script not found. Are you sure it is loaded?');
  Object.assign(err, {
    code: statusCodes.PLAY_SERVICES_NOT_AVAILABLE
  });
  return err;
};
exports.createGoogleSdkNotFoundError = createGoogleSdkNotFoundError;
const createSignOutFailedError = error => {
  const err = new Error(`Sign out failed: ${error}`);
  Object.assign(err, {
    code: 'signOut'
  });
  return err;
};
exports.createSignOutFailedError = createSignOutFailedError;
//# sourceMappingURL=errorCodes.web.js.map