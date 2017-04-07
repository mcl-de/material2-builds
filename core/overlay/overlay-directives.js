import { NgModule, Directive, EventEmitter, TemplateRef, ViewContainerRef, Optional, Input, Output, ElementRef } from '@angular/core';
import { Overlay, OVERLAY_PROVIDERS } from './overlay';
import { TemplatePortal } from '../portal/portal';
import { OverlayState } from './overlay-state';
import { ConnectionPositionPair } from './position/connected-position';
import { PortalModule } from '../portal/portal-directives';
import { Dir } from '../rtl/dir';
import { Scrollable } from './scroll/scrollable';
import { coerceBooleanProperty } from '../coercion/boolean-property';
/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
let /** @type {?} */ defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
export class OverlayOrigin {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
OverlayOrigin.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-overlay-origin], [overlay-origin]',
                exportAs: 'cdkOverlayOrigin',
            },] },
];
/**
 * @nocollapse
 */
OverlayOrigin.ctorParameters = () => [
    { type: ElementRef, },
];
function OverlayOrigin_tsickle_Closure_declarations() {
    /** @type {?} */
    OverlayOrigin.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    OverlayOrigin.ctorParameters;
    /** @type {?} */
    OverlayOrigin.prototype.elementRef;
}
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
export class ConnectedOverlayDirective {
    /**
     * @param {?} _overlay
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} _dir
     */
    constructor(_overlay, templateRef, viewContainerRef, _dir) {
        this._overlay = _overlay;
        this._dir = _dir;
        this._open = false;
        this._hasBackdrop = false;
        this._offsetX = 0;
        this._offsetY = 0;
        /** Event emitted when the backdrop is clicked. */
        this.backdropClick = new EventEmitter();
        /** Event emitted when the position has changed. */
        this.positionChange = new EventEmitter();
        /** Event emitted when the overlay has been attached. */
        this.attach = new EventEmitter();
        /** Event emitted when the overlay has been detached. */
        this.detach = new EventEmitter();
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    /**
     * The offset in pixels for the overlay connection point on the x-axis
     * @return {?}
     */
    get offsetX() {
        return this._offsetX;
    }
    /**
     * @param {?} offsetX
     * @return {?}
     */
    set offsetX(offsetX) {
        this._offsetX = offsetX;
        if (this._position) {
            this._position.withOffsetX(offsetX);
        }
    }
    /**
     * The offset in pixels for the overlay connection point on the y-axis
     * @return {?}
     */
    get offsetY() {
        return this._offsetY;
    }
    /**
     * @param {?} offsetY
     * @return {?}
     */
    set offsetY(offsetY) {
        this._offsetY = offsetY;
        if (this._position) {
            this._position.withOffsetY(offsetY);
        }
    }
    /**
     * Whether or not the overlay should attach a backdrop.
     * @return {?}
     */
    get hasBackdrop() {
        return this._hasBackdrop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasBackdrop(value) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }
    /**
     * @return {?}
     */
    get open() {
        return this._open;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set open(value) {
        value ? this._attachOverlay() : this._detachOverlay();
        this._open = value;
    }
    /**
     * The associated overlay reference.
     * @return {?}
     */
    get overlayRef() {
        return this._overlayRef;
    }
    /**
     * The element's layout direction.
     * @return {?}
     */
    get dir() {
        return this._dir ? this._dir.value : 'ltr';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyOverlay();
    }
    /**
     * Creates an overlay
     * @return {?}
     */
    _createOverlay() {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    }
    /**
     * Builds the overlay config based on the directive's inputs
     * @return {?}
     */
    _buildConfig() {
        let /** @type {?} */ overlayConfig = new OverlayState();
        if (this.width || this.width === 0) {
            overlayConfig.width = this.width;
        }
        if (this.height || this.height === 0) {
            overlayConfig.height = this.height;
        }
        if (this.minWidth || this.minWidth === 0) {
            overlayConfig.minWidth = this.minWidth;
        }
        if (this.minHeight || this.minHeight === 0) {
            overlayConfig.minHeight = this.minHeight;
        }
        overlayConfig.hasBackdrop = this.hasBackdrop;
        if (this.backdropClass) {
            overlayConfig.backdropClass = this.backdropClass;
        }
        this._position = (this._createPositionStrategy());
        overlayConfig.positionStrategy = this._position;
        return overlayConfig;
    }
    /**
     * Returns the position strategy of the overlay to be set on the overlay config
     * @return {?}
     */
    _createPositionStrategy() {
        const /** @type {?} */ pos = this.positions[0];
        const /** @type {?} */ originPoint = { originX: pos.originX, originY: pos.originY };
        const /** @type {?} */ overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        const /** @type {?} */ strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withOffsetX(this.offsetX)
            .withOffsetY(this.offsetY);
        this._handlePositionChanges(strategy);
        return strategy;
    }
    /**
     * @param {?} strategy
     * @return {?}
     */
    _handlePositionChanges(strategy) {
        for (let /** @type {?} */ i = 1; i < this.positions.length; i++) {
            strategy.withFallbackPosition({ originX: this.positions[i].originX, originY: this.positions[i].originY }, { overlayX: this.positions[i].overlayX, overlayY: this.positions[i].overlayY });
        }
        this._positionSubscription =
            strategy.onPositionChange.subscribe(pos => this.positionChange.emit(pos));
    }
    /**
     * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    _attachOverlay() {
        if (!this._overlayRef) {
            this._createOverlay();
        }
        this._position.withDirection(this.dir);
        this._overlayRef.getState().direction = this.dir;
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._templatePortal);
            this.attach.emit();
        }
        if (this.hasBackdrop) {
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
                this.backdropClick.emit();
            });
        }
    }
    /**
     * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    _detachOverlay() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
            this._backdropSubscription = null;
        }
    }
    /**
     * Destroys the overlay created by this directive.
     * @return {?}
     */
    _destroyOverlay() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        if (this._backdropSubscription) {
            this._backdropSubscription.unsubscribe();
        }
        if (this._positionSubscription) {
            this._positionSubscription.unsubscribe();
        }
    }
}
ConnectedOverlayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-connected-overlay], [connected-overlay]',
                exportAs: 'cdkConnectedOverlay'
            },] },
];
/**
 * @nocollapse
 */
ConnectedOverlayDirective.ctorParameters = () => [
    { type: Overlay, },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: Dir, decorators: [{ type: Optional },] },
];
ConnectedOverlayDirective.propDecorators = {
    'origin': [{ type: Input },],
    'positions': [{ type: Input },],
    'offsetX': [{ type: Input },],
    'offsetY': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'minWidth': [{ type: Input },],
    'minHeight': [{ type: Input },],
    'backdropClass': [{ type: Input },],
    'hasBackdrop': [{ type: Input },],
    'open': [{ type: Input },],
    'backdropClick': [{ type: Output },],
    'positionChange': [{ type: Output },],
    'attach': [{ type: Output },],
    'detach': [{ type: Output },],
};
function ConnectedOverlayDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ConnectedOverlayDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ConnectedOverlayDirective.ctorParameters;
    /** @type {?} */
    ConnectedOverlayDirective.propDecorators;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._overlayRef;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._templatePortal;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._open;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._hasBackdrop;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._backdropSubscription;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._positionSubscription;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._offsetX;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._offsetY;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._position;
    /**
     * Origin for the connected overlay.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.origin;
    /**
     * Registered connected position pairs.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.positions;
    /**
     * The width of the overlay panel.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.width;
    /**
     * The height of the overlay panel.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.height;
    /**
     * The min width of the overlay panel.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.minWidth;
    /**
     * The min height of the overlay panel.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.minHeight;
    /**
     * The custom class to be set on the backdrop element.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.backdropClass;
    /**
     * Event emitted when the backdrop is clicked.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.backdropClick;
    /**
     * Event emitted when the position has changed.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.positionChange;
    /**
     * Event emitted when the overlay has been attached.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.attach;
    /**
     * Event emitted when the overlay has been detached.
     * @type {?}
     */
    ConnectedOverlayDirective.prototype.detach;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._overlay;
    /** @type {?} */
    ConnectedOverlayDirective.prototype._dir;
}
export class OverlayModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: OverlayModule,
            providers: [],
        };
    }
}
OverlayModule.decorators = [
    { type: NgModule, args: [{
                imports: [PortalModule],
                exports: [ConnectedOverlayDirective, OverlayOrigin, Scrollable],
                declarations: [ConnectedOverlayDirective, OverlayOrigin, Scrollable],
                providers: [OVERLAY_PROVIDERS],
            },] },
];
/**
 * @nocollapse
 */
OverlayModule.ctorParameters = () => [];
function OverlayModule_tsickle_Closure_declarations() {
    /** @type {?} */
    OverlayModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    OverlayModule.ctorParameters;
}
//# sourceMappingURL=overlay-directives.js.map