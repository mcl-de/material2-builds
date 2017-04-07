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
     * @return {?}
     */
    get mdAutosizeMinRows() {
        return this.minRows;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mdAutosizeMinRows(value) {
        this.minRows = value;
    }
    /**
     * @return {?}
     */
    get mdAutosizeMaxRows() {
        return this.maxRows;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mdAutosizeMaxRows(value) {
        this.maxRows = value;
    }
    /**
     * The minimum height of the textarea as determined by minRows.
     * @return {?}
     */
    get _minHeight() {
        return this.minRows ? `${this.minRows * this._cachedLineHeight}px` : null;
    }
    /**
     * The maximum height of the textarea as determined by maxRows.
     * @return {?}
     */
    get _maxHeight() {
        return this.maxRows ? `${this.maxRows * this._cachedLineHeight}px` : null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._cacheTextareaLineHeight();
        this.resizeToFitContent();
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
        textareaClone.style.padding = '';
        textareaClone.style.height = '';
        textareaClone.style.minHeight = '';
        textareaClone.style.maxHeight = '';
        textarea.parentNode.appendChild(textareaClone);
        this._cachedLineHeight = textareaClone.offsetHeight;
        textarea.parentNode.removeChild(textareaClone);
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
                    '[style.min-height]': '_minHeight',
                    '[style.max-height]': '_maxHeight',
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
    'mdAutosizeMinRows': [{ type: Input },],
    'maxRows': [{ type: Input },],
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
    /**
     * Minimum number of rows for this textarea.
     * @type {?}
     */
    MdTextareaAutosize.prototype.minRows;
    /**
     * Maximum number of rows for this textarea.
     * @type {?}
     */
    MdTextareaAutosize.prototype.maxRows;
    /**
     * Cached height of a textarea with a single row.
     * @type {?}
     */
    MdTextareaAutosize.prototype._cachedLineHeight;
    /** @type {?} */
    MdTextareaAutosize.prototype._elementRef;
}
//# sourceMappingURL=autosize.js.map