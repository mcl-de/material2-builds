import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { MdChip } from './chip';
import { FocusKeyManager } from '../core/a11y/focus-key-manager';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { SPACE, LEFT_ARROW, RIGHT_ARROW } from '../core/keyboard/keycodes';
/**
 * A material design chips component (named ChipList for it's similarity to the List component).
 *
 * Example:
 *
 *     <md-chip-list>
 *       <md-chip>Chip 1<md-chip>
 *       <md-chip>Chip 2<md-chip>
 *     </md-chip-list>
 */
export class MdChipList {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this._subscribed = new WeakMap();
        /** Whether or not the chip is selectable. */
        this._selectable = true;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._keyManager = new FocusKeyManager(this.chips).withWrap();
        // Go ahead and subscribe all of the initial chips
        this._subscribeChips(this.chips);
        // When the list changes, re-subscribe
        this.chips.changes.subscribe((chips) => {
            this._subscribeChips(chips);
        });
    }
    /**
     * Whether or not this chip is selectable. When a chip is not selectable,
     * it's selected state is always ignored.
     * @return {?}
     */
    get selectable() {
        return this._selectable;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
    }
    /**
     * Programmatically focus the chip list. This in turn focuses the first
     * non-disabled chip in this chip list.
     * @return {?}
     */
    focus() {
        // TODO: ARIA says this should focus the first `selected` chip.
        this._keyManager.setFirstItemActive();
    }
    /**
     * Passes relevant key presses to our key manager.
     * @param {?} event
     * @return {?}
     */
    _keydown(event) {
        let /** @type {?} */ target = (event.target);
        // If they are on a chip, check for space/left/right, otherwise pass to our key manager
        if (target && target.classList.contains('mat-chip')) {
            switch (event.keyCode) {
                case SPACE:
                    // If we are selectable, toggle the focused chip
                    if (this.selectable) {
                        this._toggleSelectOnFocusedChip();
                    }
                    // Always prevent space from scrolling the page since the list has focus
                    event.preventDefault();
                    break;
                case LEFT_ARROW:
                    this._keyManager.setPreviousItemActive();
                    event.preventDefault();
                    break;
                case RIGHT_ARROW:
                    this._keyManager.setNextItemActive();
                    event.preventDefault();
                    break;
                default:
                    this._keyManager.onKeydown(event);
            }
        }
    }
    /**
     * Toggles the selected state of the currently focused chip.
     * @return {?}
     */
    _toggleSelectOnFocusedChip() {
        // Allow disabling of chip selection
        if (!this.selectable) {
            return;
        }
        let /** @type {?} */ focusedIndex = this._keyManager.activeItemIndex;
        if (this._isValidIndex(focusedIndex)) {
            let /** @type {?} */ focusedChip = this.chips.toArray()[focusedIndex];
            if (focusedChip) {
                focusedChip.toggleSelected();
            }
        }
    }
    /**
     * Iterate through the list of chips and add them to our list of
     * subscribed chips.
     *
     * @param {?} chips The list of chips to be subscribed.
     * @return {?}
     */
    _subscribeChips(chips) {
        chips.forEach(chip => this._addChip(chip));
    }
    /**
     * Add a specific chip to our subscribed list. If the chip has
     * already been subscribed, this ensures it is only subscribed
     * once.
     *
     * @param {?} chip The chip to be subscribed (or checked for existing
     * subscription).
     * @return {?}
     */
    _addChip(chip) {
        // If we've already been subscribed to a parent, do nothing
        if (this._subscribed.has(chip)) {
            return;
        }
        // Watch for focus events outside of the keyboard navigation
        chip.onFocus.subscribe(() => {
            let /** @type {?} */ chipIndex = this.chips.toArray().indexOf(chip);
            if (this._isValidIndex(chipIndex)) {
                this._keyManager.updateActiveItemIndex(chipIndex);
            }
        });
        // On destroy, remove the item from our list, and check focus
        chip.destroy.subscribe(() => {
            let /** @type {?} */ chipIndex = this.chips.toArray().indexOf(chip);
            if (this._isValidIndex(chipIndex)) {
                // Check whether the chip is the last item
                if (chipIndex < this.chips.length - 1) {
                    this._keyManager.setActiveItem(chipIndex);
                }
                else if (chipIndex - 1 >= 0) {
                    this._keyManager.setActiveItem(chipIndex - 1);
                }
            }
            this._subscribed.delete(chip);
            chip.destroy.unsubscribe();
        });
        this._subscribed.set(chip, true);
    }
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of chips.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this.chips.length;
    }
}
MdChipList.decorators = [
    { type: Component, args: [{selector: 'md-chip-list, mat-chip-list',
                template: `<div class="mat-chip-list-wrapper"><ng-content></ng-content></div>`,
                host: {
                    // Properties
                    'tabindex': '0',
                    'role': 'listbox',
                    '[class.mat-chip-list]': 'true',
                    // Events
                    '(focus)': 'focus()',
                    '(keydown)': '_keydown($event)'
                },
                queries: {
                    chips: new ContentChildren(MdChip)
                },
                styles: [".mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:flex-start}.mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip){margin:0 3px 0 3px}.mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):first-child{margin-left:0;margin-right:3px}[dir=rtl] .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):first-child{margin-left:3px;margin-right:0}.mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child{margin-left:3px;margin-right:0}[dir=rtl] .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child{margin-left:0;margin-right:3px}.mat-chip:not(.mat-basic-chip){display:inline-block;padding:8px 12px 8px 12px;border-radius:24px;font-size:13px;line-height:16px}.mat-chip-list-stacked .mat-chip-list-wrapper{display:block}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip){display:block;margin:0;margin-bottom:8px}[dir=rtl] .mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip){margin:0;margin-bottom:8px}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child,[dir=rtl] .mat-chip-list-stacked .mat-chip-list-wrapper .mat-chip:not(.mat-basic-chip):last-child{margin-bottom:0} /*# sourceMappingURL=chips.css.map */ "],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
MdChipList.ctorParameters = () => [
    { type: ElementRef, },
];
MdChipList.propDecorators = {
    'selectable': [{ type: Input },],
};
function MdChipList_tsickle_Closure_declarations() {
    /** @type {?} */
    MdChipList.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdChipList.ctorParameters;
    /** @type {?} */
    MdChipList.propDecorators;
    /**
     * Track which chips we're listening to for focus/destruction.
     * @type {?}
     */
    MdChipList.prototype._subscribed;
    /**
     * Whether or not the chip is selectable.
     * @type {?}
     */
    MdChipList.prototype._selectable;
    /**
     * The FocusKeyManager which handles focus.
     * @type {?}
     */
    MdChipList.prototype._keyManager;
    /**
     * The chip components contained within this chip list.
     * @type {?}
     */
    MdChipList.prototype.chips;
    /** @type {?} */
    MdChipList.prototype._elementRef;
}
//# sourceMappingURL=chip-list.js.map