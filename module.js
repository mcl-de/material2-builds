import { NgModule } from '@angular/core';
import { MdRippleModule, RtlModule, ObserveContentModule, PortalModule, OverlayModule, A11yModule, CompatibilityModule, } from './core/index';
import { MdButtonToggleModule } from './button-toggle/index';
import { MdButtonModule } from './button/index';
import { MdCheckboxModule } from './checkbox/index';
import { MdRadioModule } from './radio/index';
import { MdSelectModule } from './select/index';
import { MdSlideToggleModule } from './slide-toggle/index';
import { MdSliderModule } from './slider/index';
import { MdSidenavModule } from './sidenav/index';
import { MdListModule } from './list/index';
import { MdGridListModule } from './grid-list/index';
import { MdCardModule } from './card/index';
import { MdChipsModule } from './chips/index';
import { MdIconModule } from './icon/index';
import { MdProgressSpinnerModule } from './progress-spinner/index';
import { MdProgressBarModule } from './progress-bar/index';
import { MdInputModule } from './input/index';
import { MdSnackBarModule } from './snack-bar/index';
import { MdTabsModule } from './tabs/index';
import { MdToolbarModule } from './toolbar/index';
import { MdTooltipModule } from './tooltip/index';
import { MdMenuModule } from './menu/index';
import { MdDialogModule } from './dialog/index';
import { PlatformModule } from './core/platform/index';
import { MdAutocompleteModule } from './autocomplete/index';
import { StyleModule } from './core/style/index';
const /** @type {?} */ MATERIAL_MODULES = [
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdCheckboxModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    OverlayModule,
    PortalModule,
    RtlModule,
    StyleModule,
    A11yModule,
    PlatformModule,
    CompatibilityModule,
    ObserveContentModule
];
/**
 * @deprecated
 */
export class MaterialRootModule {
}
MaterialRootModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MdAutocompleteModule.forRoot(),
                    MdButtonModule.forRoot(),
                    MdCardModule.forRoot(),
                    MdChipsModule.forRoot(),
                    MdCheckboxModule.forRoot(),
                    MdGridListModule.forRoot(),
                    MdInputModule.forRoot(),
                    MdListModule.forRoot(),
                    MdProgressBarModule.forRoot(),
                    MdProgressSpinnerModule.forRoot(),
                    MdRippleModule.forRoot(),
                    MdSelectModule.forRoot(),
                    MdSidenavModule.forRoot(),
                    MdTabsModule.forRoot(),
                    MdToolbarModule.forRoot(),
                    PortalModule.forRoot(),
                    RtlModule.forRoot(),
                    ObserveContentModule.forRoot(),
                    // These modules include providers.
                    A11yModule.forRoot(),
                    MdButtonToggleModule.forRoot(),
                    MdDialogModule.forRoot(),
                    MdIconModule.forRoot(),
                    MdMenuModule.forRoot(),
                    MdRadioModule.forRoot(),
                    MdSliderModule.forRoot(),
                    MdSlideToggleModule.forRoot(),
                    MdSnackBarModule.forRoot(),
                    MdTooltipModule.forRoot(),
                    PlatformModule.forRoot(),
                    OverlayModule.forRoot(),
                    CompatibilityModule.forRoot(),
                ],
                exports: MATERIAL_MODULES,
            },] },
];
/**
 * @nocollapse
 */
MaterialRootModule.ctorParameters = () => [];
function MaterialRootModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialRootModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialRootModule.ctorParameters;
}
/**
 * @deprecated
 */
export class MaterialModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return { ngModule: MaterialRootModule };
    }
}
MaterialModule.decorators = [
    { type: NgModule, args: [{
                imports: MATERIAL_MODULES,
                exports: MATERIAL_MODULES,
            },] },
];
/**
 * @nocollapse
 */
MaterialModule.ctorParameters = () => [];
function MaterialModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterialModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MaterialModule.ctorParameters;
}
//# sourceMappingURL=module.js.map