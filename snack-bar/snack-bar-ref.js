import { Subject } from 'rxjs/Subject';
/**
 * Reference to a snack bar dispatched from the snack bar service.
 */
export class MdSnackBarRef {
    /**
     * @param {?} instance
     * @param {?} containerInstance
     * @param {?} _overlayRef
     */
    constructor(instance, containerInstance, _overlayRef) {
        this._overlayRef = _overlayRef;
        this._afterClosed = new Subject();
        this._onAction = new Subject();
        // Sets the readonly instance of the snack bar content component.
        this._instance = instance;
        this.containerInstance = containerInstance;
        // Dismiss snackbar on action.
        this.onAction().subscribe(() => this.dismiss());
        containerInstance._onExit().subscribe(() => this._finishDismiss());
    }
    /**
     * The instance of the component making up the content of the snack bar.
     * @return {?}
     */
    get instance() {
        return this._instance;
    }
    /**
     * Dismisses the snack bar.
     * @return {?}
     */
    dismiss() {
        if (!this._afterClosed.closed) {
            this.containerInstance.exit();
        }
    }
    /**
     * Marks the snackbar action clicked.
     * @return {?}
     */
    _action() {
        if (!this._onAction.closed) {
            this._onAction.next();
            this._onAction.complete();
        }
    }
    /**
     * Marks the snackbar as opened
     * @return {?}
     */
    _open() {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    }
    /**
     * Cleans up the DOM after closing.
     * @return {?}
     */
    _finishDismiss() {
        this._overlayRef.dispose();
        this._afterClosed.next();
        this._afterClosed.complete();
    }
    /**
     * Gets an observable that is notified when the snack bar is finished closing.
     * @return {?}
     */
    afterDismissed() {
        return this._afterClosed.asObservable();
    }
    /**
     * Gets an observable that is notified when the snack bar has opened and appeared.
     * @return {?}
     */
    afterOpened() {
        return this.containerInstance._onEnter();
    }
    /**
     * Gets an observable that is notified when the snack bar action is called.
     * @return {?}
     */
    onAction() {
        return this._onAction.asObservable();
    }
}
function MdSnackBarRef_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSnackBarRef.prototype._instance;
    /**
     * The instance of the component making up the content of the snack bar.
     * \@docs-private
     * @type {?}
     */
    MdSnackBarRef.prototype.containerInstance;
    /**
     * Subject for notifying the user that the snack bar has closed.
     * @type {?}
     */
    MdSnackBarRef.prototype._afterClosed;
    /**
     * Subject for notifying the user that the snack bar has opened and appeared.
     * @type {?}
     */
    MdSnackBarRef.prototype._afterOpened;
    /**
     * Subject for notifying the user that the snack bar action was called.
     * @type {?}
     */
    MdSnackBarRef.prototype._onAction;
    /** @type {?} */
    MdSnackBarRef.prototype._overlayRef;
}
//# sourceMappingURL=snack-bar-ref.js.map