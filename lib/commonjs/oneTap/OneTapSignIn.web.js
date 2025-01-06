"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleOneTapSignIn = void 0;
var _errorCodes = require("../errors/errorCodes.web");
var _tokenUtils = require("./tokenUtils.web");
var _emitter = require("./emitter.web");
var _oneTapConfiguration = require("./oneTapConfiguration");
var _constants = require("../constants");
var _configuration = require("../configuration");
function sdkIsMissing() {
  return typeof window !== 'undefined' && !window.google;
}
const signInImplWeb = (params, callbacks) => {
  const {
    logLevel,
    ...otherParams
  } = (0, _oneTapConfiguration.createdValidatedOneTapConfig)(params, callbacks);
  if (!callbacks) {
    console.error('RNGoogleSignIn: promise-based implementation is not supported on Web. Pass callbacks instead.');
    return;
  }
  const {
    onError,
    onResponse,
    momentListener
  } = callbacks;
  if (sdkIsMissing()) {
    onError((0, _errorCodes.createGoogleSdkNotFoundError)());
    return;
  }
  const {
    google
  } = window;
  const {
    nonce,
    skipPrompt
  } = params;
  google.accounts.id.initialize({
    client_id: otherParams.webClientId,
    auto_select: params.auto_select,
    nonce,
    context: 'signin',
    use_fedcm_for_prompt: true,
    log_level: logLevel,
    ...otherParams,
    callback: ({
      credential: idToken,
      select_by
    }) => {
      const user = (0, _tokenUtils.extractUser)(idToken);
      const userInfo = {
        user,
        idToken,
        serverAuthCode: null,
        credentialOrigin: select_by
      };
      onResponse({
        type: 'success',
        data: userInfo
      });
    }
  });
  _emitter.emitter.emit('init');
  if (!skipPrompt) {
    google.accounts.id.prompt(notification => {
      if (notification.isSkippedMoment()) {
        onResponse(_constants.cancelledResult);
      } else if (notification.isDismissedMoment()) {
        const dismissedReason = notification.getDismissedReason();
        if (dismissedReason === _errorCodes.SIGN_IN_CANCELLED_CODE || dismissedReason === 'flow_restarted') {
          // `flow_restarted` happens when the one-tap sign in is presented but the user chooses to sign in using the button.
          // We cancel the one-tap flow, but the user credential will be returned from the button flow's Promise
          onResponse(_constants.cancelledResult);
        }
        // else: dismissedReason === 'credential_returned' - we don't need to do anything
      }
      momentListener && momentListener(notification);
    });
  }
};
function presentExplicitSignIn(params, callbacks) {
  signInImplWeb({
    ...params,
    auto_select: false,
    context: 'signup'
  }, callbacks);
}
function signIn(params, callbacks) {
  signInImplWeb({
    ...params,
    auto_select: true
  }, callbacks);
}
const signOutWeb = async emailOrUniqueId => {
  if (sdkIsMissing()) {
    throw (0, _errorCodes.createGoogleSdkNotFoundError)();
  }
  const {
    google: {
      accounts
    }
  } = window;
  return new Promise((resolve, reject) => {
    accounts.id.revoke(emailOrUniqueId, ({
      successful,
      error
    }) => {
      if (successful) {
        // https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.disableAutoSelect
        accounts.id.disableAutoSelect();
        resolve(null);
      } else {
        reject((0, _errorCodes.createSignOutFailedError)(error));
      }
    });
  });
};
const throwApiUnavailableError = async () => {
  const err = new Error('`requestAuthorization` is not implemented on the web platform.');
  Object.assign(err, {
    code: _errorCodes.statusCodes.PLAY_SERVICES_NOT_AVAILABLE
  });
  throw err;
};
const configure = config => {
  (0, _configuration.setConfiguration)(config, true);
};
const checkPlayServices = async () => {
  if (sdkIsMissing()) {
    throw (0, _errorCodes.createGoogleSdkNotFoundError)();
  }
  return {
    minRequiredVersion: -1,
    installedVersion: -1
  };
};
const enableAppCheck = () => Promise.resolve(null);
const GoogleOneTapSignIn = exports.GoogleOneTapSignIn = {
  signIn,
  createAccount: presentExplicitSignIn,
  presentExplicitSignIn,
  requestAuthorization: throwApiUnavailableError,
  signOut: signOutWeb,
  configure,
  checkPlayServices,
  enableAppCheck
};
//# sourceMappingURL=OneTapSignIn.web.js.map