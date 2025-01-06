"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  GoogleSignin: true,
  statusCodes: true,
  GoogleSigninButton: true,
  WebGoogleSigninButton: true,
  GoogleOneTapSignIn: true
};
Object.defineProperty(exports, "GoogleOneTapSignIn", {
  enumerable: true,
  get: function () {
    return _OneTapSignIn.GoogleOneTapSignIn;
  }
});
Object.defineProperty(exports, "GoogleSignin", {
  enumerable: true,
  get: function () {
    return _GoogleSignin.GoogleSignin;
  }
});
Object.defineProperty(exports, "GoogleSigninButton", {
  enumerable: true,
  get: function () {
    return _GoogleSigninButton.GoogleSigninButton;
  }
});
Object.defineProperty(exports, "WebGoogleSigninButton", {
  enumerable: true,
  get: function () {
    return _WebGoogleSigninButton.WebGoogleSigninButton;
  }
});
Object.defineProperty(exports, "statusCodes", {
  enumerable: true,
  get: function () {
    return _errorCodes.statusCodes;
  }
});
var _GoogleSignin = require("./signIn/GoogleSignin");
var _errorCodes = require("./errors/errorCodes");
var _GoogleSigninButton = require("./buttons/GoogleSigninButton");
var _WebGoogleSigninButton = require("./buttons/WebGoogleSigninButton");
var _OneTapSignIn = require("./oneTap/OneTapSignIn");
var _functions = require("./functions");
Object.keys(_functions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _functions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _functions[key];
    }
  });
});
//# sourceMappingURL=index.js.map