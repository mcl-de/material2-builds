import { Component, ElementRef, EventEmitter, Input, Output, NgModule, Renderer, ViewEncapsulation, Inject, Optional, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENTER, SPACE } from '../keyboard/keycodes';
import { coerceBooleanProperty } from '../coercion/boolean-property';
import { MdRippleModule } from '../ripple/index';
import { MdSelectionModule } from '../selection/index';
import { MATERIAL_COMPATIBILITY_MODE } from '../../core/compatibility/compatibility';
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let /** @type {?} */ _uniqueIdCounter = 0;
/**
 * Event object emitted by MdOption when selected or deselected.
 */
export class MdOptionSelectionChange {
    /**
     * @param {?} source
     * @param {?=} isUserInput
     */
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
function MdOptionSelectionChange_tsickle_Closure_declarations() {
    /** @type {?} */
    MdOptionSelectionChange.prototype.source;
    /** @type {?} */
    MdOptionSelectionChange.prototype.isUserInput;
}
/**
 * Single option inside of a `<md-select>` element.
 */
export class MdOption {
    /**
     * @param {?} _element
     * @param {?} _renderer
     * @param {?} _isCompatibilityMode
     */
    constructor(_element, _renderer, _isCompatibilityMode) {
        this._element = _element;
        this._renderer = _renderer;
        this._isCompatibilityMode = _isCompatibilityMode;
        this._selected = false;
        this._active = false;
        this._disabled = false;
        this._id = `md-option-${_uniqueIdCounter++}`;
        /** Whether the wrapping component is in multiple selection mode. */
        this.multiple = false;
        /** Event emitted when the option is selected or deselected. */
        this.onSelectionChange = new EventEmitter();
    }
    /**
     * The unique ID of the option.
     * @return {?}
     */
    get id() { return this._id; }
    /**
     * Whether or not the option is currently selected.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * Whether the option is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     * @return {?}
     */
    get active() {
        return this._active;
    }
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     * @return {?}
     */
    get viewValue() {
        // TODO(kara): Add input property alternative for node envs.
        return this._getHostElement().textContent.trim();
    }
    /**
     * Selects the option.
     * @return {?}
     */
    select() {
        this._selected = true;
        this._emitSelectionChangeEvent();
    }
    /**
     * Deselects the option.
     * @return {?}
     */
    deselect() {
        this._selected = false;
        this._emitSelectionChangeEvent();
    }
    /**
     * Sets focus onto this option.
     * @return {?}
     */
    focus() {
        this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
    }
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setActiveStyles() {
        this._active = true;
    }
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @return {?}
     */
    setInactiveStyles() {
        this._active = false;
    }
    /**
     * Ensures the option is selected when activated from the keyboard.
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();
        }
    }
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     * @return {?}
     */
    _selectViaInteraction() {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._emitSelectionChangeEvent(true);
        }
    }
    /**
     * Returns the correct tabindex for the option depending on disabled state.
     * @return {?}
     */
    _getTabIndex() {
        return this.disabled ? '-1' : '0';
    }
    /**
     * Fetches the host DOM element.
     * @return {?}
     */
    _getHostElement() {
        return this._element.nativeElement;
    }
    /**
     * Emits the selection change event.
     * @param {?=} isUserInput
     * @return {?}
     */
    _emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new MdOptionSelectionChange(this, isUserInput));
    }
    ;
}
MdOption.decorators = [
    { type: Component, args: [{selector: 'md-option, mat-option',
                host: {
                    'role': 'option',
                    '[attr.tabindex]': '_getTabIndex()',
                    '[class.mat-selected]': 'selected',
                    '[class.mat-option-multiple]': 'multiple',
                    '[class.mat-active]': 'active',
                    '[id]': 'id',
                    '[attr.aria-selected]': 'selected.toString()',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[class.mat-option-disabled]': 'disabled',
                    '(click)': '_selectViaInteraction()',
                    '(keydown)': '_handleKeydown($event)',
                    '[class.mat-option]': 'true',
                },
                template: "<span [ngSwitch]=\"_isCompatibilityMode\" *ngIf=\"multiple\"> <mat-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchCase=\"true\" [state]=\"selected ? 'checked' : ''\" color=\"primary\"></mat-pseudo-checkbox> <md-pseudo-checkbox class=\"mat-option-pseudo-checkbox\" *ngSwitchDefault [state]=\"selected ? 'checked' : ''\" color=\"primary\"></md-pseudo-checkbox> </span> <ng-content></ng-content> <div class=\"mat-option-ripple\" *ngIf=\"!disabled\" md-ripple [mdRippleTrigger]=\"_getHostElement()\"> </div> ",
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
MdOption.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_COMPATIBILITY_MODE,] },] },
];
MdOption.propDecorators = {
    'value': [{ type: Input },],
    'disabled': [{ type: Input },],
    'onSelectionChange': [{ type: Output },],
};
function MdOption_tsickle_Closure_declarations() {
    /** @type {?} */
    MdOption.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdOption.ctorParameters;
    /** @type {?} */
    MdOption.propDecorators;
    /** @type {?} */
    MdOption.prototype._selected;
    /** @type {?} */
    MdOption.prototype._active;
    /**
     * Whether the option is disabled.
     * @type {?}
     */
    MdOption.prototype._disabled;
    /** @type {?} */
    MdOption.prototype._id;
    /**
     * Whether the wrapping component is in multiple selection mode.
     * @type {?}
     */
    MdOption.prototype.multiple;
    /**
     * The form value of the option.
     * @type {?}
     */
    MdOption.prototype.value;
    /**
     * Event emitted when the option is selected or deselected.
     * @type {?}
     */
    MdOption.prototype.onSelectionChange;
    /** @type {?} */
    MdOption.prototype._element;
    /** @type {?} */
    MdOption.prototype._renderer;
    /** @type {?} */
    MdOption.prototype._isCompatibilityMode;
}
export class MdOptionModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdOptionModule,
            providers: []
        };
    }
}
MdOptionModule.decorators = [
    { type: NgModule, args: [{
                imports: [MdRippleModule, CommonModule, MdSelectionModule],
                exports: [MdOption],
                declarations: [MdOption]
            },] },
];
/**
 * @nocollapse
 */
MdOptionModule.ctorParameters = () => [];
function MdOptionModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdOptionModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdOptionModule.ctorParameters;
}
//# sourceMappingURL=option.js.map