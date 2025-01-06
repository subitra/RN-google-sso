"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleSigninButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _NativeGoogleSignin = require("../spec/NativeGoogleSignin");
var _statics = require("./statics");
var _BaseButton = require("./BaseButton");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  BUTTON_SIZE_WIDE,
  BUTTON_SIZE_ICON,
  BUTTON_SIZE_STANDARD
} = _NativeGoogleSignin.NativeModule.getConstants();

/**
 * @group React Components
 * */
const GoogleSigninButton = props => {
  const {
    onPress,
    style,
    color,
    size = BUTTON_SIZE_STANDARD,
    ...rest
  } = props;
  const activeColorScheme = (0, _reactNative.useColorScheme)();
  const usedColor = color ?? activeColorScheme ?? 'light';
  const recommendedSize = getSizeStyle(size);
  const stripOnPressParams = (0, _react.useCallback)(() => {
    // this is to make sure that the onPress callback prop is called with no params
    // as the RNGoogleSigninButton onPress does pass some in here
    onPress?.();
  }, [onPress]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_BaseButton.BaseButton, {
    ...rest,
    size: size,
    onPress: stripOnPressParams,
    color: usedColor,
    style: _reactNative.StyleSheet.compose(recommendedSize, style)
  });
};
exports.GoogleSigninButton = GoogleSigninButton;
const nativeSizes = {
  Icon: BUTTON_SIZE_ICON,
  Standard: BUTTON_SIZE_STANDARD,
  Wide: BUTTON_SIZE_WIDE
};
GoogleSigninButton.Size = nativeSizes;
GoogleSigninButton.Color = _statics.Color;
function getSizeStyle(size) {
  switch (size) {
    case BUTTON_SIZE_ICON:
      return styles.iconSize;
    case BUTTON_SIZE_WIDE:
      return styles.wideSize;
    default:
      return styles.standardSize;
  }
}

// sizes according to https://developers.google.com/identity/sign-in/ios/reference/Classes/GIDSignInButton
const styles = _reactNative.StyleSheet.create({
  iconSize: {
    width: 48,
    height: 48
  },
  standardSize: {
    width: 230,
    height: 48
  },
  wideSize: {
    width: 312,
    height: 48
  }
});
//# sourceMappingURL=GoogleSigninButton.js.map