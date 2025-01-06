"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSignin = exports.getConfigPromise = void 0;
exports.configureInternal = configureInternal;
const react_native_1 = require("react-native");
const NativeGoogleSignin_1 = require("../spec/NativeGoogleSignin");
const errorCodes_1 = require("../errors/errorCodes");
const functions_1 = require("../functions");
const configuration_1 = require("../configuration");
const constants_1 = require("../constants");
const translateNativeRejection_1 = require("../translateNativeRejection");
let configPromise = Promise.resolve();
const getConfigPromise = () => configPromise;
exports.getConfigPromise = getConfigPromise;
function configureInternal(options = {}, requireWebClientId) {
    // we set the config on the JS side as well so that we can validate it on the JS side as well
    (0, configuration_1.setConfiguration)(options, requireWebClientId);
    configPromise = NativeGoogleSignin_1.NativeModule.configure(options);
    return configPromise;
}
function configure(options) {
    configureInternal(options, false);
}
async function signIn(options = {}) {
    (0, configuration_1.throwIfNoConfigSet)();
    await configPromise;
    try {
        const user = (await NativeGoogleSignin_1.NativeModule.signIn(options));
        return createSuccessResponse(user);
    }
    catch (err) {
        return (0, translateNativeRejection_1.translateCancellationError)(err);
    }
}
async function hasPlayServices(options) {
    if (process.env.NODE_ENV !== 'production') {
        if (options && options.showPlayServicesUpdateDialog === undefined) {
            throw new Error('RNGoogleSignin: Missing property `showPlayServicesUpdateDialog` in options object for `hasPlayServices`');
        }
    }
    return NativeGoogleSignin_1.NativeModule.playServicesAvailable(options?.showPlayServicesUpdateDialog !== false);
}
async function addScopes(options) {
    (0, configuration_1.throwIfNoConfigSet)();
    if (react_native_1.Platform.OS === 'android') {
        // false if no user is signed in
        const hasUser = await NativeGoogleSignin_1.NativeModule.addScopes(options);
        if (!hasUser) {
            return null;
        }
        // on Android, the user returned in onActivityResult() will contain only the scopes added, not the ones present previously
        // we work around it by calling signInSilently() which returns the user object with all scopes
        // @ts-expect-error `no_saved_credential_found` is not possible here, because we just added scopes
        return signInSilently();
    }
    else {
        try {
            const user = (await NativeGoogleSignin_1.NativeModule.addScopes(options));
            if (!user) {
                return null;
            }
            return createSuccessResponse(user);
        }
        catch (err) {
            if ((0, functions_1.isErrorWithCode)(err) &&
                err.code === errorCodes_1.ios_only_SCOPES_ALREADY_GRANTED) {
                // return the scopes that are already granted
                const user = exports.GoogleSignin.getCurrentUser();
                if (!user) {
                    return null;
                }
                return createSuccessResponse(user);
            }
            return (0, translateNativeRejection_1.translateCancellationError)(err);
        }
    }
}
async function signInSilently() {
    try {
        (0, configuration_1.throwIfNoConfigSet)();
        await configPromise;
        const user = (await NativeGoogleSignin_1.NativeModule.signInSilently());
        return createSuccessResponse(user);
    }
    catch (err) {
        if ((0, functions_1.isErrorWithCode)(err) && err.code === errorCodes_1.SIGN_IN_REQUIRED_CODE) {
            return constants_1.noSavedCredentialFoundResult;
        }
        throw err;
    }
}
async function signOut() {
    return NativeGoogleSignin_1.NativeModule.signOut();
}
async function revokeAccess() {
    return NativeGoogleSignin_1.NativeModule.revokeAccess();
}
function hasPreviousSignIn() {
    return NativeGoogleSignin_1.NativeModule.hasPreviousSignIn();
}
function getCurrentUser() {
    return NativeGoogleSignin_1.NativeModule.getCurrentUser();
}
async function enableAppCheck(params) {
    return NativeGoogleSignin_1.NativeModule.enableAppCheck(params?.debugProviderAPIKey);
}
async function clearCachedAccessToken(tokenString) {
    if (!tokenString || typeof tokenString !== 'string') {
        return Promise.reject('GoogleSignIn: clearCachedAccessToken() expects a string token.');
    }
    return react_native_1.Platform.OS === 'android'
        ? NativeGoogleSignin_1.NativeModule.clearCachedAccessToken(tokenString)
        : null;
}
async function getTokens() {
    if (react_native_1.Platform.OS === 'android') {
        const userObject = await NativeGoogleSignin_1.NativeModule.getTokens();
        return {
            idToken: userObject.idToken,
            accessToken: userObject.accessToken,
        };
    }
    else {
        return NativeGoogleSignin_1.NativeModule.getTokens();
    }
}
const createSuccessResponse = (data) => ({
    type: 'success',
    data,
});
/**
 * The entry point of the Google Sign In API, exposed as `GoogleSignin`.
 * @group Original Google sign in
 * */
exports.GoogleSignin = {
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
    enableAppCheck,
};
