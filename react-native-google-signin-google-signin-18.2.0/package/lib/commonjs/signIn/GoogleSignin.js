"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleSignin = void 0;
exports.configureInternal = configureInternal;
exports.getConfigPromise = void 0;
var _reactNative = require("react-native");
var _NativeGoogleSignin = require("../spec/NativeGoogleSignin");
var _errorCodes = require("../errors/errorCodes");
var _functions = require("../functions");
var _configuration = require("../configuration");
var _constants = require("../constants");
var _translateNativeRejection = require("../translateNativeRejection");
let configPromise = Promise.resolve();
const getConfigPromise = () => configPromise;
exports.getConfigPromise = getConfigPromise;
function configureInternal(options = {}, requireWebClientId) {
  // we set the config on the JS side as well so that we can validate it on the JS side as well
  (0, _configuration.setConfiguration)(options, requireWebClientId);
  configPromise = _NativeGoogleSignin.NativeModule.configure(options);
  return configPromise;
}
function configure(options) {
  configureInternal(options, false);
}

/**
 * The response object when the user signs in successfully.
 *
 * @group Original Google sign in
 * */

/**
 * @group Original Google sign in
 * */

async function signIn(options = {}) {
  (0, _configuration.throwIfNoConfigSet)();
  await configPromise;
  try {
    const user = await _NativeGoogleSignin.NativeModule.signIn(options);
    return createSuccessResponse(user);
  } catch (err) {
    return (0, _translateNativeRejection.translateCancellationError)(err);
  }
}
async function hasPlayServices(options) {
  if (process.env.NODE_ENV !== 'production') {
    if (options && options.showPlayServicesUpdateDialog === undefined) {
      throw new Error('RNGoogleSignin: Missing property `showPlayServicesUpdateDialog` in options object for `hasPlayServices`');
    }
  }
  return _NativeGoogleSignin.NativeModule.playServicesAvailable(options?.showPlayServicesUpdateDialog !== false);
}
async function addScopes(options) {
  (0, _configuration.throwIfNoConfigSet)();
  if (_reactNative.Platform.OS === 'android') {
    // false if no user is signed in
    const hasUser = await _NativeGoogleSignin.NativeModule.addScopes(options);
    if (!hasUser) {
      return null;
    }
    // on Android, the user returned in onActivityResult() will contain only the scopes added, not the ones present previously
    // we work around it by calling signInSilently() which returns the user object with all scopes
    // @ts-expect-error `no_saved_credential_found` is not possible here, because we just added scopes
    return signInSilently();
  } else {
    try {
      const user = await _NativeGoogleSignin.NativeModule.addScopes(options);
      if (!user) {
        return null;
      }
      return createSuccessResponse(user);
    } catch (err) {
      if ((0, _functions.isErrorWithCode)(err) && err.code === _errorCodes.ios_only_SCOPES_ALREADY_GRANTED) {
        // return the scopes that are already granted
        const user = GoogleSignin.getCurrentUser();
        if (!user) {
          return null;
        }
        return createSuccessResponse(user);
      }
      return (0, _translateNativeRejection.translateCancellationError)(err);
    }
  }
}

/**
 * The response object for calling `signInSilently`. Either the user details are available (without user interaction) or there was no saved credential found.
 * @group Original Google sign in
 * */

async function signInSilently() {
  try {
    (0, _configuration.throwIfNoConfigSet)();
    await configPromise;
    const user = await _NativeGoogleSignin.NativeModule.signInSilently();
    return createSuccessResponse(user);
  } catch (err) {
    if ((0, _functions.isErrorWithCode)(err) && err.code === _errorCodes.SIGN_IN_REQUIRED_CODE) {
      return _constants.noSavedCredentialFoundResult;
    }
    throw err;
  }
}
async function signOut() {
  return _NativeGoogleSignin.NativeModule.signOut();
}
async function revokeAccess() {
  return _NativeGoogleSignin.NativeModule.revokeAccess();
}
function hasPreviousSignIn() {
  return _NativeGoogleSignin.NativeModule.hasPreviousSignIn();
}
function getCurrentUser() {
  return _NativeGoogleSignin.NativeModule.getCurrentUser();
}
async function enableAppCheck(params) {
  return _NativeGoogleSignin.NativeModule.enableAppCheck(params?.debugProviderAPIKey);
}
async function clearCachedAccessToken(tokenString) {
  if (!tokenString || typeof tokenString !== 'string') {
    return Promise.reject('GoogleSignIn: clearCachedAccessToken() expects a string token.');
  }
  return _reactNative.Platform.OS === 'android' ? _NativeGoogleSignin.NativeModule.clearCachedAccessToken(tokenString) : null;
}
async function getTokens() {
  if (_reactNative.Platform.OS === 'android') {
    const userObject = await _NativeGoogleSignin.NativeModule.getTokens();
    return {
      idToken: userObject.idToken,
      accessToken: userObject.accessToken
    };
  } else {
    return _NativeGoogleSignin.NativeModule.getTokens();
  }
}
const createSuccessResponse = data => ({
  type: 'success',
  data
});

/**
 * The entry point of the Google Sign In API, exposed as `GoogleSignin`.
 * @group Original Google sign in
 * */
const GoogleSignin = exports.GoogleSignin = {
  hasPlayServices,
  configure,
  signIn,
  addScopes,
  signInSilently,
  signOut,
  revokeAccess,
  hasPreviousSignIn,
  getCurrentUser,
  clearCachedAccessToken,
  getTokens,
  enableAppCheck
};
//# sourceMappingURL=GoogleSignin.js.map