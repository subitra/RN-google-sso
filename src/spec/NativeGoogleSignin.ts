import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { GetTokensResponse } from '../types';

type User = Object;

export interface Spec extends TurboModule {
  // using Object to be compatible with paper
  signIn(params: Object): Promise<User>;
  configure(params: Object): Promise<void>;
  addScopes(params: Object): Promise<User | null>;
  playServicesAvailable(
    showPlayServicesUpdateDialog: boolean,
  ): Promise<boolean>;
  signInSilently(): Promise<User>;
  signOut(): Promise<null>;
  revokeAccess(): Promise<null>;
  enableAppCheck(debugProviderAPIKey: string | undefined): Promise<null>;
  clearCachedAccessToken(tokenString: string): Promise<null>;
  hasPreviousSignIn(): boolean;
  getCurrentUser(): User | null;
  getTokens(): Promise<GetTokensResponse>;
  getConstants(): {
    SIGN_IN_CANCELLED: string;
    IN_PROGRESS: string;
    PLAY_SERVICES_NOT_AVAILABLE: string;
    SIGN_IN_REQUIRED: string;
    SCOPES_ALREADY_GRANTED: string;
    BUTTON_SIZE_ICON: number;
    BUTTON_SIZE_WIDE: number;
    BUTTON_SIZE_STANDARD: number;
    // Modern sign-in specific constants
    ONE_TAP_START_FAILED: string;
  };
}

export const NativeModule =
  TurboModuleRegistry.getEnforcing<Spec>('RNGoogleSignin');