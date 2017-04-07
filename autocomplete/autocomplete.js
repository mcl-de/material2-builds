import { Component, ContentChildren, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MdOption } from '../core';
import { ActiveDescendantKeyManager } from '../core/a11y/activedescendant-key-manager';
/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let /** @type {?} */ _uniqueAutocompleteIdCounter = 0;
export class MdAutocomplete {
    constructor() {
        /** Whether the autocomplete panel displays above or below its trigger. */
        this.positionY = 'below';
        /** Whether the autocomplete panel should be visible, depending on option length. */
        this.showPanel = false;
        /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
        this.id = `md-autocomplete-${_uniqueAutocompleteIdCounter++}`;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._keyManager = new ActiveDescendantKeyManager(this.options).withWrap();
    }
    /**
     * Sets the panel scrollTop. This allows us to manually scroll to display
     * options below the fold, as they are not actually being focused when active.
     * @param {?} scrollTop
     * @return {?}
     */
    _setScrollTop(scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    }
    /**
     * Panel should hide itself when the option list is empty.
     * @return {?}
     */
    _setVisibility() {
        Promise.resolve().then(() => this.showPanel = !!this.options.length);
    }
    /**
     * Sets a class on the panel based on its position (used to set y-offset).
     * @return {?}
     */
    _getClassList() {
        return {
            'mat-autocomplete-panel-below': this.positionY === 'below',
            'mat-autocomplete-panel-above': this.positionY === 'above',
            'mat-autocomplete-visible': this.showPanel,
            'mat-autocomplete-hidden': !this.showPanel
        };
    }
}
MdAutocomplete.decorators = [
    { type: Component, args: [{selector: 'md-autocomplete, mat-autocomplete',
                template: "<ng-template> <div class=\"mat-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"_getClassList()\" #panel> <ng-content></ng-content> </div> </ng-template> ",
                styles: [".mat-autocomplete-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative}.mat-autocomplete-panel.mat-autocomplete-panel-below{top:6px}.mat-autocomplete-panel.mat-autocomplete-panel-above{top:-24px}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden} /*# sourceMappingURL=autocomplete.css.map */ "],
                encapsulation: ViewEncapsulation.None,
                exportAs: 'mdAutocomplete',
                host: {
                    '[class.mat-autocomplete]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdAutocomplete.ctorParameters = () => [];
MdAutocomplete.propDecorators = {
    'template': [{ type: ViewChild, args: [TemplateRef,] },],
    'panel': [{ type: ViewChild, args: ['panel',] },],
    'options': [{ type: ContentChildren, args: [MdOption,] },],
    'displayWith': [{ type: Input },],
};
function MdAutocomplete_tsickle_Closure_declarations() {
    /** @type {?} */
    MdAutocomplete.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdAutocomplete.ctorParameters;
    /** @type {?} */
    MdAutocomplete.propDecorators;
    /**
     * Manages active item in option list based on key events.
     * @type {?}
     */
    MdAutocomplete.prototype._keyManager;
    /**
     * Whether the autocomplete panel displays above or below its trigger.
     * @type {?}
     */
    MdAutocomplete.prototype.positionY;
    /**
     * Whether the autocomplete panel should be visible, depending on option length.
     * @type {?}
     */
    MdAutocomplete.prototype.showPanel;
    /** @type {?} */
    MdAutocomplete.prototype.template;
    /** @type {?} */
    MdAutocomplete.prototype.panel;
    /** @type {?} */
    MdAutocomplete.prototype.options;
    /**
     * Function that maps an option's control value to its display value in the trigger.
     * @type {?}
     */
    MdAutocomplete.prototype.displayWith;
    /**
     * Unique ID to be used by autocomplete trigger's "aria-owns" property.
     * @type {?}
     */
    MdAutocomplete.prototype.id;
}
//# sourceMappingURL=autocomplete.js.map