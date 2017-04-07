import { Directive, Renderer, ElementRef, NgZone } from '@angular/core';
/**
 * The ink-bar is used to display and animate the line underneath the current active tab label.
 * \@docs-private
 */
export class MdInkBar {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     * @param {?} _ngZone
     */
    constructor(_renderer, _elementRef, _ngZone) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
    }
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param {?} element
     * @return {?}
     */
    alignToElement(element) {
        this.show();
        this._ngZone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'left', this._getLeftPosition(element));
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'width', this._getElementWidth(element));
            });
        });
    }
    /**
     * Shows the ink bar.
     * @return {?}
     */
    show() {
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'visibility', 'visible');
    }
    /**
     * Hides the ink bar.
     * @return {?}
     */
    hide() {
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
    }
    /**
     * Generates the pixel distance from the left based on the provided element in string format.
     * @param {?} element
     * @return {?}
     */
    _getLeftPosition(element) {
        return element ? element.offsetLeft + 'px' : '0';
    }
    /**
     * Generates the pixel width from the provided element in string format.
     * @param {?} element
     * @return {?}
     */
    _getElementWidth(element) {
        return element ? element.offsetWidth + 'px' : '0';
    }
}
MdInkBar.decorators = [
    { type: Directive, args: [{
                selector: 'md-ink-bar, mat-ink-bar',
                host: {
                    '[class.mat-ink-bar]': 'true',
                },
            },] },
];
/**
 * @nocollapse
 */
MdInkBar.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
    { type: NgZone, },
];
function MdInkBar_tsickle_Closure_declarations() {
    /** @type {?} */
    MdInkBar.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdInkBar.ctorParameters;
    /** @type {?} */
    MdInkBar.prototype._renderer;
    /** @type {?} */
    MdInkBar.prototype._elementRef;
    /** @type {?} */
    MdInkBar.prototype._ngZone;
}
//# sourceMappingURL=ink-bar.js.map