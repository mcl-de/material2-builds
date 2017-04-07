import { NgModule } from '@angular/core';
import { OverlayModule, PortalModule, CompatibilityModule, LIVE_ANNOUNCER_PROVIDER } from '../core';
import { CommonModule } from '@angular/common';
import { MdSnackBar } from './snack-bar';
import { MdSnackBarContainer } from './snack-bar-container';
import { SimpleSnackBar } from './simple-snack-bar';
export class MdSnackBarModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdSnackBarModule,
            providers: []
        };
    }
}
MdSnackBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    OverlayModule,
                    PortalModule,
                    CommonModule,
                    CompatibilityModule,
                ],
                exports: [MdSnackBarContainer, CompatibilityModule],
                declarations: [MdSnackBarContainer, SimpleSnackBar],
                entryComponents: [MdSnackBarContainer, SimpleSnackBar],
                providers: [MdSnackBar, LIVE_ANNOUNCER_PROVIDER]
            },] },
];
/**
 * @nocollapse
 */
MdSnackBarModule.ctorParameters = () => [];
function MdSnackBarModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSnackBarModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSnackBarModule.ctorParameters;
}
export { MdSnackBar } from './snack-bar';
export { SHOW_ANIMATION, HIDE_ANIMATION, MdSnackBarContainer } from './snack-bar-container';
export { MdSnackBarConfig } from './snack-bar-config';
export { MdSnackBarRef } from './snack-bar-ref';
export { SimpleSnackBar } from './simple-snack-bar';
//# sourceMappingURL=index.js.map