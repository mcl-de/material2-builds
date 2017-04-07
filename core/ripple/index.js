import { NgModule } from '@angular/core';
import { MdRipple } from './ripple';
import { CompatibilityModule } from '../compatibility/compatibility';
import { VIEWPORT_RULER_PROVIDER } from '../overlay/position/viewport-ruler';
import { SCROLL_DISPATCHER_PROVIDER } from '../overlay/scroll/scroll-dispatcher';
export { MdRipple, MD_RIPPLE_GLOBAL_OPTIONS } from './ripple';
export { RippleRef, RippleState } from './ripple-ref';
export { RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION } from './ripple-renderer';
export class MdRippleModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdRippleModule,
            providers: []
        };
    }
}
MdRippleModule.decorators = [
    { type: NgModule, args: [{
                imports: [CompatibilityModule],
                exports: [MdRipple, CompatibilityModule],
                declarations: [MdRipple],
                providers: [VIEWPORT_RULER_PROVIDER, SCROLL_DISPATCHER_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
MdRippleModule.ctorParameters = () => [];
function MdRippleModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdRippleModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdRippleModule.ctorParameters;
}
//# sourceMappingURL=index.js.map