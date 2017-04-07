import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompatibilityModule } from '../core/compatibility/compatibility';
import { MdProgressBar } from './progress-bar';
export class MdProgressBarModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdProgressBarModule,
            providers: []
        };
    }
}
MdProgressBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CompatibilityModule],
                exports: [MdProgressBar, CompatibilityModule],
                declarations: [MdProgressBar],
            },] },
];
/**
 * @nocollapse
 */
MdProgressBarModule.ctorParameters = () => [];
function MdProgressBarModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdProgressBarModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdProgressBarModule.ctorParameters;
}
export { MdProgressBar } from './progress-bar';
//# sourceMappingURL=index.js.map