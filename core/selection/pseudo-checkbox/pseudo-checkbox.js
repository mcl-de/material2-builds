import { Component, ViewEncapsulation, Input, ElementRef, Renderer, } from '@angular/core';
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with <md-checkbox> and should *not* be used if the user would directly interact
 * with the checkbox. The pseudo-checkbox should only be used as an implementation detail of
 * more complex components that appropriately handle selected / checked state.
 * \@docs-private
 */
export class MdPseudoCheckbox {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /** Display state of the checkbox. */
        this.state = 'unchecked';
        /** Whether the checkbox is disabled. */
        this.disabled = false;
        this.color = 'accent';
    }
    /**
     * Color of the checkbox.
     * @return {?}
     */
    get color() { return this._color; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        if (value) {
            let /** @type {?} */ nativeElement = this._elementRef.nativeElement;
            this._renderer.setElementClass(nativeElement, `mat-${this.color}`, false);
            this._renderer.setElementClass(nativeElement, `mat-${value}`, true);
            this._color = value;
        }
    }
}
MdPseudoCheckbox.decorators = [
    { type: Component, args: [{encapsulation: ViewEncapsulation.None,
                selector: 'md-pseudo-checkbox, mat-pseudo-checkbox',
                styles: [".mat-pseudo-checkbox{width:20px;height:20px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;transition:border-color 90ms cubic-bezier(0,0,.2,.1),background-color 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:'';border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0,0,.2,.1)}.mat-pseudo-checkbox.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate{border:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:9px;left:2px;width:16px;opacity:1}.mat-pseudo-checkbox-checked::after{top:5px;left:3px;width:12px;height:5px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1} /*# sourceMappingURL=pseudo-checkbox.css.map */ "],
                template: '',
                host: {
                    '[class.mat-pseudo-checkbox]': 'true',
                    '[class.mat-pseudo-checkbox-indeterminate]': 'state === "indeterminate"',
                    '[class.mat-pseudo-checkbox-checked]': 'state === "checked"',
                    '[class.mat-pseudo-checkbox-disabled]': 'disabled',
                },
            },] },
];
/**
 * @nocollapse
 */
MdPseudoCheckbox.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
];
MdPseudoCheckbox.propDecorators = {
    'state': [{ type: Input },],
    'disabled': [{ type: Input },],
    'color': [{ type: Input },],
};
function MdPseudoCheckbox_tsickle_Closure_declarations() {
    /** @type {?} */
    MdPseudoCheckbox.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdPseudoCheckbox.ctorParameters;
    /** @type {?} */
    MdPseudoCheckbox.propDecorators;
    /**
     * Display state of the checkbox.
     * @type {?}
     */
    MdPseudoCheckbox.prototype.state;
    /**
     * Whether the checkbox is disabled.
     * @type {?}
     */
    MdPseudoCheckbox.prototype.disabled;
    /** @type {?} */
    MdPseudoCheckbox.prototype._color;
    /** @type {?} */
    MdPseudoCheckbox.prototype._elementRef;
    /** @type {?} */
    MdPseudoCheckbox.prototype._renderer;
}
//# sourceMappingURL=pseudo-checkbox.js.map