"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsetConfigurationTestsOnly = exports.getConfiguration = exports.setConfiguration = void 0;
exports.throwMissingConfig = throwMissingConfig;
exports.throwMissingWebClientId = throwMissingWebClientId;
exports.throwIfNoConfigSet = throwIfNoConfigSet;
const validateWebClientId_1 = require("./oneTap/validateWebClientId");
let currentConfiguration;
const setConfiguration = (configuration, requireWebClientId) => {
    if (requireWebClientId && !('webClientId' in configuration)) {
        throwMissingWebClientId();
    }
    (0, validateWebClientId_1.validateWebClientId)(configuration);
    currentConfiguration = configuration;
};
exports.setConfiguration = setConfiguration;
const getConfiguration = () => {
    return currentConfiguration;
};
exports.getConfiguration = getConfiguration;
const unsetConfigurationTestsOnly = () => {
    currentConfiguration = undefined;
};
exports.unsetConfigurationTestsOnly = unsetConfigurationTestsOnly;
function throwMissingConfig() {
    const err = new Error('You must call `configure()` before attempting authentication or authorization.');
    Object.assign(err, {
        code: 'configure',
    });
    throw err;
}
function throwMissingWebClientId() {
    const err = new Error('`webClientId` is required for OneTap sign-in. Please provide it in the `configure` method.');
    Object.assign(err, {
        code: 'configure',
    });
    throw err;
}
// TODO `asserts value is not undefined`?
function throwIfNoConfigSet() {
    if (!currentConfiguration) {
        throwMissingConfig();
    }
}
