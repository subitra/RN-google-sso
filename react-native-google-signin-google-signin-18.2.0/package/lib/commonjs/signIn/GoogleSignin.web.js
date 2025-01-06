"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleSignin = void 0;
var _errorCodes = require("../errors/errorCodes.web");
const errorMessage = 'RNGoogleSignIn: you are calling a not-implemented method';
const logNotImplementedError = () => {
  console.warn(errorMessage);
};
function throwNotImplementedError() {
  const e = new Error(errorMessage);
  // the docs say that the errors produced by the module should have a code property
  Object.assign(e, {
    code: _errorCodes.statusCodes.PLAY_SERVICES_NOT_AVAILABLE
  });
  throw e;
}
async function signIn(_options = {}) {
  return throwNotImplementedError();
}
async function hasPlayServices(_options = {
  showPlayServicesUpdateDialog: true
}) {
  logNotImplementedError();
  return false;
}
function configure(_options) {
  logNotImplementedError();
}
async function addScopes(_options) {
  logNotImplementedError();
  return null;
}
async function signInSilently() {
  return throwNotImplementedError();
}
async function signOut() {
  logNotImplementedError();
  return null;
}
async function revokeAccess() {
  logNotImplementedError();
  return null;
}
function hasPreviousSignIn() {
  logNotImplementedError();
  return false;
}
function getCurrentUser() {
  logNotImplementedError();
  return null;
}
async function clearCachedAccessToken(_tokenString) {
  logNotImplementedError();
  return null;
}
async function getTokens() {
  return throwNotImplementedError();
}
const enableAppCheck = () => Promise.resolve(null);
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
//# sourceMappingURL=GoogleSignin.web.js.map