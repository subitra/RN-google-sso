"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseButton = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BaseButton = ({
  color,
  style,
  ...rest
}) => {
  const activeColorScheme = (0, _reactNative.useColorScheme)();
  const colorScheme = color ?? activeColorScheme ?? 'light';
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    style: [buttonStyles.content, buttonStyles[colorScheme], style],
    ...rest,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [textStyles[colorScheme], textStyles.content],
      children: "Sign in"
    })
  });
};
exports.BaseButton = BaseButton;
const textStyles = _reactNative.StyleSheet.create({
  light: {
    color: 'grey'
  },
  dark: {
    color: 'white'
  },
  content: {
    fontSize: 17
  }
});
const buttonStyles = _reactNative.StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    borderRadius: 3
  },
  light: {
    backgroundColor: 'white'
  },
  dark: {
    backgroundColor: '#4286f5'
  }
});
//# sourceMappingURL=BaseButton.macos.js.map