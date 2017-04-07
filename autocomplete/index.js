import { NgModule } from '@angular/core';
import { MdOptionModule, OverlayModule, OVERLAY_PROVIDERS, CompatibilityModule } from '../core';
import { CommonModule } from '@angular/common';
import { MdAutocomplete } from './autocomplete';
import { MdAutocompleteTrigger } from './autocomplete-trigger';
export class MdAutocompleteModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdAutocompleteModule,
            providers: [OVERLAY_PROVIDERS]
        };
    }
}
MdAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdOptionModule, OverlayModule, CompatibilityModule, CommonModule],
                exports: [MdAutocomplete, MdOptionModule, MdAutocompleteTrigger, CompatibilityModule],
                declarations: [MdAutocomplete, MdAutocompleteTrigger],
            },] },
];
/**
 * @nocollapse
 */
MdAutocompleteModule.ctorParameters = () => [];
function MdAutocompleteModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdAutocompleteModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdAutocompleteModule.ctorParameters;
}
export { MdAutocomplete } from './autocomplete';
export { AUTOCOMPLETE_OPTION_HEIGHT, AUTOCOMPLETE_PANEL_HEIGHT, MD_AUTOCOMPLETE_VALUE_ACCESSOR, MdAutocompleteTrigger } from './autocomplete-trigger';
//# sourceMappingURL=index.js.map