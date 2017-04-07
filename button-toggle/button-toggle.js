import { Component, ContentChildren, Directive, ElementRef, Renderer, EventEmitter, HostBinding, Input, Optional, Output, ViewChild, ViewEncapsulation, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UniqueSelectionDispatcher, coerceBooleanProperty, FocusOriginMonitor } from '../core';
/**
 * Provider Expression that allows md-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 */
export const MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdButtonToggleGroup),
    multi: true
};
let /** @type {?} */ _uniqueIdCounter = 0;
/**
 * Change event object emitted by MdButtonToggle.
 */
export class MdButtonToggleChange {
}
function MdButtonToggleChange_tsickle_Closure_declarations() {
    /**
     * The MdButtonToggle that emits the event.
     * @type {?}
     */
    MdButtonToggleChange.prototype.source;
    /**
     * The value assigned to the MdButtonToggle.
     * @type {?}
     */
    MdButtonToggleChange.prototype.value;
}
/**
 * Exclusive selection button toggle group that behaves like a radio-button group.
 */
export class MdButtonToggleGroup {
    constructor() {
        this._value = null;
        this._name = `md-button-toggle-group-${_uniqueIdCounter++}`;
        this._disabled = null;
        this._vertical = false;
        this._selected = null;
        this._isInitialized = false;
        this._controlValueAccessorChangeFn = (value) => { };
        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
        this.onTouched = () => { };
        /** Child button toggle buttons. */
        this._buttonToggles = null;
        this._change = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._isInitialized = true;
    }
    /**
     * `name` attribute for the underlying `input` element.
     * @return {?}
     */
    get name() {
        return this._name;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set name(value) {
        this._name = value;
        this._updateButtonToggleNames();
    }
    /**
     * Whether the toggle group is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Whether the toggle group is vertical.
     * @return {?}
     */
    get vertical() {
        return this._vertical;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    /**
     * Value of the toggle group.
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set value(newValue) {
        if (this._value != newValue) {
            this._value = newValue;
            this._updateSelectedButtonToggleFromValue();
            // Only emit a change event if the view is completely initialized.
            // We don't want to emit a change event for the initial values.
            if (this._isInitialized) {
                this._emitChangeEvent();
            }
        }
    }
    /**
     * Whether the toggle group is selected.
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.value = selected ? selected.value : null;
        if (selected && !selected.checked) {
            selected.checked = true;
        }
    }
    /**
     * Event emitted when the group's value changes.
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    _updateButtonToggleNames() {
        if (this._buttonToggles) {
            this._buttonToggles.forEach((toggle) => {
                toggle.name = this._name;
            });
        }
    }
    /**
     * @return {?}
     */
    _updateSelectedButtonToggleFromValue() {
        let /** @type {?} */ isAlreadySelected = this._selected != null && this._selected.value == this._value;
        if (this._buttonToggles != null && !isAlreadySelected) {
            let /** @type {?} */ matchingButtonToggle = this._buttonToggles.filter(buttonToggle => buttonToggle.value == this._value)[0];
            if (matchingButtonToggle) {
                this.selected = matchingButtonToggle;
            }
            else if (this.value == null) {
                this.selected = null;
                this._buttonToggles.forEach(buttonToggle => {
                    buttonToggle.checked = false;
                });
            }
        }
    }
    /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    _emitChangeEvent() {
        let /** @type {?} */ event = new MdButtonToggleChange();
        event.source = this._selected;
        event.value = this._value;
        this._controlValueAccessorChangeFn(event.value);
        this._change.emit(event);
    }
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value Value to be set to the model.
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn On change callback function.
     * @return {?}
     */
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn On touch callback function.
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param {?} isDisabled Whether the component should be disabled.
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
MdButtonToggleGroup.decorators = [
    { type: Directive, args: [{
                selector: 'md-button-toggle-group:not([multiple]), mat-button-toggle-group:not([multiple])',
                providers: [MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR],
                host: {
                    '[class.mat-button-toggle-group]': 'true',
                    'role': 'radiogroup',
                    '[class.mat-button-toggle-vertical]': 'vertical'
                },
                exportAs: 'mdButtonToggleGroup',
            },] },
];
/**
 * @nocollapse
 */
MdButtonToggleGroup.ctorParameters = () => [];
MdButtonToggleGroup.propDecorators = {
    '_buttonToggles': [{ type: ContentChildren, args: [forwardRef(() => MdButtonToggle),] },],
    'name': [{ type: Input },],
    'disabled': [{ type: Input },],
    'vertical': [{ type: Input },],
    'value': [{ type: Input },],
    'selected': [{ type: Input },],
    'change': [{ type: Output },],
};
function MdButtonToggleGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    MdButtonToggleGroup.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdButtonToggleGroup.ctorParameters;
    /** @type {?} */
    MdButtonToggleGroup.propDecorators;
    /**
     * The value for the button toggle group. Should match currently selected button toggle.
     * @type {?}
     */
    MdButtonToggleGroup.prototype._value;
    /**
     * The HTML name attribute applied to toggles in this group.
     * @type {?}
     */
    MdButtonToggleGroup.prototype._name;
    /**
     * Disables all toggles in the group.
     * @type {?}
     */
    MdButtonToggleGroup.prototype._disabled;
    /**
     * Whether the button toggle group should be vertical.
     * @type {?}
     */
    MdButtonToggleGroup.prototype._vertical;
    /**
     * The currently selected button toggle, should match the value.
     * @type {?}
     */
    MdButtonToggleGroup.prototype._selected;
    /**
     * Whether the button toggle group is initialized or not.
     * @type {?}
     */
    MdButtonToggleGroup.prototype._isInitialized;
    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     * @type {?}
     */
    MdButtonToggleGroup.prototype._controlValueAccessorChangeFn;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @type {?}
     */
    MdButtonToggleGroup.prototype.onTouched;
    /**
     * Child button toggle buttons.
     * @type {?}
     */
    MdButtonToggleGroup.prototype._buttonToggles;
    /** @type {?} */
    MdButtonToggleGroup.prototype._change;
}
/**
 * Multiple selection button-toggle group. `ngModel` is not supported in this mode.
 */
export class MdButtonToggleGroupMultiple {
    constructor() {
        this._disabled = null;
        this._vertical = false;
    }
    /**
     * Whether the toggle group is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = (value != null && value !== false) ? true : null;
    }
    /**
     * Whether the toggle group is vertical.
     * @return {?}
     */
    get vertical() {
        return this._vertical;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
}
MdButtonToggleGroupMultiple.decorators = [
    { type: Directive, args: [{
                selector: 'md-button-toggle-group[multiple], mat-button-toggle-group[multiple]',
                exportAs: 'mdButtonToggleGroup',
                host: {
                    '[class.mat-button-toggle-group]': 'true',
                    '[class.mat-button-toggle-vertical]': 'vertical'
                }
            },] },
];
/**
 * @nocollapse
 */
MdButtonToggleGroupMultiple.ctorParameters = () => [];
MdButtonToggleGroupMultiple.propDecorators = {
    'disabled': [{ type: Input },],
    'vertical': [{ type: Input },],
};
function MdButtonToggleGroupMultiple_tsickle_Closure_declarations() {
    /** @type {?} */
    MdButtonToggleGroupMultiple.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdButtonToggleGroupMultiple.ctorParameters;
    /** @type {?} */
    MdButtonToggleGroupMultiple.propDecorators;
    /**
     * Disables all toggles in the group.
     * @type {?}
     */
    MdButtonToggleGroupMultiple.prototype._disabled;
    /**
     * Whether the button toggle group should be vertical.
     * @type {?}
     */
    MdButtonToggleGroupMultiple.prototype._vertical;
}
/**
 * Single button inside of a toggle group.
 */
export class MdButtonToggle {
    /**
     * @param {?} toggleGroup
     * @param {?} toggleGroupMultiple
     * @param {?} _buttonToggleDispatcher
     * @param {?} _renderer
     * @param {?} _elementRef
     * @param {?} _focusOriginMonitor
     */
    constructor(toggleGroup, toggleGroupMultiple, _buttonToggleDispatcher, _renderer, _elementRef, _focusOriginMonitor) {
        this._buttonToggleDispatcher = _buttonToggleDispatcher;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this._checked = false;
        this._disabled = null;
        this._value = null;
        this._isSingleSelector = null;
        this._change = new EventEmitter();
        this.buttonToggleGroup = toggleGroup;
        this.buttonToggleGroupMultiple = toggleGroupMultiple;
        if (this.buttonToggleGroup) {
            _buttonToggleDispatcher.listen((id, name) => {
                if (id != this.id && name == this.name) {
                    this.checked = false;
                }
            });
            this._type = 'radio';
            this.name = this.buttonToggleGroup.name;
            this._isSingleSelector = true;
        }
        else {
            // Even if there is no group at all, treat the button toggle as a checkbox so it can be
            // toggled on or off.
            this._type = 'checkbox';
            this._isSingleSelector = false;
        }
    }
    /**
     * Unique ID for the underlying `input` element.
     * @return {?}
     */
    get inputId() {
        return `${this.id}-input`;
    }
    /**
     * Whether the button is checked.
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
        if (this._isSingleSelector) {
            if (newCheckedState) {
                // Notify all button toggles with the same name (in the same group) to un-check.
                this._buttonToggleDispatcher.notify(this.id, this.name);
            }
        }
        this._checked = newCheckedState;
        if (newCheckedState && this._isSingleSelector && this.buttonToggleGroup.value != this.value) {
            this.buttonToggleGroup.selected = this;
        }
    }
    /**
     * MdButtonToggleGroup reads this to assign its own value.
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
            if (this.buttonToggleGroup != null && this.checked) {
                this.buttonToggleGroup.value = value;
            }
            this._value = value;
        }
    }
    /**
     * Whether the button is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled || (this.buttonToggleGroup != null && this.buttonToggleGroup.disabled) ||
            (this.buttonToggleGroupMultiple != null && this.buttonToggleGroupMultiple.disabled);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = (value != null && value !== false) ? true : null;
    }
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.id == null) {
            this.id = `md-button-toggle-${_uniqueIdCounter++}`;
        }
        if (this.buttonToggleGroup && this._value == this.buttonToggleGroup.value) {
            this._checked = true;
        }
        this._focusOriginMonitor.monitor(this._elementRef.nativeElement, this._renderer, true);
    }
    /**
     * Focuses the button.
     * @return {?}
     */
    focus() {
        this._renderer.invokeElementMethod(this._inputElement.nativeElement, 'focus');
    }
    /**
     * Toggle the state of the current button toggle.
     * @return {?}
     */
    _toggle() {
        this.checked = !this.checked;
    }
    /**
     * Checks the button toggle due to an interaction with the underlying native input.
     * @param {?} event
     * @return {?}
     */
    _onInputChange(event) {
        event.stopPropagation();
        if (this._isSingleSelector) {
            // Propagate the change one-way via the group, which will in turn mark this
            // button toggle as checked.
            this.checked = true;
            this.buttonToggleGroup.selected = this;
            this.buttonToggleGroup.onTouched();
        }
        else {
            this._toggle();
        }
        // Emit a change event when the native input does.
        this._emitChangeEvent();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onInputClick(event) {
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
     * Dispatch change event with current value.
     * @return {?}
     */
    _emitChangeEvent() {
        let /** @type {?} */ event = new MdButtonToggleChange();
        event.source = this;
        event.value = this._value;
        this._change.emit(event);
    }
}
MdButtonToggle.decorators = [
    { type: Component, args: [{selector: 'md-button-toggle, mat-button-toggle',
                template: "<label [attr.for]=\"inputId\" class=\"mat-button-toggle-label\"> <input #input class=\"mat-button-toggle-input cdk-visually-hidden\" [type]=\"_type\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [name]=\"name\" (change)=\"_onInputChange($event)\" (click)=\"_onInputClick($event)\"> <div class=\"mat-button-toggle-label-content\"> <ng-content></ng-content> </div> </label> <!-- the touchstart handler prevents the overlay from capturing the initial tap on touch devices --> <div class=\"mat-button-toggle-focus-overlay\" (touchstart)=\"$event.preventDefault()\"></div> ",
                styles: [".mat-button-toggle-group{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);position:relative;display:inline-flex;flex-direction:row;border-radius:2px;cursor:pointer;white-space:nowrap}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle-disabled .mat-button-toggle-label-content{cursor:default}.mat-button-toggle{white-space:nowrap;font-family:Roboto,\"Helvetica Neue\",sans-serif;position:relative}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:1}.mat-button-toggle-label-content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:inline-block;line-height:36px;padding:0 16px;cursor:pointer}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{border-radius:inherit;pointer-events:none;opacity:0;position:absolute;top:0;left:0;right:0;bottom:0} /*# sourceMappingURL=button-toggle.css.map */ "],
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.mat-button-toggle]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdButtonToggle.ctorParameters = () => [
    { type: MdButtonToggleGroup, decorators: [{ type: Optional },] },
    { type: MdButtonToggleGroupMultiple, decorators: [{ type: Optional },] },
    { type: UniqueSelectionDispatcher, },
    { type: Renderer, },
    { type: ElementRef, },
    { type: FocusOriginMonitor, },
];
MdButtonToggle.propDecorators = {
    '_inputElement': [{ type: ViewChild, args: ['input',] },],
    'id': [{ type: HostBinding }, { type: Input },],
    'name': [{ type: Input },],
    'checked': [{ type: HostBinding, args: ['class.mat-button-toggle-checked',] }, { type: Input },],
    'value': [{ type: Input },],
    'disabled': [{ type: HostBinding, args: ['class.mat-button-toggle-disabled',] }, { type: Input },],
    'change': [{ type: Output },],
};
function MdButtonToggle_tsickle_Closure_declarations() {
    /** @type {?} */
    MdButtonToggle.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdButtonToggle.ctorParameters;
    /** @type {?} */
    MdButtonToggle.propDecorators;
    /**
     * Whether or not this button toggle is checked.
     * @type {?}
     */
    MdButtonToggle.prototype._checked;
    /**
     * Type of the button toggle. Either 'radio' or 'checkbox'.
     * @type {?}
     */
    MdButtonToggle.prototype._type;
    /**
     * Whether or not this button toggle is disabled.
     * @type {?}
     */
    MdButtonToggle.prototype._disabled;
    /**
     * Value assigned to this button toggle.
     * @type {?}
     */
    MdButtonToggle.prototype._value;
    /**
     * Whether or not the button toggle is a single selection.
     * @type {?}
     */
    MdButtonToggle.prototype._isSingleSelector;
    /** @type {?} */
    MdButtonToggle.prototype._inputElement;
    /**
     * The parent button toggle group (exclusive selection). Optional.
     * @type {?}
     */
    MdButtonToggle.prototype.buttonToggleGroup;
    /**
     * The parent button toggle group (multiple selection). Optional.
     * @type {?}
     */
    MdButtonToggle.prototype.buttonToggleGroupMultiple;
    /**
     * The unique ID for this button toggle.
     * @type {?}
     */
    MdButtonToggle.prototype.id;
    /**
     * HTML's 'name' attribute used to group radios for unique selection.
     * @type {?}
     */
    MdButtonToggle.prototype.name;
    /**
     * Event emitted when the group value changes.
     * @type {?}
     */
    MdButtonToggle.prototype._change;
    /** @type {?} */
    MdButtonToggle.prototype._buttonToggleDispatcher;
    /** @type {?} */
    MdButtonToggle.prototype._renderer;
    /** @type {?} */
    MdButtonToggle.prototype._elementRef;
    /** @type {?} */
    MdButtonToggle.prototype._focusOriginMonitor;
}
//# sourceMappingURL=button-toggle.js.map