import { NgModule } from '@angular/core';
import { OverlayModule, CompatibilityModule } from '../core';
import { PlatformModule } from '../core/platform/index';
import { MdTooltip, TooltipComponent } from './tooltip';
export class MdTooltipModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdTooltipModule,
            providers: []
        };
    }
}
MdTooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [OverlayModule, CompatibilityModule, PlatformModule],
                exports: [MdTooltip, TooltipComponent, CompatibilityModule],
                declarations: [MdTooltip, TooltipComponent],
                entryComponents: [TooltipComponent],
            },] },
];
/**
 * @nocollapse
 */
MdTooltipModule.ctorParameters = () => [];
function MdTooltipModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTooltipModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTooltipModule.ctorParameters;
}
export { TOUCHEND_HIDE_DELAY, SCROLL_THROTTLE_MS, MdTooltip, TooltipComponent } from './tooltip';
//# sourceMappingURL=index.js.map