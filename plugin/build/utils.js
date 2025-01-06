"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrlScheme = validateUrlScheme;
exports.reverseUrlScheme = reverseUrlScheme;
function validateUrlScheme(iosUrlScheme) {
    const messagePrefix = `google-sign-in config plugin`;
    if (!iosUrlScheme) {
        throw new Error(`${messagePrefix}: Missing \`iosUrlScheme\` in provided options.`);
    }
    if (!iosUrlScheme.startsWith('com.googleusercontent.apps.')) {
        throw new Error(`${messagePrefix}: \`iosUrlScheme\` must start with "com.googleusercontent.apps": ${iosUrlScheme}`);
    }
    if (iosUrlScheme.trim() !== iosUrlScheme) {
        throw new Error(`${messagePrefix}: \`iosUrlScheme\` must not contain leading or trailing whitespace: ${iosUrlScheme}`);
    }
    return true;
}
function reverseUrlScheme(reversedClientId) {
    if (validateUrlScheme(reversedClientId)) {
        return reversedClientId.split('.').reverse().join('.');
    }
    throw new Error('Invalid reversed client ID');
}
