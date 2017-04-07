// TODO(kara): prevent-close functionality
import { Attribute, Component, ContentChildren, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation, } from '@angular/core';
import { MdMenuInvalidPositionX, MdMenuInvalidPositionY } from './menu-errors';
import { MdMenuItem } from './menu-item';
import { FocusKeyManager } from '../core/a11y/focus-key-manager';
import { transformMenu, fadeInItems } from './menu-animations';
export class MdMenu {
    /**
     * @param {?} posX
     * @param {?} posY
     * @param {?} deprecatedPosX
     * @param {?} deprecatedPosY
     */
    constructor(posX, posY, deprecatedPosX, deprecatedPosY) {
        /** Config object to be passed into the menu's ngClass */
        this._classList = {};
        /** Position of the menu in the X axis. */
        this.positionX = 'after';
        /** Position of the menu in the Y axis. */
        this.positionY = 'below';
        this.overlapTrigger = true;
        /** Event emitted when the menu is closed. */
        this.close = new EventEmitter();
        // TODO(kara): Remove kebab-case attributes after next release
        if (deprecatedPosX) {
            this._setPositionX(deprecatedPosX);
        }
        if (deprecatedPosY) {
            this._setPositionY(deprecatedPosY);
        }
        if (posX) {
            this._setPositionX(posX);
        }
        if (posY) {
            this._setPositionY(posY);
        }
        this.setPositionClasses(this.positionX, this.positionY);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._keyManager = new FocusKeyManager(this.items).withWrap();
        this._tabSubscription = this._keyManager.tabOut.subscribe(() => {
            this._emitCloseEvent();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._tabSubscription) {
            this._tabSubscription.unsubscribe();
        }
    }
    /**
     * This method takes classes set on the host md-menu element and applies them on the
     * menu template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing menu from outside the component.
     * @param {?} classes list of class names
     * @return {?}
     */
    set classList(classes) {
        this._classList = classes.split(' ').reduce((obj, className) => {
            obj[className] = true;
            return obj;
        }, {});
        this.setPositionClasses(this.positionX, this.positionY);
    }
    /**
     * Focus the first item in the menu. This method is used by the menu trigger
     * to focus the first item when the menu is opened by the ENTER key.
     * @return {?}
     */
    focusFirstItem() {
        this._keyManager.setFirstItemActive();
    }
    /**
     * This emits a close event to which the trigger is subscribed. When emitted, the
     * trigger will close the menu.
     * @return {?}
     */
    _emitCloseEvent() {
        this.close.emit();
    }
    /**
     * @param {?} pos
     * @return {?}
     */
    _setPositionX(pos) {
        if (pos !== 'before' && pos !== 'after') {
            throw new MdMenuInvalidPositionX();
        }
        this.positionX = pos;
    }
    /**
     * @param {?} pos
     * @return {?}
     */
    _setPositionY(pos) {
        if (pos !== 'above' && pos !== 'below') {
            throw new MdMenuInvalidPositionY();
        }
        this.positionY = pos;
    }
    /**
     * It's necessary to set position-based classes to ensure the menu panel animation
     * folds out from the correct direction.
     * @param {?} posX
     * @param {?} posY
     * @return {?}
     */
    setPositionClasses(posX, posY) {
        this._classList['mat-menu-before'] = posX == 'before';
        this._classList['mat-menu-after'] = posX == 'after';
        this._classList['mat-menu-above'] = posY == 'above';
        this._classList['mat-menu-below'] = posY == 'below';
    }
}
MdMenu.decorators = [
    { type: Component, args: [{selector: 'md-menu, mat-menu',
                host: { 'role': 'menu' },
                template: "<ng-template> <div class=\"mat-menu-panel\" [ngClass]=\"_classList\" (keydown)=\"_keyManager.onKeydown($event)\" (click)=\"_emitCloseEvent()\" [@transformMenu]=\"'showing'\"> <div class=\"mat-menu-content\" [@fadeInItems]=\"'showing'\"> <ng-content></ng-content> </div> </div> </ng-template> ",
                styles: [".mat-menu-panel{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;max-height:calc(100vh + 48px)}.mat-menu-panel.mat-menu-after.mat-menu-below{transform-origin:left top}.mat-menu-panel.mat-menu-after.mat-menu-above{transform-origin:left bottom}.mat-menu-panel.mat-menu-before.mat-menu-below{transform-origin:right top}.mat-menu-panel.mat-menu-before.mat-menu-above{transform-origin:right bottom}[dir=rtl] .mat-menu-panel.mat-menu-after.mat-menu-below{transform-origin:right top}[dir=rtl] .mat-menu-panel.mat-menu-after.mat-menu-above{transform-origin:right bottom}[dir=rtl] .mat-menu-panel.mat-menu-before.mat-menu-below{transform-origin:left top}[dir=rtl] .mat-menu-panel.mat-menu-before.mat-menu-above{transform-origin:left bottom}@media screen and (-ms-high-contrast:active){.mat-menu-panel{outline:solid 1px}}.mat-menu-content{padding-top:8px;padding-bottom:8px}.mat-menu-item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;font-size:16px;font-family:Roboto,\"Helvetica Neue\",sans-serif;text-align:left;text-decoration:none;position:relative}.mat-menu-item[disabled]{cursor:default}[dir=rtl] .mat-menu-item{text-align:right}.mat-menu-item .mat-icon{margin-right:16px}[dir=rtl] .mat-menu-item .mat-icon{margin-left:16px}button.mat-menu-item{width:100%}.mat-menu-ripple{position:absolute;top:0;left:0;bottom:0;right:0} /*# sourceMappingURL=menu.css.map */ "],
                encapsulation: ViewEncapsulation.None,
                animations: [
                    transformMenu,
                    fadeInItems
                ],
                exportAs: 'mdMenu'
            },] },
];
/**
 * @nocollapse
 */
MdMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Attribute, args: ['xPosition',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['yPosition',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['x-position',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['y-position',] },] },
];
MdMenu.propDecorators = {
    'templateRef': [{ type: ViewChild, args: [TemplateRef,] },],
    'items': [{ type: ContentChildren, args: [MdMenuItem,] },],
    'overlapTrigger': [{ type: Input },],
    'classList': [{ type: Input, args: ['class',] },],
    'close': [{ type: Output },],
};
function MdMenu_tsickle_Closure_declarations() {
    /** @type {?} */
    MdMenu.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdMenu.ctorParameters;
    /** @type {?} */
    MdMenu.propDecorators;
    /** @type {?} */
    MdMenu.prototype._keyManager;
    /**
     * Subscription to tab events on the menu panel
     * @type {?}
     */
    MdMenu.prototype._tabSubscription;
    /**
     * Config object to be passed into the menu's ngClass
     * @type {?}
     */
    MdMenu.prototype._classList;
    /**
     * Position of the menu in the X axis.
     * @type {?}
     */
    MdMenu.prototype.positionX;
    /**
     * Position of the menu in the Y axis.
     * @type {?}
     */
    MdMenu.prototype.positionY;
    /** @type {?} */
    MdMenu.prototype.templateRef;
    /** @type {?} */
    MdMenu.prototype.items;
    /** @type {?} */
    MdMenu.prototype.overlapTrigger;
    /**
     * Event emitted when the menu is closed.
     * @type {?}
     */
    MdMenu.prototype.close;
}
//# sourceMappingURL=menu-directive.js.map