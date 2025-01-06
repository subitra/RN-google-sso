import { OneTapNativeModule } from '../spec/NativeOneTapSignIn.android';
import type { OneTapSignInModule } from './types';
import { createdValidatedOneTapConfig } from './oneTapConfiguration';
import { setConfiguration } from '../configuration';

// functions are marked as async to make sure they return a promise (even if they throw in `createdValidatedOneTapConfig`)
// so that they are in line with iOS

const signIn: OneTapSignInModule['signIn'] = async (params, callbacks) => {
  const newParams = createdValidatedOneTapConfig(params, callbacks);

  return OneTapNativeModule.signIn({
    autoSignIn: true,
    filterByAuthorizedAccounts: true,
    ...newParams,
  });
};

const presentExplicitSignIn: OneTapSignInModule['presentExplicitSignIn'] =
  async (params, callbacks) => {
    const newParams = createdValidatedOneTapConfig(params, callbacks);
    return OneTapNativeModule.explicitSignIn(newParams);
  };

const createAccount: OneTapSignInModule['createAccount'] = async (
  params,
  callbacks,
) => {
  const newParams = createdValidatedOneTapConfig(params, callbacks);

  return OneTapNativeModule.signIn({
    autoSignIn: false,
    filterByAuthorizedAccounts: false,
    ...newParams,
  });
};

const signOut: OneTapSignInModule['signOut'] = () => {
  // making sure no params are passed to the native module
  // because native module doesn't expect any
  return OneTapNativeModule.signOut();
};

const requestAuthorization: OneTapSignInModule['requestAuthorization'] = async (
  params,
) => {
  const offlineAccessEnabled: boolean = !!params?.offlineAccess?.enabled;
  const validatedConfig = offlineAccessEnabled
    ? createdValidatedOneTapConfig(undefined)
    : undefined;

  // Android might only return the scopes that we asked for, not those that were already granted.
  // That is documented in the docs.
  return OneTapNativeModule.requestAuthorization({
    scopes: params.scopes,
    hostedDomain: params?.hostedDomain,
    webClientId: validatedConfig?.webClientId,
    offlineAccessEnabled,
    forceCodeForRefreshToken: !!params?.offlineAccess?.forceCodeForRefreshToken,
    accountName: params?.accountName,
  });
};

const configure: OneTapSignInModule['configure'] = (config) => {
  setConfiguration(config, true);
};
const checkPlayServices: OneTapSignInModule['checkPlayServices'] = async (
  showErrorResolutionDialog = true,
) => {
  return OneTapNativeModule.checkPlayServices(showErrorResolutionDialog);
};

const enableAppCheck = () => Promise.resolve(null);

export const GoogleOneTapSignIn = {
  signIn,
  createAccount,
  signOut,
  presentExplicitSignIn,
  requestAuthorization,
  configure,
  checkPlayServices,
  enableAppCheck,
} satisfies OneTapSignInModule;
