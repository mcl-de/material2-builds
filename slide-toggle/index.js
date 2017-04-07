import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MdSlideToggle } from './slide-toggle';
import { GestureConfig, CompatibilityModule, MdRippleModule, FOCUS_ORIGIN_MONITOR_PROVIDER } from '../core';
export class MdSlideToggleModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdSlideToggleModule,
            providers: []
        };
    }
}
MdSlideToggleModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule, MdRippleModule, CompatibilityModule],
                exports: [MdSlideToggle, CompatibilityModule],
                declarations: [MdSlideToggle],
                providers: [
                    FOCUS_ORIGIN_MONITOR_PROVIDER,
                    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
                ],
            },] },
];
/**
 * @nocollapse
 */
MdSlideToggleModule.ctorParameters = () => [];
function MdSlideToggleModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSlideToggleModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSlideToggleModule.ctorParameters;
}
export { MD_SLIDE_TOGGLE_VALUE_ACCESSOR, MdSlideToggleChange, MdSlideToggle } from './slide-toggle';
//# sourceMappingURL=index.js.map