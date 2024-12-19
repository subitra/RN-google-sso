export declare const GoogleOneTapSignIn: {
    signIn: import("./types").SignInInterface;
    createAccount: import("./types").CreateAccountInterface;
    signOut: (emailOrUniqueId: string) => Promise<null>;
    presentExplicitSignIn: import("./types").ExplicitSignInInterface;
    requestAuthorization: (options: import("./types").RequestAuthorizationParams) => Promise<import("./types").AuthorizationResponse>;
    configure: (params: import("./types").OneTapConfigureParams) => void;
    checkPlayServices: (showErrorResolutionDialog?: boolean) => Promise<import("./types").PlayServicesInfo>;
    enableAppCheck: () => Promise<null>;
};
//# sourceMappingURL=OneTapSignIn.android.d.ts.map