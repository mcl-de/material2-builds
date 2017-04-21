import { ViewChild, Component, Input, Output, EventEmitter, ContentChildren, Renderer } from '@angular/core';
import { coerceBooleanProperty } from '../core';
import { MdTab } from './tab';
import 'rxjs/add/operator/map';
/**
 * Used to generate unique ID's for each tab component
 */
let nextId = 0;
/**
 * A simple change event emitted on focus or selection changes.
 */
export class MdTabChangeEvent {
}
function MdTabChangeEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTabChangeEvent.prototype.index;
    /** @type {?} */
    MdTabChangeEvent.prototype.tab;
}
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
export class MdTabGroup {
    /**
     * @param {?} _renderer
     */
    constructor(_renderer) {
        this._renderer = _renderer;
        /**
         * Whether this component has been initialized.
         */
        this._isInitialized = false;
        /**
         * The tab index that should be selected after the content has been checked.
         */
        this._indexToSelect = 0;
        /**
         * Snapshot of the height of the tab body wrapper before another tab is activated.
         */
        this._tabBodyWrapperHeight = null;
        /**
         * Whether the tab group should grow to the size of the active tab
         */
        this._dynamicHeight = false;
        this._selectedIndex = null;
        /**
         * Position of the tab header.
         */
        this.headerPosition = 'above';
        this._onFocusChange = new EventEmitter();
        this._onSelectChange = new EventEmitter(true);
        this._groupId = nextId++;
    }
    /**
     * @return {?}
     */
    get dynamicHeight() { return this._dynamicHeight; }
    /**
     * @param {?} value
     * @return {?}
     */
    set dynamicHeight(value) { this._dynamicHeight = coerceBooleanProperty(value); }
    /**
     * @deprecated
     * @return {?}
     */
    get _dynamicHeightDeprecated() { return this._dynamicHeight; }
    /**
     * @param {?} value
     * @return {?}
     */
    set _dynamicHeightDeprecated(value) { this._dynamicHeight = value; }
    /**
     * The index of the active tab.
     * @param {?} value
     * @return {?}
     */
    set selectedIndex(value) { this._indexToSelect = value; }
    /**
     * @return {?}
     */
    get selectedIndex() { return this._selectedIndex; }
    /**
     * Output to enable support for two-way binding on `[(selectedIndex)]`
     * @return {?}
     */
    get selectedIndexChange() {
        return this.selectChange.map(event => event.index);
    }
    /**
     * Event emitted when focus has changed within a tab group.
     * @return {?}
     */
    get focusChange() {
        return this._onFocusChange.asObservable();
    }
    /**
     * Event emitted when the tab selection has changed.
     * @return {?}
     */
    get selectChange() {
        return this._onSelectChange.asObservable();
    }
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     * @return {?}
     */
    ngAfterContentChecked() {
        // Clamp the next selected index to the bounds of 0 and the tabs length. Note the `|| 0`, which
        // ensures that values like NaN can't get through and which would otherwise throw the
        // component into an infinite loop (since Math.max(NaN, 0) === NaN).
        this._indexToSelect =
            Math.min(this._tabs.length - 1, Math.max(this._indexToSelect || 0, 0));
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex != this._indexToSelect && this._selectedIndex != null) {
            this._onSelectChange.emit(this._createChangeEvent(this._indexToSelect));
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this._tabs.forEach((tab, index) => {
            tab.position = index - this._indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (this._selectedIndex != null && tab.position == 0 && !tab.origin) {
                tab.origin = this._indexToSelect - this._selectedIndex;
            }
        });
        this._selectedIndex = this._indexToSelect;
    }
    /**
     * Waits one frame for the view to update, then updates the ink bar
     * Note: This must be run outside of the zone or it will create an infinite change detection loop.
     * @return {?}
     */
    ngAfterViewChecked() {
        this._isInitialized = true;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    _focusChanged(index) {
        this._onFocusChange.emit(this._createChangeEvent(index));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    _createChangeEvent(index) {
        const /** @type {?} */ event = new MdTabChangeEvent;
        event.index = index;
        if (this._tabs && this._tabs.length) {
            event.tab = this._tabs.toArray()[index];
        }
        return event;
    }
    /**
     * Returns a unique id for each tab label element
     * @param {?} i
     * @return {?}
     */
    _getTabLabelId(i) {
        return `md-tab-label-${this._groupId}-${i}`;
    }
    /**
     * Returns a unique id for each tab content element
     * @param {?} i
     * @return {?}
     */
    _getTabContentId(i) {
        return `md-tab-content-${this._groupId}-${i}`;
    }
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     * @param {?} tabHeight
     * @return {?}
     */
    _setTabBodyWrapperHeight(tabHeight) {
        if (!this._dynamicHeight || !this._tabBodyWrapperHeight) {
            return;
        }
        this._renderer.setElementStyle(this._tabBodyWrapper.nativeElement, 'height', this._tabBodyWrapperHeight + 'px');
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this._tabBodyWrapper.nativeElement.offsetHeight) {
            this._renderer.setElementStyle(this._tabBodyWrapper.nativeElement, 'height', tabHeight + 'px');
        }
    }
    /**
     * Removes the height of the tab body wrapper.
     * @return {?}
     */
    _removeTabBodyWrapperHeight() {
        this._tabBodyWrapperHeight = this._tabBodyWrapper.nativeElement.clientHeight;
        this._renderer.setElementStyle(this._tabBodyWrapper.nativeElement, 'height', '');
    }
}
MdTabGroup.decorators = [
    { type: Component, args: [{selector: 'md-tab-group, mat-tab-group',
                template: "<md-tab-header [selectedIndex]=\"selectedIndex\" #tabHeader (indexFocused)=\"_focusChanged($event)\" (selectFocusedIndex)=\"selectedIndex = $event\"> <div class=\"mat-tab-label\" role=\"tab\" md-tab-label-wrapper md-ripple *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabLabelId(i)\" [tabIndex]=\"selectedIndex == i ? 0 : -1\" [attr.aria-controls]=\"_getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [class.mat-tab-label-active]=\"selectedIndex == i\" [disabled]=\"tab.disabled\" (click)=\"tabHeader.focusIndex = selectedIndex = i\"> <!-- If there is a label template, use it. --> <ng-template [ngIf]=\"tab.templateLabel\"> <ng-template [cdkPortalHost]=\"tab.templateLabel\"></ng-template> </ng-template> <!-- If there is not a label template, fall back to the text label. --> <ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template> </div> </md-tab-header> <div class=\"mat-tab-body-wrapper\" #tabBodyWrapper> <md-tab-body role=\"tabpanel\" *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabContentId(i)\" [attr.aria-labelledby]=\"_getTabLabelId(i)\" [class.mat-tab-body-active]=\"selectedIndex == i\" [content]=\"tab.content\" [position]=\"tab.position\" [origin]=\"tab.origin\" (onCentered)=\"_removeTabBodyWrapperHeight()\" (onCentering)=\"_setTabBodyWrapperHeight($event)\"> </md-tab-body> </div> ",
                styles: [":host{display:flex;flex-direction:column;font-family:Roboto,\"Helvetica Neue\",sans-serif}:host.mat-tab-group-inverted-header{flex-direction:column-reverse}.mat-tab-label{line-height:48px;height:48px;padding:0 12px;font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:500;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;position:relative}.mat-tab-label:focus{outline:0;opacity:1}@media (max-width:600px){.mat-tab-label{min-width:72px}}:host[mat-stretch-tabs] .mat-tab-label,:host[md-stretch-tabs] .mat-tab-label{flex-basis:0;flex-grow:1}.mat-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height .5s cubic-bezier(.35,0,.25,1)}.mat-tab-body{position:absolute;top:0;left:0;right:0;bottom:0;display:block;overflow:hidden}.mat-tab-body.mat-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}:host.mat-tab-group-dynamic-height .mat-tab-body.mat-tab-body-active{overflow-y:hidden}.mat-tab-disabled{cursor:default;pointer-events:none} /*# sourceMappingURL=tab-group.css.map */ "],
                host: {
                    '[class.mat-tab-group]': 'true',
                    '[class.mat-tab-group-dynamic-height]': 'dynamicHeight',
                    '[class.mat-tab-group-inverted-header]': 'headerPosition === "below"',
                }
            },] },
];
/**
 * @nocollapse
 */
MdTabGroup.ctorParameters = () => [
    { type: Renderer, },
];
MdTabGroup.propDecorators = {
    '_tabs': [{ type: ContentChildren, args: [MdTab,] },],
    '_tabBodyWrapper': [{ type: ViewChild, args: ['tabBodyWrapper',] },],
    'dynamicHeight': [{ type: Input },],
    '_dynamicHeightDeprecated': [{ type: Input, args: ['md-dynamic-height',] },],
    'selectedIndex': [{ type: Input },],
    'headerPosition': [{ type: Input },],
    'selectedIndexChange': [{ type: Output },],
    'focusChange': [{ type: Output },],
    'selectChange': [{ type: Output },],
};
function MdTabGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTabGroup.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTabGroup.ctorParameters;
    /** @type {?} */
    MdTabGroup.propDecorators;
    /** @type {?} */
    MdTabGroup.prototype._tabs;
    /** @type {?} */
    MdTabGroup.prototype._tabBodyWrapper;
    /**
     * Whether this component has been initialized.
     * @type {?}
     */
    MdTabGroup.prototype._isInitialized;
    /**
     * The tab index that should be selected after the content has been checked.
     * @type {?}
     */
    MdTabGroup.prototype._indexToSelect;
    /**
     * Snapshot of the height of the tab body wrapper before another tab is activated.
     * @type {?}
     */
    MdTabGroup.prototype._tabBodyWrapperHeight;
    /**
     * Whether the tab group should grow to the size of the active tab
     * @type {?}
     */
    MdTabGroup.prototype._dynamicHeight;
    /** @type {?} */
    MdTabGroup.prototype._selectedIndex;
    /**
     * Position of the tab header.
     * @type {?}
     */
    MdTabGroup.prototype.headerPosition;
    /** @type {?} */
    MdTabGroup.prototype._onFocusChange;
    /** @type {?} */
    MdTabGroup.prototype._onSelectChange;
    /** @type {?} */
    MdTabGroup.prototype._groupId;
    /** @type {?} */
    MdTabGroup.prototype._renderer;
}
//# sourceMappingURL=tab-group.js.map