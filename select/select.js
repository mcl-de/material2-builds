import { Component, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, Renderer, Self, ViewEncapsulation, ViewChild, ChangeDetectorRef, Attribute, } from '@angular/core';
import { MdOption } from '../core/option/option';
import { ENTER, SPACE } from '../core/keyboard/keycodes';
import { FocusKeyManager } from '../core/a11y/focus-key-manager';
import { Dir } from '../core/rtl/dir';
import { Observable } from 'rxjs/Observable';
import { transformPlaceholder, transformPanel, fadeInContent } from './select-animations';
import { NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { ConnectedOverlayDirective } from '../core/overlay/overlay-directives';
import { ViewportRuler } from '../core/overlay/position/viewport-ruler';
import { SelectionModel } from '../core/selection/selection';
import { MdSelectDynamicMultipleError, MdSelectNonArrayValueError } from './select-errors';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */
/** The fixed height of every option element. */
export const /** @type {?} */ SELECT_OPTION_HEIGHT = 48;
/** The max height of the select's overlay panel */
export const /** @type {?} */ SELECT_PANEL_MAX_HEIGHT = 256;
/** The max number of options visible at once in the select panel. */
export const /** @type {?} */ SELECT_MAX_OPTIONS_DISPLAYED = 5;
/** The fixed height of the select's trigger element. */
export const /** @type {?} */ SELECT_TRIGGER_HEIGHT = 30;
/**
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
 * (SELECT_OPTION_HEIGHT (48) - SELECT_TRIGGER_HEIGHT (30)) / 2 = 9
 */
export const /** @type {?} */ SELECT_OPTION_HEIGHT_ADJUSTMENT = 9;
/** The panel's padding on the x-axis */
export const /** @type {?} */ SELECT_PANEL_PADDING_X = 16;
/**
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * (SELECT_PADDING * 1.75) + 20 = 48
 * The padding is multiplied by 1.75 because the checkbox's margin is half the padding, and
 * the browser adds ~4px, because we're using inline elements.
 * The checkbox width is 20px.
 */
export const /** @type {?} */ SELECT_MULTIPLE_PANEL_PADDING_X = SELECT_PANEL_PADDING_X * 1.75 + 20;
/**
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
 */
export const /** @type {?} */ SELECT_PANEL_PADDING_Y = 16;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
export const /** @type {?} */ SELECT_PANEL_VIEWPORT_PADDING = 8;
/**
 * Change event object that is emitted when the select value has changed.
 */
export class MdSelectChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
function MdSelectChange_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSelectChange.prototype.source;
    /** @type {?} */
    MdSelectChange.prototype.value;
}
export class MdSelect {
    /**
     * @param {?} _element
     * @param {?} _renderer
     * @param {?} _viewportRuler
     * @param {?} _changeDetectorRef
     * @param {?} _dir
     * @param {?} _control
     * @param {?} tabIndex
     */
    constructor(_element, _renderer, _viewportRuler, _changeDetectorRef, _dir, _control, tabIndex) {
        this._element = _element;
        this._renderer = _renderer;
        this._viewportRuler = _viewportRuler;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        this._control = _control;
        this._panelOpen = false;
        this._required = false;
        this._disabled = false;
        this._scrollTop = 0;
        this._multiple = false;
        this._placeholderState = '';
        /** View -> model callback called when value changes */
        this._onChange = (value) => { };
        /** View -> model callback called when select has been touched */
        this._onTouched = () => { };
        /** The IDs of child options to be passed to the aria-owns attribute. */
        this._optionIds = '';
        /** The value of the select panel's transform-origin property. */
        this._transformOrigin = 'top';
        /** Whether the panel's animation is done. */
        this._panelDoneAnimating = false;
        /**
         * The x-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text when
         * the panel opens. Will change based on LTR or RTL text direction.
         */
        this._offsetX = 0;
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        this._offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        this._positions = [
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
        this._floatPlaceholder = 'auto';
        /** Aria label of the select. If not specified, the placeholder will be used as label. */
        this.ariaLabel = '';
        /** Input that can be used to specify the `aria-labelledby` attribute. */
        this.ariaLabelledby = '';
        /** Event emitted when the select has been opened. */
        this.onOpen = new EventEmitter();
        /** Event emitted when the select has been closed. */
        this.onClose = new EventEmitter();
        /** Event emitted when the selected value has been changed by the user. */
        this.change = new EventEmitter();
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._tabIndex = parseInt(tabIndex) || 0;
    }
    /**
     * Placeholder to be shown if no value has been selected.
     * @return {?}
     */
    get placeholder() { return this._placeholder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        this._placeholder = value;
        // Must wait to record the trigger width to ensure placeholder width is included.
        Promise.resolve(null).then(() => this._triggerWidth = this._getWidth());
    }
    /**
     * Whether the component is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Whether the component is required.
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * Whether the user should be allowed to select multiple options.
     * @return {?}
     */
    get multiple() { return this._multiple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) {
        if (this._selectionModel) {
            throw new MdSelectDynamicMultipleError();
        }
        this._multiple = coerceBooleanProperty(value);
    }
    /**
     * Whether to float the placeholder text.
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
     * Tab index for the select element.
     * @return {?}
     */
    get tabIndex() { return this._disabled ? -1 : this._tabIndex; }
    /**
     * @param {?} value
     * @return {?}
     */
    set tabIndex(value) {
        if (typeof value !== 'undefined') {
            this._tabIndex = value;
        }
    }
    /**
     * Combined stream of all of the child options' change events.
     * @return {?}
     */
    get optionSelectionChanges() {
        return Observable.merge(...this.options.map(option => option.onSelectionChange));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._selectionModel = new SelectionModel(this.multiple, null, false);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._initKeyManager();
        this._changeSubscription = this.options.changes.startWith(null).subscribe(() => {
            this._resetOptions();
            if (this._control) {
                // Defer setting the value in order to avoid the "Expression
                // has changed after it was checked" errors from Angular.
                Promise.resolve(null).then(() => this._setSelectionByValue(this._control.value));
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._dropSubscriptions();
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        if (this._tabSubscription) {
            this._tabSubscription.unsubscribe();
        }
    }
    /**
     * Toggles the overlay panel open or closed.
     * @return {?}
     */
    toggle() {
        this.panelOpen ? this.close() : this.open();
    }
    /**
     * Opens the overlay panel.
     * @return {?}
     */
    open() {
        if (this.disabled || !this.options.length) {
            return;
        }
        this._calculateOverlayPosition();
        this._placeholderState = this._floatPlaceholderState();
        this._panelOpen = true;
    }
    /**
     * Closes the overlay panel and focuses the host element.
     * @return {?}
     */
    close() {
        if (this._panelOpen) {
            this._panelOpen = false;
            if (this._selectionModel.isEmpty()) {
                this._placeholderState = '';
            }
            this._focusHost();
        }
    }
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    writeValue(value) {
        if (this.options) {
            this._setSelectionByValue(value);
        }
    }
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the value changes.
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} fn Callback to be triggered when the component has been touched.
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param {?} isDisabled Sets whether the component is disabled.
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Whether or not the overlay panel is open.
     * @return {?}
     */
    get panelOpen() {
        return this._panelOpen;
    }
    /**
     * The currently selected option.
     * @return {?}
     */
    get selected() {
        return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
    }
    /**
     * The value displayed in the trigger.
     * @return {?}
     */
    get triggerValue() {
        if (this._multiple) {
            let /** @type {?} */ selectedOptions = this._selectionModel.selected.map(option => option.viewValue);
            if (this._isRtl()) {
                selectedOptions.reverse();
            }
            // TODO(crisbeto): delimiter should be configurable for proper localization.
            return selectedOptions.join(', ');
        }
        return this._selectionModel.selected[0].viewValue;
    }
    /**
     * Whether the element is in RTL mode.
     * @return {?}
     */
    _isRtl() {
        return this._dir ? this._dir.value === 'rtl' : false;
    }
    /**
     * The width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     * @return {?}
     */
    _getWidth() {
        return this._getTriggerRect().width;
    }
    /**
     * Ensures the panel opens if activated by the keyboard.
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.open();
        }
    }
    /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     * @return {?}
     */
    _onPanelDone() {
        if (this.panelOpen) {
            this._focusCorrectOption();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
            this._panelDoneAnimating = false;
        }
    }
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     * @return {?}
     */
    _onFadeInDone() {
        this._panelDoneAnimating = this.panelOpen;
    }
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     * @return {?}
     */
    _onBlur() {
        if (!this.panelOpen) {
            this._onTouched();
        }
    }
    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     * @return {?}
     */
    _setScrollTop() {
        const /** @type {?} */ scrollContainer = this.overlayDir.overlayRef.overlayElement.querySelector('.mat-select-panel');
        scrollContainer.scrollTop = this._scrollTop;
    }
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     * @param {?} value
     * @return {?}
     */
    _setSelectionByValue(value) {
        const /** @type {?} */ isArray = Array.isArray(value);
        if (this.multiple && value && !isArray) {
            throw new MdSelectNonArrayValueError();
        }
        if (isArray) {
            this._clearSelection();
            value.forEach((currentValue) => this._selectValue(currentValue));
            this._sortValues();
        }
        else if (!this._selectValue(value)) {
            this._clearSelection();
        }
        this._setValueWidth();
        if (this._selectionModel.isEmpty()) {
            this._placeholderState = '';
        }
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Finds and selects and option based on its value.
     * @param {?} value
     * @return {?} Option that has the corresponding value.
     */
    _selectValue(value) {
        let /** @type {?} */ correspondingOption = this.options.find(option => option.value === value);
        if (correspondingOption) {
            correspondingOption.select();
            this._selectionModel.select(correspondingOption);
        }
        return correspondingOption;
    }
    /**
     * Clears the select trigger and deselects every option in the list.
     * @param {?=} skip Option that should not be deselected.
     * @return {?}
     */
    _clearSelection(skip) {
        this._selectionModel.clear();
        this.options.forEach(option => {
            if (option !== skip) {
                option.deselect();
            }
        });
    }
    /**
     * @return {?}
     */
    _getTriggerRect() {
        return this.trigger.nativeElement.getBoundingClientRect();
    }
    /**
     * Sets up a key manager to listen to keyboard events on the overlay panel.
     * @return {?}
     */
    _initKeyManager() {
        this._keyManager = new FocusKeyManager(this.options);
        this._tabSubscription = this._keyManager.tabOut.subscribe(() => this.close());
    }
    /**
     * Drops current option subscriptions and IDs and resets from scratch.
     * @return {?}
     */
    _resetOptions() {
        this._dropSubscriptions();
        this._listenToOptions();
        this._setOptionIds();
        this._setOptionMultiple();
    }
    /**
     * Listens to user-generated selection events on each option.
     * @return {?}
     */
    _listenToOptions() {
        this._optionSubscription = this.optionSelectionChanges
            .filter(event => event.isUserInput)
            .subscribe(event => {
            this._onSelect(event.source);
            this._setValueWidth();
            if (!this.multiple) {
                this.close();
            }
        });
    }
    /**
     * Invoked when an option is clicked.
     * @param {?} option
     * @return {?}
     */
    _onSelect(option) {
        const /** @type {?} */ wasSelected = this._selectionModel.isSelected(option);
        if (this.multiple) {
            this._selectionModel.toggle(option);
            wasSelected ? option.deselect() : option.select();
            this._sortValues();
        }
        else {
            this._clearSelection(option);
            this._selectionModel.select(option);
        }
        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }
    }
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     * @return {?}
     */
    _sortValues() {
        if (this._multiple) {
            this._selectionModel.clear();
            this.options.forEach(option => {
                if (option.selected) {
                    this._selectionModel.select(option);
                }
            });
        }
    }
    /**
     * Unsubscribes from all option subscriptions.
     * @return {?}
     */
    _dropSubscriptions() {
        if (this._optionSubscription) {
            this._optionSubscription.unsubscribe();
            this._optionSubscription = null;
        }
    }
    /**
     * Emits change event to set the model value.
     * @return {?}
     */
    _propagateChanges() {
        let /** @type {?} */ valueToEmit = Array.isArray(this.selected) ?
            this.selected.map(option => option.value) :
            this.selected.value;
        this._onChange(valueToEmit);
        this.change.emit(new MdSelectChange(this, valueToEmit));
    }
    /**
     * Records option IDs to pass to the aria-owns property.
     * @return {?}
     */
    _setOptionIds() {
        this._optionIds = this.options.map(option => option.id).join(' ');
    }
    /**
     * Sets the `multiple` property on each option. The promise is necessary
     * in order to avoid Angular errors when modifying the property after init.
     * TODO: there should be a better way of doing this.
     * @return {?}
     */
    _setOptionMultiple() {
        if (this.multiple) {
            Promise.resolve(null).then(() => {
                this.options.forEach(option => option.multiple = this.multiple);
            });
        }
    }
    /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     * @return {?}
     */
    _setValueWidth() {
        this._selectedValueWidth = this._triggerWidth - 13;
    }
    /**
     * Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     * @return {?}
     */
    _focusCorrectOption() {
        if (this._selectionModel.isEmpty()) {
            this._keyManager.setFirstItemActive();
        }
        else {
            this._keyManager.setActiveItem(this._getOptionIndex(this._selectionModel.selected[0]));
        }
    }
    /**
     * Focuses the host element when the panel closes.
     * @return {?}
     */
    _focusHost() {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    }
    /**
     * Gets the index of the provided option in the option list.
     * @param {?} option
     * @return {?}
     */
    _getOptionIndex(option) {
        return this.options.reduce((result, current, index) => {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    }
    /**
     * Calculates the scroll position and x- and y-offsets of the overlay panel.
     * @return {?}
     */
    _calculateOverlayPosition() {
        this._offsetX = this.multiple ? SELECT_MULTIPLE_PANEL_PADDING_X : SELECT_PANEL_PADDING_X;
        if (!this._isRtl()) {
            this._offsetX *= -1;
        }
        const /** @type {?} */ panelHeight = Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        const /** @type {?} */ scrollContainerHeight = this.options.length * SELECT_OPTION_HEIGHT;
        // The farthest the panel can be scrolled before it hits the bottom
        const /** @type {?} */ maxScroll = scrollContainerHeight - panelHeight;
        if (this._selectionModel.hasValue()) {
            const /** @type {?} */ selectedIndex = this._getOptionIndex(this._selectionModel.selected[0]);
            // We must maintain a scroll buffer so the selected option will be scrolled to the
            // center of the overlay panel rather than the top.
            const /** @type {?} */ scrollBuffer = panelHeight / 2;
            this._scrollTop = this._calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll);
            this._offsetY = this._calculateOverlayOffset(selectedIndex, scrollBuffer, maxScroll);
        }
        else {
            // If no option is selected, the panel centers on the first option. In this case,
            // we must only adjust for the height difference between the option element
            // and the trigger element, then multiply it by -1 to ensure the panel moves
            // in the correct direction up the page.
            this._offsetY = (SELECT_OPTION_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2 * -1;
        }
        this._checkOverlayWithinViewport(maxScroll);
    }
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    _calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll) {
        const /** @type {?} */ optionOffsetFromScrollTop = SELECT_OPTION_HEIGHT * selectedIndex;
        const /** @type {?} */ halfOptionHeight = SELECT_OPTION_HEIGHT / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        const /** @type {?} */ optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return clampValue(0, optimalScrollPosition, maxScroll);
    }
    /**
     * Figures out the appropriate animation state for the placeholder.
     * @return {?}
     */
    _getPlaceholderAnimationState() {
        if (this.floatPlaceholder === 'never') {
            return '';
        }
        if (this.floatPlaceholder === 'always') {
            return this._floatPlaceholderState();
        }
        return this._placeholderState;
    }
    /**
     * Determines the CSS `visibility` of the placeholder element.
     * @return {?}
     */
    _getPlaceholderVisibility() {
        return (this.floatPlaceholder !== 'never' || this._selectionModel.isEmpty()) ?
            'visible' : 'hidden';
    }
    /**
     * Returns the aria-label of the select component.
     * @return {?}
     */
    get _ariaLabel() {
        // If an ariaLabelledby value has been set, the select should not overwrite the
        // `aria-labelledby` value by setting the ariaLabel to the placeholder.
        return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
    }
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     * @param {?} selectedIndex
     * @param {?} scrollBuffer
     * @param {?} maxScroll
     * @return {?}
     */
    _calculateOverlayOffset(selectedIndex, scrollBuffer, maxScroll) {
        let /** @type {?} */ optionOffsetFromPanelTop;
        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * SELECT_OPTION_HEIGHT;
        }
        else if (this._scrollTop === maxScroll) {
            const /** @type {?} */ firstDisplayedIndex = this.options.length - SELECT_MAX_OPTIONS_DISPLAYED;
            const /** @type {?} */ selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop =
                selectedDisplayIndex * SELECT_OPTION_HEIGHT + SELECT_PANEL_PADDING_Y;
        }
        else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - SELECT_OPTION_HEIGHT / 2;
        }
        // The final offset is the option's offset from the top, adjusted for the height
        // difference, multiplied by -1 to ensure that the overlay moves in the correct
        // direction up the page.
        return optionOffsetFromPanelTop * -1 - SELECT_OPTION_HEIGHT_ADJUSTMENT;
    }
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     * @param {?} maxScroll
     * @return {?}
     */
    _checkOverlayWithinViewport(maxScroll) {
        const /** @type {?} */ viewportRect = this._viewportRuler.getViewportRect();
        const /** @type {?} */ triggerRect = this._getTriggerRect();
        const /** @type {?} */ topSpaceAvailable = triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        const /** @type {?} */ bottomSpaceAvailable = viewportRect.height - triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        const /** @type {?} */ panelHeightTop = Math.abs(this._offsetY);
        const /** @type {?} */ totalPanelHeight = Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        const /** @type {?} */ panelHeightBottom = totalPanelHeight - panelHeightTop - triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    }
    /**
     * Adjusts the overlay panel up to fit in the viewport.
     * @param {?} panelHeightBottom
     * @param {?} bottomSpaceAvailable
     * @return {?}
     */
    _adjustPanelUp(panelHeightBottom, bottomSpaceAvailable) {
        const /** @type {?} */ distanceBelowViewport = panelHeightBottom - bottomSpaceAvailable;
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = `50% bottom 0px`;
        }
    }
    /**
     * Adjusts the overlay panel down to fit in the viewport.
     * @param {?} panelHeightTop
     * @param {?} topSpaceAvailable
     * @param {?} maxScroll
     * @return {?}
     */
    _adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll) {
        const /** @type {?} */ distanceAboveViewport = panelHeightTop - topSpaceAvailable;
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = `50% top 0px`;
            return;
        }
    }
    /**
     * Sets the transform origin point based on the selected option.
     * @return {?}
     */
    _getOriginBasedOnOption() {
        const /** @type {?} */ originY = Math.abs(this._offsetY) - SELECT_OPTION_HEIGHT_ADJUSTMENT + SELECT_OPTION_HEIGHT / 2;
        return `50% ${originY}px 0px`;
    }
    /**
     * Figures out the floating placeholder state value.
     * @return {?}
     */
    _floatPlaceholderState() {
        return this._isRtl() ? 'floating-rtl' : 'floating-ltr';
    }
}
MdSelect.decorators = [
    { type: Component, args: [{selector: 'md-select, mat-select',
                template: "<div class=\"mat-select-trigger\" cdk-overlay-origin (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger> <span class=\"mat-select-placeholder\" [class.mat-floating-placeholder]=\"_selectionModel.hasValue()\" [@transformPlaceholder]=\"_getPlaceholderAnimationState()\" [style.visibility]=\"_getPlaceholderVisibility()\" [style.width.px]=\"_selectedValueWidth\"> {{ placeholder }} </span> <span class=\"mat-select-value\" *ngIf=\"_selectionModel.hasValue()\"> <span class=\"mat-select-value-text\">{{ triggerValue }}</span> </span> <span class=\"mat-select-arrow\"></span> <span class=\"mat-select-underline\"></span> </div> <ng-template cdk-connected-overlay [origin]=\"origin\" [open]=\"panelOpen\" hasBackdrop (backdropClick)=\"close()\" backdropClass=\"cdk-overlay-transparent-backdrop\" [positions]=\"_positions\" [minWidth]=\"_triggerWidth\" [offsetY]=\"_offsetY\" [offsetX]=\"_offsetX\" (attach)=\"_setScrollTop()\"> <div class=\"mat-select-panel\" [@transformPanel]=\"'showing'\" (@transformPanel.done)=\"_onPanelDone()\" (keydown)=\"_keyManager.onKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\" [class.mat-select-panel-done-animating]=\"_panelDoneAnimating\"> <div class=\"mat-select-content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onFadeInDone()\"> <ng-content></ng-content> </div> </div> </ng-template> ",
                styles: [".mat-select{display:inline-block;outline:0;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{display:flex;align-items:center;height:30px;min-width:112px;cursor:pointer;position:relative;box-sizing:border-box;font-size:16px}[aria-disabled=true] .mat-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-select-underline{position:absolute;bottom:0;left:0;right:0;height:1px}[aria-disabled=true] .mat-select-underline{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-color:transparent;background-position:0 bottom}.mat-select-placeholder{position:relative;padding:0 2px;transform-origin:left top;flex-grow:1}.mat-select-placeholder.mat-floating-placeholder{top:-22px;left:-2px;text-align:left;transform:scale(.75)}[dir=rtl] .mat-select-placeholder{transform-origin:right top}[dir=rtl] .mat-select-placeholder.mat-floating-placeholder{left:2px;text-align:right}[aria-required=true] .mat-select-placeholder::after{content:'*'}.mat-select-value{position:absolute;max-width:calc(100% - 18px);flex-grow:1;top:0;left:0;bottom:0;display:flex;align-items:center}[dir=rtl] .mat-select-value{left:auto;right:0}.mat-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:30px}.mat-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.mat-select-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%}@media screen and (-ms-high-contrast:active){.mat-select-panel{outline:solid 1px}} /*# sourceMappingURL=select.css.map */ "],
                encapsulation: ViewEncapsulation.None,
                host: {
                    'role': 'listbox',
                    '[attr.tabindex]': 'tabIndex',
                    '[attr.aria-label]': '_ariaLabel',
                    '[attr.aria-labelledby]': 'ariaLabelledby',
                    '[attr.aria-required]': 'required.toString()',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.aria-invalid]': '_control?.invalid || "false"',
                    '[attr.aria-owns]': '_optionIds',
                    '[class.mat-select-disabled]': 'disabled',
                    '[class.mat-select]': 'true',
                    '(keydown)': '_handleKeydown($event)',
                    '(blur)': '_onBlur()'
                },
                animations: [
                    transformPlaceholder,
                    transformPanel,
                    fadeInContent
                ],
                exportAs: 'mdSelect',
            },] },
];
/**
 * @nocollapse
 */
MdSelect.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
    { type: ViewportRuler, },
    { type: ChangeDetectorRef, },
    { type: Dir, decorators: [{ type: Optional },] },
    { type: NgControl, decorators: [{ type: Self }, { type: Optional },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['tabindex',] },] },
];
MdSelect.propDecorators = {
    'trigger': [{ type: ViewChild, args: ['trigger',] },],
    'overlayDir': [{ type: ViewChild, args: [ConnectedOverlayDirective,] },],
    'options': [{ type: ContentChildren, args: [MdOption,] },],
    'placeholder': [{ type: Input },],
    'disabled': [{ type: Input },],
    'required': [{ type: Input },],
    'multiple': [{ type: Input },],
    'floatPlaceholder': [{ type: Input },],
    'tabIndex': [{ type: Input },],
    'ariaLabel': [{ type: Input, args: ['aria-label',] },],
    'ariaLabelledby': [{ type: Input, args: ['aria-labelledby',] },],
    'onOpen': [{ type: Output },],
    'onClose': [{ type: Output },],
    'change': [{ type: Output },],
};
function MdSelect_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSelect.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSelect.ctorParameters;
    /** @type {?} */
    MdSelect.propDecorators;
    /**
     * Whether or not the overlay panel is open.
     * @type {?}
     */
    MdSelect.prototype._panelOpen;
    /**
     * Subscriptions to option events.
     * @type {?}
     */
    MdSelect.prototype._optionSubscription;
    /**
     * Subscription to changes in the option list.
     * @type {?}
     */
    MdSelect.prototype._changeSubscription;
    /**
     * Subscription to tab events while overlay is focused.
     * @type {?}
     */
    MdSelect.prototype._tabSubscription;
    /**
     * Whether filling out the select is required in the form.
     * @type {?}
     */
    MdSelect.prototype._required;
    /**
     * Whether the select is disabled.
     * @type {?}
     */
    MdSelect.prototype._disabled;
    /**
     * The scroll position of the overlay panel, calculated to center the selected option.
     * @type {?}
     */
    MdSelect.prototype._scrollTop;
    /**
     * The placeholder displayed in the trigger of the select.
     * @type {?}
     */
    MdSelect.prototype._placeholder;
    /**
     * Whether the component is in multiple selection mode.
     * @type {?}
     */
    MdSelect.prototype._multiple;
    /**
     * Deals with the selection logic.
     * @type {?}
     */
    MdSelect.prototype._selectionModel;
    /**
     * The animation state of the placeholder.
     * @type {?}
     */
    MdSelect.prototype._placeholderState;
    /**
     * Tab index for the element.
     * @type {?}
     */
    MdSelect.prototype._tabIndex;
    /**
     * The width of the trigger. Must be saved to set the min width of the overlay panel
     * and the width of the selected value.
     * @type {?}
     */
    MdSelect.prototype._triggerWidth;
    /**
     * The width of the selected option's value. Must be set programmatically
     * to ensure its overflow is clipped, as it's absolutely positioned.
     * @type {?}
     */
    MdSelect.prototype._selectedValueWidth;
    /**
     * Manages keyboard events for options in the panel.
     * @type {?}
     */
    MdSelect.prototype._keyManager;
    /**
     * View -> model callback called when value changes
     * @type {?}
     */
    MdSelect.prototype._onChange;
    /**
     * View -> model callback called when select has been touched
     * @type {?}
     */
    MdSelect.prototype._onTouched;
    /**
     * The IDs of child options to be passed to the aria-owns attribute.
     * @type {?}
     */
    MdSelect.prototype._optionIds;
    /**
     * The value of the select panel's transform-origin property.
     * @type {?}
     */
    MdSelect.prototype._transformOrigin;
    /**
     * Whether the panel's animation is done.
     * @type {?}
     */
    MdSelect.prototype._panelDoneAnimating;
    /**
     * The x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction.
     * @type {?}
     */
    MdSelect.prototype._offsetX;
    /**
     * The y-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text.
     * when the panel opens. Will change based on the y-position of the selected option.
     * @type {?}
     */
    MdSelect.prototype._offsetY;
    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     * @type {?}
     */
    MdSelect.prototype._positions;
    /**
     * Trigger that opens the select.
     * @type {?}
     */
    MdSelect.prototype.trigger;
    /**
     * Overlay pane containing the options.
     * @type {?}
     */
    MdSelect.prototype.overlayDir;
    /**
     * All of the defined select options.
     * @type {?}
     */
    MdSelect.prototype.options;
    /** @type {?} */
    MdSelect.prototype._floatPlaceholder;
    /**
     * Aria label of the select. If not specified, the placeholder will be used as label.
     * @type {?}
     */
    MdSelect.prototype.ariaLabel;
    /**
     * Input that can be used to specify the `aria-labelledby` attribute.
     * @type {?}
     */
    MdSelect.prototype.ariaLabelledby;
    /**
     * Event emitted when the select has been opened.
     * @type {?}
     */
    MdSelect.prototype.onOpen;
    /**
     * Event emitted when the select has been closed.
     * @type {?}
     */
    MdSelect.prototype.onClose;
    /**
     * Event emitted when the selected value has been changed by the user.
     * @type {?}
     */
    MdSelect.prototype.change;
    /** @type {?} */
    MdSelect.prototype._element;
    /** @type {?} */
    MdSelect.prototype._renderer;
    /** @type {?} */
    MdSelect.prototype._viewportRuler;
    /** @type {?} */
    MdSelect.prototype._changeDetectorRef;
    /** @type {?} */
    MdSelect.prototype._dir;
    /** @type {?} */
    MdSelect.prototype._control;
}
/**
 * Clamps a value n between min and max values.
 * @param {?} min
 * @param {?} n
 * @param {?} max
 * @return {?}
 */
function clampValue(min, n, max) {
    return Math.min(Math.max(min, n), max);
}
//# sourceMappingURL=select.js.map