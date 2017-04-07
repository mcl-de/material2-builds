import { TemplatePortal } from '../core/portal/portal';
import { ViewContainerRef, Input, TemplateRef, ViewChild, ContentChild, Component } from '@angular/core';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { MdTabLabel } from './tab-label';
export class MdTab {
    /**
     * @param {?} _viewContainerRef
     */
    constructor(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
        /** The plain text label for the tab, used when there is no template label. */
        this.textLabel = '';
        this._contentPortal = null;
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        this.origin = null;
        this._disabled = false;
    }
    /**
     * @return {?}
     */
    get content() { return this._contentPortal; }
    /**
     * Whether the tab is disabled
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._contentPortal = new TemplatePortal(this._content, this._viewContainerRef);
    }
}
MdTab.decorators = [
    { type: Component, args: [{selector: 'md-tab, mat-tab',
                template: "<!-- Create a template for the content of the <md-tab> so that we can grab a reference to this TemplateRef and use it in a Portal to render the tab content in the appropriate place in the tab-group. --> <ng-template><ng-content></ng-content></ng-template> ",
            },] },
];
/**
 * @nocollapse
 */
MdTab.ctorParameters = () => [
    { type: ViewContainerRef, },
];
MdTab.propDecorators = {
    'templateLabel': [{ type: ContentChild, args: [MdTabLabel,] },],
    '_content': [{ type: ViewChild, args: [TemplateRef,] },],
    'textLabel': [{ type: Input, args: ['label',] },],
    'disabled': [{ type: Input },],
};
function MdTab_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTab.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTab.ctorParameters;
    /** @type {?} */
    MdTab.propDecorators;
    /**
     * Content for the tab label given by <ng-template md-tab-label>.
     * @type {?}
     */
    MdTab.prototype.templateLabel;
    /**
     * Template inside the MdTab view that contains an <ng-content>.
     * @type {?}
     */
    MdTab.prototype._content;
    /**
     * The plain text label for the tab, used when there is no template label.
     * @type {?}
     */
    MdTab.prototype.textLabel;
    /**
     * The portal that will be the hosted content of the tab
     * @type {?}
     */
    MdTab.prototype._contentPortal;
    /**
     * The relatively indexed position where 0 represents the center, negative is left, and positive
     * represents the right.
     * @type {?}
     */
    MdTab.prototype.position;
    /**
     * The initial relatively index origin of the tab if it was created and selected after there
     * was already a selected tab. Provides context of what position the tab should originate from.
     * @type {?}
     */
    MdTab.prototype.origin;
    /** @type {?} */
    MdTab.prototype._disabled;
    /** @type {?} */
    MdTab.prototype._viewContainerRef;
}
//# sourceMappingURL=tab.js.map