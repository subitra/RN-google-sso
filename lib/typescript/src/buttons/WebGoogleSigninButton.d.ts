import React from 'react';
import type { GsiButtonConfiguration } from 'google-one-tap';
/**
 * @group React Components
 * */
export type WebGoogleSignInButtonProps = Omit<GsiButtonConfiguration, 'logo_alignment'> & {
    logoAlignment?: GsiButtonConfiguration['logo_alignment'];
    onError?: ((error: Error) => void) | undefined;
};
/**
 * @group React Components
 * */
export declare const WebGoogleSigninButton: (props: WebGoogleSignInButtonProps) => React.JSX.Element;
//# sourceMappingURL=WebGoogleSigninButton.d.ts.map