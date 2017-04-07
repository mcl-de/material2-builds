import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, Directive, ElementRef, Renderer } from '@angular/core';
export class MdToolbarRow {
}
MdToolbarRow.decorators = [
    { type: Directive, args: [{
                selector: 'md-toolbar-row, mat-toolbar-row',
                host: {
                    '[class.mat-toolbar-row]': 'true',
                },
            },] },
];
/**
 * @nocollapse
 */
MdToolbarRow.ctorParameters = () => [];
function MdToolbarRow_tsickle_Closure_declarations() {
    /** @type {?} */
    MdToolbarRow.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdToolbarRow.ctorParameters;
}
export class MdToolbar {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    /**
     * The color of the toolbar. Can be primary, accent, or warn.
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._updateColor(value);
    }
    /**
     * @param {?} newColor
     * @return {?}
     */
    _updateColor(newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    }
    /**
     * @param {?} color
     * @param {?} isAdd
     * @return {?}
     */
    _setElementColor(color, isAdd) {
        if (color != null && color != '') {
            this.renderer.setElementClass(this.elementRef.nativeElement, `mat-${color}`, isAdd);
        }
    }
}
MdToolbar.decorators = [
    { type: Component, args: [{selector: 'md-toolbar, mat-toolbar',
                template: "<div class=\"mat-toolbar-layout\"> <md-toolbar-row> <ng-content></ng-content> </md-toolbar-row> <ng-content select=\"md-toolbar-row, mat-toolbar-row\"></ng-content> </div> ",
                styles: [".mat-toolbar{display:flex;box-sizing:border-box;width:100%;font-size:20px;font-weight:500;font-family:Roboto,\"Helvetica Neue\",sans-serif;padding:0 16px;flex-direction:column}.mat-toolbar .mat-toolbar-row{display:flex;box-sizing:border-box;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar{min-height:64px}.mat-toolbar-row{height:64px}@media (max-width:600px){.mat-toolbar{min-height:56px}.mat-toolbar-row{height:56px}} /*# sourceMappingURL=toolbar.css.map */ "],
                host: {
                    '[class.mat-toolbar]': 'true',
                    'role': 'toolbar'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
MdToolbar.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
];
MdToolbar.propDecorators = {
    'color': [{ type: Input },],
};
function MdToolbar_tsickle_Closure_declarations() {
    /** @type {?} */
    MdToolbar.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdToolbar.ctorParameters;
    /** @type {?} */
    MdToolbar.propDecorators;
    /** @type {?} */
    MdToolbar.prototype._color;
    /** @type {?} */
    MdToolbar.prototype.elementRef;
    /** @type {?} */
    MdToolbar.prototype.renderer;
}
//# sourceMappingURL=toolbar.js.map