import type {
  AuthorizationResponse,
  OneTapConfigureParams,
  OneTapSignInModule,
  OneTapUser,
  RequestAuthorizationParams,
  WebOneTapSignInCallbacks,
} from './types';
import {
  configureInternal,
  getConfigPromise,
  GoogleSignin,
  SignInResponse,
} from '../signIn/GoogleSignin';
import type { ConfigureParams, User } from '../types';
import { validateOneTapConfig } from './oneTapConfiguration';
import { getConfiguration } from '../configuration';

async function checkPrerequisites(
  callbacks: WebOneTapSignInCallbacks | undefined,
) {
  validateOneTapConfig(callbacks);
  await getConfigPromise();
}

const signIn: OneTapSignInModule['signIn'] = async (_params, callbacks) => {
  await checkPrerequisites(callbacks);
  const signInResult = await GoogleSignin.signInSilently();
  // cannot be cancelled, because there's no user interaction
  if (signInResult.type === 'noSavedCredentialFound') {
    return signInResult;
  }
  return getSignInResult(signInResult);
};

const presentSignInDialog = async (
  params?: { accountName?: string; nonce?: string },
  callbacks?: WebOneTapSignInCallbacks,
) => {
  await checkPrerequisites(callbacks);
  const signInResult = await GoogleSignin.signIn({
    loginHint: params?.accountName,
    nonce: params?.nonce,
  });
  return getSignInResult(signInResult);
};

const presentExplicitSignIn: OneTapSignInModule['presentExplicitSignIn'] =
  presentSignInDialog;

const createAccount: OneTapSignInModule['createAccount'] = presentSignInDialog;

function getSignInResult(data: SignInResponse) {
  if (data.type === 'cancelled') {
    return data;
  }
  const { user, idToken, serverAuthCode } = data.data;
  if (!idToken) {
    throwNoIdToken();
  }
  const oneTapUser: OneTapUser = {
    user: {
      ...user,
      phoneNumber: null,
    },
    idToken,
    serverAuthCode,
    // credentialOrigin is not available on the iOS side and is added for compatibility with Web
    credentialOrigin: 'user',
  };
  return { type: 'success', data: oneTapUser } as const;
}

const requestAuthorization: OneTapSignInModule['requestAuthorization'] = async (
  options,
) => {
  const result = await GoogleSignin.addScopes(options);
  const hasNoUser = result === null;
  if (hasNoUser) {
    const currentConfiguration = getConfiguration();
    const configureParams: ConfigureParams = {
      ...currentConfiguration,
      scopes: options.scopes.concat(currentConfiguration?.scopes ?? []),
      hostedDomain: options.hostedDomain,
      offlineAccess: !!options.offlineAccess?.enabled,
    };
    await configureInternal(configureParams, true);
    // for behavior parity with Android, we launch a sign-in flow with the requested options
    const signInResult = await GoogleSignin.signIn();
    if (signInResult.type === 'cancelled') {
      return signInResult;
    }
    return getAuthorizationSuccessResult(signInResult.data, options);
  } else if (result.type === 'cancelled') {
    return result;
  }
  return getAuthorizationSuccessResult(result.data, options);
};

async function getAuthorizationSuccessResult(
  user: User,
  options: RequestAuthorizationParams,
): Promise<AuthorizationResponse> {
  const { accessToken } = await GoogleSignin.getTokens();
  return {
    type: 'success',
    data: {
      grantedScopes: user.scopes,
      accessToken,
      // for same behavior as Android
      serverAuthCode: options.offlineAccess?.enabled
        ? user.serverAuthCode
        : null,
    },
  } as const;
}

function throwNoIdToken(): never {
  // this should never happen on iOS, it's more about making TS happy
  const e = new Error(`No idToken present in the response.`);
  // the docs say that the errors produced by the module should have a code property
  Object.assign(e, { code: 'ID_TOKEN_EXPECTED' });
  throw e;
}

function configure(options: OneTapConfigureParams): void {
  configureInternal(options, true);
}

const signOut: OneTapSignInModule['signOut'] = GoogleSignin.signOut;

const checkPlayServices: OneTapSignInModule['checkPlayServices'] = async () => {
  return {
    minRequiredVersion: -1,
    installedVersion: -1,
  };
};

const enableAppCheck = GoogleSignin.enableAppCheck;

/**
 * The entry point of the Modern Sign In API, exposed as `GoogleOneTapSignIn`.
 *
 * On the web, the signatures of `signIn`, `presentExplicitSignIn`, and `createAccount` are callback-based and on native they are Promise-based. Read more in the [guide](/docs/one-tap#web-support).
 *
 * @group Modern sign in module
 * */
export const GoogleOneTapSignIn = {
  signIn,
  createAccount,
  presentExplicitSignIn,
  signOut,
  requestAuthorization,
  checkPlayServices,
  enableAppCheck,
  configure,
} satisfies OneTapSignInModule;
