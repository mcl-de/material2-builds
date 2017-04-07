import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CompatibilityModule } from '../core';
import { MdIcon, ICON_REGISTRY_PROVIDER } from './icon';
export class MdIconModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdIconModule,
            providers: [],
        };
    }
}
MdIconModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpModule, CompatibilityModule],
                exports: [MdIcon, CompatibilityModule],
                declarations: [MdIcon],
                providers: [ICON_REGISTRY_PROVIDER],
            },] },
];
/**
 * @nocollapse
 */
MdIconModule.ctorParameters = () => [];
function MdIconModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdIconModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdIconModule.ctorParameters;
}
export { MdIconInvalidNameError, MdIcon, ICON_REGISTRY_PROVIDER_FACTORY, ICON_REGISTRY_PROVIDER } from './icon';
export { MdIconRegistry } from './icon-registry';
//# sourceMappingURL=index.js.map