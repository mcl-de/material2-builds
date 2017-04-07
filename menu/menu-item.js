import { Component, ElementRef, Input, Renderer } from '@angular/core';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
/**
 * This directive is intended to be used inside an md-menu tag.
 * It exists mostly to set the role attribute.
 */
export class MdMenuItem {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._disabled = false;
    }
    /**
     * Focuses the menu item.
     * @return {?}
     */
    focus() {
        this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
    }
    /**
     * Whether the menu item is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Used to set the `tabindex`.
     * @return {?}
     */
    _getTabIndex() {
        return this._disabled ? '-1' : '0';
    }
    /**
     * Used to set the HTML `disabled` attribute. Necessary for links to be disabled properly.
     * @return {?}
     */
    _getDisabledAttr() {
        return this._disabled ? true : null;
    }
    /**
     * Returns the host DOM element.
     * @return {?}
     */
    _getHostElement() {
        return this._elementRef.nativeElement;
    }
    /**
     * Prevents the default element actions if it is disabled.
     * @param {?} event
     * @return {?}
     */
    _checkDisabled(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
MdMenuItem.decorators = [
    { type: Component, args: [{selector: '[md-menu-item], [mat-menu-item]',
                host: {
                    'role': 'menuitem',
                    '[class.mat-menu-item]': 'true',
                    '[attr.tabindex]': '_getTabIndex()',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.disabled]': '_getDisabledAttr()',
                    '(click)': '_checkDisabled($event)',
                },
                template: "<ng-content></ng-content> <div class=\"mat-menu-ripple\" *ngIf=\"!disabled\" md-ripple [mdRippleTrigger]=\"_getHostElement()\"> </div> ",
                exportAs: 'mdMenuItem'
            },] },
];
/**
 * @nocollapse
 */
MdMenuItem.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
];
MdMenuItem.propDecorators = {
    'disabled': [{ type: Input },],
};
function MdMenuItem_tsickle_Closure_declarations() {
    /** @type {?} */
    MdMenuItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdMenuItem.ctorParameters;
    /** @type {?} */
    MdMenuItem.propDecorators;
    /**
     * Whether the menu item is disabled
     * @type {?}
     */
    MdMenuItem.prototype._disabled;
    /** @type {?} */
    MdMenuItem.prototype._renderer;
    /** @type {?} */
    MdMenuItem.prototype._elementRef;
}
//# sourceMappingURL=menu-item.js.map