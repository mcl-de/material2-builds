import { ComponentFactoryResolver, Injectable, ApplicationRef, Injector, NgZone, } from '@angular/core';
import { OverlayState } from './overlay-state';
import { DomPortalHost } from '../portal/dom-portal-host';
import { OverlayRef } from './overlay-ref';
import { OverlayPositionBuilder } from './position/overlay-position-builder';
import { VIEWPORT_RULER_PROVIDER } from './position/viewport-ruler';
import { OverlayContainer, OVERLAY_CONTAINER_PROVIDER } from './overlay-container';
import { SCROLL_DISPATCHER_PROVIDER } from './scroll/scroll-dispatcher';
/** Next overlay unique ID. */
let /** @type {?} */ nextUniqueId = 0;
/** The default state for newly created overlays. */
let /** @type {?} */ defaultState = new OverlayState();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
export class Overlay {
    /**
     * @param {?} _overlayContainer
     * @param {?} _componentFactoryResolver
     * @param {?} _positionBuilder
     * @param {?} _appRef
     * @param {?} _injector
     * @param {?} _ngZone
     */
    constructor(_overlayContainer, _componentFactoryResolver, _positionBuilder, _appRef, _injector, _ngZone) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._appRef = _appRef;
        this._injector = _injector;
        this._ngZone = _ngZone;
    }
    /**
     * Creates an overlay.
     * @param {?=} state State to apply to the overlay.
     * @return {?} Reference to the created overlay.
     */
    create(state = defaultState) {
        return this._createOverlayRef(this._createPaneElement(), state);
    }
    /**
     * Returns a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @return {?}
     */
    position() {
        return this._positionBuilder;
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @return {?} Newly-created pane element
     */
    _createPaneElement() {
        let /** @type {?} */ pane = document.createElement('div');
        pane.id = `cdk-overlay-${nextUniqueId++}`;
        pane.classList.add('cdk-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    }
    /**
     * Create a DomPortalHost into which the overlay content can be loaded.
     * @param {?} pane The DOM element to turn into a portal host.
     * @return {?} A portal host for the given DOM element.
     */
    _createPortalHost(pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef, this._injector);
    }
    /**
     * Creates an OverlayRef for an overlay in the given DOM element.
     * @param {?} pane DOM element for the overlay
     * @param {?} state
     * @return {?}
     */
    _createOverlayRef(pane, state) {
        return new OverlayRef(this._createPortalHost(pane), pane, state, this._ngZone);
    }
}
Overlay.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Overlay.ctorParameters = () => [
    { type: OverlayContainer, },
    { type: ComponentFactoryResolver, },
    { type: OverlayPositionBuilder, },
    { type: ApplicationRef, },
    { type: Injector, },
    { type: NgZone, },
];
function Overlay_tsickle_Closure_declarations() {
    /** @type {?} */
    Overlay.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Overlay.ctorParameters;
    /** @type {?} */
    Overlay.prototype._overlayContainer;
    /** @type {?} */
    Overlay.prototype._componentFactoryResolver;
    /** @type {?} */
    Overlay.prototype._positionBuilder;
    /** @type {?} */
    Overlay.prototype._appRef;
    /** @type {?} */
    Overlay.prototype._injector;
    /** @type {?} */
    Overlay.prototype._ngZone;
}
/** Providers for Overlay and its related injectables. */
export const /** @type {?} */ OVERLAY_PROVIDERS = [
    Overlay,
    OverlayPositionBuilder,
    VIEWPORT_RULER_PROVIDER,
    SCROLL_DISPATCHER_PROVIDER,
    OVERLAY_CONTAINER_PROVIDER,
];
//# sourceMappingURL=overlay.js.map