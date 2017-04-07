import { NgModule } from '@angular/core';
import { MdLineModule, CompatibilityModule } from '../core';
import { MdGridTile, MdGridTileText, MdGridTileFooterCssMatStyler, MdGridTileHeaderCssMatStyler, MdGridAvatarCssMatStyler } from './grid-tile';
import { MdGridList } from './grid-list';
export class MdGridListModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdGridListModule,
            providers: []
        };
    }
}
MdGridListModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdLineModule, CompatibilityModule],
                exports: [
                    MdGridList,
                    MdGridTile,
                    MdGridTileText,
                    MdLineModule,
                    CompatibilityModule,
                    MdGridTileHeaderCssMatStyler,
                    MdGridTileFooterCssMatStyler,
                    MdGridAvatarCssMatStyler
                ],
                declarations: [
                    MdGridList,
                    MdGridTile,
                    MdGridTileText,
                    MdGridTileHeaderCssMatStyler,
                    MdGridTileFooterCssMatStyler,
                    MdGridAvatarCssMatStyler
                ],
            },] },
];
/**
 * @nocollapse
 */
MdGridListModule.ctorParameters = () => [];
function MdGridListModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdGridListModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdGridListModule.ctorParameters;
}
export { MdGridList } from './grid-list';
//# sourceMappingURL=index.js.map