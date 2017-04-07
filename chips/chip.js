import { Component, ElementRef, EventEmitter, Input, Output, Renderer } from '@angular/core';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
/**
 * Material design styled Chip component. Used inside the MdChipList component.
 */
export class MdChip {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** Whether or not the chip is disabled. Disabled chips cannot be focused. */
        this._disabled = null;
        /** Whether or not the chip is selected. */
        this._selected = false;
        /** The palette color of selected chips. */
        this._color = 'primary';
        /** Emitted when the chip is focused. */
        this.onFocus = new EventEmitter();
        /** Emitted when the chip is selected. */
        this.select = new EventEmitter();
        /** Emitted when the chip is deselected. */
        this.deselect = new EventEmitter();
        /** Emitted when the chip is destroyed. */
        this.destroy = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._addDefaultCSSClass();
        this._updateColor(this._color);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy.emit({ chip: this });
    }
    /**
     * Whether or not the chip is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * Sets the disabled state of the chip.
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value) ? true : null;
    }
    /**
     * A String representation of the current disabled state.
     * @return {?}
     */
    get _isAriaDisabled() {
        return String(coerceBooleanProperty(this.disabled));
    }
    /**
     * Whether or not this chip is selected.
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = coerceBooleanProperty(value);
        if (this._selected) {
            this.select.emit({ chip: this });
        }
        else {
            this.deselect.emit({ chip: this });
        }
    }
    /**
     * Toggles the current selected state of this chip.
     * @return {?} Whether the chip is selected.
     */
    toggleSelected() {
        this.selected = !this.selected;
        return this.selected;
    }
    /**
     * The color of the chip. Can be `primary`, `accent`, or `warn`.
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._updateColor(value);
    }
    /**
     * Allows for programmatic focusing of the chip.
     * @return {?}
     */
    focus() {
        this._renderer.invokeElementMethod(this._elementRef.nativeElement, 'focus');
        this.onFocus.emit({ chip: this });
    }
    /**
     * Ensures events fire properly upon click.
     * @param {?} event
     * @return {?}
     */
    _handleClick(event) {
        // Check disabled
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            this.focus();
        }
    }
    /**
     * Initializes the appropriate CSS classes based on the chip type (basic or standard).
     * @return {?}
     */
    _addDefaultCSSClass() {
        let /** @type {?} */ el = this._elementRef.nativeElement;
        // Always add the `mat-chip` class
        el.classList.add('mat-chip');
        // If we are a basic chip, also add the `mat-basic-chip` class for :not() targeting
        if (el.nodeName.toLowerCase() == 'mat-basic-chip' || el.hasAttribute('mat-basic-chip') ||
            el.nodeName.toLowerCase() == 'md-basic-chip' || el.hasAttribute('md-basic-chip')) {
            el.classList.add('mat-basic-chip');
        }
    }
    /**
     * Updates the private _color variable and the native element.
     * @param {?} newColor
     * @return {?}
     */
    _updateColor(newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    }
    /**
     * Sets the mat-color on the native element.
     * @param {?} color
     * @param {?} isAdd
     * @return {?}
     */
    _setElementColor(color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, `mat-${color}`, isAdd);
        }
    }
}
MdChip.decorators = [
    { type: Component, args: [{
                selector: `md-basic-chip, [md-basic-chip], md-chip, [md-chip],
             mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]`,
                template: `<ng-content></ng-content>`,
                host: {
                    '[class.mat-chip]': 'true',
                    'tabindex': '-1',
                    'role': 'option',
                    '[class.mat-chip-selected]': 'selected',
                    '[attr.disabled]': 'disabled',
                    '[attr.aria-disabled]': '_isAriaDisabled',
                    '(click)': '_handleClick($event)'
                }
            },] },
];
/**
 * @nocollapse
 */
MdChip.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
];
MdChip.propDecorators = {
    'select': [{ type: Output },],
    'deselect': [{ type: Output },],
    'destroy': [{ type: Output },],
    'disabled': [{ type: Input },],
    'selected': [{ type: Input },],
    'color': [{ type: Input },],
};
function MdChip_tsickle_Closure_declarations() {
    /** @type {?} */
    MdChip.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdChip.ctorParameters;
    /** @type {?} */
    MdChip.propDecorators;
    /**
     * Whether or not the chip is disabled. Disabled chips cannot be focused.
     * @type {?}
     */
    MdChip.prototype._disabled;
    /**
     * Whether or not the chip is selected.
     * @type {?}
     */
    MdChip.prototype._selected;
    /**
     * The palette color of selected chips.
     * @type {?}
     */
    MdChip.prototype._color;
    /**
     * Emitted when the chip is focused.
     * @type {?}
     */
    MdChip.prototype.onFocus;
    /**
     * Emitted when the chip is selected.
     * @type {?}
     */
    MdChip.prototype.select;
    /**
     * Emitted when the chip is deselected.
     * @type {?}
     */
    MdChip.prototype.deselect;
    /**
     * Emitted when the chip is destroyed.
     * @type {?}
     */
    MdChip.prototype.destroy;
    /** @type {?} */
    MdChip.prototype._renderer;
    /** @type {?} */
    MdChip.prototype._elementRef;
}
//# sourceMappingURL=chip.js.map