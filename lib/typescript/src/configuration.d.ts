import type { ConfigureParams } from './types';
import type { OneTapConfigureParams } from './oneTap/types';
export declare const setConfiguration: (configuration: OneTapConfigureParams | ConfigureParams, requireWebClientId: boolean) => void;
export declare const getConfiguration: () => ConfigureParams | OneTapConfigureParams | undefined;
export declare const unsetConfigurationTestsOnly: () => void;
export declare function throwMissingConfig(): never;
export declare function throwMissingWebClientId(): never;
export declare function throwIfNoConfigSet(): void;
//# sourceMappingURL=configuration.d.ts.map