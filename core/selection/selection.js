import { Subject } from 'rxjs/Subject';
/**
 * Class to be used to power selecting one or more options from a list.
 * \@docs-private
 */
export class SelectionModel {
    /**
     * @param {?=} _isMulti
     * @param {?=} initiallySelectedValues
     * @param {?=} _emitChanges
     */
    constructor(_isMulti = false, initiallySelectedValues, _emitChanges = true) {
        this._isMulti = _isMulti;
        this._emitChanges = _emitChanges;
        this._selection = new Set();
        this._deselectedToEmit = [];
        this._selectedToEmit = [];
        /** Event emitted when the value has changed. */
        this.onChange = this._emitChanges ? new Subject() : null;
        if (initiallySelectedValues) {
            if (_isMulti) {
                initiallySelectedValues.forEach(value => this._markSelected(value));
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    /**
     * Selected value(s).
     * @return {?}
     */
    get selected() {
        if (!this._selected) {
            this._selected = Array.from(this._selection.values());
        }
        return this._selected;
    }
    /**
     * Selects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    select(value) {
        this._markSelected(value);
        this._emitChangeEvent();
    }
    /**
     * Deselects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    deselect(value) {
        this._unmarkSelected(value);
        this._emitChangeEvent();
    }
    /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    toggle(value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    }
    /**
     * Clears all of the selected values.
     * @return {?}
     */
    clear() {
        this._unmarkAll();
        this._emitChangeEvent();
    }
    /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    isSelected(value) {
        return this._selection.has(value);
    }
    /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    isEmpty() {
        return this._selection.size === 0;
    }
    /**
     * Determines whether the model has a value.
     * @return {?}
     */
    hasValue() {
        return !this.isEmpty();
    }
    /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    sort(predicate) {
        if (this._isMulti && this.selected) {
            this._selected.sort(predicate);
        }
    }
    /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    _emitChangeEvent() {
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            let /** @type {?} */ eventData = new SelectionChange(this._selectedToEmit, this._deselectedToEmit);
            this.onChange.next(eventData);
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
        this._selected = null;
    }
    /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    _markSelected(value) {
        if (!this.isSelected(value)) {
            if (!this._isMulti) {
                this._unmarkAll();
            }
            this._selection.add(value);
            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    }
    /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    _unmarkSelected(value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    }
    /**
     * Clears out the selected values.
     * @return {?}
     */
    _unmarkAll() {
        if (!this.isEmpty()) {
            this._selection.forEach(value => this._unmarkSelected(value));
        }
    }
}
function SelectionModel_tsickle_Closure_declarations() {
    /**
     * Currently-selected values.
     * @type {?}
     */
    SelectionModel.prototype._selection;
    /**
     * Keeps track of the deselected options that haven't been emitted by the change event.
     * @type {?}
     */
    SelectionModel.prototype._deselectedToEmit;
    /**
     * Keeps track of the selected option that haven't been emitted by the change event.
     * @type {?}
     */
    SelectionModel.prototype._selectedToEmit;
    /**
     * Cache for the array value of the selected items.
     * @type {?}
     */
    SelectionModel.prototype._selected;
    /**
     * Event emitted when the value has changed.
     * @type {?}
     */
    SelectionModel.prototype.onChange;
    /** @type {?} */
    SelectionModel.prototype._isMulti;
    /** @type {?} */
    SelectionModel.prototype._emitChanges;
}
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * \@docs-private
 */
export class SelectionChange {
    /**
     * @param {?=} added
     * @param {?=} removed
     */
    constructor(added, removed) {
        this.added = added;
        this.removed = removed;
    }
}
function SelectionChange_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectionChange.prototype.added;
    /** @type {?} */
    SelectionChange.prototype.removed;
}
//# sourceMappingURL=selection.js.map