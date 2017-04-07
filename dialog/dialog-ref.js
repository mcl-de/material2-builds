import { Subject } from 'rxjs/Subject';
/**
 * Reference to a dialog opened via the MdDialog service.
 */
export class MdDialogRef {
    /**
     * @param {?} _overlayRef
     * @param {?} _containerInstance
     */
    constructor(_overlayRef, _containerInstance) {
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this._afterClosed = new Subject();
        _containerInstance._onAnimationStateChange.subscribe((state) => {
            if (state === 'exit-start') {
                // Transition the backdrop in parallel with the dialog.
                this._overlayRef.detachBackdrop();
            }
            else if (state === 'exit') {
                this._overlayRef.dispose();
                this._afterClosed.next(this._result);
                this._afterClosed.complete();
                this.componentInstance = null;
            }
        });
    }
    /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    close(dialogResult) {
        this._result = dialogResult;
        this._containerInstance._exit();
    }
    /**
     * Gets an observable that is notified when the dialog is finished closing.
     * @return {?}
     */
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    /**
     * Updates the dialog's position.
     * @param {?=} position New dialog position.
     * @return {?}
     */
    updatePosition(position) {
        let /** @type {?} */ strategy = this._getPositionStrategy();
        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        }
        else {
            strategy.centerVertically();
        }
        this._overlayRef.updatePosition();
        return this;
    }
    /**
     * Updates the dialog's width and height.
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {?}
     */
    updateSize(width = 'auto', height = 'auto') {
        this._getPositionStrategy().width(width).height(height);
        this._overlayRef.updatePosition();
        return this;
    }
    /**
     * Fetches the position strategy object from the overlay ref.
     * @return {?}
     */
    _getPositionStrategy() {
        return (this._overlayRef.getState().positionStrategy);
    }
}
function MdDialogRef_tsickle_Closure_declarations() {
    /**
     * The instance of component opened into the dialog.
     * @type {?}
     */
    MdDialogRef.prototype.componentInstance;
    /**
     * Subject for notifying the user that the dialog has finished closing.
     * @type {?}
     */
    MdDialogRef.prototype._afterClosed;
    /**
     * Result to be passed to afterClosed.
     * @type {?}
     */
    MdDialogRef.prototype._result;
    /** @type {?} */
    MdDialogRef.prototype._overlayRef;
    /** @type {?} */
    MdDialogRef.prototype._containerInstance;
}
//# sourceMappingURL=dialog-ref.js.map