import { Directive, ElementRef, Input, NgZone, Injectable, } from '@angular/core';
import { InteractivityChecker } from './interactivity-checker';
import { coerceBooleanProperty } from '../coercion/boolean-property';
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * NOTE: This class currently uses a very simple (naive) approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like tabIndex > 0, flex `order`, and shadow roots can cause to two to misalign.
 * This will be replaced with a more intelligent solution before the library is considered stable.
 */
export class FocusTrap {
    /**
     * @param {?} _element
     * @param {?} _checker
     * @param {?} _ngZone
     * @param {?=} deferAnchors
     */
    constructor(_element, _checker, _ngZone, deferAnchors = false) {
        this._element = _element;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    /**
     * Whether the focus trap is active.
     * @return {?}
     */
    get enabled() { return this._enabled; }
    /**
     * @param {?} val
     * @return {?}
     */
    set enabled(val) {
        this._enabled = val;
        if (this._startAnchor && this._endAnchor) {
            this._startAnchor.tabIndex = this._endAnchor.tabIndex = this._enabled ? 0 : -1;
        }
    }
    /**
     * Destroys the focus trap by cleaning up the anchors.
     * @return {?}
     */
    destroy() {
        if (this._startAnchor && this._startAnchor.parentNode) {
            this._startAnchor.parentNode.removeChild(this._startAnchor);
        }
        if (this._endAnchor && this._endAnchor.parentNode) {
            this._endAnchor.parentNode.removeChild(this._endAnchor);
        }
        this._startAnchor = this._endAnchor = null;
    }
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @return {?}
     */
    attachAnchors() {
        if (!this._startAnchor) {
            this._startAnchor = this._createAnchor();
        }
        if (!this._endAnchor) {
            this._endAnchor = this._createAnchor();
        }
        this._ngZone.runOutsideAngular(() => {
            this._startAnchor.addEventListener('focus', () => this.focusLastTabbableElement());
            this._endAnchor.addEventListener('focus', () => this.focusFirstTabbableElement());
            this._element.parentNode.insertBefore(this._startAnchor, this._element);
            this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling);
        });
    }
    /**
     * Waits for microtask queue to empty, then focuses
     * the first tabbable element within the focus trap region.
     * @return {?}
     */
    focusFirstTabbableElementWhenReady() {
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => this.focusFirstTabbableElement());
    }
    /**
     * Waits for microtask queue to empty, then focuses
     * the last tabbable element within the focus trap region.
     * @return {?}
     */
    focusLastTabbableElementWhenReady() {
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => this.focusLastTabbableElement());
    }
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @return {?}
     */
    focusFirstTabbableElement() {
        let /** @type {?} */ redirectToElement = (this._element.querySelector('[cdk-focus-start]')) ||
            this._getFirstTabbableElement(this._element);
        if (redirectToElement) {
            redirectToElement.focus();
        }
    }
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @return {?}
     */
    focusLastTabbableElement() {
        let /** @type {?} */ focusTargets = this._element.querySelectorAll('[cdk-focus-end]');
        let /** @type {?} */ redirectToElement = null;
        if (focusTargets.length) {
            redirectToElement = (focusTargets[focusTargets.length - 1]);
        }
        else {
            redirectToElement = this._getLastTabbableElement(this._element);
        }
        if (redirectToElement) {
            redirectToElement.focus();
        }
    }
    /**
     * Get the first tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    _getFirstTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        let /** @type {?} */ children = root.children || root.childNodes;
        for (let /** @type {?} */ i = 0; i < children.length; i++) {
            let /** @type {?} */ tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getFirstTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /**
     * Get the last tabbable element from a DOM subtree (inclusive).
     * @param {?} root
     * @return {?}
     */
    _getLastTabbableElement(root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in reverse DOM order.
        let /** @type {?} */ children = root.children || root.childNodes;
        for (let /** @type {?} */ i = children.length - 1; i >= 0; i--) {
            let /** @type {?} */ tabbableChild = children[i].nodeType === Node.ELEMENT_NODE ?
                this._getLastTabbableElement(/** @type {?} */ (children[i])) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    }
    /**
     * Creates an anchor element.
     * @return {?}
     */
    _createAnchor() {
        let /** @type {?} */ anchor = document.createElement('div');
        anchor.tabIndex = this._enabled ? 0 : -1;
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        return anchor;
    }
}
function FocusTrap_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusTrap.prototype._startAnchor;
    /** @type {?} */
    FocusTrap.prototype._endAnchor;
    /** @type {?} */
    FocusTrap.prototype._enabled;
    /** @type {?} */
    FocusTrap.prototype._element;
    /** @type {?} */
    FocusTrap.prototype._checker;
    /** @type {?} */
    FocusTrap.prototype._ngZone;
}
/**
 * Factory that allows easy instantiation of focus traps.
 */
export class FocusTrapFactory {
    /**
     * @param {?} _checker
     * @param {?} _ngZone
     */
    constructor(_checker, _ngZone) {
        this._checker = _checker;
        this._ngZone = _ngZone;
    }
    /**
     * @param {?} element
     * @param {?=} deferAnchors
     * @return {?}
     */
    create(element, deferAnchors = false) {
        return new FocusTrap(element, this._checker, this._ngZone, deferAnchors);
    }
}
FocusTrapFactory.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FocusTrapFactory.ctorParameters = () => [
    { type: InteractivityChecker, },
    { type: NgZone, },
];
function FocusTrapFactory_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusTrapFactory.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FocusTrapFactory.ctorParameters;
    /** @type {?} */
    FocusTrapFactory.prototype._checker;
    /** @type {?} */
    FocusTrapFactory.prototype._ngZone;
}
/**
 * Directive for trapping focus within a region.
 * @deprecated
 */
export class FocusTrapDeprecatedDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    constructor(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    /**
     * Whether the focus trap is active.
     * @return {?}
     */
    get disabled() { return !this.focusTrap.enabled; }
    /**
     * @param {?} val
     * @return {?}
     */
    set disabled(val) {
        this.focusTrap.enabled = !coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusTrap.destroy();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.focusTrap.attachAnchors();
    }
}
FocusTrapDeprecatedDirective.decorators = [
    { type: Directive, args: [{
                selector: 'cdk-focus-trap',
            },] },
];
/**
 * @nocollapse
 */
FocusTrapDeprecatedDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: FocusTrapFactory, },
];
FocusTrapDeprecatedDirective.propDecorators = {
    'disabled': [{ type: Input },],
};
function FocusTrapDeprecatedDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusTrapDeprecatedDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FocusTrapDeprecatedDirective.ctorParameters;
    /** @type {?} */
    FocusTrapDeprecatedDirective.propDecorators;
    /** @type {?} */
    FocusTrapDeprecatedDirective.prototype.focusTrap;
    /** @type {?} */
    FocusTrapDeprecatedDirective.prototype._elementRef;
    /** @type {?} */
    FocusTrapDeprecatedDirective.prototype._focusTrapFactory;
}
/**
 * Directive for trapping focus within a region.
 */
export class FocusTrapDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _focusTrapFactory
     */
    constructor(_elementRef, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    /**
     * Whether the focus trap is active.
     * @return {?}
     */
    get enabled() { return this.focusTrap.enabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set enabled(value) { this.focusTrap.enabled = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.focusTrap.destroy();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.focusTrap.attachAnchors();
    }
}
FocusTrapDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdkTrapFocus]',
                exportAs: 'cdkTrapFocus',
            },] },
];
/**
 * @nocollapse
 */
FocusTrapDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: FocusTrapFactory, },
];
FocusTrapDirective.propDecorators = {
    'enabled': [{ type: Input, args: ['cdkTrapFocus',] },],
};
function FocusTrapDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusTrapDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FocusTrapDirective.ctorParameters;
    /** @type {?} */
    FocusTrapDirective.propDecorators;
    /** @type {?} */
    FocusTrapDirective.prototype.focusTrap;
    /** @type {?} */
    FocusTrapDirective.prototype._elementRef;
    /** @type {?} */
    FocusTrapDirective.prototype._focusTrapFactory;
}
//# sourceMappingURL=focus-trap.js.map