import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
export default codegenNativeComponent('RNGoogleSigninButton', {
  // @ts-expect-error we would like to not generate anything on macos but this doesn't work. Maybe it will later
  excludedPlatforms: ['macos']
});
//# sourceMappingURL=SignInButtonNativeComponent.js.map