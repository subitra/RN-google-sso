"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleOneTapSignIn = void 0;
var _NativeOneTapSignIn = require("../spec/NativeOneTapSignIn.android");
var _oneTapConfiguration = require("./oneTapConfiguration");
var _configuration = require("../configuration");
// functions are marked as async to make sure they return a promise (even if they throw in `createdValidatedOneTapConfig`)
// so that they are in line with iOS

const signIn = async (params, callbacks) => {
  const newParams = (0, _oneTapConfiguration.createdValidatedOneTapConfig)(params, callbacks);
  return _NativeOneTapSignIn.OneTapNativeModule.signIn({
    autoSignIn: true,
    filterByAuthorizedAccounts: true,
    ...newParams
  });
};
const presentExplicitSignIn = async (params, callbacks) => {
  const newParams = (0, _oneTapConfiguration.createdValidatedOneTapConfig)(params, callbacks);
  return _NativeOneTapSignIn.OneTapNativeModule.explicitSignIn(newParams);
};
const createAccount = async (params, callbacks) => {
  const newParams = (0, _oneTapConfiguration.createdValidatedOneTapConfig)(params, callbacks);
  return _NativeOneTapSignIn.OneTapNativeModule.signIn({
    autoSignIn: false,
    filterByAuthorizedAccounts: false,
    ...newParams
  });
};
const signOut = () => {
  // making sure no params are passed to the native module
  // because native module doesn't expect any
  return _NativeOneTapSignIn.OneTapNativeModule.signOut();
};
const requestAuthorization = async params => {
  const offlineAccessEnabled = !!params?.offlineAccess?.enabled;
  const validatedConfig = offlineAccessEnabled ? (0, _oneTapConfiguration.createdValidatedOneTapConfig)(undefined) : undefined;

  // Android might only return the scopes that we asked for, not those that were already granted.
  // That is documented in the docs.
  return _NativeOneTapSignIn.OneTapNativeModule.requestAuthorization({
    scopes: params.scopes,
    hostedDomain: params?.hostedDomain,
    webClientId: validatedConfig?.webClientId,
    offlineAccessEnabled,
    forceCodeForRefreshToken: !!params?.offlineAccess?.forceCodeForRefreshToken,
    accountName: params?.accountName
  });
};
const configure = config => {
  (0, _configuration.setConfiguration)(config, true);
};
const checkPlayServices = async (showErrorResolutionDialog = true) => {
  return _NativeOneTapSignIn.OneTapNativeModule.checkPlayServices(showErrorResolutionDialog);
};
const enableAppCheck = () => Promise.resolve(null);
const GoogleOneTapSignIn = exports.GoogleOneTapSignIn = {
  signIn,
  createAccount,
  signOut,
  presentExplicitSignIn,
  requestAuthorization,
  configure,
  checkPlayServices,
  enableAppCheck
};
//# sourceMappingURL=OneTapSignIn.android.js.map