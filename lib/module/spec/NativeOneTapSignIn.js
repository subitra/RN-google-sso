function unsupported() {
  return Promise.reject(new Error('unsupported call'));
}
export const OneTapNativeModule = {
  signIn: unsupported,
  explicitSignIn: unsupported,
  signOut: unsupported,
  requestAuthorization: unsupported,
  checkPlayServices: unsupported
};
//# sourceMappingURL=NativeOneTapSignIn.js.map