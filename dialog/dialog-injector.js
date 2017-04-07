import { OpaqueToken } from '@angular/core';
import { MdDialogRef } from './dialog-ref';
export const /** @type {?} */ MD_DIALOG_DATA = new OpaqueToken('MdDialogData');
/**
 * Custom injector type specifically for instantiating components with a dialog.
 */
export class DialogInjector {
    /**
     * @param {?} _parentInjector
     * @param {?} _dialogRef
     * @param {?} _data
     */
    constructor(_parentInjector, _dialogRef, _data) {
        this._parentInjector = _parentInjector;
        this._dialogRef = _dialogRef;
        this._data = _data;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) {
        if (token === MdDialogRef) {
            return this._dialogRef;
        }
        if (token === MD_DIALOG_DATA && this._data) {
            return this._data;
        }
        return this._parentInjector.get(token, notFoundValue);
    }
}
function DialogInjector_tsickle_Closure_declarations() {
    /** @type {?} */
    DialogInjector.prototype._parentInjector;
    /** @type {?} */
    DialogInjector.prototype._dialogRef;
    /** @type {?} */
    DialogInjector.prototype._data;
}
//# sourceMappingURL=dialog-injector.js.map