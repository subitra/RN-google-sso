"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdValidatedOneTapConfig = void 0;
exports.validateOneTapConfig = validateOneTapConfig;
const validateWebClientId_1 = require("./validateWebClientId");
const warnBadApiUsage_1 = require("./warnBadApiUsage");
const configuration_1 = require("../configuration");
const createdValidatedOneTapConfig = (extendWith, callbacks) => {
    (0, warnBadApiUsage_1.warnBadApiUsage)(callbacks);
    const configuration = (0, configuration_1.getConfiguration)();
    if (!configuration) {
        (0, configuration_1.throwMissingConfig)();
    }
    (0, validateWebClientId_1.validateWebClientId)(configuration);
    const webClientId = configuration?.webClientId;
    if (!webClientId) {
        (0, configuration_1.throwMissingWebClientId)();
    }
    if (process.env.NODE_ENV !== 'production') {
        if ('androidClientId' in configuration) {
            console.error('RNGoogleSignIn: `androidClientId` is not a valid configuration parameter, please remove it.');
        }
    }
    return {
        ...configuration,
        ...extendWith,
        webClientId,
    };
};
exports.createdValidatedOneTapConfig = createdValidatedOneTapConfig;
function validateOneTapConfig(callbacks) {
    // even if native module would reject, we can already reject here
    // this makes the test behavior more in line with reality
    // and provides unified error messages across platforms
    (0, exports.createdValidatedOneTapConfig)(undefined, callbacks);
}
