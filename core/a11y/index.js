import { NgModule } from '@angular/core';
import { FocusTrapDirective, FocusTrapDeprecatedDirective, FocusTrapFactory } from './focus-trap';
import { LIVE_ANNOUNCER_PROVIDER } from './live-announcer';
import { InteractivityChecker } from './interactivity-checker';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '../platform/index';
export class A11yModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: A11yModule,
            providers: [],
        };
    }
}
A11yModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PlatformModule],
                declarations: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                exports: [FocusTrapDirective, FocusTrapDeprecatedDirective],
                providers: [InteractivityChecker, FocusTrapFactory, LIVE_ANNOUNCER_PROVIDER]
            },] },
];
/**
 * @nocollapse
 */
A11yModule.ctorParameters = () => [];
function A11yModule_tsickle_Closure_declarations() {
    /** @type {?} */
    A11yModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    A11yModule.ctorParameters;
}
//# sourceMappingURL=index.js.map