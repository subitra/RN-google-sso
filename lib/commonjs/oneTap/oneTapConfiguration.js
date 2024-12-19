"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createdValidatedOneTapConfig = void 0;
exports.validateOneTapConfig = validateOneTapConfig;
var _validateWebClientId = require("./validateWebClientId");
var _warnBadApiUsage = require("./warnBadApiUsage");
var _configuration = require("../configuration");
const createdValidatedOneTapConfig = (extendWith, callbacks) => {
  (0, _warnBadApiUsage.warnBadApiUsage)(callbacks);
  const configuration = (0, _configuration.getConfiguration)();
  if (!configuration) {
    (0, _configuration.throwMissingConfig)();
  }
  (0, _validateWebClientId.validateWebClientId)(configuration);
  const webClientId = configuration?.webClientId;
  if (!webClientId) {
    (0, _configuration.throwMissingWebClientId)();
  }
  if (process.env.NODE_ENV !== 'production') {
    if ('androidClientId' in configuration) {
      console.error('RNGoogleSignIn: `androidClientId` is not a valid configuration parameter, please remove it.');
    }
  }
  return {
    ...configuration,
    ...extendWith,
    webClientId
  };
};
exports.createdValidatedOneTapConfig = createdValidatedOneTapConfig;
function validateOneTapConfig(callbacks) {
  // even if native module would reject, we can already reject here
  // this makes the test behavior more in line with reality
  // and provides unified error messages across platforms
  createdValidatedOneTapConfig(undefined, callbacks);
}
//# sourceMappingURL=oneTapConfiguration.js.map