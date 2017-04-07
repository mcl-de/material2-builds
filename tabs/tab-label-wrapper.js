import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
/**
 * Used in the `md-tab-group` view to display tab labels.
 * \@docs-private
 */
export class MdTabLabelWrapper {
    /**
     * @param {?} elementRef
     * @param {?} _renderer
     */
    constructor(elementRef, _renderer) {
        this.elementRef = elementRef;
        this._renderer = _renderer;
        this._disabled = false;
    }
    /**
     * Whether the element is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    focus() {
        this._renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus');
    }
    /**
     * @return {?}
     */
    getOffsetLeft() {
        return this.elementRef.nativeElement.offsetLeft;
    }
    /**
     * @return {?}
     */
    getOffsetWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }
}
MdTabLabelWrapper.decorators = [
    { type: Directive, args: [{
                selector: '[md-tab-label-wrapper], [mat-tab-label-wrapper]',
                host: {
                    '[class.mat-tab-disabled]': 'disabled'
                }
            },] },
];
/**
 * @nocollapse
 */
MdTabLabelWrapper.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
];
MdTabLabelWrapper.propDecorators = {
    'disabled': [{ type: Input },],
};
function MdTabLabelWrapper_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTabLabelWrapper.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTabLabelWrapper.ctorParameters;
    /** @type {?} */
    MdTabLabelWrapper.propDecorators;
    /**
     * Whether the tab label is disabled.
     * @type {?}
     */
    MdTabLabelWrapper.prototype._disabled;
    /** @type {?} */
    MdTabLabelWrapper.prototype.elementRef;
    /** @type {?} */
    MdTabLabelWrapper.prototype._renderer;
}
//# sourceMappingURL=tab-label-wrapper.js.map