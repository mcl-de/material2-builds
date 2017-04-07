import { NgModule } from '@angular/core';
import { MdLineModule } from './line/line';
import { RtlModule } from './rtl/dir';
import { ObserveContentModule } from './observe-content/observe-content';
import { MdOptionModule } from './option/option';
import { PortalModule } from './portal/portal-directives';
import { OverlayModule } from './overlay/overlay-directives';
import { A11yModule } from './a11y/index';
import { MdSelectionModule } from './selection/index';
import { MdRippleModule } from './ripple/index';
// RTL
export { Dir, RtlModule } from './rtl/dir';
// Mutation Observer
export { ObserveContentModule, ObserveContent } from './observe-content/observe-content';
export { MdOptionModule, MdOption } from './option/option';
// Portals
export { Portal, BasePortalHost, ComponentPortal, TemplatePortal } from './portal/portal';
export { PortalHostDirective, TemplatePortalDirective, PortalModule, } from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';
// Platform
export { PlatformModule, Platform, getSupportedInputTypes } from './platform/index';
// Overlay
export { Overlay, OVERLAY_PROVIDERS } from './overlay/overlay';
export { OverlayContainer } from './overlay/overlay-container';
export { FullscreenOverlayContainer } from './overlay/fullscreen-overlay-container';
export { OverlayRef } from './overlay/overlay-ref';
export { OverlayState } from './overlay/overlay-state';
export { ConnectedOverlayDirective, OverlayOrigin, OverlayModule, } from './overlay/overlay-directives';
export { GlobalPositionStrategy } from './overlay/position/global-position-strategy';
export { ConnectedPositionStrategy } from './overlay/position/connected-position-strategy';
export { ConnectionPositionPair, ScrollableViewProperties, ConnectedOverlayPositionChange } from './overlay/position/connected-position';
export { ScrollDispatcher } from './overlay/scroll/scroll-dispatcher';
// Gestures
export { GestureConfig } from './gestures/gesture-config';
// Ripple
export { MdRipple, MD_RIPPLE_GLOBAL_OPTIONS, RippleRef, RippleState, RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION, MdRippleModule } from './ripple/index';
// a11y
export { LiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN, LIVE_ANNOUNCER_PROVIDER, } from './a11y/live-announcer';
// Selection
export { SelectionModel, SelectionChange } from './selection/selection';
export { FocusTrap, FocusTrapFactory, FocusTrapDeprecatedDirective, FocusTrapDirective } from './a11y/focus-trap';
export { InteractivityChecker } from './a11y/interactivity-checker';
export { isFakeMousedownFromScreenReader } from './a11y/fake-mousedown';
export { A11yModule } from './a11y/index';
export { UniqueSelectionDispatcher, UNIQUE_SELECTION_DISPATCHER_PROVIDER, } from './coordination/unique-selection-dispatcher';
export { MdLineModule, MdLine, MdLineSetter } from './line/line';
// Style
export { StyleModule, TOUCH_BUFFER_MS, FocusOriginMonitor, CdkMonitorFocus, FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY, FOCUS_ORIGIN_MONITOR_PROVIDER, applyCssTransform } from './style/index';
// Error
export { MdError } from './errors/error';
// Keybindings
export { UP_ARROW, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, PAGE_UP, PAGE_DOWN, HOME, END, ENTER, SPACE, TAB, ESCAPE, BACKSPACE, DELETE } from './keyboard/keycodes';
export { MATERIAL_COMPATIBILITY_MODE, MAT_ELEMENTS_SELECTOR, MD_ELEMENTS_SELECTOR, MatPrefixRejector, MdPrefixRejector } from './compatibility/compatibility';
// Animation
export { AnimationCurves, AnimationDurations } from './animation/animation';
// Selection
export { MdSelectionModule, MdPseudoCheckbox } from './selection/index';
// Coercion
export { coerceBooleanProperty } from './coercion/boolean-property';
export { coerceNumberProperty } from './coercion/number-property';
// Compatibility
export { CompatibilityModule, NoConflictStyleCompatibilityMode } from './compatibility/compatibility';
export class MdCoreModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdCoreModule,
            providers: [],
        };
    }
}
MdCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    MdLineModule,
                    RtlModule,
                    MdRippleModule,
                    ObserveContentModule,
                    PortalModule,
                    OverlayModule,
                    A11yModule,
                    MdOptionModule,
                    MdSelectionModule,
                ],
                exports: [
                    MdLineModule,
                    RtlModule,
                    MdRippleModule,
                    ObserveContentModule,
                    PortalModule,
                    OverlayModule,
                    A11yModule,
                    MdOptionModule,
                    MdSelectionModule,
                ],
            },] },
];
/**
 * @nocollapse
 */
MdCoreModule.ctorParameters = () => [];
function MdCoreModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdCoreModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdCoreModule.ctorParameters;
}
//# sourceMappingURL=core.js.map