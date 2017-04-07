import { Injectable, Optional, SkipSelf } from '@angular/core';
import { ComponentPortal, Overlay, OverlayState, LiveAnnouncer, } from '../core';
import { MdSnackBarConfig } from './snack-bar-config';
import { MdSnackBarRef } from './snack-bar-ref';
import { MdSnackBarContainer } from './snack-bar-container';
import { SimpleSnackBar } from './simple-snack-bar';
import { extendObject } from '../core/util/object-extend';
/**
 * Service to dispatch Material Design snack bar messages.
 */
export class MdSnackBar {
    /**
     * @param {?} _overlay
     * @param {?} _live
     * @param {?} _parentSnackBar
     */
    constructor(_overlay, _live, _parentSnackBar) {
        this._overlay = _overlay;
        this._live = _live;
        this._parentSnackBar = _parentSnackBar;
    }
    /**
     * Reference to the currently opened snackbar at *any* level.
     * @return {?}
     */
    get _openedSnackBarRef() {
        return this._parentSnackBar ?
            this._parentSnackBar._openedSnackBarRef : this._snackBarRefAtThisLevel;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set _openedSnackBarRef(value) {
        if (this._parentSnackBar) {
            this._parentSnackBar._openedSnackBarRef = value;
        }
        else {
            this._snackBarRefAtThisLevel = value;
        }
    }
    /**
     * Creates and dispatches a snack bar with a custom component for the content, removing any
     * currently opened snack bars.
     *
     * @template T
     * @param {?} component Component to be instantiated.
     * @param {?=} config Extra configuration for the snack bar.
     * @return {?}
     */
    openFromComponent(component, config) {
        config = _applyConfigDefaults(config);
        let /** @type {?} */ overlayRef = this._createOverlay();
        let /** @type {?} */ snackBarContainer = this._attachSnackBarContainer(overlayRef, config);
        let /** @type {?} */ snackBarRef = this._attachSnackbarContent(component, snackBarContainer, overlayRef);
        // When the snackbar is dismissed, clear the reference to it.
        snackBarRef.afterDismissed().subscribe(() => {
            // Clear the snackbar ref if it hasn't already been replaced by a newer snackbar.
            if (this._openedSnackBarRef == snackBarRef) {
                this._openedSnackBarRef = null;
            }
        });
        // If a snack bar is already in view, dismiss it and enter the new snack bar after exit
        // animation is complete.
        if (this._openedSnackBarRef) {
            this._openedSnackBarRef.afterDismissed().subscribe(() => {
                snackBarRef.containerInstance.enter();
            });
            this._openedSnackBarRef.dismiss();
        }
        else {
            snackBarRef.containerInstance.enter();
        }
        // If a dismiss timeout is provided, set up dismiss based on after the snackbar is opened.
        if (config.duration > 0) {
            snackBarRef.afterOpened().subscribe(() => {
                setTimeout(() => snackBarRef.dismiss(), config.duration);
            });
        }
        this._live.announce(config.announcementMessage, config.politeness);
        this._openedSnackBarRef = snackBarRef;
        return this._openedSnackBarRef;
    }
    /**
     * Opens a snackbar with a message and an optional action.
     * @param {?} message The message to show in the snackbar.
     * @param {?=} action The label for the snackbar action.
     * @param {?=} config Additional configuration options for the snackbar.
     * @return {?}
     */
    open(message, action = '', config = {}) {
        config.announcementMessage = message;
        let /** @type {?} */ simpleSnackBarRef = this.openFromComponent(SimpleSnackBar, config);
        simpleSnackBarRef.instance.snackBarRef = simpleSnackBarRef;
        simpleSnackBarRef.instance.message = message;
        simpleSnackBarRef.instance.action = action;
        return simpleSnackBarRef;
    }
    /**
     * Dismisses the currently-visible snack bar.
     * @return {?}
     */
    dismiss() {
        if (this._openedSnackBarRef) {
            this._openedSnackBarRef.dismiss();
        }
    }
    /**
     * Attaches the snack bar container component to the overlay.
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    _attachSnackBarContainer(overlayRef, config) {
        let /** @type {?} */ containerPortal = new ComponentPortal(MdSnackBarContainer, config.viewContainerRef);
        let /** @type {?} */ containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.snackBarConfig = config;
        return containerRef.instance;
    }
    /**
     * Places a new component as the content of the snack bar container.
     * @template T
     * @param {?} component
     * @param {?} container
     * @param {?} overlayRef
     * @return {?}
     */
    _attachSnackbarContent(component, container, overlayRef) {
        let /** @type {?} */ portal = new ComponentPortal(component);
        let /** @type {?} */ contentRef = container.attachComponentPortal(portal);
        return new MdSnackBarRef(contentRef.instance, container, overlayRef);
    }
    /**
     * Creates a new overlay and places it in the correct location.
     * @return {?}
     */
    _createOverlay() {
        let /** @type {?} */ state = new OverlayState();
        state.positionStrategy = this._overlay.position().global()
            .centerHorizontally()
            .bottom('0');
        return this._overlay.create(state);
    }
}
MdSnackBar.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
MdSnackBar.ctorParameters = () => [
    { type: Overlay, },
    { type: LiveAnnouncer, },
    { type: MdSnackBar, decorators: [{ type: Optional }, { type: SkipSelf },] },
];
function MdSnackBar_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSnackBar.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSnackBar.ctorParameters;
    /**
     * Reference to the current snack bar in the view *at this level* (in the Angular injector tree).
     * If there is a parent snack-bar service, all operations should delegate to that parent
     * via `_openedSnackBarRef`.
     * @type {?}
     */
    MdSnackBar.prototype._snackBarRefAtThisLevel;
    /** @type {?} */
    MdSnackBar.prototype._overlay;
    /** @type {?} */
    MdSnackBar.prototype._live;
    /** @type {?} */
    MdSnackBar.prototype._parentSnackBar;
}
/**
 * Applies default options to the snackbar config.
 * @param {?} config The configuration to which the defaults will be applied.
 * @return {?} The new configuration object with defaults applied.
 */
function _applyConfigDefaults(config) {
    return extendObject(new MdSnackBarConfig(), config);
}
//# sourceMappingURL=snack-bar.js.map