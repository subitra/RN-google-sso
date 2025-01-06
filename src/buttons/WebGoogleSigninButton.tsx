import React from 'react';
import type { GsiButtonConfiguration } from 'google-one-tap';

/**
 * @group React Components
 * */
export type WebGoogleSignInButtonProps = Omit<
  GsiButtonConfiguration,
  'logo_alignment'
> & {
  logoAlignment?: GsiButtonConfiguration['logo_alignment'];
  onError?: ((error: Error) => void) | undefined;
};
/**
 * @group React Components
 * */
// we're silencing error to have nicer generated docs
// @ts-ignore unused param
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WebGoogleSigninButton = (props: WebGoogleSignInButtonProps) => {
  // we return JSX.Element so that the type is the same as for web version
  return <></>;
};
