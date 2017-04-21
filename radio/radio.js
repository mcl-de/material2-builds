import { Component, ContentChildren, Directive, ElementRef, Renderer, EventEmitter, Input, Optional, Output, ViewEncapsulation, forwardRef, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UniqueSelectionDispatcher, MdRipple, FocusOriginMonitor, } from '../core';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
/**
 * Provider Expression that allows md-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * \@docs-private
 */
export const MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdRadioGroup),
    multi: true
};
let /** @type {?} */ _uniqueIdCounter = 0;
/**
 * Change event object emitted by MdRadio and MdRadioGroup.
 */
export class MdRadioChange {
}
function MdRadioChange_tsickle_Closure_declarations() {
    /**
     * The MdRadioButton that emits the change event.
     * @type {?}
     */
    MdRadioChange.prototype.source;
    /**
     * The value of the MdRadioButton.
     * @type {?}
     */
    MdRadioChange.prototype.value;
}
/**
 * A group of radio buttons. May contain one or more `<md-radio-button>` elements.
 */
export class MdRadioGroup {
    constructor() {
        /**
         * Selected value for group. Should equal the value of the selected radio button if there *is*
         * a corresponding radio button with a matching value. If there is *not* such a corresponding
         * radio button, this value persists to be applied in case a new radio button is added with a
         * matching value.
         */
        this._value = null;
        /**
         * The HTML name attribute applied to radio buttons in this group.
         */
        this._name = `md-radio-group-${_uniqueIdCounter++}`;
        /**
         * Disables all individual radio buttons assigned to this group.
         */
        this._disabled = false;
        /**
         * The currently selected radio button. Should match value.
         */
        this._selected = null;
        /**
         * Whether the `value` has been set to its initial value.
         */
        this._isInitialized = false;
        /**
         * The method to be called in order to update ngModel
         */
        this._controlValueAccessorChangeFn = (value) => { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         * \@docs-private
         */
        this.onTouched = () => { };
        /**
         * Event emitted when the group value changes.
         * Change events are only emitted when the value changes due to user interaction with
         * a radio button (the same behavior as `<input type-"radio">`).
         */
        this.change = new EventEmitter();
        /**
         * Child radio buttons.
         */
        this._radios = null;
        /**
         * Whether the labels should appear after or before the radio-buttons. Defaults to 'after'
         */
        this.labelPosition = 'after';
    }
    /**
     * Name of the radio button group. All radio buttons inside this group will use this name.
     * @return {?}
     */
    get name() { return this._name; }
    /**
     * @param {?} value
     * @return {?}
     */
    set name(value) {
        this._name = value;
        this._updateRadioButtonNames();
    }
    /**
     * Alignment of the radio-buttons relative to their labels. Can be 'before' or 'after'.
     * @deprecated
     * @return {?}
     */
    get align() {
        // align refers to the checkbox relative to the label, while labelPosition refers to the
        // label relative to the checkbox. As such, they are inverted.
        return this.labelPosition == 'after' ? 'start' : 'end';
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set align(v) {
        this.labelPosition = (v == 'start') ? 'after' : 'before';
    }
    /**
     * Whether the radio button is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        // The presence of *any* disabled value makes the component disabled, *except* for false.
        this._disabled = (value != null && value !== false) ? true : null;
    }
    /**
     * Value of the radio button.
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set value(newValue) {
        if (this._value != newValue) {
            // Set this before proceeding to ensure no circular loop occurs with selection.
            this._value = newValue;
            this._updateSelectedRadioFromValue();
            this._checkSelectedRadioButton();
        }
    }
    /**
     * @return {?}
     */
    _checkSelectedRadioButton() {
        if (this.selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    }
    /**
     * Whether the radio button is selected.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.value = selected ? selected.value : null;
        this._checkSelectedRadioButton();
    }
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     * @return {?}
     */
    ngAfterContentInit() {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on MdRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the MdRadioGroup.
        this._isInitialized = true;
    }
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     * @return {?}
     */
    _touch() {
        if (this.onTouched) {
            this.onTouched();
        }
    }
    /**
     * @return {?}
     */
    _updateRadioButtonNames() {
        if (this._radios) {
            this._radios.forEach(radio => {
                radio.name = this.name;
            });
        }
    }
    /**
     * Updates the `selected` radio button from the internal _value state.
     * @return {?}
     */
    _updateSelectedRadioFromValue() {
        // If the value already matches the selected radio, do nothing.
        let /** @type {?} */ isAlreadySelected = this._selected != null && this._selected.value == this._value;
        if (this._radios != null && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach(radio => {
                radio.checked = this.value == radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            });
        }
    }
    /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    _emitChangeEvent() {
        if (this._isInitialized) {
            let /** @type {?} */ event = new MdRadioChange();
            event.source = this._selected;
            event.value = this._value;
            this.change.emit(event);
        }
    }
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled Whether the control should be disabled.
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
MdRadioGroup.decorators = [
    { type: Directive, args: [{
                selector: 'md-radio-group, mat-radio-group',
                providers: [MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
                host: {
                    'role': 'radiogroup',
                    '[class.mat-radio-group]': 'true',
                },
            },] },
];
/**
 * @nocollapse
 */
MdRadioGroup.ctorParameters = () => [];
MdRadioGroup.propDecorators = {
    'change': [{ type: Output },],
    '_radios': [{ type: ContentChildren, args: [forwardRef(() => MdRadioButton),] },],
    'name': [{ type: Input },],
    'align': [{ type: Input },],
    'labelPosition': [{ type: Input },],
    'disabled': [{ type: Input },],
    'value': [{ type: Input },],
    'selected': [{ type: Input },],
};
function MdRadioGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    MdRadioGroup.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdRadioGroup.ctorParameters;
    /** @type {?} */
    MdRadioGroup.propDecorators;
    /**
     * Selected value for group. Should equal the value of the selected radio button if there *is*
     * a corresponding radio button with a matching value. If there is *not* such a corresponding
     * radio button, this value persists to be applied in case a new radio button is added with a
     * matching value.
     * @type {?}
     */
    MdRadioGroup.prototype._value;
    /**
     * The HTML name attribute applied to radio buttons in this group.
     * @type {?}
     */
    MdRadioGroup.prototype._name;
    /**
     * Disables all individual radio buttons assigned to this group.
     * @type {?}
     */
    MdRadioGroup.prototype._disabled;
    /**
     * The currently selected radio button. Should match value.
     * @type {?}
     */
    MdRadioGroup.prototype._selected;
    /**
     * Whether the `value` has been set to its initial value.
     * @type {?}
     */
    MdRadioGroup.prototype._isInitialized;
    /**
     * The method to be called in order to update ngModel
     * @type {?}
     */
    MdRadioGroup.prototype._controlValueAccessorChangeFn;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * \@docs-private
     * @type {?}
     */
    MdRadioGroup.prototype.onTouched;
    /**
     * Event emitted when the group value changes.
     * Change events are only emitted when the value changes due to user interaction with
     * a radio button (the same behavior as `<input type-"radio">`).
     * @type {?}
     */
    MdRadioGroup.prototype.change;
    /**
     * Child radio buttons.
     * @type {?}
     */
    MdRadioGroup.prototype._radios;
    /**
     * Whether the labels should appear after or before the radio-buttons. Defaults to 'after'
     * @type {?}
     */
    MdRadioGroup.prototype.labelPosition;
}
/**
 * A radio-button. May be inside of
 */
export class MdRadioButton {
    /**
     * @param {?} radioGroup
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _focusOriginMonitor
     * @param {?} _radioDispatcher
     */
    constructor(radioGroup, _elementRef, _renderer, _focusOriginMonitor, _radioDispatcher) {
        // Assertions. Ideally these should be stripped out by the compiler.
        // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._focusOriginMonitor = _focusOriginMonitor;
        this._radioDispatcher = _radioDispatcher;
        /**
         * The unique ID for the radio button.
         */
        this.id = `md-radio-${_uniqueIdCounter++}`;
        /**
         * Event emitted when the checked state of this radio button changes.
         * Change events are only emitted when the value changes due to user interaction with
         * the radio button (the same behavior as `<input type-"radio">`).
         */
        this.change = new EventEmitter();
        /**
         * Whether this radio is checked.
         */
        this._checked = false;
        /**
         * Value assigned to this radio.
         */
        this._value = null;
        this.radioGroup = radioGroup;
        _radioDispatcher.listen((id, name) => {
            if (id != this.id && name == this.name) {
                this.checked = false;
            }
        });
    }
    /**
     * Whether the ripple effect for this radio button is disabled.
     * @return {?}
     */
    get disableRipple() { return this._disableRipple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disableRipple(value) { this._disableRipple = coerceBooleanProperty(value); }
    /**
     * Whether this radio button is checked.
     * @return {?}
     */
    get checked() {
        return this._checked;
    }
    /**
     * @param {?} newCheckedState
     * @return {?}
     */
    set checked(newCheckedState) {
        if (this._checked != newCheckedState) {
            this._checked = newCheckedState;
            if (newCheckedState && this.radioGroup && this.radioGroup.value != this.value) {
                this.radioGroup.selected = this;
            }
            else if (!newCheckedState && this.radioGroup && this.radioGroup.value == this.value) {
                // When unchecking the selected radio button, update the selected radio
                // property on the group.
                this.radioGroup.selected = null;
            }
            if (newCheckedState) {
                // Notify all radio buttons with the same name to un-check.
                this._radioDispatcher.notify(this.id, this.name);
            }
        }
    }
    /**
     * The value of this radio button.
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (this._value != value) {
            this._value = value;
            if (this.radioGroup != null) {
                if (!this.checked) {
                    // Update checked when the value changed to match the radio group's value
                    this.checked = this.radioGroup.value == value;
                }
                if (this.checked) {
                    this.radioGroup.selected = this;
                }
            }
        }
    }
    /**
     * Whether or not the radio-button should appear before or after the label.
     * @deprecated
     * @return {?}
     */
    get align() {
        // align refers to the checkbox relative to the label, while labelPosition refers to the
        // label relative to the checkbox. As such, they are inverted.
        return this.labelPosition == 'after' ? 'start' : 'end';
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set align(v) {
        this.labelPosition = (v == 'start') ? 'after' : 'before';
    }
    /**
     * Whether the label should appear after or before the radio button. Defaults to 'after'
     * @return {?}
     */
    get labelPosition() {
        return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set labelPosition(value) {
        this._labelPosition = value;
    }
    /**
     * Whether the radio button is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        // The presence of *any* disabled value makes the component disabled, *except* for false.
        this._disabled = (value != null && value !== false) ? true : null;
    }
    /**
     * ID of the native input element inside `<md-radio-button>`
     * @return {?}
     */
    get inputId() {
        return `${this.id}-input`;
    }
    /**
     * Focuses the radio button.
     * @return {?}
     */
    focus() {
        this._focusOriginMonitor.focusVia(this._inputElement.nativeElement, this._renderer, 'keyboard');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
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
     * Dispatch change event with current value.
     * @return {?}
     */
    _emitChangeEvent() {
        let /** @type {?} */ event = new MdRadioChange();
        event.source = this;
        event.value = this._value;
        this.change.emit(event);
    }
    /**
     * @return {?}
     */
    _isRippleDisabled() {
        return this.disableRipple || this.disabled;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onInputClick(event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `radio-button` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    }
    /**
     * Triggered when the radio button received a click or the input recognized any change.
     * Clicking on a label element, will trigger a change event on the associated input.
     * @param {?} event
     * @return {?}
     */
    _onInputChange(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        let /** @type {?} */ groupValueChanged = this.radioGroup && this.value != this.radioGroup.value;
        this.checked = true;
        this._emitChangeEvent();
        if (this.radioGroup) {
            this.radioGroup._controlValueAccessorChangeFn(this.value);
            this.radioGroup._touch();
            if (groupValueChanged) {
                this.radioGroup._emitChangeEvent();
            }
        }
    }
    /**
     * Function is called whenever the focus changes for the input element.
     * @param {?} focusOrigin
     * @return {?}
     */
    _onInputFocusChange(focusOrigin) {
        if (!this._focusRipple && focusOrigin === 'keyboard') {
            this._focusRipple = this._ripple.launch(0, 0, { persistent: true, centered: true });
        }
        else if (!focusOrigin) {
            if (this.radioGroup) {
                this.radioGroup._touch();
            }
            if (this._focusRipple) {
                this._focusRipple.fadeOut();
                this._focusRipple = null;
            }
        }
    }
}
MdRadioButton.decorators = [
    { type: Component, args: [{selector: 'md-radio-button, mat-radio-button',
                template: "<!-- TODO(jelbourn): render the radio on either side of the content --> <!-- TODO(mtlin): Evaluate trade-offs of using native radio vs. cost of additional bindings. --> <label [attr.for]=\"inputId\" class=\"mat-radio-label\" #label> <!-- The actual 'radio' part of the control. --> <div class=\"mat-radio-container\"> <div class=\"mat-radio-outer-circle\"></div> <div class=\"mat-radio-inner-circle\"></div> <div md-ripple class=\"mat-radio-ripple\" [mdRippleTrigger]=\"label\" [mdRippleDisabled]=\"_isRippleDisabled()\" [mdRippleCentered]=\"true\"></div> </div> <input #input class=\"mat-radio-input cdk-visually-hidden\" type=\"radio\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [name]=\"name\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (change)=\"_onInputChange($event)\" (click)=\"_onInputClick($event)\"> <!-- The label content for radio control. --> <div class=\"mat-radio-label-content\" [class.mat-radio-label-before]=\"labelPosition == 'before'\"> <ng-content></ng-content> </div> </label> ",
                styles: [".mat-radio-button{display:inline-block;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-radio-label{cursor:pointer;display:inline-flex;align-items:baseline;white-space:nowrap}.mat-radio-container{box-sizing:border-box;display:inline-block;height:20px;position:relative;width:20px;top:2px}.mat-radio-outer-circle{box-sizing:border-box;height:20px;left:0;position:absolute;top:0;transition:border-color ease 280ms;width:20px;border-width:2px;border-style:solid;border-radius:50%}.mat-radio-inner-circle{border-radius:50%;box-sizing:border-box;height:20px;left:0;position:absolute;top:0;transition:transform ease 280ms,background-color ease 280ms;transform:scale(0);width:20px}.mat-radio-checked .mat-radio-inner-circle{transform:scale(.5)}.mat-radio-label-content{display:inline-block;order:0;line-height:inherit;padding-left:8px;padding-right:0}[dir=rtl] .mat-radio-label-content{padding-right:8px;padding-left:0}.mat-radio-label-content.mat-radio-label-before{order:-1;padding-left:0;padding-right:8px}[dir=rtl] .mat-radio-label-content.mat-radio-label-before{padding-right:0;padding-left:8px}.mat-radio-disabled,.mat-radio-disabled .mat-radio-label{cursor:default}.mat-radio-ripple{position:absolute;left:-15px;top:-15px;right:-15px;bottom:-15px;border-radius:50%;z-index:1;pointer-events:none} /*# sourceMappingURL=radio.css.map */ "],
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.mat-radio-button]': 'true',
                    '[class.mat-radio-checked]': 'checked',
                    '[class.mat-radio-disabled]': 'disabled',
                    '[attr.id]': 'id',
                }
            },] },
];
/**
 * @nocollapse
 */
MdRadioButton.ctorParameters = () => [
    { type: MdRadioGroup, decorators: [{ type: Optional },] },
    { type: ElementRef, },
    { type: Renderer, },
    { type: FocusOriginMonitor, },
    { type: UniqueSelectionDispatcher, },
];
MdRadioButton.propDecorators = {
    'id': [{ type: Input },],
    'name': [{ type: Input },],
    'ariaLabel': [{ type: Input, args: ['aria-label',] },],
    'ariaLabelledby': [{ type: Input, args: ['aria-labelledby',] },],
    'disableRipple': [{ type: Input },],
    'checked': [{ type: Input },],
    'value': [{ type: Input },],
    'align': [{ type: Input },],
    'labelPosition': [{ type: Input },],
    'disabled': [{ type: Input },],
    'change': [{ type: Output },],
    '_ripple': [{ type: ViewChild, args: [MdRipple,] },],
    '_inputElement': [{ type: ViewChild, args: ['input',] },],
};
function MdRadioButton_tsickle_Closure_declarations() {
    /** @type {?} */
    MdRadioButton.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdRadioButton.ctorParameters;
    /** @type {?} */
    MdRadioButton.propDecorators;
    /**
     * The unique ID for the radio button.
     * @type {?}
     */
    MdRadioButton.prototype.id;
    /**
     * Analog to HTML 'name' attribute used to group radios for unique selection.
     * @type {?}
     */
    MdRadioButton.prototype.name;
    /**
     * Used to set the 'aria-label' attribute on the underlying input element.
     * @type {?}
     */
    MdRadioButton.prototype.ariaLabel;
    /**
     * The 'aria-labelledby' attribute takes precedence as the element's text alternative.
     * @type {?}
     */
    MdRadioButton.prototype.ariaLabelledby;
    /** @type {?} */
    MdRadioButton.prototype._labelPosition;
    /**
     * Event emitted when the checked state of this radio button changes.
     * Change events are only emitted when the value changes due to user interaction with
     * the radio button (the same behavior as `<input type-"radio">`).
     * @type {?}
     */
    MdRadioButton.prototype.change;
    /**
     * The parent radio group. May or may not be present.
     * @type {?}
     */
    MdRadioButton.prototype.radioGroup;
    /**
     * Whether this radio is checked.
     * @type {?}
     */
    MdRadioButton.prototype._checked;
    /**
     * Whether this radio is disabled.
     * @type {?}
     */
    MdRadioButton.prototype._disabled;
    /**
     * Value assigned to this radio.
     * @type {?}
     */
    MdRadioButton.prototype._value;
    /**
     * Whether the ripple effect on click should be disabled.
     * @type {?}
     */
    MdRadioButton.prototype._disableRipple;
    /**
     * The child ripple instance.
     * @type {?}
     */
    MdRadioButton.prototype._ripple;
    /**
     * Reference to the current focus ripple.
     * @type {?}
     */
    MdRadioButton.prototype._focusRipple;
    /**
     * The native `<input type=radio>` element
     * @type {?}
     */
    MdRadioButton.prototype._inputElement;
    /** @type {?} */
    MdRadioButton.prototype._elementRef;
    /** @type {?} */
    MdRadioButton.prototype._renderer;
    /** @type {?} */
    MdRadioButton.prototype._focusOriginMonitor;
    /** @type {?} */
    MdRadioButton.prototype._radioDispatcher;
}
//# sourceMappingURL=radio.js.map