import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdButtonToggle } from './button-toggle';
import { UNIQUE_SELECTION_DISPATCHER_PROVIDER, CompatibilityModule, FocusOriginMonitor, } from '../core';
export class MdButtonToggleModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdButtonToggleModule,
            providers: []
        };
    }
}
MdButtonToggleModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule, CompatibilityModule],
                exports: [
                    MdButtonToggleGroup,
                    MdButtonToggleGroupMultiple,
                    MdButtonToggle,
                    CompatibilityModule,
                ],
                declarations: [MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdButtonToggle],
                providers: [UNIQUE_SELECTION_DISPATCHER_PROVIDER, FocusOriginMonitor]
            },] },
];
/**
 * @nocollapse
 */
MdButtonToggleModule.ctorParameters = () => [];
function MdButtonToggleModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdButtonToggleModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdButtonToggleModule.ctorParameters;
}
export { MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR, MdButtonToggleChange, MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdButtonToggle } from './button-toggle';
//# sourceMappingURL=index.js.map