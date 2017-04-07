import { NgModule } from '@angular/core';
import { CompatibilityModule } from '../core';
import { MdProgressSpinner, MdSpinner, MdProgressSpinnerCssMatStyler, } from './progress-spinner';
class MdProgressSpinnerModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdProgressSpinnerModule,
            providers: []
        };
    }
}
MdProgressSpinnerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CompatibilityModule],
                exports: [
                    MdProgressSpinner,
                    MdSpinner,
                    CompatibilityModule,
                    MdProgressSpinnerCssMatStyler
                ],
                declarations: [
                    MdProgressSpinner,
                    MdSpinner,
                    MdProgressSpinnerCssMatStyler
                ],
            },] },
];
/**
 * @nocollapse
 */
MdProgressSpinnerModule.ctorParameters = () => [];
function MdProgressSpinnerModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdProgressSpinnerModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdProgressSpinnerModule.ctorParameters;
}
export { MdProgressSpinnerModule };
export { MdProgressSpinnerCssMatStyler, MdProgressSpinner, MdSpinner } from './progress-spinner';
//# sourceMappingURL=index.js.map