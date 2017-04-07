import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VIEWPORT_RULER_PROVIDER } from '../core/overlay/position/viewport-ruler';
import { MdRippleModule, CompatibilityModule, UNIQUE_SELECTION_DISPATCHER_PROVIDER, FocusOriginMonitor, } from '../core';
import { MdRadioGroup, MdRadioButton } from './radio';
export class MdRadioModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdRadioModule,
            providers: [],
        };
    }
}
MdRadioModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MdRippleModule, CompatibilityModule],
                exports: [MdRadioGroup, MdRadioButton, CompatibilityModule],
                providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER, VIEWPORT_RULER_PROVIDER, FocusOriginMonitor],
                declarations: [MdRadioGroup, MdRadioButton],
            },] },
];
/**
 * @nocollapse
 */
MdRadioModule.ctorParameters = () => [];
function MdRadioModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdRadioModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdRadioModule.ctorParameters;
}
export { MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR, MdRadioChange, MdRadioGroup, MdRadioButton } from './radio';
//# sourceMappingURL=index.js.map