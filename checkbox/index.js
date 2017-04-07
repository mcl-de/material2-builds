import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdRippleModule, CompatibilityModule, FocusOriginMonitor } from '../core';
import { MdCheckbox } from './checkbox';
export class MdCheckboxModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdCheckboxModule,
            providers: []
        };
    }
}
MdCheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MdRippleModule, CompatibilityModule],
                exports: [MdCheckbox, CompatibilityModule],
                declarations: [MdCheckbox],
                providers: [FocusOriginMonitor]
            },] },
];
/**
 * @nocollapse
 */
MdCheckboxModule.ctorParameters = () => [];
function MdCheckboxModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdCheckboxModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdCheckboxModule.ctorParameters;
}
export { MD_CHECKBOX_CONTROL_VALUE_ACCESSOR, TransitionCheckState, MdCheckboxChange, MdCheckbox } from './checkbox';
//# sourceMappingURL=index.js.map