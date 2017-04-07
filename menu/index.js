import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, CompatibilityModule } from '../core';
import { MdMenu } from './menu-directive';
import { MdMenuItem } from './menu-item';
import { MdMenuTrigger } from './menu-trigger';
import { MdRippleModule } from '../core/ripple/index';
export class MdMenuModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdMenuModule,
            providers: [],
        };
    }
}
MdMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    OverlayModule,
                    CommonModule,
                    MdRippleModule,
                    CompatibilityModule,
                ],
                exports: [MdMenu, MdMenuItem, MdMenuTrigger, CompatibilityModule],
                declarations: [MdMenu, MdMenuItem, MdMenuTrigger],
            },] },
];
/**
 * @nocollapse
 */
MdMenuModule.ctorParameters = () => [];
function MdMenuModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdMenuModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdMenuModule.ctorParameters;
}
export { MdMenu, MdMenuItem, MdMenuTrigger } from './menu';
export { fadeInItems, transformMenu } from './menu-animations';
//# sourceMappingURL=index.js.map