import { Component } from '@angular/core';
/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
export class SimpleSnackBar {
    /**
     * Dismisses the snack bar.
     * @return {?}
     */
    dismiss() {
        this.snackBarRef._action();
    }
    /**
     * If the action button should be shown.
     * @return {?}
     */
    get hasAction() { return !!this.action; }
}
SimpleSnackBar.decorators = [
    { type: Component, args: [{selector: 'simple-snack-bar',
                template: "{{message}} <button class=\"mat-simple-snackbar-action\" *ngIf=\"hasAction\" (click)=\"dismiss()\">{{action}}</button> ",
                styles: [":host{display:flex;justify-content:space-between;color:#fff;line-height:20px;font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-simple-snackbar-action{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;background:0 0;text-transform:uppercase;color:inherit;line-height:1;flex-shrink:0;margin-left:48px;font-family:inherit;font-size:inherit;font-weight:600} /*# sourceMappingURL=simple-snack-bar.css.map */ "],
                host: {
                    '[class.mat-simple-snackbar]': 'true',
                }
            },] },
];
/**
 * @nocollapse
 */
SimpleSnackBar.ctorParameters = () => [];
function SimpleSnackBar_tsickle_Closure_declarations() {
    /** @type {?} */
    SimpleSnackBar.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SimpleSnackBar.ctorParameters;
    /**
     * The message to be shown in the snack bar.
     * @type {?}
     */
    SimpleSnackBar.prototype.message;
    /**
     * The label for the button in the snack bar.
     * @type {?}
     */
    SimpleSnackBar.prototype.action;
    /**
     * The instance of the component making up the content of the snack bar.
     * @type {?}
     */
    SimpleSnackBar.prototype.snackBarRef;
}
//# sourceMappingURL=simple-snack-bar.js.map