"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGoogleSigninButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _errorCodes = require("../errors/errorCodes.web");
var _emitter = require("../oneTap/emitter.web");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const WebGoogleSigninButton = exports.WebGoogleSigninButton = /*#__PURE__*/_react.default.memo(WebGoogleSigninButtonMemoed);
function WebGoogleSigninButtonMemoed({
  size = 'medium',
  onError,
  ...rest
}) {
  const buttonRef = _react.default.useRef(null);
  const renderButton = (0, _react.useCallback)(ref => {
    window.google.accounts.id.renderButton(ref, {
      ...rest,
      logo_alignment: rest.logoAlignment ?? 'left',
      size
    });
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [size, JSON.stringify(rest)]);
  (0, _react.useEffect)(() => {
    checkPrerequisite({
      onError
    });
    const ref = buttonRef.current;
    // @ts-expect-error
    const isInitialized = typeof window.__G_ID_CLIENT__ !== 'undefined';
    if (isInitialized && ref) {
      renderButton(ref);
      return;
    } else {
      return _emitter.emitter.on('init', () => {
        buttonRef.current && renderButton(buttonRef.current);
      });
    }
  }, [onError, renderButton]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    ref: buttonRef,
    style: containerStyles[size]
  });
}
const containerStyles = {
  small: {
    height: 20
  },
  medium: {
    height: 32
  },
  large: {
    height: 40
  }
};
function checkPrerequisite({
  onError
}) {
  const {
    google
  } = window;
  if (!google) {
    onError && onError((0, _errorCodes.createGoogleSdkNotFoundError)());
    console.warn('WebGoogleSigninButton: Google Sign In SDK is not present. Did you forget to load it?');
  }
}
//# sourceMappingURL=WebGoogleSigninButton.web.js.map