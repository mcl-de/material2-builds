import { Directive, ElementRef, forwardRef, Host, Input, NgZone, Optional, ViewContainerRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Overlay, OverlayState, TemplatePortal } from '../core';
import { Observable } from 'rxjs/Observable';
import { ENTER, UP_ARROW, DOWN_ARROW } from '../core/keyboard/keycodes';
import { Dir } from '../core/rtl/dir';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { MdInputContainer } from '../input/input-container';
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the scrollTop of the panel. Because we are not
 * actually focusing the active item, scroll must be handled manually.
 */
/** The height of each autocomplete option. */
export const /** @type {?} */ AUTOCOMPLETE_OPTION_HEIGHT = 48;
/** The total height of the autocomplete panel. */
export const /** @type {?} */ AUTOCOMPLETE_PANEL_HEIGHT = 256;
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * \@docs-private
 */
export const MD_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdAutocompleteTrigger),
    multi: true
};
export class MdAutocompleteTrigger {
    /**
     * @param {?} _element
     * @param {?} _overlay
     * @param {?} _viewContainerRef
     * @param {?} _dir
     * @param {?} _zone
     * @param {?} _inputContainer
     */
    constructor(_element, _overlay, _viewContainerRef, _dir, _zone, _inputContainer) {
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._dir = _dir;
        this._zone = _zone;
        this._inputContainer = _inputContainer;
        this._panelOpen = false;
        this._blurStream = new Subject();
        this._manuallyFloatingPlaceholder = false;
        /** View -> model callback called when value changes */
        this._onChange = (value) => { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = () => { };
    }
    /**
     * Property with mat- prefix for no-conflict mode.
     * @return {?}
     */
    get _matAutocomplete() {
        return this.autocomplete;
    }
    /**
     * @param {?} autocomplete
     * @return {?}
     */
    set _matAutocomplete(autocomplete) {
        this.autocomplete = autocomplete;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._panelPositionSubscription) {
            this._panelPositionSubscription.unsubscribe();
        }
        this._destroyPanel();
    }
    /**
     * @return {?}
     */
    get panelOpen() {
        return this._panelOpen && this.autocomplete.showPanel;
    }
    /**
     * Opens the autocomplete suggestion panel.
     * @return {?}
     */
    openPanel() {
        if (!this._overlayRef) {
            this._createOverlay();
        }
        else {
            /** Update the panel width, in case the host width has changed */
            this._overlayRef.getState().width = this._getHostWidth();
        }
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._subscribeToClosingActions();
        }
        this.autocomplete._setVisibility();
        this._floatPlaceholder();
        this._panelOpen = true;
    }
    /**
     * Closes the autocomplete suggestion panel.
     * @return {?}
     */
    closePanel() {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this._panelOpen = false;
        this._resetPlaceholder();
    }
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     * @return {?}
     */
    get panelClosingActions() {
        return Observable.merge(this.optionSelections, this._blurStream.asObservable(), this.autocomplete._keyManager.tabOut);
    }
    /**
     * Stream of autocomplete option selections.
     * @return {?}
     */
    get optionSelections() {
        return Observable.merge(...this.autocomplete.options.map(option => option.onSelectionChange));
    }
    /**
     * The currently active option, coerced to MdOption type.
     * @return {?}
     */
    get activeOption() {
        if (this.autocomplete._keyManager) {
            return (this.autocomplete._keyManager.activeItem);
        }
    }
    /**
     * Sets the autocomplete's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param {?} value New value to be written to the model.
     * @return {?}
     */
    writeValue(value) {
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }
    /**
     * Saves a callback function to be invoked when the autocomplete's value
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
     * Saves a callback function to be invoked when the autocomplete is blurred
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
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        if (this.activeOption && event.keyCode === ENTER) {
            this.activeOption._selectViaInteraction();
            event.preventDefault();
        }
        else {
            this.autocomplete._keyManager.onKeydown(event);
            if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
                this.openPanel();
                Promise.resolve().then(() => this._scrollToOption());
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleInput(event) {
        // We need to ensure that the input is focused, because IE will fire the `input`
        // event on focus/blur/load if the input has a placeholder. See:
        // https://connect.microsoft.com/IE/feedback/details/885747/
        if (document.activeElement === event.target) {
            this._onChange(((event.target)).value);
            this.openPanel();
        }
    }
    /**
     * @param {?} newlyFocusedTag
     * @return {?}
     */
    _handleBlur(newlyFocusedTag) {
        this._onTouched();
        // Only emit blur event if the new focus is *not* on an option.
        if (newlyFocusedTag !== 'MD-OPTION') {
            this._blurStream.next(null);
        }
    }
    /**
     * In "auto" mode, the placeholder will animate down as soon as focus is lost.
     * This causes the value to jump when selecting an option with the mouse.
     * This method manually floats the placeholder until the panel can be closed.
     * @return {?}
     */
    _floatPlaceholder() {
        if (this._inputContainer && this._inputContainer.floatPlaceholder === 'auto') {
            this._inputContainer.floatPlaceholder = 'always';
            this._manuallyFloatingPlaceholder = true;
        }
    }
    /**
     * If the placeholder has been manually elevated, return it to its normal state.
     * @return {?}
     */
    _resetPlaceholder() {
        if (this._manuallyFloatingPlaceholder) {
            this._inputContainer.floatPlaceholder = 'auto';
            this._manuallyFloatingPlaceholder = false;
        }
    }
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. The new scrollTop will be that offset - the panel height + the option
     * height, so the active option will be just visible at the bottom of the panel.
     * @return {?}
     */
    _scrollToOption() {
        const /** @type {?} */ optionOffset = this.autocomplete._keyManager.activeItemIndex * AUTOCOMPLETE_OPTION_HEIGHT;
        const /** @type {?} */ newScrollTop = Math.max(0, optionOffset - AUTOCOMPLETE_PANEL_HEIGHT + AUTOCOMPLETE_OPTION_HEIGHT);
        this.autocomplete._setScrollTop(newScrollTop);
    }
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     * @return {?}
     */
    _subscribeToClosingActions() {
        // When the zone is stable initially, and when the option list changes...
        Observable.merge(this._zone.onStable.first(), this.autocomplete.options.changes)
            .switchMap(() => {
            this._resetPanel();
            return this.panelClosingActions;
        })
            .first()
            .subscribe(event => this._setValueAndClose(event));
    }
    /**
     * Destroys the autocomplete suggestion panel.
     * @return {?}
     */
    _destroyPanel() {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _setTriggerValue(value) {
        const /** @type {?} */ toDisplay = this.autocomplete.displayWith ? this.autocomplete.displayWith(value) : value;
        this._element.nativeElement.value = toDisplay || '';
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     * @param {?} event
     * @return {?}
     */
    _setValueAndClose(event) {
        if (event) {
            this._clearPreviousSelectedOption(event.source);
            this._setTriggerValue(event.source.value);
            this._onChange(event.source.value);
        }
        this.closePanel();
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     * @param {?} skip
     * @return {?}
     */
    _clearPreviousSelectedOption(skip) {
        this.autocomplete.options.forEach((option) => {
            if (option != skip && option.selected) {
                option.deselect();
            }
        });
    }
    /**
     * @return {?}
     */
    _createOverlay() {
        this._portal = new TemplatePortal(this.autocomplete.template, this._viewContainerRef);
        this._overlayRef = this._overlay.create(this._getOverlayConfig());
    }
    /**
     * @return {?}
     */
    _getOverlayConfig() {
        const /** @type {?} */ overlayState = new OverlayState();
        overlayState.positionStrategy = this._getOverlayPosition();
        overlayState.width = this._getHostWidth();
        overlayState.direction = this._dir ? this._dir.value : 'ltr';
        return overlayState;
    }
    /**
     * @return {?}
     */
    _getOverlayPosition() {
        this._positionStrategy = this._overlay.position().connectedTo(this._element, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' });
        this._subscribeToPositionChanges(this._positionStrategy);
        return this._positionStrategy;
    }
    /**
     * This method subscribes to position changes in the autocomplete panel, so the panel's
     * y-offset can be adjusted to match the new position.
     * @param {?} strategy
     * @return {?}
     */
    _subscribeToPositionChanges(strategy) {
        this._panelPositionSubscription = strategy.onPositionChange.subscribe(change => {
            this.autocomplete.positionY = change.connectionPair.originY === 'top' ? 'above' : 'below';
        });
    }
    /**
     * Returns the width of the input element, so the panel width can match it.
     * @return {?}
     */
    _getHostWidth() {
        return this._element.nativeElement.getBoundingClientRect().width;
    }
    /**
     * Reset active item to null so arrow events will activate the correct options.
     * @return {?}
     */
    _resetActiveItem() {
        this.autocomplete._keyManager.setActiveItem(null);
    }
    /**
     * Resets the active item and re-calculates alignment of the panel in case its size
     * has changed due to fewer or greater number of options.
     * @return {?}
     */
    _resetPanel() {
        this._resetActiveItem();
        this._positionStrategy.recalculateLastPosition();
        this.autocomplete._setVisibility();
    }
}
MdAutocompleteTrigger.decorators = [
    { type: Directive, args: [{
                selector: 'input[mdAutocomplete], input[matAutocomplete]',
                host: {
                    'role': 'combobox',
                    'autocomplete': 'off',
                    'aria-autocomplete': 'list',
                    'aria-multiline': 'false',
                    '[attr.aria-activedescendant]': 'activeOption?.id',
                    '[attr.aria-expanded]': 'panelOpen.toString()',
                    '[attr.aria-owns]': 'autocomplete?.id',
                    '(focus)': 'openPanel()',
                    '(blur)': '_handleBlur($event.relatedTarget?.tagName)',
                    '(input)': '_handleInput($event)',
                    '(keydown)': '_handleKeydown($event)',
                },
                providers: [MD_AUTOCOMPLETE_VALUE_ACCESSOR]
            },] },
];
/**
 * @nocollapse
 */
MdAutocompleteTrigger.ctorParameters = () => [
    { type: ElementRef, },
    { type: Overlay, },
    { type: ViewContainerRef, },
    { type: Dir, decorators: [{ type: Optional },] },
    { type: NgZone, },
    { type: MdInputContainer, decorators: [{ type: Optional }, { type: Host },] },
];
MdAutocompleteTrigger.propDecorators = {
    'autocomplete': [{ type: Input, args: ['mdAutocomplete',] },],
    '_matAutocomplete': [{ type: Input, args: ['matAutocomplete',] },],
};
function MdAutocompleteTrigger_tsickle_Closure_declarations() {
    /** @type {?} */
    MdAutocompleteTrigger.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdAutocompleteTrigger.ctorParameters;
    /** @type {?} */
    MdAutocompleteTrigger.propDecorators;
    /** @type {?} */
    MdAutocompleteTrigger.prototype._overlayRef;
    /** @type {?} */
    MdAutocompleteTrigger.prototype._portal;
    /** @type {?} */
    MdAutocompleteTrigger.prototype._panelOpen;
    /**
     * The subscription to positioning changes in the autocomplete panel.
     * @type {?}
     */
    MdAutocompleteTrigger.prototype._panelPositionSubscription;
    /** @type {?} */
    MdAutocompleteTrigger.prototype._positionStrategy;
    /**
     * Stream of blur events that should close the panel.
     * @type {?}
     */
    MdAutocompleteTrigger.prototype._blurStream;
    /**
     * Whether or not the placeholder state is being overridden.
     * @type {?}
     */
    MdAutocompleteTrigger.prototype._manuallyFloatingPlaceholder;
    /**
     * View -> model callback called when value changes
     * @type {?}
     */
    MdAutocompleteTrigger.prototype._onChange;
    /**
     * View -> model callback called when autocomplete has been touched
     * @type {?}
     */
    MdAutocompleteTrigger.prototype._onTouched;
    /** @type {?} */
    MdAutocompleteTrigger.prototype.autocomplete;
    /** @type {?} */
    MdAutocompleteTrigger.prototype._element;
    /** @type {?} */
    MdAutocompleteTrigger.prototype._overlay;
    /** @type {?} */
    MdAutocompleteTrigger.prototype._viewContainerRef;
    /** @type {?} */
    MdAutocompleteTrigger.prototype._dir;
    /** @type {?} */
    MdAutocompleteTrigger.prototype._zone;
    /** @type {?} */
    MdAutocompleteTrigger.prototype._inputContainer;
}
//# sourceMappingURL=autocomplete-trigger.js.map