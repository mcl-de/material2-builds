import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdSelect } from './select';
import { MdOptionModule } from '../core/option/option';
import { CompatibilityModule, OverlayModule } from '../core';
export class MdSelectModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdSelectModule,
            providers: []
        };
    }
}
MdSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    MdOptionModule,
                    CompatibilityModule,
                ],
                exports: [MdSelect, MdOptionModule, CompatibilityModule],
                declarations: [MdSelect],
            },] },
];
/**
 * @nocollapse
 */
MdSelectModule.ctorParameters = () => [];
function MdSelectModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSelectModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSelectModule.ctorParameters;
}
export { SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT, SELECT_MAX_OPTIONS_DISPLAYED, SELECT_TRIGGER_HEIGHT, SELECT_OPTION_HEIGHT_ADJUSTMENT, SELECT_PANEL_PADDING_X, SELECT_MULTIPLE_PANEL_PADDING_X, SELECT_PANEL_PADDING_Y, SELECT_PANEL_VIEWPORT_PADDING, MdSelectChange, MdSelect } from './select';
export { fadeInContent, transformPanel, transformPlaceholder } from './select-animations';
//# sourceMappingURL=index.js.map