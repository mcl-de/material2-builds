import { NgModule, Directive } from '@angular/core';
import { CompatibilityModule } from '../compatibility/compatibility';
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a \@ContentChildren(MdLine) query, then
 * counted by checking the query list's length.
 */
export class MdLine {
}
MdLine.decorators = [
    { type: Directive, args: [{
                selector: '[md-line], [mat-line]',
                host: {
                    '[class.mat-line]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdLine.ctorParameters = () => [];
function MdLine_tsickle_Closure_declarations() {
    /** @type {?} */
    MdLine.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdLine.ctorParameters;
}
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * \@docs-private
 */
export class MdLineSetter {
    /**
     * @param {?} _lines
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_lines, _renderer, _element) {
        this._lines = _lines;
        this._renderer = _renderer;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(() => {
            this._setLineClass(this._lines.length);
        });
    }
    /**
     * @param {?} count
     * @return {?}
     */
    _setLineClass(count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass(`mat-${count}-line`, true);
        }
        else if (count > 3) {
            this._setClass(`mat-multi-line`, true);
        }
    }
    /**
     * @return {?}
     */
    _resetClasses() {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    }
    /**
     * @param {?} className
     * @param {?} bool
     * @return {?}
     */
    _setClass(className, bool) {
        this._renderer.setElementClass(this._element.nativeElement, className, bool);
    }
}
function MdLineSetter_tsickle_Closure_declarations() {
    /** @type {?} */
    MdLineSetter.prototype._lines;
    /** @type {?} */
    MdLineSetter.prototype._renderer;
    /** @type {?} */
    MdLineSetter.prototype._element;
}
export class MdLineModule {
}
MdLineModule.decorators = [
    { type: NgModule, args: [{
                imports: [CompatibilityModule],
                exports: [MdLine, CompatibilityModule],
                declarations: [MdLine],
            },] },
];
/**
 * @nocollapse
 */
MdLineModule.ctorParameters = () => [];
function MdLineModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdLineModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdLineModule.ctorParameters;
}
//# sourceMappingURL=line.js.map