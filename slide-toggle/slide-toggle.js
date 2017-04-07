import { Component, ElementRef, Renderer, forwardRef, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, } from '@angular/core';
import { applyCssTransform, coerceBooleanProperty, FocusOriginMonitor, MdRipple } from '../core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const /** @type {?} */ MD_SLIDE_TOGGLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdSlideToggle),
    multi: true
};
export class MdSlideToggleChange {
}
function MdSlideToggleChange_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSlideToggleChange.prototype.source;
    /** @type {?} */
    MdSlideToggleChange.prototype.checked;
}
// Increasing integer for generating unique ids for slide-toggle components.
let /** @type {?} */ nextId = 0;
/**
 * Two-state control, which can be also called `switch`.
 */
export class MdSlideToggle {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _focusOriginMonitor
     */
    constructor(_elementRef, _renderer, _focusOriginMonitor) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._focusOriginMonitor = _focusOriginMonitor;
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this._uniqueId = `md-slide-toggle-${++nextId}`;
        this._checked = false;
        this._isMousedown = false;
        this._slideRenderer = null;
        this._disabled = false;
        this._required = false;
        this._disableRipple = false;
        /** Name value will be applied to the input element if present */
        this.name = null;
        /** A unique id for the slide-toggle input. If none is supplied, it will be auto-generated. */
        this.id = this._uniqueId;
        /** Used to specify the tabIndex value for the underlying input element. */
        this.tabIndex = 0;
        /** Whether the label should appear after or before the slide-toggle. Defaults to 'after' */
        this.labelPosition = 'after';
        /** Used to set the aria-label attribute on the underlying input element. */
        this.ariaLabel = null;
        /** Used to set the aria-labelledby attribute on the underlying input element. */
        this.ariaLabelledby = null;
        this._change = new EventEmitter();
        /** An event will be dispatched each time the slide-toggle changes its value. */
        this.change = this._change.asObservable();
    }
    /**
     * Whether the slide-toggle is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Whether the slide-toggle is required.
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Whether the ripple effect for this slide-toggle is disabled.
     * @return {?}
     */
    get disableRipple() { return this._disableRipple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disableRipple(value) { this._disableRipple = coerceBooleanProperty(value); }
    /**
     * Returns the unique id for the visual hidden input.
     * @return {?}
     */
    get inputId() { return `${this.id || this._uniqueId}-input`; }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._slideRenderer = new SlideToggleRenderer(this._elementRef);
        this._focusOriginMonitor
            .monitor(this._inputElement.nativeElement, this._renderer, false)
            .subscribe(focusOrigin => this._onInputFocusChange(focusOrigin));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusOriginMonitor.stopMonitoring(this._inputElement.nativeElement);
    }
    /**
     * The onChangeEvent method will be also called on click.
     * This is because everything for the slide-toggle is wrapped inside of a label,
     * which triggers a onChange event on click.
     * @param {?} event
     * @return {?}
     */
    _onChangeEvent(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the component's `change` output.
        event.stopPropagation();
        // Once a drag is currently in progress, we do not want to toggle the slide-toggle on a click.
        if (!this.disabled && !this._slideRenderer.dragging) {
            this.toggle();
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this._emitChangeEvent();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onInputClick(event) {
        this.onTouched();
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `slide-toggle` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    }
    /**
     * @return {?}
     */
    _setMousedown() {
        // We only *show* the focus style when focus has come to the button via the keyboard.
        // The Material Design spec is silent on this topic, and without doing this, the
        // button continues to look :active after clicking.
        // @see http://marcysutton.com/button-focus-hell/
        this._isMousedown = true;
        setTimeout(() => this._isMousedown = false, 100);
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = value;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Focuses the slide-toggle.
     * @return {?}
     */
    focus() {
        this._focusOriginMonitor.focusVia(this._inputElement.nativeElement, this._renderer, 'program');
    }
    /**
     * Whether the slide-toggle is checked.
     * @return {?}
     */
    get checked() { return !!this._checked; }
    /**
     * @param {?} value
     * @return {?}
     */
    set checked(value) {
        if (this.checked !== !!value) {
            this._checked = value;
            this.onChange(this._checked);
        }
    }
    /**
     * The color of the slide-toggle. Can be primary, accent, or warn.
     * @return {?}
     */
    get color() { return this._color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._updateColor(value);
    }
    /**
     * Toggles the checked state of the slide-toggle.
     * @return {?}
     */
    toggle() {
        this.checked = !this.checked;
    }
    /**
     * Function is called whenever the focus changes for the input element.
     * @param {?} focusOrigin
     * @return {?}
     */
    _onInputFocusChange(focusOrigin) {
        if (!this._focusRipple && focusOrigin === 'keyboard') {
            // For keyboard focus show a persistent ripple as focus indicator.
            this._focusRipple = this._ripple.launch(0, 0, { persistent: true, centered: true });
        }
        else if (!focusOrigin) {
            this.onTouched();
            // Fade out and clear the focus ripple if one is currently present.
            if (this._focusRipple) {
                this._focusRipple.fadeOut();
                this._focusRipple = null;
            }
        }
    }
    /**
     * @param {?} newColor
     * @return {?}
     */
    _updateColor(newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    }
    /**
     * @param {?} color
     * @param {?} isAdd
     * @return {?}
     */
    _setElementColor(color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, `mat-${color}`, isAdd);
        }
    }
    /**
     * Emits the change event to the `change` output EventEmitter
     * @return {?}
     */
    _emitChangeEvent() {
        let /** @type {?} */ event = new MdSlideToggleChange();
        event.source = this;
        event.checked = this.checked;
        this._change.emit(event);
    }
    /**
     * @return {?}
     */
    _onDragStart() {
        if (!this.disabled) {
            this._slideRenderer.startThumbDrag(this.checked);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onDrag(event) {
        if (this._slideRenderer.dragging) {
            this._slideRenderer.updateThumbPosition(event.deltaX);
        }
    }
    /**
     * @return {?}
     */
    _onDragEnd() {
        if (this._slideRenderer.dragging) {
            let /** @type {?} */ _previousChecked = this.checked;
            this.checked = this._slideRenderer.dragPercentage > 50;
            if (_previousChecked !== this.checked) {
                this._emitChangeEvent();
            }
            // The drag should be stopped outside of the current event handler, because otherwise the
            // click event will be fired before and will revert the drag change.
            setTimeout(() => this._slideRenderer.stopThumbDrag());
        }
    }
}
MdSlideToggle.decorators = [
    { type: Component, args: [{selector: 'md-slide-toggle, mat-slide-toggle',
                host: {
                    '[class.mat-slide-toggle]': 'true',
                    '[class.mat-checked]': 'checked',
                    '[class.mat-disabled]': 'disabled',
                    '[class.mat-slide-toggle-label-before]': 'labelPosition == "before"',
                    '(mousedown)': '_setMousedown()'
                },
                template: "<label class=\"mat-slide-toggle-label\" #label> <div class=\"mat-slide-toggle-bar\"> <input #input class=\"mat-slide-toggle-input cdk-visually-hidden\" type=\"checkbox\" [id]=\"inputId\" [required]=\"required\" [tabIndex]=\"tabIndex\" [checked]=\"checked\" [disabled]=\"disabled\" [attr.name]=\"name\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (change)=\"_onChangeEvent($event)\" (click)=\"_onInputClick($event)\"> <div class=\"mat-slide-toggle-thumb-container\" (slidestart)=\"_onDragStart()\" (slide)=\"_onDrag($event)\" (slideend)=\"_onDragEnd()\"> <div class=\"mat-slide-toggle-thumb\"></div> <div class=\"mat-slide-toggle-ripple\" md-ripple [mdRippleTrigger]=\"label\" [mdRippleCentered]=\"true\" [mdRippleDisabled]=\"disableRipple || disabled\"> </div> </div> </div> <span class=\"mat-slide-toggle-content\"> <ng-content></ng-content> </span> </label> ",
                styles: [".mat-slide-toggle{display:inline-block;height:24px;line-height:24px;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0}.mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container{transform:translate3d(16px,0,0)}.mat-slide-toggle.mat-disabled .mat-slide-toggle-label,.mat-slide-toggle.mat-disabled .mat-slide-toggle-thumb-container{cursor:default}.mat-slide-toggle-content{font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:500}.mat-slide-toggle-label{display:flex;flex:1;flex-direction:row;align-items:center;cursor:pointer}.mat-slide-toggle-label-before .mat-slide-toggle-label{order:1}.mat-slide-toggle-label-before .mat-slide-toggle-bar{order:2}.mat-slide-toggle-bar,[dir=rtl] .mat-slide-toggle-label-before .mat-slide-toggle-bar{margin-right:8px;margin-left:0}.mat-slide-toggle-label-before .mat-slide-toggle-bar,[dir=rtl] .mat-slide-toggle-bar{margin-left:8px;margin-right:0}.mat-slide-toggle-thumb-container{position:absolute;z-index:1;width:20px;height:20px;top:-3px;left:0;transform:translate3d(0,0,0);transition:all 80ms linear;transition-property:transform;cursor:-webkit-grab;cursor:grab}.mat-slide-toggle-thumb-container.mat-dragging{transition-duration:0s}.mat-slide-toggle-thumb{height:20px;width:20px;border-radius:50%;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-slide-toggle-thumb{background:#fff;border:solid 1px #000}}.mat-slide-toggle-bar{position:relative;width:36px;height:14px;border-radius:8px}@media screen and (-ms-high-contrast:active){.mat-slide-toggle-bar{background:#fff}}.mat-slide-toggle-input{bottom:0;left:10px}.mat-slide-toggle-bar,.mat-slide-toggle-thumb{transition:all 80ms linear;transition-property:background-color;transition-delay:50ms}.mat-slide-toggle-ripple{position:absolute;top:-13px;left:-13px;height:46px;width:46px;border-radius:50%;z-index:1;pointer-events:none} /*# sourceMappingURL=slide-toggle.css.map */ "],
                providers: [MD_SLIDE_TOGGLE_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
MdSlideToggle.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
    { type: FocusOriginMonitor, },
];
MdSlideToggle.propDecorators = {
    'name': [{ type: Input },],
    'id': [{ type: Input },],
    'tabIndex': [{ type: Input },],
    'labelPosition': [{ type: Input },],
    'ariaLabel': [{ type: Input, args: ['aria-label',] },],
    'ariaLabelledby': [{ type: Input, args: ['aria-labelledby',] },],
    'disabled': [{ type: Input },],
    'required': [{ type: Input },],
    'disableRipple': [{ type: Input },],
    'change': [{ type: Output },],
    '_inputElement': [{ type: ViewChild, args: ['input',] },],
    '_ripple': [{ type: ViewChild, args: [MdRipple,] },],
    'checked': [{ type: Input },],
    'color': [{ type: Input },],
};
function MdSlideToggle_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSlideToggle.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSlideToggle.ctorParameters;
    /** @type {?} */
    MdSlideToggle.propDecorators;
    /** @type {?} */
    MdSlideToggle.prototype.onChange;
    /** @type {?} */
    MdSlideToggle.prototype.onTouched;
    /** @type {?} */
    MdSlideToggle.prototype._uniqueId;
    /** @type {?} */
    MdSlideToggle.prototype._checked;
    /** @type {?} */
    MdSlideToggle.prototype._color;
    /** @type {?} */
    MdSlideToggle.prototype._isMousedown;
    /** @type {?} */
    MdSlideToggle.prototype._slideRenderer;
    /** @type {?} */
    MdSlideToggle.prototype._disabled;
    /** @type {?} */
    MdSlideToggle.prototype._required;
    /** @type {?} */
    MdSlideToggle.prototype._disableRipple;
    /**
     * Reference to the focus state ripple.
     * @type {?}
     */
    MdSlideToggle.prototype._focusRipple;
    /**
     * Name value will be applied to the input element if present
     * @type {?}
     */
    MdSlideToggle.prototype.name;
    /**
     * A unique id for the slide-toggle input. If none is supplied, it will be auto-generated.
     * @type {?}
     */
    MdSlideToggle.prototype.id;
    /**
     * Used to specify the tabIndex value for the underlying input element.
     * @type {?}
     */
    MdSlideToggle.prototype.tabIndex;
    /**
     * Whether the label should appear after or before the slide-toggle. Defaults to 'after'
     * @type {?}
     */
    MdSlideToggle.prototype.labelPosition;
    /**
     * Used to set the aria-label attribute on the underlying input element.
     * @type {?}
     */
    MdSlideToggle.prototype.ariaLabel;
    /**
     * Used to set the aria-labelledby attribute on the underlying input element.
     * @type {?}
     */
    MdSlideToggle.prototype.ariaLabelledby;
    /** @type {?} */
    MdSlideToggle.prototype._change;
    /**
     * An event will be dispatched each time the slide-toggle changes its value.
     * @type {?}
     */
    MdSlideToggle.prototype.change;
    /**
     * Reference to the underlying input element.
     * @type {?}
     */
    MdSlideToggle.prototype._inputElement;
    /**
     * Reference to the ripple directive on the thumb container.
     * @type {?}
     */
    MdSlideToggle.prototype._ripple;
    /** @type {?} */
    MdSlideToggle.prototype._elementRef;
    /** @type {?} */
    MdSlideToggle.prototype._renderer;
    /** @type {?} */
    MdSlideToggle.prototype._focusOriginMonitor;
}
/**
 * Renderer for the Slide Toggle component, which separates DOM modification in its own class
 */
class SlideToggleRenderer {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        /** Whether the thumb is currently being dragged. */
        this.dragging = false;
        this._thumbEl = _elementRef.nativeElement.querySelector('.mat-slide-toggle-thumb-container');
        this._thumbBarEl = _elementRef.nativeElement.querySelector('.mat-slide-toggle-bar');
    }
    /**
     * Initializes the drag of the slide-toggle.
     * @param {?} checked
     * @return {?}
     */
    startThumbDrag(checked) {
        if (this.dragging) {
            return;
        }
        this._thumbBarWidth = this._thumbBarEl.clientWidth - this._thumbEl.clientWidth;
        this._thumbEl.classList.add('mat-dragging');
        this._previousChecked = checked;
        this.dragging = true;
    }
    /**
     * Resets the current drag and returns the new checked value.
     * @return {?}
     */
    stopThumbDrag() {
        if (!this.dragging) {
            return;
        }
        this.dragging = false;
        this._thumbEl.classList.remove('mat-dragging');
        // Reset the transform because the component will take care of the thumb position after drag.
        applyCssTransform(this._thumbEl, '');
        return this.dragPercentage > 50;
    }
    /**
     * Updates the thumb containers position from the specified distance.
     * @param {?} distance
     * @return {?}
     */
    updateThumbPosition(distance) {
        this.dragPercentage = this._getDragPercentage(distance);
        // Calculate the moved distance based on the thumb bar width.
        let /** @type {?} */ dragX = (this.dragPercentage / 100) * this._thumbBarWidth;
        applyCssTransform(this._thumbEl, `translate3d(${dragX}px, 0, 0)`);
    }
    /**
     * Retrieves the percentage of thumb from the moved distance. Percentage as fraction of 100.
     * @param {?} distance
     * @return {?}
     */
    _getDragPercentage(distance) {
        let /** @type {?} */ percentage = (distance / this._thumbBarWidth) * 100;
        // When the toggle was initially checked, then we have to start the drag at the end.
        if (this._previousChecked) {
            percentage += 100;
        }
        return Math.max(0, Math.min(percentage, 100));
    }
}
function SlideToggleRenderer_tsickle_Closure_declarations() {
    /**
     * Reference to the thumb HTMLElement.
     * @type {?}
     */
    SlideToggleRenderer.prototype._thumbEl;
    /**
     * Reference to the thumb bar HTMLElement.
     * @type {?}
     */
    SlideToggleRenderer.prototype._thumbBarEl;
    /**
     * Width of the thumb bar of the slide-toggle.
     * @type {?}
     */
    SlideToggleRenderer.prototype._thumbBarWidth;
    /**
     * Previous checked state before drag started.
     * @type {?}
     */
    SlideToggleRenderer.prototype._previousChecked;
    /**
     * Percentage of the thumb while dragging. Percentage as fraction of 100.
     * @type {?}
     */
    SlideToggleRenderer.prototype.dragPercentage;
    /**
     * Whether the thumb is currently being dragged.
     * @type {?}
     */
    SlideToggleRenderer.prototype.dragging;
    /** @type {?} */
    SlideToggleRenderer.prototype._elementRef;
}
//# sourceMappingURL=slide-toggle.js.map