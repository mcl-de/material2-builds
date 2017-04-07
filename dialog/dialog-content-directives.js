import { Directive, Input } from '@angular/core';
import { MdDialogRef } from './dialog-ref';
/**
 * Button that will close the current dialog.
 */
export class MdDialogClose {
    /**
     * @param {?} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
        /** Screenreader label for the button. */
        this.ariaLabel = 'Close dialog';
    }
}
MdDialogClose.decorators = [
    { type: Directive, args: [{
                selector: 'button[md-dialog-close], button[mat-dialog-close]',
                host: {
                    '(click)': 'dialogRef.close()',
                    '[attr.aria-label]': 'ariaLabel',
                    'type': 'button',
                }
            },] },
];
/**
 * @nocollapse
 */
MdDialogClose.ctorParameters = () => [
    { type: MdDialogRef, },
];
MdDialogClose.propDecorators = {
    'ariaLabel': [{ type: Input, args: ['aria-label',] },],
};
function MdDialogClose_tsickle_Closure_declarations() {
    /** @type {?} */
    MdDialogClose.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdDialogClose.ctorParameters;
    /** @type {?} */
    MdDialogClose.propDecorators;
    /**
     * Screenreader label for the button.
     * @type {?}
     */
    MdDialogClose.prototype.ariaLabel;
    /** @type {?} */
    MdDialogClose.prototype.dialogRef;
}
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
export class MdDialogTitle {
}
MdDialogTitle.decorators = [
    { type: Directive, args: [{
                selector: '[md-dialog-title], [mat-dialog-title]',
                host: {
                    '[class.mat-dialog-title]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdDialogTitle.ctorParameters = () => [];
function MdDialogTitle_tsickle_Closure_declarations() {
    /** @type {?} */
    MdDialogTitle.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdDialogTitle.ctorParameters;
}
/**
 * Scrollable content container of a dialog.
 */
export class MdDialogContent {
}
MdDialogContent.decorators = [
    { type: Directive, args: [{
                selector: '[md-dialog-content], md-dialog-content, [mat-dialog-content], mat-dialog-content',
                host: {
                    '[class.mat-dialog-content]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdDialogContent.ctorParameters = () => [];
function MdDialogContent_tsickle_Closure_declarations() {
    /** @type {?} */
    MdDialogContent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdDialogContent.ctorParameters;
}
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
export class MdDialogActions {
}
MdDialogActions.decorators = [
    { type: Directive, args: [{
                selector: '[md-dialog-actions], md-dialog-actions, [mat-dialog-actions], mat-dialog-actions',
                host: {
                    '[class.mat-dialog-actions]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdDialogActions.ctorParameters = () => [];
function MdDialogActions_tsickle_Closure_declarations() {
    /** @type {?} */
    MdDialogActions.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdDialogActions.ctorParameters;
}
//# sourceMappingURL=dialog-content-directives.js.map