import { Injector, Injectable, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Overlay, OverlayState, ComponentPortal } from '../core';
import { extendObject } from '../core/util/object-extend';
import { ESCAPE } from '../core/keyboard/keycodes';
import { DialogInjector } from './dialog-injector';
import { MdDialogConfig } from './dialog-config';
import { MdDialogRef } from './dialog-ref';
import { MdDialogContainer } from './dialog-container';
import { TemplatePortal } from '../core/portal/portal';
import 'rxjs/add/operator/first';
/**
 * Service to open Material Design modal dialogs.
 */
export class MdDialog {
    /**
     * @param {?} _overlay
     * @param {?} _injector
     * @param {?} _parentDialog
     */
    constructor(_overlay, _injector, _parentDialog) {
        this._overlay = _overlay;
        this._injector = _injector;
        this._parentDialog = _parentDialog;
        this._openDialogsAtThisLevel = [];
        this._afterAllClosedAtThisLevel = new Subject();
        this._afterOpenAtThisLevel = new Subject();
        this._boundKeydown = this._handleKeydown.bind(this);
        /**
         * Gets an observable that is notified when a dialog has been opened.
         */
        this.afterOpen = this._afterOpen.asObservable();
        /**
         * Gets an observable that is notified when all open dialog have finished closing.
         */
        this.afterAllClosed = this._afterAllClosed.asObservable();
    }
    /**
     * Keeps track of the currently-open dialogs.
     * @return {?}
     */
    get _openDialogs() {
        return this._parentDialog ? this._parentDialog._openDialogs : this._openDialogsAtThisLevel;
    }
    /**
     * Subject for notifying the user that a dialog has opened.
     * @return {?}
     */
    get _afterOpen() {
        return this._parentDialog ? this._parentDialog._afterOpen : this._afterOpenAtThisLevel;
    }
    /**
     * Subject for notifying the user that all open dialogs have finished closing.
     * @return {?}
     */
    get _afterAllClosed() {
        return this._parentDialog ?
            this._parentDialog._afterAllClosed : this._afterAllClosedAtThisLevel;
    }
    /**
     * Opens a modal dialog containing the given component.
     * @template T
     * @param {?} componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param {?=} config Extra configuration options.
     * @return {?} Reference to the newly-opened dialog.
     */
    open(componentOrTemplateRef, config) {
        config = _applyConfigDefaults(config);
        let /** @type {?} */ overlayRef = this._createOverlay(config);
        let /** @type {?} */ dialogContainer = this._attachDialogContainer(overlayRef, config);
        let /** @type {?} */ dialogRef = this._attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        if (!this._openDialogs.length) {
            document.addEventListener('keydown', this._boundKeydown);
        }
        this._openDialogs.push(dialogRef);
        dialogRef.afterClosed().subscribe(() => this._removeOpenDialog(dialogRef));
        this._afterOpen.next(dialogRef);
        return dialogRef;
    }
    /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    closeAll() {
        let /** @type {?} */ i = this._openDialogs.length;
        while (i--) {
            // The `_openDialogs` property isn't updated after close until the rxjs subscription
            // runs on the next microtask, in addition to modifying the array as we're going
            // through it. We loop through all of them and call close without assuming that
            // they'll be removed from the list instantaneously.
            this._openDialogs[i].close();
        }
    }
    /**
     * Creates the overlay into which the dialog will be loaded.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the OverlayRef for the created overlay.
     */
    _createOverlay(config) {
        let /** @type {?} */ overlayState = this._getOverlayState(config);
        return this._overlay.create(overlayState);
    }
    /**
     * Creates an overlay state from a dialog config.
     * @param {?} dialogConfig The dialog configuration.
     * @return {?} The overlay configuration.
     */
    _getOverlayState(dialogConfig) {
        let /** @type {?} */ overlayState = new OverlayState();
        overlayState.hasBackdrop = true;
        overlayState.positionStrategy = this._overlay.position().global();
        return overlayState;
    }
    /**
     * Attaches an MdDialogContainer to a dialog's already-created overlay.
     * @param {?} overlay Reference to the dialog's underlying overlay.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to a ComponentRef for the attached container.
     */
    _attachDialogContainer(overlay, config) {
        let /** @type {?} */ viewContainer = config ? config.viewContainerRef : null;
        let /** @type {?} */ containerPortal = new ComponentPortal(MdDialogContainer, viewContainer);
        let /** @type {?} */ containerRef = overlay.attach(containerPortal);
        containerRef.instance.dialogConfig = config;
        return containerRef.instance;
    }
    /**
     * Attaches the user-provided component to the already-created MdDialogContainer.
     * @template T
     * @param {?} componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param {?} dialogContainer Reference to the wrapping MdDialogContainer.
     * @param {?} overlayRef Reference to the overlay in which the dialog resides.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the MdDialogRef that should be returned to the user.
     */
    _attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        let /** @type {?} */ dialogRef = new MdDialogRef(overlayRef, dialogContainer);
        if (!config.disableClose) {
            // When the dialog backdrop is clicked, we want to close it.
            overlayRef.backdropClick().first().subscribe(() => dialogRef.close());
        }
        // We create an injector specifically for the component we're instantiating so that it can
        // inject the MdDialogRef. This allows a component loaded inside of a dialog to close itself
        // and, optionally, to return a value.
        let /** @type {?} */ userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        let /** @type {?} */ dialogInjector = new DialogInjector(userInjector || this._injector, dialogRef, config.data);
        if (componentOrTemplateRef instanceof TemplateRef) {
            dialogContainer.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, null));
        }
        else {
            let /** @type {?} */ contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, null, dialogInjector));
            dialogRef.componentInstance = contentRef.instance;
        }
        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);
        return dialogRef;
    }
    /**
     * Removes a dialog from the array of open dialogs.
     * @param {?} dialogRef Dialog to be removed.
     * @return {?}
     */
    _removeOpenDialog(dialogRef) {
        let /** @type {?} */ index = this._openDialogs.indexOf(dialogRef);
        if (index > -1) {
            this._openDialogs.splice(index, 1);
            // no open dialogs are left, call next on afterAllClosed Subject
            if (!this._openDialogs.length) {
                this._afterAllClosed.next();
                document.removeEventListener('keydown', this._boundKeydown);
            }
        }
    }
    /**
     * Handles global key presses while there are open dialogs. Closes the
     * top dialog when the user presses escape.
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        let /** @type {?} */ topDialog = this._openDialogs[this._openDialogs.length - 1];
        let /** @type {?} */ canClose = topDialog ? !topDialog._containerInstance.dialogConfig.disableClose : false;
        if (event.keyCode === ESCAPE && canClose) {
            topDialog.close();
        }
    }
}
MdDialog.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
MdDialog.ctorParameters = () => [
    { type: Overlay, },
    { type: Injector, },
    { type: MdDialog, decorators: [{ type: Optional }, { type: SkipSelf },] },
];
function MdDialog_tsickle_Closure_declarations() {
    /** @type {?} */
    MdDialog.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdDialog.ctorParameters;
    /** @type {?} */
    MdDialog.prototype._openDialogsAtThisLevel;
    /** @type {?} */
    MdDialog.prototype._afterAllClosedAtThisLevel;
    /** @type {?} */
    MdDialog.prototype._afterOpenAtThisLevel;
    /** @type {?} */
    MdDialog.prototype._boundKeydown;
    /**
     * Gets an observable that is notified when a dialog has been opened.
     * @type {?}
     */
    MdDialog.prototype.afterOpen;
    /**
     * Gets an observable that is notified when all open dialog have finished closing.
     * @type {?}
     */
    MdDialog.prototype.afterAllClosed;
    /** @type {?} */
    MdDialog.prototype._overlay;
    /** @type {?} */
    MdDialog.prototype._injector;
    /** @type {?} */
    MdDialog.prototype._parentDialog;
}
/**
 * Applies default options to the dialog config.
 * @param {?} config Config to be modified.
 * @return {?} The new configuration object.
 */
function _applyConfigDefaults(config) {
    return extendObject(new MdDialogConfig(), config);
}
//# sourceMappingURL=dialog.js.map