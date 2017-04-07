import { NgModule } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompatibilityModule, GestureConfig, StyleModule } from '../core';
import { MdSlider } from './slider';
import { RtlModule } from '../core/rtl/dir';
export class MdSliderModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdSliderModule,
            providers: []
        };
    }
}
MdSliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, CompatibilityModule, StyleModule, RtlModule],
                exports: [MdSlider, CompatibilityModule],
                declarations: [MdSlider],
                providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }]
            },] },
];
/**
 * @nocollapse
 */
MdSliderModule.ctorParameters = () => [];
function MdSliderModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSliderModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSliderModule.ctorParameters;
}
export { MD_SLIDER_VALUE_ACCESSOR, MdSliderChange, MdSlider, SliderRenderer } from './slider';
//# sourceMappingURL=index.js.map