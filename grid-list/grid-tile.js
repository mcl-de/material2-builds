import { Component, ViewEncapsulation, Renderer, ElementRef, Input, ContentChildren, Directive } from '@angular/core';
import { MdLine, MdLineSetter } from '../core';
import { coerceToNumber } from './grid-list-measure';
export class MdGridTile {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this._rowspan = 1;
        this._colspan = 1;
    }
    /**
     * Amount of rows that the grid tile takes up.
     * @return {?}
     */
    get rowspan() { return this._rowspan; }
    /**
     * @param {?} value
     * @return {?}
     */
    set rowspan(value) { this._rowspan = coerceToNumber(value); }
    /**
     * Amount of columns that the grid tile takes up.
     * @return {?}
     */
    get colspan() { return this._colspan; }
    /**
     * @param {?} value
     * @return {?}
     */
    set colspan(value) { this._colspan = coerceToNumber(value); }
    /**
     * Sets the style of the grid-tile element.  Needs to be set manually to avoid
     * "Changed after checked" errors that would occur with HostBinding.
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    _setStyle(property, value) {
        this._renderer.setElementStyle(this._element.nativeElement, property, value);
    }
}
MdGridTile.decorators = [
    { type: Component, args: [{selector: 'md-grid-tile, mat-grid-tile',
                host: {
                    'role': 'listitem',
                    '[class.mat-grid-tile]': 'true',
                },
                template: "<!-- TODO(kara): Revisit why this is a figure.--> <figure class=\"mat-figure\"> <ng-content></ng-content> </figure>",
                styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-figure{display:flex;position:absolute;align-items:center;justify-content:center;height:100%;top:0;right:0;bottom:0;left:0;padding:0;margin:0}.mat-grid-tile .mat-grid-tile-footer,.mat-grid-tile .mat-grid-tile-header{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;font-size:16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-footer .mat-line,.mat-grid-tile .mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile .mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile .mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}.mat-grid-tile .mat-grid-tile-footer>*,.mat-grid-tile .mat-grid-tile-header>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-tile-footer.mat-2-line,.mat-grid-tile .mat-grid-tile-header.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none} /*# sourceMappingURL=grid-list.css.map */ "],
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
MdGridTile.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
];
MdGridTile.propDecorators = {
    'rowspan': [{ type: Input },],
    'colspan': [{ type: Input },],
};
function MdGridTile_tsickle_Closure_declarations() {
    /** @type {?} */
    MdGridTile.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdGridTile.ctorParameters;
    /** @type {?} */
    MdGridTile.propDecorators;
    /** @type {?} */
    MdGridTile.prototype._rowspan;
    /** @type {?} */
    MdGridTile.prototype._colspan;
    /** @type {?} */
    MdGridTile.prototype._renderer;
    /** @type {?} */
    MdGridTile.prototype._element;
}
export class MdGridTileText {
    /**
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._lineSetter = new MdLineSetter(this._lines, this._renderer, this._element);
    }
}
MdGridTileText.decorators = [
    { type: Component, args: [{selector: 'md-grid-tile-header, mat-grid-tile-header, md-grid-tile-footer, mat-grid-tile-footer',
                template: "<ng-content select=\"[md-grid-avatar], [mat-grid-avatar]\"></ng-content> <div class=\"mat-grid-list-text\"><ng-content select=\"[md-line], [mat-line]\"></ng-content></div> <ng-content></ng-content> "
            },] },
];
/**
 * @nocollapse
 */
MdGridTileText.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
];
MdGridTileText.propDecorators = {
    '_lines': [{ type: ContentChildren, args: [MdLine,] },],
};
function MdGridTileText_tsickle_Closure_declarations() {
    /** @type {?} */
    MdGridTileText.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdGridTileText.ctorParameters;
    /** @type {?} */
    MdGridTileText.propDecorators;
    /**
     *  Helper that watches the number of lines in a text area and sets
     * a class on the host element that matches the line count.
     * @type {?}
     */
    MdGridTileText.prototype._lineSetter;
    /** @type {?} */
    MdGridTileText.prototype._lines;
    /** @type {?} */
    MdGridTileText.prototype._renderer;
    /** @type {?} */
    MdGridTileText.prototype._element;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
export class MdGridAvatarCssMatStyler {
}
MdGridAvatarCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: '[md-grid-avatar], [mat-grid-avatar]',
                host: {
                    '[class.mat-grid-avatar]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdGridAvatarCssMatStyler.ctorParameters = () => [];
function MdGridAvatarCssMatStyler_tsickle_Closure_declarations() {
    /** @type {?} */
    MdGridAvatarCssMatStyler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdGridAvatarCssMatStyler.ctorParameters;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
export class MdGridTileHeaderCssMatStyler {
}
MdGridTileHeaderCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: 'md-grid-tile-header, mat-grid-tile-header',
                host: {
                    '[class.mat-grid-tile-header]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdGridTileHeaderCssMatStyler.ctorParameters = () => [];
function MdGridTileHeaderCssMatStyler_tsickle_Closure_declarations() {
    /** @type {?} */
    MdGridTileHeaderCssMatStyler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdGridTileHeaderCssMatStyler.ctorParameters;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
export class MdGridTileFooterCssMatStyler {
}
MdGridTileFooterCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: 'md-grid-tile-footer, mat-grid-tile-footer',
                host: {
                    '[class.mat-grid-tile-footer]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdGridTileFooterCssMatStyler.ctorParameters = () => [];
function MdGridTileFooterCssMatStyler_tsickle_Closure_declarations() {
    /** @type {?} */
    MdGridTileFooterCssMatStyler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdGridTileFooterCssMatStyler.ctorParameters;
}
//# sourceMappingURL=grid-tile.js.map