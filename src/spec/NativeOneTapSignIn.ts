import type { Spec } from './NativeOneTapSignIn.android';

function unsupported() {
  return Promise.reject(new Error('unsupported call'));
}

export const OneTapNativeModule: Spec = {
  signIn: unsupported,
  explicitSignIn: unsupported,
  signOut: unsupported,
  requestAuthorization: unsupported,
  checkPlayServices: unsupported,
};
