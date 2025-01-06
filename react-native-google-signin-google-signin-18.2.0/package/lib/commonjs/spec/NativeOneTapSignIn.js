"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OneTapNativeModule = void 0;
function unsupported() {
  return Promise.reject(new Error('unsupported call'));
}
const OneTapNativeModule = exports.OneTapNativeModule = {
  signIn: unsupported,
  explicitSignIn: unsupported,
  signOut: unsupported,
  requestAuthorization: unsupported,
  checkPlayServices: unsupported
};
//# sourceMappingURL=NativeOneTapSignIn.js.map