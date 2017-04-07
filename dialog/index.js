import { NgModule } from '@angular/core';
import { OverlayModule, PortalModule, A11yModule, CompatibilityModule, } from '../core';
import { MdDialog } from './dialog';
import { MdDialogContainer } from './dialog-container';
import { MdDialogClose, MdDialogContent, MdDialogTitle, MdDialogActions } from './dialog-content-directives';
export class MdDialogModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdDialogModule,
            providers: [],
        };
    }
}
MdDialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    OverlayModule,
                    PortalModule,
                    A11yModule,
                    CompatibilityModule,
                ],
                exports: [
                    MdDialogContainer,
                    MdDialogClose,
                    MdDialogTitle,
                    MdDialogContent,
                    MdDialogActions,
                    CompatibilityModule,
                ],
                declarations: [
                    MdDialogContainer,
                    MdDialogClose,
                    MdDialogTitle,
                    MdDialogActions,
                    MdDialogContent,
                ],
                providers: [
                    MdDialog,
                ],
                entryComponents: [MdDialogContainer],
            },] },
];
/**
 * @nocollapse
 */
MdDialogModule.ctorParameters = () => [];
function MdDialogModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdDialogModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdDialogModule.ctorParameters;
}
export { MdDialog } from './dialog';
export { MdDialogContainer } from './dialog-container';
export { MdDialogClose, MdDialogTitle, MdDialogContent, MdDialogActions } from './dialog-content-directives';
export { MdDialogConfig } from './dialog-config';
export { MdDialogRef } from './dialog-ref';
export { MD_DIALOG_DATA } from './dialog-injector';
//# sourceMappingURL=index.js.map