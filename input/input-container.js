import { ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Input, Optional, Output, Renderer, Self, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '../core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { getSupportedInputTypes } from '../core/platform/features';
import { MdInputContainerDuplicatedHintError, MdInputContainerMissingMdInputError, MdInputContainerPlaceholderConflictError, MdInputContainerUnsupportedTypeError } from './input-container-errors';
// Invalid input type. Using one of these will throw an MdInputContainerUnsupportedTypeError.
const /** @type {?} */ MD_INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'color',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
let /** @type {?} */ nextUniqueId = 0;
/**
 * The placeholder directive. The content can declare this to implement more
 * complex placeholders.
 */
export class MdPlaceholder {
}
MdPlaceholder.decorators = [
    { type: Directive, args: [{
                selector: 'md-placeholder, mat-placeholder'
            },] },
];
/**
 * @nocollapse
 */
MdPlaceholder.ctorParameters = () => [];
function MdPlaceholder_tsickle_Closure_declarations() {
    /** @type {?} */
    MdPlaceholder.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdPlaceholder.ctorParameters;
}
/**
 * Hint text to be shown underneath the input.
 */
export class MdHint {
    constructor() {
        // Whether to align the hint label at the start or end of the line.
        this.align = 'start';
        // Unique ID for the hint. Used for the aria-describedby on the input.
        this.id = `md-input-hint-${nextUniqueId++}`;
    }
}
MdHint.decorators = [
    { type: Directive, args: [{
                selector: 'md-hint, mat-hint',
                host: {
                    '[class.mat-hint]': 'true',
                    '[class.mat-right]': 'align == "end"',
                    '[attr.id]': 'id',
                }
            },] },
];
/**
 * @nocollapse
 */
MdHint.ctorParameters = () => [];
MdHint.propDecorators = {
    'align': [{ type: Input },],
    'id': [{ type: Input },],
};
function MdHint_tsickle_Closure_declarations() {
    /** @type {?} */
    MdHint.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdHint.ctorParameters;
    /** @type {?} */
    MdHint.propDecorators;
    /** @type {?} */
    MdHint.prototype.align;
    /** @type {?} */
    MdHint.prototype.id;
}
/**
 * Single error message to be shown underneath the input.
 */
export class MdErrorDirective {
}
MdErrorDirective.decorators = [
    { type: Directive, args: [{
                selector: 'md-error, mat-error',
                host: {
                    '[class.mat-input-error]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdErrorDirective.ctorParameters = () => [];
function MdErrorDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MdErrorDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdErrorDirective.ctorParameters;
}
/**
 * Prefix to be placed the the front of the input.
 */
export class MdPrefix {
}
MdPrefix.decorators = [
    { type: Directive, args: [{
                selector: '[mdPrefix], [matPrefix], [md-prefix]'
            },] },
];
/**
 * @nocollapse
 */
MdPrefix.ctorParameters = () => [];
function MdPrefix_tsickle_Closure_declarations() {
    /** @type {?} */
    MdPrefix.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdPrefix.ctorParameters;
}
/**
 * Suffix to be placed at the end of the input.
 */
export class MdSuffix {
}
MdSuffix.decorators = [
    { type: Directive, args: [{
                selector: '[mdSuffix], [matSuffix], [md-suffix]'
            },] },
];
/**
 * @nocollapse
 */
MdSuffix.ctorParameters = () => [];
function MdSuffix_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSuffix.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSuffix.ctorParameters;
}
/**
 * Marker for the input element that `MdInputContainer` is wrapping.
 */
export class MdInputDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _ngControl
     */
    constructor(_elementRef, _renderer, _ngControl) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngControl = _ngControl;
        /**
         * Variables used as cache for getters and setters.
         */
        this._type = 'text';
        this._placeholder = '';
        this._disabled = false;
        this._required = false;
        /**
         * Whether the element is focused or not.
         */
        this.focused = false;
        /**
         * Emits an event when the placeholder changes so that the `md-input-container` can re-validate.
         */
        this._placeholderChange = new EventEmitter();
        this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter(t => getSupportedInputTypes().has(t));
        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }
    /**
     * Whether the element is disabled.
     * @return {?}
     */
    get disabled() {
        return this._ngControl ? this._ngControl.disabled : this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Unique id of the element.
     * @return {?}
     */
    get id() { return this._id; }
    /**
     * @param {?} value
     * @return {?}
     */
    set id(value) { this._id = value || this._uid; }
    /**
     * Placeholder attribute of the element.
     * @return {?}
     */
    get placeholder() { return this._placeholder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        if (this._placeholder !== value) {
            this._placeholder = value;
            this._placeholderChange.emit(this._placeholder);
        }
    }
    /**
     * Whether the element is required.
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Input type of the element.
     * @return {?}
     */
    get type() { return this._type; }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this._type = value || 'text';
        this._validateType();
        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.
        if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
            this._renderer.setElementProperty(this._elementRef.nativeElement, 'type', this._type);
        }
    }
    /**
     * The input element's value.
     * @return {?}
     */
    get value() { return this._elementRef.nativeElement.value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) { this._elementRef.nativeElement.value = value; }
    /**
     * @return {?}
     */
    get empty() {
        return !this._isNeverEmpty() &&
            (this.value == null || this.value === '') &&
            // Check if the input contains bad input. If so, we know that it only appears empty because
            // the value failed to parse. From the user's perspective it is not empty.
            // TODO(mmalerba): Add e2e test for bad input case.
            !this._isBadInput();
    }
    /**
     * @return {?}
     */
    get _uid() { return this._cachedUid = this._cachedUid || `md-input-${nextUniqueId++}`; }
    /**
     * Focuses the input element.
     * @return {?}
     */
    focus() { this._renderer.invokeElementMethod(this._elementRef.nativeElement, 'focus'); }
    /**
     * @return {?}
     */
    _onFocus() { this.focused = true; }
    /**
     * @return {?}
     */
    _onBlur() { this.focused = false; }
    /**
     * @return {?}
     */
    _onInput() {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    }
    /**
     * Make sure the input is a supported type.
     * @return {?}
     */
    _validateType() {
        if (MD_INPUT_INVALID_TYPES.indexOf(this._type) !== -1) {
            throw new MdInputContainerUnsupportedTypeError(this._type);
        }
    }
    /**
     * @return {?}
     */
    _isNeverEmpty() { return this._neverEmptyInputTypes.indexOf(this._type) !== -1; }
    /**
     * @return {?}
     */
    _isBadInput() {
        return ((this._elementRef.nativeElement)).validity.badInput;
    }
    /**
     * Determines if the component host is a textarea. If not recognizable it returns false.
     * @return {?}
     */
    _isTextarea() {
        let /** @type {?} */ nativeElement = this._elementRef.nativeElement;
        return nativeElement ? nativeElement.nodeName.toLowerCase() === 'textarea' : false;
    }
}
MdInputDirective.decorators = [
    { type: Directive, args: [{
                selector: `input[mdInput], textarea[mdInput], input[matInput], textarea[matInput]`,
                host: {
                    '[class.mat-input-element]': 'true',
                    // Native input properties that are overwritten by Angular inputs need to be synced with
                    // the native input element. Otherwise property bindings for those don't work.
                    '[id]': 'id',
                    '[placeholder]': 'placeholder',
                    '[disabled]': 'disabled',
                    '[required]': 'required',
                    '[attr.aria-describedby]': 'ariaDescribedby || null',
                    '(blur)': '_onBlur()',
                    '(focus)': '_onFocus()',
                    '(input)': '_onInput()',
                }
            },] },
];
/**
 * @nocollapse
 */
MdInputDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self },] },
];
MdInputDirective.propDecorators = {
    'disabled': [{ type: Input },],
    'id': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'required': [{ type: Input },],
    'type': [{ type: Input },],
    '_placeholderChange': [{ type: Output },],
};
function MdInputDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    MdInputDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdInputDirective.ctorParameters;
    /** @type {?} */
    MdInputDirective.propDecorators;
    /**
     * Variables used as cache for getters and setters.
     * @type {?}
     */
    MdInputDirective.prototype._type;
    /** @type {?} */
    MdInputDirective.prototype._placeholder;
    /** @type {?} */
    MdInputDirective.prototype._disabled;
    /** @type {?} */
    MdInputDirective.prototype._required;
    /** @type {?} */
    MdInputDirective.prototype._id;
    /** @type {?} */
    MdInputDirective.prototype._cachedUid;
    /**
     * Whether the element is focused or not.
     * @type {?}
     */
    MdInputDirective.prototype.focused;
    /**
     * Sets the aria-describedby attribute on the input for improved a11y.
     * @type {?}
     */
    MdInputDirective.prototype.ariaDescribedby;
    /**
     * Emits an event when the placeholder changes so that the `md-input-container` can re-validate.
     * @type {?}
     */
    MdInputDirective.prototype._placeholderChange;
    /** @type {?} */
    MdInputDirective.prototype._neverEmptyInputTypes;
    /** @type {?} */
    MdInputDirective.prototype._elementRef;
    /** @type {?} */
    MdInputDirective.prototype._renderer;
    /** @type {?} */
    MdInputDirective.prototype._ngControl;
}
/**
 * Container for text inputs that applies Material Design styling and behavior.
 */
export class MdInputContainer {
    /**
     * @param {?} _elementRef
     * @param {?} _changeDetectorRef
     * @param {?} _parentForm
     * @param {?} _parentFormGroup
     */
    constructor(_elementRef, _changeDetectorRef, _parentForm, _parentFormGroup) {
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        /**
         * Alignment of the input container's content.
         */
        this.align = 'start';
        /**
         * Color of the input divider, based on the theme.
         */
        this.color = 'primary';
        /**
         * State of the md-hint and md-error animations.
         */
        this._subscriptAnimationState = '';
        this._hintLabel = '';
        // Unique id for the hint label.
        this._hintLabelId = `md-input-hint-${nextUniqueId++}`;
        this._floatPlaceholder = 'auto';
    }
    /**
     * @deprecated Use color instead.
     * @return {?}
     */
    get dividerColor() { return this.color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set dividerColor(value) { this.color = value; }
    /**
     * Whether the floating label should always float or not.
     * @return {?}
     */
    get _shouldAlwaysFloat() { return this._floatPlaceholder === 'always'; }
    /**
     * Whether the placeholder can float or not.
     * @return {?}
     */
    get _canPlaceholderFloat() { return this._floatPlaceholder !== 'never'; }
    /**
     * Text for the input hint.
     * @return {?}
     */
    get hintLabel() { return this._hintLabel; }
    /**
     * @param {?} value
     * @return {?}
     */
    set hintLabel(value) {
        this._hintLabel = value;
        this._processHints();
    }
    /**
     * Whether the placeholder should always float, never float or float as the user types.
     * @return {?}
     */
    get floatPlaceholder() { return this._floatPlaceholder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set floatPlaceholder(value) {
        this._floatPlaceholder = value || 'auto';
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (!this._mdInputChild) {
            throw new MdInputContainerMissingMdInputError();
        }
        this._processHints();
        this._validatePlaceholders();
        // Re-validate when things change.
        this._hintChildren.changes.subscribe(() => this._processHints());
        this._mdInputChild._placeholderChange.subscribe(() => this._validatePlaceholders());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Avoid animations on load.
        this._subscriptAnimationState = 'enter';
        this._changeDetectorRef.detectChanges();
    }
    /**
     * Determines whether a class from the NgControl should be forwarded to the host element.
     * @param {?} prop
     * @return {?}
     */
    _shouldForward(prop) {
        let /** @type {?} */ control = this._mdInputChild ? this._mdInputChild._ngControl : null;
        return control && ((control))[prop];
    }
    /**
     * Whether the input has a placeholder.
     * @return {?}
     */
    _hasPlaceholder() { return !!(this._mdInputChild.placeholder || this._placeholderChild); }
    /**
     * Focuses the underlying input.
     * @return {?}
     */
    _focusInput() { this._mdInputChild.focus(); }
    /**
     * Whether the input container is in an error state.
     * @return {?}
     */
    _isErrorState() {
        const /** @type {?} */ control = this._mdInputChild._ngControl;
        const /** @type {?} */ isInvalid = control && control.invalid;
        const /** @type {?} */ isTouched = control && control.touched;
        const /** @type {?} */ isSubmitted = (this._parentFormGroup && this._parentFormGroup.submitted) ||
            (this._parentForm && this._parentForm.submitted);
        return !!(isInvalid && (isTouched || isSubmitted));
    }
    /**
     * Determines whether to display hints or errors.
     * @return {?}
     */
    _getDisplayedMessages() {
        return (this._errorChildren.length > 0 && this._isErrorState()) ? 'error' : 'hint';
    }
    /**
     * Ensure that there is only one placeholder (either `input` attribute or child element with the
     * `md-placeholder` attribute.
     * @return {?}
     */
    _validatePlaceholders() {
        if (this._mdInputChild.placeholder && this._placeholderChild) {
            throw new MdInputContainerPlaceholderConflictError();
        }
    }
    /**
     * Does any extra processing that is required when handling the hints.
     * @return {?}
     */
    _processHints() {
        this._validateHints();
        this._syncAriaDescribedby();
    }
    /**
     * Ensure that there is a maximum of one of each `<md-hint>` alignment specified, with the
     * attribute being considered as `align="start"`.
     * @return {?}
     */
    _validateHints() {
        if (this._hintChildren) {
            let /** @type {?} */ startHint = null;
            let /** @type {?} */ endHint = null;
            this._hintChildren.forEach((hint) => {
                if (hint.align == 'start') {
                    if (startHint || this.hintLabel) {
                        throw new MdInputContainerDuplicatedHintError('start');
                    }
                    startHint = hint;
                }
                else if (hint.align == 'end') {
                    if (endHint) {
                        throw new MdInputContainerDuplicatedHintError('end');
                    }
                    endHint = hint;
                }
            });
        }
    }
    /**
     * Sets the child input's `aria-describedby` to a space-separated list of the ids
     * of the currently-specified hints, as well as a generated id for the hint label.
     * @return {?}
     */
    _syncAriaDescribedby() {
        let /** @type {?} */ ids = [];
        let /** @type {?} */ startHint = this._hintChildren ?
            this._hintChildren.find(hint => hint.align === 'start') : null;
        let /** @type {?} */ endHint = this._hintChildren ?
            this._hintChildren.find(hint => hint.align === 'end') : null;
        if (startHint) {
            ids.push(startHint.id);
        }
        else if (this._hintLabel) {
            ids.push(this._hintLabelId);
        }
        if (endHint) {
            ids.push(endHint.id);
        }
        this._mdInputChild.ariaDescribedby = ids.join(' ');
    }
}
MdInputContainer.decorators = [
    { type: Component, args: [{selector: 'md-input-container, mat-input-container',
                template: "<div class=\"mat-input-wrapper\"> <div class=\"mat-input-table\"> <div class=\"mat-input-prefix\" *ngIf=\"_prefixChildren.length\"> <!-- TODO(andrewseguin): remove [md-prefix] --> <ng-content select=\"[mdPrefix], [matPrefix], [md-prefix]\"></ng-content> </div> <div class=\"mat-input-infix\" [class.mat-end]=\"align == 'end'\"> <ng-content selector=\"input, textarea\"></ng-content> <span class=\"mat-input-placeholder-wrapper\"> <label class=\"mat-input-placeholder\" [attr.for]=\"_mdInputChild.id\" [class.mat-empty]=\"_mdInputChild.empty && !_shouldAlwaysFloat\" [class.mat-float]=\"_canPlaceholderFloat\" [class.mat-accent]=\"color == 'accent'\" [class.mat-warn]=\"color == 'warn'\" *ngIf=\"_hasPlaceholder()\"> <ng-content select=\"md-placeholder, mat-placeholder\"></ng-content> {{_mdInputChild.placeholder}} <span class=\"mat-placeholder-required\" *ngIf=\"_mdInputChild.required\">*</span> </label> </span> </div> <div class=\"mat-input-suffix\" *ngIf=\"_suffixChildren.length\"> <!-- TODO(andrewseguin): remove [md-suffix] --> <ng-content select=\"[mdSuffix], [matSuffix], [md-suffix]\"></ng-content> </div> </div> <div class=\"mat-input-underline\" [class.mat-disabled]=\"_mdInputChild.disabled\"> <span class=\"mat-input-ripple\" [class.mat-accent]=\"color == 'accent'\" [class.mat-warn]=\"color == 'warn'\"></span> </div> <div class=\"mat-input-subscript-wrapper\" [ngSwitch]=\"_getDisplayedMessages()\"> <div *ngSwitchCase=\"'error'\" [@transitionMessages]=\"_subscriptAnimationState\"> <ng-content select=\"md-error, mat-error\"></ng-content> </div> <div class=\"mat-input-hint-wrapper\" *ngSwitchCase=\"'hint'\" [@transitionMessages]=\"_subscriptAnimationState\"> <div *ngIf=\"hintLabel\" [id]=\"_hintLabelId\" class=\"mat-hint\">{{hintLabel}}</div> <ng-content select=\"md-hint:not([align='end']), mat-hint:not([align='end'])\"></ng-content> <div class=\"mat-input-hint-spacer\"></div> <ng-content select=\"md-hint[align='end'], mat-hint[align='end']\"></ng-content> </div> </div> </div> ",
                styles: [".mat-input-container{display:inline-block;position:relative;font-family:Roboto,\"Helvetica Neue\",sans-serif;line-height:normal;text-align:left}[dir=rtl] .mat-input-container{text-align:right}.mat-input-container .mat-icon{width:auto;height:auto;font-size:100%;vertical-align:top}.mat-input-wrapper{margin:1em 0;padding-bottom:6px}.mat-input-table{display:inline-table;flex-flow:column;vertical-align:bottom;width:100%}.mat-input-table>*{display:table-cell}.mat-input-infix{position:relative}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;width:100%;vertical-align:bottom}.mat-end .mat-input-element{text-align:right}[dir=rtl] .mat-end .mat-input-element{text-align:left}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element:-webkit-autofill+.mat-input-placeholder-wrapper .mat-float{display:block;transform:translateY(-1.35em) scale(.75);width:133.33333%;transition:none}.mat-input-element::placeholder{color:transparent}.mat-input-element::-moz-placeholder{color:transparent}.mat-input-element::-webkit-input-placeholder{color:transparent}.mat-input-element:-ms-input-placeholder{color:transparent}.mat-input-placeholder{position:absolute;left:0;top:0;font-size:100%;z-index:1;padding-top:1em;width:100%;display:none;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:translateY(0);transform-origin:bottom left;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1)}.mat-input-placeholder.mat-empty{display:block;cursor:text}.mat-focused .mat-input-placeholder.mat-float,.mat-input-placeholder.mat-float:not(.mat-empty){display:block;transform:translateY(-1.35em) scale(.75);width:133.33333%}[dir=rtl] .mat-input-placeholder{transform-origin:bottom right;left:auto;right:0}.mat-input-placeholder:not(.mat-empty){transition:none}.mat-input-placeholder-wrapper{position:absolute;left:0;top:-1em;width:100%;padding-top:1em;overflow:hidden;transform:translate3d(0,0,0)}.mat-input-placeholder-wrapper::after{content:'';display:inline-table}.mat-input-underline{position:absolute;height:1px;width:100%;margin-top:4px;border-top-width:1px;border-top-style:solid}.mat-input-underline.mat-disabled{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;border-top:0;background-position:0}.mat-input-underline .mat-input-ripple{position:absolute;height:2px;z-index:1;top:-1px;width:100%;transform-origin:top;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-focused .mat-input-underline .mat-input-ripple{opacity:1}.mat-input-subscript-wrapper{position:absolute;font-size:75%;top:100%;width:100%;margin-top:-1em;overflow:hidden}.mat-input-hint-wrapper{display:flex}.mat-input-hint-spacer{flex:1 0 10px}.mat-input-error{display:block}.mat-input-prefix,.mat-input-suffix{width:.1px;white-space:nowrap} /*# sourceMappingURL=input-container.css.map */ "],
                animations: [
                    trigger('transitionMessages', [
                        state('enter', style({ opacity: 1, transform: 'translateY(0%)' })),
                        transition('void => enter', [
                            style({ opacity: 0, transform: 'translateY(-100%)' }),
                            animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)')
                        ])
                    ])
                ],
                host: {
                    // Remove align attribute to prevent it from interfering with layout.
                    '[attr.align]': 'null',
                    '[class.mat-input-container]': 'true',
                    '[class.mat-input-invalid]': '_isErrorState()',
                    '[class.mat-focused]': '_mdInputChild.focused',
                    '[class.ng-untouched]': '_shouldForward("untouched")',
                    '[class.ng-touched]': '_shouldForward("touched")',
                    '[class.ng-pristine]': '_shouldForward("pristine")',
                    '[class.ng-dirty]': '_shouldForward("dirty")',
                    '[class.ng-valid]': '_shouldForward("valid")',
                    '[class.ng-invalid]': '_shouldForward("invalid")',
                    '[class.ng-pending]': '_shouldForward("pending")',
                    '(click)': '_focusInput()',
                },
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
MdInputContainer.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: NgForm, decorators: [{ type: Optional },] },
    { type: FormGroupDirective, decorators: [{ type: Optional },] },
];
MdInputContainer.propDecorators = {
    'align': [{ type: Input },],
    'color': [{ type: Input },],
    'dividerColor': [{ type: Input },],
    'hintLabel': [{ type: Input },],
    'floatPlaceholder': [{ type: Input },],
    '_mdInputChild': [{ type: ContentChild, args: [MdInputDirective,] },],
    '_placeholderChild': [{ type: ContentChild, args: [MdPlaceholder,] },],
    '_errorChildren': [{ type: ContentChildren, args: [MdErrorDirective,] },],
    '_hintChildren': [{ type: ContentChildren, args: [MdHint,] },],
    '_prefixChildren': [{ type: ContentChildren, args: [MdPrefix,] },],
    '_suffixChildren': [{ type: ContentChildren, args: [MdSuffix,] },],
};
function MdInputContainer_tsickle_Closure_declarations() {
    /** @type {?} */
    MdInputContainer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdInputContainer.ctorParameters;
    /** @type {?} */
    MdInputContainer.propDecorators;
    /**
     * Alignment of the input container's content.
     * @type {?}
     */
    MdInputContainer.prototype.align;
    /**
     * Color of the input divider, based on the theme.
     * @type {?}
     */
    MdInputContainer.prototype.color;
    /**
     * State of the md-hint and md-error animations.
     * @type {?}
     */
    MdInputContainer.prototype._subscriptAnimationState;
    /** @type {?} */
    MdInputContainer.prototype._hintLabel;
    /** @type {?} */
    MdInputContainer.prototype._hintLabelId;
    /** @type {?} */
    MdInputContainer.prototype._floatPlaceholder;
    /** @type {?} */
    MdInputContainer.prototype._mdInputChild;
    /** @type {?} */
    MdInputContainer.prototype._placeholderChild;
    /** @type {?} */
    MdInputContainer.prototype._errorChildren;
    /** @type {?} */
    MdInputContainer.prototype._hintChildren;
    /** @type {?} */
    MdInputContainer.prototype._prefixChildren;
    /** @type {?} */
    MdInputContainer.prototype._suffixChildren;
    /** @type {?} */
    MdInputContainer.prototype._elementRef;
    /** @type {?} */
    MdInputContainer.prototype._changeDetectorRef;
    /** @type {?} */
    MdInputContainer.prototype._parentForm;
    /** @type {?} */
    MdInputContainer.prototype._parentFormGroup;
}
//# sourceMappingURL=input-container.js.map