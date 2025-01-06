"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusCodes = exports.ios_only_SCOPES_ALREADY_GRANTED = exports.SIGN_IN_REQUIRED_CODE = exports.SIGN_IN_CANCELLED_CODE = void 0;
var _NativeGoogleSignin = require("../spec/NativeGoogleSignin");
const {
  SIGN_IN_CANCELLED,
  IN_PROGRESS,
  PLAY_SERVICES_NOT_AVAILABLE,
  SIGN_IN_REQUIRED,
  ONE_TAP_START_FAILED,
  SCOPES_ALREADY_GRANTED
} = _NativeGoogleSignin.NativeModule.getConstants();
const SIGN_IN_REQUIRED_CODE = exports.SIGN_IN_REQUIRED_CODE = SIGN_IN_REQUIRED;
const SIGN_IN_CANCELLED_CODE = exports.SIGN_IN_CANCELLED_CODE = SIGN_IN_CANCELLED;
const ios_only_SCOPES_ALREADY_GRANTED = exports.ios_only_SCOPES_ALREADY_GRANTED = SCOPES_ALREADY_GRANTED;

/**
 * Read more about the meaning of the error codes in the [guide](/docs/errors).
 * @group Constants
 * */
const statusCodes = exports.statusCodes = Object.freeze({
  IN_PROGRESS,
  PLAY_SERVICES_NOT_AVAILABLE,
  ONE_TAP_START_FAILED
});
// if we instead specify the type directly on the const, typedoc will not generate the docs as I want
//# sourceMappingURL=errorCodes.js.map