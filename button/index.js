import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompatibilityModule, MdRippleModule, StyleModule } from '../core';
import { MdAnchor, MdButton, MdButtonCssMatStyler, MdFabCssMatStyler, MdIconButtonCssMatStyler, MdMiniFabCssMatStyler, MdRaisedButtonCssMatStyler } from './button';
export { MdButtonCssMatStyler, MdRaisedButtonCssMatStyler, MdIconButtonCssMatStyler, MdFabCssMatStyler, MdMiniFabCssMatStyler, MdButton, MdAnchor } from './button';
export class MdButtonModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdButtonModule,
            providers: []
        };
    }
}
MdButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MdRippleModule,
                    CompatibilityModule,
                    StyleModule,
                ],
                exports: [
                    MdButton,
                    MdAnchor,
                    CompatibilityModule,
                    MdButtonCssMatStyler,
                    MdRaisedButtonCssMatStyler,
                    MdIconButtonCssMatStyler,
                    MdFabCssMatStyler,
                    MdMiniFabCssMatStyler,
                ],
                declarations: [
                    MdButton,
                    MdAnchor,
                    MdButtonCssMatStyler,
                    MdRaisedButtonCssMatStyler,
                    MdIconButtonCssMatStyler,
                    MdFabCssMatStyler,
                    MdMiniFabCssMatStyler,
                ],
            },] },
];
/**
 * @nocollapse
 */
MdButtonModule.ctorParameters = () => [];
function MdButtonModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdButtonModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdButtonModule.ctorParameters;
}
//# sourceMappingURL=index.js.map