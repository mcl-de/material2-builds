import { Directive, ElementRef, EventEmitter, Input, Optional, Output, Renderer, ViewContainerRef, } from '@angular/core';
import { MdMenuMissingError } from './menu-errors';
import { isFakeMousedownFromScreenReader, Dir, Overlay, OverlayState, TemplatePortal, } from '../core';
/**
 * This directive is intended to be used in conjunction with an md-menu tag.  It is
 * responsible for toggling the display of the provided menu instance.
 */
export class MdMenuTrigger {
    /**
     * @param {?} _overlay
     * @param {?} _element
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} _dir
     */
    constructor(_overlay, _element, _viewContainerRef, _renderer, _dir) {
        this._overlay = _overlay;
        this._element = _element;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._dir = _dir;
        this._menuOpen = false;
        this._openedByMouse = false;
        /** Event emitted when the associated menu is opened. */
        this.onMenuOpen = new EventEmitter();
        /** Event emitted when the associated menu is closed. */
        this.onMenuClose = new EventEmitter();
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedMdMenuTriggerFor() { return this.menu; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _deprecatedMdMenuTriggerFor(v) { this.menu = v; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedMatMenuTriggerFor() { return this.menu; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _deprecatedMatMenuTriggerFor(v) { this.menu = v; }
    /**
     * @return {?}
     */
    get _matMenuTriggerFor() { return this.menu; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matMenuTriggerFor(v) { this.menu = v; }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._checkMenu();
        this.menu.close.subscribe(() => this.closeMenu());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this.destroyMenu(); }
    /**
     * Whether the menu is open.
     * @return {?}
     */
    get menuOpen() { return this._menuOpen; }
    /**
     * Toggles the menu between the open and closed states.
     * @return {?}
     */
    toggleMenu() {
        return this._menuOpen ? this.closeMenu() : this.openMenu();
    }
    /**
     * Opens the menu.
     * @return {?}
     */
    openMenu() {
        if (!this._menuOpen) {
            this._createOverlay();
            this._overlayRef.attach(this._portal);
            this._subscribeToBackdrop();
            this._initMenu();
        }
    }
    /**
     * Closes the menu.
     * @return {?}
     */
    closeMenu() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._backdropSubscription.unsubscribe();
            this._resetMenu();
        }
    }
    /**
     * Removes the menu from the DOM.
     * @return {?}
     */
    destroyMenu() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._cleanUpSubscriptions();
        }
    }
    /**
     * Focuses the menu trigger.
     * @return {?}
     */
    focus() {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    }
    /**
     * The text direction of the containing app.
     * @return {?}
     */
    get dir() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /**
     * This method ensures that the menu closes when the overlay backdrop is clicked.
     * We do not use first() here because doing so would not catch clicks from within
     * the menu, and it would fail to unsubscribe properly. Instead, we unsubscribe
     * explicitly when the menu is closed or destroyed.
     * @return {?}
     */
    _subscribeToBackdrop() {
        this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
            this.menu._emitCloseEvent();
        });
    }
    /**
     * This method sets the menu state to open and focuses the first item if
     * the menu was opened via the keyboard.
     * @return {?}
     */
    _initMenu() {
        this._setIsMenuOpen(true);
        // Should only set focus if opened via the keyboard, so keyboard users can
        // can easily navigate menu items. According to spec, mouse users should not
        // see the focus style.
        if (!this._openedByMouse) {
            this.menu.focusFirstItem();
        }
    }
    ;
    /**
     * This method resets the menu when it's closed, most importantly restoring
     * focus to the menu trigger if the menu was opened via the keyboard.
     * @return {?}
     */
    _resetMenu() {
        this._setIsMenuOpen(false);
        // Focus only needs to be reset to the host element if the menu was opened
        // by the keyboard and manually shifted to the first menu item.
        if (!this._openedByMouse) {
            this.focus();
        }
        this._openedByMouse = false;
    }
    /**
     * @param {?} isOpen
     * @return {?}
     */
    _setIsMenuOpen(isOpen) {
        this._menuOpen = isOpen;
        this._menuOpen ? this.onMenuOpen.emit() : this.onMenuClose.emit();
    }
    /**
     *  This method checks that a valid instance of MdMenu has been passed into
     *  mdMenuTriggerFor. If not, an exception is thrown.
     * @return {?}
     */
    _checkMenu() {
        if (!this.menu) {
            throw new MdMenuMissingError();
        }
    }
    /**
     *  This method creates the overlay from the provided menu's template and saves its
     *  OverlayRef so that it can be attached to the DOM when openMenu is called.
     * @return {?}
     */
    _createOverlay() {
        if (!this._overlayRef) {
            this._portal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);
            const /** @type {?} */ config = this._getOverlayConfig();
            this._subscribeToPositions(/** @type {?} */ (config.positionStrategy));
            this._overlayRef = this._overlay.create(config);
        }
    }
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @return {?} OverlayState
     */
    _getOverlayConfig() {
        const /** @type {?} */ overlayState = new OverlayState();
        overlayState.positionStrategy = this._getPosition()
            .withDirection(this.dir);
        overlayState.hasBackdrop = true;
        overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
        overlayState.direction = this.dir;
        return overlayState;
    }
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the menu based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     * @param {?} position
     * @return {?}
     */
    _subscribeToPositions(position) {
        this._positionSubscription = position.onPositionChange.subscribe((change) => {
            const /** @type {?} */ posX = change.connectionPair.originX === 'start' ? 'after' : 'before';
            let /** @type {?} */ posY = change.connectionPair.originY === 'top' ? 'below' : 'above';
            if (!this.menu.overlapTrigger) {
                posY = posY === 'below' ? 'above' : 'below';
            }
            this.menu.setPositionClasses(posX, posY);
        });
    }
    /**
     * This method builds the position strategy for the overlay, so the menu is properly connected
     * to the trigger.
     * @return {?} ConnectedPositionStrategy
     */
    _getPosition() {
        const [posX, fallbackX] = this.menu.positionX === 'before' ? ['end', 'start'] : ['start', 'end'];
        const [overlayY, fallbackOverlayY] = this.menu.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];
        let /** @type {?} */ originY = overlayY;
        let /** @type {?} */ fallbackOriginY = fallbackOverlayY;
        if (!this.menu.overlapTrigger) {
            originY = overlayY === 'top' ? 'bottom' : 'top';
            fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
        }
        return this._overlay.position()
            .connectedTo(this._element, { originX: posX, originY: originY }, { overlayX: posX, overlayY: overlayY })
            .withFallbackPosition({ originX: fallbackX, originY: originY }, { overlayX: fallbackX, overlayY: overlayY })
            .withFallbackPosition({ originX: posX, originY: fallbackOriginY }, { overlayX: posX, overlayY: fallbackOverlayY })
            .withFallbackPosition({ originX: fallbackX, originY: fallbackOriginY }, { overlayX: fallbackX, overlayY: fallbackOverlayY });
    }
    /**
     * @return {?}
     */
    _cleanUpSubscriptions() {
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleMousedown(event) {
        if (!isFakeMousedownFromScreenReader(event)) {
            this._openedByMouse = true;
        }
    }
}
MdMenuTrigger.decorators = [
    { type: Directive, args: [{
                selector: `[md-menu-trigger-for], [mat-menu-trigger-for],
             [mdMenuTriggerFor], [matMenuTriggerFor]`,
                host: {
                    'aria-haspopup': 'true',
                    '(mousedown)': '_handleMousedown($event)',
                    '(click)': 'toggleMenu()',
                },
                exportAs: 'mdMenuTrigger'
            },] },
];
/**
 * @nocollapse
 */
MdMenuTrigger.ctorParameters = () => [
    { type: Overlay, },
    { type: ElementRef, },
    { type: ViewContainerRef, },
    { type: Renderer, },
    { type: Dir, decorators: [{ type: Optional },] },
];
MdMenuTrigger.propDecorators = {
    '_deprecatedMdMenuTriggerFor': [{ type: Input, args: ['md-menu-trigger-for',] },],
    '_deprecatedMatMenuTriggerFor': [{ type: Input, args: ['mat-menu-trigger-for',] },],
    '_matMenuTriggerFor': [{ type: Input, args: ['matMenuTriggerFor',] },],
    'menu': [{ type: Input, args: ['mdMenuTriggerFor',] },],
    'onMenuOpen': [{ type: Output },],
    'onMenuClose': [{ type: Output },],
};
function MdMenuTrigger_tsickle_Closure_declarations() {
    /** @type {?} */
    MdMenuTrigger.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdMenuTrigger.ctorParameters;
    /** @type {?} */
    MdMenuTrigger.propDecorators;
    /** @type {?} */
    MdMenuTrigger.prototype._portal;
    /** @type {?} */
    MdMenuTrigger.prototype._overlayRef;
    /** @type {?} */
    MdMenuTrigger.prototype._menuOpen;
    /** @type {?} */
    MdMenuTrigger.prototype._backdropSubscription;
    /** @type {?} */
    MdMenuTrigger.prototype._positionSubscription;
    /** @type {?} */
    MdMenuTrigger.prototype._openedByMouse;
    /**
     * References the menu instance that the trigger is associated with.
     * @type {?}
     */
    MdMenuTrigger.prototype.menu;
    /**
     * Event emitted when the associated menu is opened.
     * @type {?}
     */
    MdMenuTrigger.prototype.onMenuOpen;
    /**
     * Event emitted when the associated menu is closed.
     * @type {?}
     */
    MdMenuTrigger.prototype.onMenuClose;
    /** @type {?} */
    MdMenuTrigger.prototype._overlay;
    /** @type {?} */
    MdMenuTrigger.prototype._element;
    /** @type {?} */
    MdMenuTrigger.prototype._viewContainerRef;
    /** @type {?} */
    MdMenuTrigger.prototype._renderer;
    /** @type {?} */
    MdMenuTrigger.prototype._dir;
}
//# sourceMappingURL=menu-trigger.js.map