import { NgModule } from '@angular/core';
import { CdkMonitorFocus, FOCUS_ORIGIN_MONITOR_PROVIDER } from './focus-origin-monitor';
export class StyleModule {
}
StyleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CdkMonitorFocus],
                exports: [CdkMonitorFocus],
                providers: [FOCUS_ORIGIN_MONITOR_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
StyleModule.ctorParameters = () => [];
function StyleModule_tsickle_Closure_declarations() {
    /** @type {?} */
    StyleModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    StyleModule.ctorParameters;
}
export { TOUCH_BUFFER_MS, FocusOriginMonitor, CdkMonitorFocus, FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY, FOCUS_ORIGIN_MONITOR_PROVIDER } from './focus-origin-monitor';
export { applyCssTransform } from './apply-transform';
//# sourceMappingURL=index.js.map