import { Component, ViewEncapsulation, Input, ContentChildren, Renderer, ElementRef, Optional, } from '@angular/core';
import { MdGridTile } from './grid-tile';
import { TileCoordinator } from './tile-coordinator';
import { FitTileStyler, RatioTileStyler, FixedTileStyler } from './tile-styler';
import { MdGridListColsError } from './grid-list-errors';
import { Dir } from '../core';
import { coerceToString, coerceToNumber, } from './grid-list-measure';
// TODO(kara): Conditional (responsive) column count / row size.
// TODO(kara): Re-layout on window resize / media change (debounced).
// TODO(kara): gridTileHeader and gridTileFooter.
const /** @type {?} */ MD_FIT_MODE = 'fit';
export class MdGridList {
    /**
     * @param {?} _renderer
     * @param {?} _element
     * @param {?} _dir
     */
    constructor(_renderer, _element, _dir) {
        this._renderer = _renderer;
        this._element = _element;
        this._dir = _dir;
        this._gutter = '1px';
    }
    /**
     * Amount of columns in the grid list.
     * @return {?}
     */
    get cols() { return this._cols; }
    /**
     * @param {?} value
     * @return {?}
     */
    set cols(value) { this._cols = coerceToNumber(value); }
    /**
     * Size of the grid list's gutter in pixels.
     * @return {?}
     */
    get gutterSize() { return this._gutter; }
    /**
     * @param {?} value
     * @return {?}
     */
    set gutterSize(value) { this._gutter = coerceToString(value); }
    /**
     * Set internal representation of row height from the user-provided value.
     * @param {?} value
     * @return {?}
     */
    set rowHeight(value) {
        this._rowHeight = coerceToString(value);
        this._setTileStyler();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._checkCols();
        this._checkRowHeight();
    }
    /**
     * The layout calculation is fairly cheap if nothing changes, so there's little cost
     * to run it frequently.
     * @return {?}
     */
    ngAfterContentChecked() {
        this._layoutTiles();
    }
    /**
     * Throw a friendly error if cols property is missing
     * @return {?}
     */
    _checkCols() {
        if (!this.cols) {
            throw new MdGridListColsError();
        }
    }
    /**
     * Default to equal width:height if rowHeight property is missing
     * @return {?}
     */
    _checkRowHeight() {
        if (!this._rowHeight) {
            this._tileStyler = new RatioTileStyler('1:1');
        }
    }
    /**
     * Creates correct Tile Styler subtype based on rowHeight passed in by user
     * @return {?}
     */
    _setTileStyler() {
        if (this._rowHeight === MD_FIT_MODE) {
            this._tileStyler = new FitTileStyler();
        }
        else if (this._rowHeight && this._rowHeight.indexOf(':') > -1) {
            this._tileStyler = new RatioTileStyler(this._rowHeight);
        }
        else {
            this._tileStyler = new FixedTileStyler(this._rowHeight);
        }
    }
    /**
     * Computes and applies the size and position for all children grid tiles.
     * @return {?}
     */
    _layoutTiles() {
        let /** @type {?} */ tracker = new TileCoordinator(this.cols, this._tiles);
        let /** @type {?} */ direction = this._dir ? this._dir.value : 'ltr';
        this._tileStyler.init(this.gutterSize, tracker, this.cols, direction);
        this._tiles.forEach((tile, index) => {
            let /** @type {?} */ pos = tracker.positions[index];
            this._tileStyler.setStyle(tile, pos.row, pos.col);
        });
        this._setListStyle(this._tileStyler.getComputedHeight());
    }
    /**
     * Sets style on the main grid-list element, given the style name and value.
     * @param {?} style
     * @return {?}
     */
    _setListStyle(style) {
        if (style) {
            this._renderer.setElementStyle(this._element.nativeElement, style[0], style[1]);
        }
    }
}
MdGridList.decorators = [
    { type: Component, args: [{selector: 'md-grid-list, mat-grid-list',
                template: "<div> <ng-content></ng-content> </div>",
                styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-figure{display:flex;position:absolute;align-items:center;justify-content:center;height:100%;top:0;right:0;bottom:0;left:0;padding:0;margin:0}.mat-grid-tile .mat-grid-tile-footer,.mat-grid-tile .mat-grid-tile-header{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;font-size:16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-footer .mat-line,.mat-grid-tile .mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile .mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile .mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}.mat-grid-tile .mat-grid-tile-footer>*,.mat-grid-tile .mat-grid-tile-header>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-tile-footer.mat-2-line,.mat-grid-tile .mat-grid-tile-header.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none} /*# sourceMappingURL=grid-list.css.map */ "],
                host: {
                    'role': 'list',
                    '[class.mat-grid-list]': 'true',
                },
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
MdGridList.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
    { type: Dir, decorators: [{ type: Optional },] },
];
MdGridList.propDecorators = {
    '_tiles': [{ type: ContentChildren, args: [MdGridTile,] },],
    'cols': [{ type: Input },],
    'gutterSize': [{ type: Input },],
    'rowHeight': [{ type: Input },],
};
function MdGridList_tsickle_Closure_declarations() {
    /** @type {?} */
    MdGridList.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdGridList.ctorParameters;
    /** @type {?} */
    MdGridList.propDecorators;
    /**
     * Number of columns being rendered.
     * @type {?}
     */
    MdGridList.prototype._cols;
    /**
     * Row height value passed in by user. This can be one of three types:
     * - Number value (ex: "100px"):  sets a fixed row height to that value
     * - Ratio value (ex: "4:3"): sets the row height based on width:height ratio
     * - "Fit" mode (ex: "fit"): sets the row height to total height divided by number of rows
     * @type {?}
     */
    MdGridList.prototype._rowHeight;
    /**
     * The amount of space between tiles. This will be something like '5px' or '2em'.
     * @type {?}
     */
    MdGridList.prototype._gutter;
    /**
     * Sets position and size styles for a tile
     * @type {?}
     */
    MdGridList.prototype._tileStyler;
    /**
     * Query list of tiles that are being rendered.
     * @type {?}
     */
    MdGridList.prototype._tiles;
    /** @type {?} */
    MdGridList.prototype._renderer;
    /** @type {?} */
    MdGridList.prototype._element;
    /** @type {?} */
    MdGridList.prototype._dir;
}
//# sourceMappingURL=grid-list.js.map