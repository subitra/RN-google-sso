"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleOneTapSignIn = void 0;
var _GoogleSignin = require("../signIn/GoogleSignin");
var _oneTapConfiguration = require("./oneTapConfiguration");
var _configuration = require("../configuration");
async function checkPrerequisites(callbacks) {
  (0, _oneTapConfiguration.validateOneTapConfig)(callbacks);
  await (0, _GoogleSignin.getConfigPromise)();
}
const signIn = async (_params, callbacks) => {
  await checkPrerequisites(callbacks);
  const signInResult = await _GoogleSignin.GoogleSignin.signInSilently();
  // cannot be cancelled, because there's no user interaction
  if (signInResult.type === 'noSavedCredentialFound') {
    return signInResult;
  }
  return getSignInResult(signInResult);
};
const presentSignInDialog = async (params, callbacks) => {
  await checkPrerequisites(callbacks);
  const signInResult = await _GoogleSignin.GoogleSignin.signIn({
    loginHint: params?.accountName,
    nonce: params?.nonce
  });
  return getSignInResult(signInResult);
};
const presentExplicitSignIn = presentSignInDialog;
const createAccount = presentSignInDialog;
function getSignInResult(data) {
  if (data.type === 'cancelled') {
    return data;
  }
  const {
    user,
    idToken,
    serverAuthCode
  } = data.data;
  if (!idToken) {
    throwNoIdToken();
  }
  const oneTapUser = {
    user: {
      ...user,
      phoneNumber: null
    },
    idToken,
    serverAuthCode,
    // credentialOrigin is not available on the iOS side and is added for compatibility with Web
    credentialOrigin: 'user'
  };
  return {
    type: 'success',
    data: oneTapUser
  };
}
const requestAuthorization = async options => {
  const result = await _GoogleSignin.GoogleSignin.addScopes(options);
  const hasNoUser = result === null;
  if (hasNoUser) {
    const currentConfiguration = (0, _configuration.getConfiguration)();
    const configureParams = {
      ...currentConfiguration,
      scopes: options.scopes.concat(currentConfiguration?.scopes ?? []),
      hostedDomain: options.hostedDomain,
      offlineAccess: !!options.offlineAccess?.enabled
    };
    await (0, _GoogleSignin.configureInternal)(configureParams, true);
    // for behavior parity with Android, we launch a sign-in flow with the requested options
    const signInResult = await _GoogleSignin.GoogleSignin.signIn();
    if (signInResult.type === 'cancelled') {
      return signInResult;
    }
    return getAuthorizationSuccessResult(signInResult.data, options);
  } else if (result.type === 'cancelled') {
    return result;
  }
  return getAuthorizationSuccessResult(result.data, options);
};
async function getAuthorizationSuccessResult(user, options) {
  const {
    accessToken
  } = await _GoogleSignin.GoogleSignin.getTokens();
  return {
    type: 'success',
    data: {
      grantedScopes: user.scopes,
      accessToken,
      // for same behavior as Android
      serverAuthCode: options.offlineAccess?.enabled ? user.serverAuthCode : null
    }
  };
}
function throwNoIdToken() {
  // this should never happen on iOS, it's more about making TS happy
  const e = new Error(`No idToken present in the response.`);
  // the docs say that the errors produced by the module should have a code property
  Object.assign(e, {
    code: 'ID_TOKEN_EXPECTED'
  });
  throw e;
}
function configure(options) {
  (0, _GoogleSignin.configureInternal)(options, true);
}
const signOut = _GoogleSignin.GoogleSignin.signOut;
const checkPlayServices = async () => {
  return {
    minRequiredVersion: -1,
    installedVersion: -1
  };
};
const enableAppCheck = _GoogleSignin.GoogleSignin.enableAppCheck;

/**
 * The entry point of the Modern Sign In API, exposed as `GoogleOneTapSignIn`.
 *
 * On the web, the signatures of `signIn`, `presentExplicitSignIn`, and `createAccount` are callback-based and on native they are Promise-based. Read more in the [guide](/docs/one-tap#web-support).
 *
 * @group Modern sign in module
 * */
const GoogleOneTapSignIn = exports.GoogleOneTapSignIn = {
  signIn,
  createAccount,
  presentExplicitSignIn,
  signOut,
  requestAuthorization,
  checkPlayServices,
  enableAppCheck,
  configure
};
//# sourceMappingURL=OneTapSignIn.js.map