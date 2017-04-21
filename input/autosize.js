import { Directive, ElementRef, Input } from '@angular/core';
/**
 * Directive to automatically resize a textarea to fit its content.
 */
export class MdTextareaAutosize {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
    /**
     * @deprecated Use mdAutosizeMinRows
     * @return {?}
     */
    get minRows() { return this._minRows; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minRows(value) {
        this._minRows = value;
        this._setMinHeight();
    }
    /**
     * @deprecated Use mdAutosizeMaxRows
     * @return {?}
     */
    get maxRows() { return this._maxRows; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxRows(value) {
        this._maxRows = value;
        this._setMaxHeight();
    }
    /**
     * Minimum number of rows for this textarea.
     * @return {?}
     */
    get mdAutosizeMinRows() { return this.minRows; }
    /**
     * @param {?} value
     * @return {?}
     */
    set mdAutosizeMinRows(value) { this.minRows = value; }
    /**
     * Maximum number of rows for this textarea.
     * @return {?}
     */
    get mdAutosizeMaxRows() { return this.maxRows; }
    /**
     * @param {?} value
     * @return {?}
     */
    set mdAutosizeMaxRows(value) { this.maxRows = value; }
    /**
     * Sets the minimum height of the textarea as determined by minRows.
     * @return {?}
     */
    _setMinHeight() {
        const /** @type {?} */ minHeight = this.minRows && this._cachedLineHeight ?
            `${this.minRows * this._cachedLineHeight}px` : null;
        if (minHeight) {
            this._setTextareaStyle('minHeight', minHeight);
        }
    }
    /**
     * Sets the maximum height of the textarea as determined by maxRows.
     * @return {?}
     */
    _setMaxHeight() {
        const /** @type {?} */ maxHeight = this.maxRows && this._cachedLineHeight ?
            `${this.maxRows * this._cachedLineHeight}px` : null;
        if (maxHeight) {
            this._setTextareaStyle('maxHeight', maxHeight);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._cacheTextareaLineHeight();
        this.resizeToFitContent();
    }
    /**
     * Sets a style property on the textarea element.
     * @param {?} property
     * @param {?} value
     * @return {?}
     */
    _setTextareaStyle(property, value) {
        const /** @type {?} */ textarea = (this._elementRef.nativeElement);
        textarea.style[property] = value;
    }
    /**
     * Cache the height of a single-row textarea.
     *
     * We need to know how large a single "row" of a textarea is in order to apply minRows and
     * maxRows. For the initial version, we will assume that the height of a single line in the
     * textarea does not ever change.
     * @return {?}
     */
    _cacheTextareaLineHeight() {
        let /** @type {?} */ textarea = (this._elementRef.nativeElement);
        // Use a clone element because we have to override some styles.
        let /** @type {?} */ textareaClone = (textarea.cloneNode(false));
        textareaClone.rows = 1;
        // Use `position: absolute` so that this doesn't cause a browser layout and use
        // `visibility: hidden` so that nothing is rendered. Clear any other styles that
        // would affect the height.
        textareaClone.style.position = 'absolute';
        textareaClone.style.visibility = 'hidden';
        textareaClone.style.border = 'none';
        textareaClone.style.padding = '0';
        textareaClone.style.height = '';
        textareaClone.style.minHeight = '';
        textareaClone.style.maxHeight = '';
        textarea.parentNode.appendChild(textareaClone);
        this._cachedLineHeight = textareaClone.clientHeight;
        textarea.parentNode.removeChild(textareaClone);
        // Min and max heights have to be re-calculated if the cached line height changes
        this._setMinHeight();
        this._setMaxHeight();
    }
    /**
     * Resize the textarea to fit its content.
     * @return {?}
     */
    resizeToFitContent() {
        let /** @type {?} */ textarea = (this._elementRef.nativeElement);
        // Reset the textarea height to auto in order to shrink back to its default size.
        textarea.style.height = 'auto';
        // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
}
MdTextareaAutosize.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[md-autosize], textarea[mdTextareaAutosize],' +
                    'textarea[mat-autosize], textarea[matTextareaAutosize]',
                exportAs: 'mdTextareaAutosize',
                host: {
                    '(input)': 'resizeToFitContent()',
                },
            },] },
];
/**
 * @nocollapse
 */
MdTextareaAutosize.ctorParameters = () => [
    { type: ElementRef, },
];
MdTextareaAutosize.propDecorators = {
    'minRows': [{ type: Input },],
    'maxRows': [{ type: Input },],
    'mdAutosizeMinRows': [{ type: Input },],
    'mdAutosizeMaxRows': [{ type: Input },],
};
function MdTextareaAutosize_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTextareaAutosize.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTextareaAutosize.ctorParameters;
    /** @type {?} */
    MdTextareaAutosize.propDecorators;
    /** @type {?} */
    MdTextareaAutosize.prototype._minRows;
    /** @type {?} */
    MdTextareaAutosize.prototype._maxRows;
    /**
     * Cached height of a textarea with a single row.
     * @type {?}
     */
    MdTextareaAutosize.prototype._cachedLineHeight;
    /** @type {?} */
    MdTextareaAutosize.prototype._elementRef;
}
//# sourceMappingURL=autosize.js.map