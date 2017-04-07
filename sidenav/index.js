import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompatibilityModule } from '../core';
import { A11yModule } from '../core/a11y/index';
import { OverlayModule } from '../core/overlay/overlay-directives';
import { MdSidenav, MdSidenavContainer } from './sidenav';
export class MdSidenavModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdSidenavModule,
            providers: []
        };
    }
}
MdSidenavModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CompatibilityModule, A11yModule, OverlayModule],
                exports: [MdSidenavContainer, MdSidenav, CompatibilityModule],
                declarations: [MdSidenavContainer, MdSidenav],
            },] },
];
/**
 * @nocollapse
 */
MdSidenavModule.ctorParameters = () => [];
function MdSidenavModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSidenavModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSidenavModule.ctorParameters;
}
export { MdDuplicatedSidenavError, MdSidenavToggleResult, MdSidenav, MdSidenavContainer } from './sidenav';
//# sourceMappingURL=index.js.map