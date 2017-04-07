import { ViewChild, Component, Input, ElementRef, ViewEncapsulation, ContentChildren, Output, EventEmitter, Optional, } from '@angular/core';
import { RIGHT_ARROW, LEFT_ARROW, ENTER, Dir } from '../core';
import { MdTabLabelWrapper } from './tab-label-wrapper';
import { MdInkBar } from './ink-bar';
import { applyCssTransform } from '../core/style/apply-transform';
import 'rxjs/add/operator/map';
/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 */
const /** @type {?} */ EXAGGERATED_OVERSCROLL = 60;
/**
 * The header of the tab group which displays a list of all the tabs in the tab group. Includes
 * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * \@docs-private
 */
export class MdTabHeader {
    /**
     * @param {?} _elementRef
     * @param {?} _dir
     */
    constructor(_elementRef, _dir) {
        this._elementRef = _elementRef;
        this._dir = _dir;
        this._focusIndex = 0;
        this._scrollDistance = 0;
        this._selectedIndexChanged = false;
        /** Whether the controls for pagination should be displayed */
        this._showPaginationControls = false;
        /** Whether the tab list can be scrolled more towards the end of the tab label list. */
        this._disableScrollAfter = true;
        /** Whether the tab list can be scrolled more towards the beginning of the tab label list. */
        this._disableScrollBefore = true;
        this._selectedIndex = 0;
        /** Event emitted when the option is selected. */
        this.selectFocusedIndex = new EventEmitter();
        /** Event emitted when a label is focused. */
        this.indexFocused = new EventEmitter();
    }
    /**
     * The index of the active tab.
     * @param {?} value
     * @return {?}
     */
    set selectedIndex(value) {
        this._selectedIndexChanged = this._selectedIndex != value;
        this._selectedIndex = value;
        this._focusIndex = value;
    }
    /**
     * @return {?}
     */
    get selectedIndex() { return this._selectedIndex; }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // If the number of tab labels have changed, check if scrolling should be enabled
        if (this._tabLabelCount != this._labelWrappers.length) {
            this._updatePagination();
            this._tabLabelCount = this._labelWrappers.length;
        }
        // If the selected index has changed, scroll to the label and check if the scrolling controls
        // should be disabled.
        if (this._selectedIndexChanged) {
            this._scrollToLabel(this._selectedIndex);
            this._checkScrollingControls();
            this._alignInkBarToSelectedTab();
            this._selectedIndexChanged = false;
        }
        // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
        // then translate the header to reflect this.
        if (this._scrollDistanceChanged) {
            this._updateTabScrollPosition();
            this._scrollDistanceChanged = false;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        switch (event.keyCode) {
            case RIGHT_ARROW:
                this._focusNextTab();
                break;
            case LEFT_ARROW:
                this._focusPreviousTab();
                break;
            case ENTER:
                this.selectFocusedIndex.emit(this.focusIndex);
                break;
        }
    }
    /**
     * Aligns the ink bar to the selected tab on load.
     * @return {?}
     */
    ngAfterContentInit() {
        this._alignInkBarToSelectedTab();
        if (this._dir) {
            this._directionChange = this._dir.dirChange.subscribe(() => this._alignInkBarToSelectedTab());
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._directionChange) {
            this._directionChange.unsubscribe();
            this._directionChange = null;
        }
    }
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     * @return {?}
     */
    _onContentChanges() {
        this._updatePagination();
        this._alignInkBarToSelectedTab();
    }
    /**
     * Updating the view whether pagination should be enabled or not
     * @return {?}
     */
    _updatePagination() {
        this._checkPaginationEnabled();
        this._checkScrollingControls();
        this._updateTabScrollPosition();
    }
    /**
     * When the focus index is set, we must manually send focus to the correct label
     * @param {?} value
     * @return {?}
     */
    set focusIndex(value) {
        if (!this._isValidIndex(value) || this._focusIndex == value) {
            return;
        }
        this._focusIndex = value;
        this.indexFocused.emit(value);
        this._setTabFocus(value);
    }
    /**
     * Tracks which element has focus; used for keyboard navigation
     * @return {?}
     */
    get focusIndex() { return this._focusIndex; }
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     * @param {?} index
     * @return {?}
     */
    _isValidIndex(index) {
        if (!this._labelWrappers) {
            return true;
        }
        const /** @type {?} */ tab = this._labelWrappers ? this._labelWrappers.toArray()[index] : null;
        return tab && !tab.disabled;
    }
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     * @param {?} tabIndex
     * @return {?}
     */
    _setTabFocus(tabIndex) {
        if (this._showPaginationControls) {
            this._scrollToLabel(tabIndex);
        }
        if (this._labelWrappers && this._labelWrappers.length) {
            this._labelWrappers.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            const /** @type {?} */ containerEl = this._tabListContainer.nativeElement;
            const /** @type {?} */ dir = this._getLayoutDirection();
            if (dir == 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    }
    /**
     * Moves the focus towards the beginning or the end of the list depending on the offset provided.
     * Valid offsets are 1 and -1.
     * @param {?} offset
     * @return {?}
     */
    _moveFocus(offset) {
        if (this._labelWrappers) {
            const /** @type {?} */ tabs = this._labelWrappers.toArray();
            for (let /** @type {?} */ i = this.focusIndex + offset; i < tabs.length && i >= 0; i += offset) {
                if (this._isValidIndex(i)) {
                    this.focusIndex = i;
                    return;
                }
            }
        }
    }
    /**
     * Increment the focus index by 1 until a valid tab is found.
     * @return {?}
     */
    _focusNextTab() {
        this._moveFocus(this._getLayoutDirection() == 'ltr' ? 1 : -1);
    }
    /**
     * Decrement the focus index by 1 until a valid tab is found.
     * @return {?}
     */
    _focusPreviousTab() {
        this._moveFocus(this._getLayoutDirection() == 'ltr' ? -1 : 1);
    }
    /**
     * The layout direction of the containing app.
     * @return {?}
     */
    _getLayoutDirection() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /**
     * Performs the CSS transformation on the tab list that will cause the list to scroll.
     * @return {?}
     */
    _updateTabScrollPosition() {
        let /** @type {?} */ translateX = this.scrollDistance + 'px';
        if (this._getLayoutDirection() == 'ltr') {
            translateX = '-' + translateX;
        }
        applyCssTransform(this._tabList.nativeElement, `translate3d(${translateX}, 0, 0)`);
    }
    /**
     * Sets the distance in pixels that the tab header should be transformed in the X-axis.
     * @param {?} v
     * @return {?}
     */
    set scrollDistance(v) {
        this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), v));
        // Mark that the scroll distance has changed so that after the view is checked, the CSS
        // transformation can move the header.
        this._scrollDistanceChanged = true;
        this._checkScrollingControls();
    }
    /**
     * @return {?}
     */
    get scrollDistance() { return this._scrollDistance; }
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} scrollDir
     * @return {?}
     */
    _scrollHeader(scrollDir) {
        const /** @type {?} */ viewLength = this._tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        this.scrollDistance += (scrollDir == 'before' ? -1 : 1) * viewLength / 3;
    }
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} labelIndex
     * @return {?}
     */
    _scrollToLabel(labelIndex) {
        const /** @type {?} */ selectedLabel = this._labelWrappers
            ? this._labelWrappers.toArray()[labelIndex]
            : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        const /** @type {?} */ viewLength = this._tabListContainer.nativeElement.offsetWidth;
        let /** @type {?} */ labelBeforePos, /** @type {?} */ labelAfterPos;
        if (this._getLayoutDirection() == 'ltr') {
            labelBeforePos = selectedLabel.getOffsetLeft();
            labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
        }
        else {
            labelAfterPos = this._tabList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
            labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
        }
        const /** @type {?} */ beforeVisiblePos = this.scrollDistance;
        const /** @type {?} */ afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    }
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    _checkPaginationEnabled() {
        this._showPaginationControls =
            this._tabList.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
        if (!this._showPaginationControls) {
            this.scrollDistance = 0;
        }
    }
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    _checkScrollingControls() {
        // Check if the pagination arrows should be activated.
        this._disableScrollBefore = this.scrollDistance == 0;
        this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance();
    }
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    _getMaxScrollDistance() {
        const /** @type {?} */ lengthOfTabList = this._tabList.nativeElement.scrollWidth;
        const /** @type {?} */ viewLength = this._tabListContainer.nativeElement.offsetWidth;
        return lengthOfTabList - viewLength;
    }
    /**
     * Tells the ink-bar to align itself to the current label wrapper
     * @return {?}
     */
    _alignInkBarToSelectedTab() {
        const /** @type {?} */ selectedLabelWrapper = this._labelWrappers && this._labelWrappers.length
            ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
            : null;
        this._inkBar.alignToElement(selectedLabelWrapper);
    }
}
MdTabHeader.decorators = [
    { type: Component, args: [{selector: 'md-tab-header, mat-tab-header',
                template: "<div class=\"mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4\" aria-hidden=\"true\" md-ripple [mdRippleDisabled]=\"_disableScrollBefore\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollBefore\" (click)=\"_scrollHeader('before')\"> <div class=\"mat-tab-header-pagination-chevron\"></div> </div> <div class=\"mat-tab-label-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\"> <div class=\"mat-tab-list\" #tabList role=\"tablist\" (cdkObserveContent)=\"_onContentChanges()\"> <div class=\"mat-tab-labels\"> <ng-content></ng-content> </div> <md-ink-bar></md-ink-bar> </div> </div> <div class=\"mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4\" aria-hidden=\"true\" md-ripple [mdRippleDisabled]=\"_disableScrollAfter\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollAfter\" (click)=\"_scrollHeader('after')\"> <div class=\"mat-tab-header-pagination-chevron\"></div> </div> ",
                styles: [".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-label{line-height:48px;height:48px;padding:0 12px;font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:500;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;position:relative}.mat-tab-label:focus{outline:0;opacity:1}@media (max-width:600px){.mat-tab-label{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}.mat-tab-header-pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-pagination-after,.mat-tab-header-rtl .mat-tab-header-pagination-before{padding-right:4px}.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:#ccc}.mat-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-tab-labels{display:flex} /*# sourceMappingURL=tab-header.css.map */ "],
                encapsulation: ViewEncapsulation.None,
                host: {
                    'class': 'mat-tab-header',
                    '[class.mat-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                    '[class.mat-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                }
            },] },
];
/**
 * @nocollapse
 */
MdTabHeader.ctorParameters = () => [
    { type: ElementRef, },
    { type: Dir, decorators: [{ type: Optional },] },
];
MdTabHeader.propDecorators = {
    '_labelWrappers': [{ type: ContentChildren, args: [MdTabLabelWrapper,] },],
    '_inkBar': [{ type: ViewChild, args: [MdInkBar,] },],
    '_tabListContainer': [{ type: ViewChild, args: ['tabListContainer',] },],
    '_tabList': [{ type: ViewChild, args: ['tabList',] },],
    'selectedIndex': [{ type: Input },],
    'selectFocusedIndex': [{ type: Output },],
    'indexFocused': [{ type: Output },],
};
function MdTabHeader_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTabHeader.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTabHeader.ctorParameters;
    /** @type {?} */
    MdTabHeader.propDecorators;
    /** @type {?} */
    MdTabHeader.prototype._labelWrappers;
    /** @type {?} */
    MdTabHeader.prototype._inkBar;
    /** @type {?} */
    MdTabHeader.prototype._tabListContainer;
    /** @type {?} */
    MdTabHeader.prototype._tabList;
    /**
     * The tab index that is focused.
     * @type {?}
     */
    MdTabHeader.prototype._focusIndex;
    /**
     * The distance in pixels that the tab labels should be translated to the left.
     * @type {?}
     */
    MdTabHeader.prototype._scrollDistance;
    /**
     * Whether the header should scroll to the selected index after the view has been checked.
     * @type {?}
     */
    MdTabHeader.prototype._selectedIndexChanged;
    /**
     * Subscription to changes in the layout direction.
     * @type {?}
     */
    MdTabHeader.prototype._directionChange;
    /**
     * Whether the controls for pagination should be displayed
     * @type {?}
     */
    MdTabHeader.prototype._showPaginationControls;
    /**
     * Whether the tab list can be scrolled more towards the end of the tab label list.
     * @type {?}
     */
    MdTabHeader.prototype._disableScrollAfter;
    /**
     * Whether the tab list can be scrolled more towards the beginning of the tab label list.
     * @type {?}
     */
    MdTabHeader.prototype._disableScrollBefore;
    /**
     * The number of tab labels that are displayed on the header. When this changes, the header
     * should re-evaluate the scroll position.
     * @type {?}
     */
    MdTabHeader.prototype._tabLabelCount;
    /**
     * Whether the scroll distance has changed and should be applied after the view is checked.
     * @type {?}
     */
    MdTabHeader.prototype._scrollDistanceChanged;
    /** @type {?} */
    MdTabHeader.prototype._selectedIndex;
    /**
     * Event emitted when the option is selected.
     * @type {?}
     */
    MdTabHeader.prototype.selectFocusedIndex;
    /**
     * Event emitted when a label is focused.
     * @type {?}
     */
    MdTabHeader.prototype.indexFocused;
    /** @type {?} */
    MdTabHeader.prototype._elementRef;
    /** @type {?} */
    MdTabHeader.prototype._dir;
}
//# sourceMappingURL=tab-header.js.map