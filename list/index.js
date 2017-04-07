import { NgModule } from '@angular/core';
import { MdLineModule, MdRippleModule, CompatibilityModule } from '../core';
import { MdList, MdListItem, MdListDivider, MdListAvatarCssMatStyler, MdListIconCssMatStyler, MdListCssMatStyler, MdNavListCssMatStyler, MdDividerCssMatStyler, MdListSubheaderCssMatStyler, MdNavListTokenSetter, } from './list';
export class MdListModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdListModule,
            providers: []
        };
    }
}
MdListModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdLineModule, MdRippleModule, CompatibilityModule],
                exports: [
                    MdList,
                    MdListItem,
                    MdListDivider,
                    MdListAvatarCssMatStyler,
                    MdLineModule,
                    CompatibilityModule,
                    MdListIconCssMatStyler,
                    MdListCssMatStyler,
                    MdNavListCssMatStyler,
                    MdDividerCssMatStyler,
                    MdListSubheaderCssMatStyler,
                    MdNavListTokenSetter,
                ],
                declarations: [
                    MdList,
                    MdListItem,
                    MdListDivider,
                    MdListAvatarCssMatStyler,
                    MdListIconCssMatStyler,
                    MdListCssMatStyler,
                    MdNavListCssMatStyler,
                    MdDividerCssMatStyler,
                    MdListSubheaderCssMatStyler,
                    MdNavListTokenSetter,
                ],
            },] },
];
/**
 * @nocollapse
 */
MdListModule.ctorParameters = () => [];
function MdListModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdListModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdListModule.ctorParameters;
}
export { MdListDivider, LIST_TYPE_TOKEN, MdList, MdListCssMatStyler, MdNavListCssMatStyler, MdNavListTokenSetter, MdDividerCssMatStyler, MdListAvatarCssMatStyler, MdListIconCssMatStyler, MdListSubheaderCssMatStyler, MdListItem } from './list';
//# sourceMappingURL=index.js.map