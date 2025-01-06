/**
 * Only needed for web
 * */
import { jwtDecode } from 'jwt-decode';
export function extractUser(idToken) {
  const parsed = jwtDecode(idToken);
  const name = parsed.name;
  const givenName = parsed.given_name;
  const familyName = parsed.family_name;
  const photo = parsed.picture;
  const email = parsed.email;
  const subject = getSubject(parsed, email);
  return {
    id: subject,
    name,
    email,
    givenName,
    familyName,
    photo,
    phoneNumber: null
  };
}
function getSubject(parsed,
// userName (not the factual name, but "nickname") may be returned by one tap on android
emailOrUsername) {
  if (parsed.sub) {
    return parsed.sub;
  }
  return emailOrUsername;
}
//# sourceMappingURL=tokenUtils.web.js.map