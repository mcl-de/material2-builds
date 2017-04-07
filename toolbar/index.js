import { NgModule } from '@angular/core';
import { CompatibilityModule } from '../core';
import { MdToolbar, MdToolbarRow } from './toolbar';
export class MdToolbarModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdToolbarModule,
            providers: []
        };
    }
}
MdToolbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CompatibilityModule],
                exports: [MdToolbar, MdToolbarRow, CompatibilityModule],
                declarations: [MdToolbar, MdToolbarRow],
            },] },
];
/**
 * @nocollapse
 */
MdToolbarModule.ctorParameters = () => [];
function MdToolbarModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdToolbarModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdToolbarModule.ctorParameters;
}
export { MdToolbarRow, MdToolbar } from './toolbar';
//# sourceMappingURL=index.js.map