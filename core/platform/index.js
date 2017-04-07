import { NgModule } from '@angular/core';
import { Platform } from './platform';
export class PlatformModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: PlatformModule,
            providers: [],
        };
    }
}
PlatformModule.decorators = [
    { type: NgModule, args: [{
                providers: [Platform]
            },] },
];
/**
 * @nocollapse
 */
PlatformModule.ctorParameters = () => [];
function PlatformModule_tsickle_Closure_declarations() {
    /** @type {?} */
    PlatformModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PlatformModule.ctorParameters;
}
export { Platform } from './platform';
export { getSupportedInputTypes } from './features';
//# sourceMappingURL=index.js.map