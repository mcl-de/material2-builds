import { Component, Directive, Input, ElementRef, ViewContainerRef, NgZone, Optional, Renderer, ChangeDetectorRef, } from '@angular/core';
import { Overlay, OverlayState, ComponentPortal, } from '../core';
import { MdTooltipInvalidPositionError } from './tooltip-errors';
import { Subject } from 'rxjs/Subject';
import { Dir } from '../core/rtl/dir';
import { Platform } from '../core/platform/index';
import 'rxjs/add/operator/first';
import { ScrollDispatcher } from '../core/overlay/scroll/scroll-dispatcher';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
/**
 * Time in ms to delay before changing the tooltip visibility to hidden
 */
export const TOUCHEND_HIDE_DELAY = 1500;
/**
 * Time in ms to throttle repositioning after scroll events.
 */
export const SCROLL_THROTTLE_MS = 20;
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.google.com/components/tooltips.html
 */
export class MdTooltip {
    /**
     * @param {?} _overlay
     * @param {?} _elementRef
     * @param {?} _scrollDispatcher
     * @param {?} _viewContainerRef
     * @param {?} _ngZone
     * @param {?} _renderer
     * @param {?} _platform
     * @param {?} _dir
     */
    constructor(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _renderer, _platform, _dir) {
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._platform = _platform;
        this._dir = _dir;
        this._position = 'below';
        this._disabled = false;
        /**
         * The default delay in ms before showing the tooltip after show is called
         */
        this.showDelay = 0;
        /**
         * The default delay in ms before hiding the tooltip after hide is called
         */
        this.hideDelay = 0;
        // The mouse events shouldn't be bound on iOS devices, because
        // they can prevent the first tap from firing its click event.
        if (!_platform.IOS) {
            _renderer.listen(_elementRef.nativeElement, 'mouseenter', () => this.show());
            _renderer.listen(_elementRef.nativeElement, 'mouseleave', () => this.hide());
        }
    }
    /**
     * Allows the user to define the position of the tooltip relative to the parent element
     * @return {?}
     */
    get position() { return this._position; }
    /**
     * @param {?} value
     * @return {?}
     */
    set position(value) {
        if (value !== this._position) {
            this._position = value;
            // TODO(andrewjs): When the overlay's position can be dynamically changed, do not destroy
            // the tooltip.
            if (this._tooltipInstance) {
                this._disposeTooltip();
            }
        }
    }
    /**
     * Disables the display of the tooltip.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // If tooltip is disabled, hide immediately.
        if (this._disabled) {
            this.hide(0);
        }
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _positionDeprecated() { return this._position; }
    /**
     * @param {?} value
     * @return {?}
     */
    set _positionDeprecated(value) { this._position = value; }
    /**
     * The message to be displayed in the tooltip
     * @return {?}
     */
    get message() { return this._message; }
    /**
     * @param {?} value
     * @return {?}
     */
    set message(value) {
        value = value.replace(/\r\n|\r|\n/g, '<br>');
        this._message = value;
        if (this._tooltipInstance) {
            this._setTooltipMessage(this._message);
        }
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedMessage() { return this.message; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _deprecatedMessage(v) { this.message = v; }
    /**
     * @return {?}
     */
    get _matMessage() { return this.message; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matMessage(v) { this.message = v; }
    /**
     * @return {?}
     */
    get _matPosition() { return this.position; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matPosition(v) { this.position = v; }
    /**
     * @return {?}
     */
    get _matDisabled() { return this.disabled; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matDisabled(v) { this.disabled = v; }
    /**
     * @return {?}
     */
    get _matHideDelay() { return this.hideDelay; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matHideDelay(v) { this.hideDelay = v; }
    /**
     * @return {?}
     */
    get _matShowDelay() { return this.showDelay; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _matShowDelay(v) { this.showDelay = v; }
    /**
     * @return {?}
     */
    ngOnInit() {
        // When a scroll on the page occurs, update the position in case this tooltip needs
        // to be repositioned.
        this.scrollSubscription = this._scrollDispatcher.scrolled(SCROLL_THROTTLE_MS, () => {
            if (this._overlayRef) {
                this._overlayRef.updatePosition();
            }
        });
    }
    /**
     * Dispose the tooltip when destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
    }
    /**
     * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    show(delay = this.showDelay) {
        if (this.disabled || !this._message || !this._message.trim()) {
            return;
        }
        if (!this._tooltipInstance) {
            this._createTooltip();
        }
        this._setTooltipMessage(this._message);
        this._tooltipInstance.show(this._position, delay);
    }
    /**
     * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input
     * @param {?=} delay
     * @return {?}
     */
    hide(delay = this.hideDelay) {
        if (this._tooltipInstance) {
            this._disposeTooltip();
        }
    }
    /**
     * Shows/hides the tooltip
     * @return {?}
     */
    toggle() {
        this._isTooltipVisible() ? this.hide() : this.show();
    }
    /**
     * Returns true if the tooltip is currently visible to the user
     * @return {?}
     */
    _isTooltipVisible() {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    }
    /**
     * Create the tooltip to display
     * @return {?}
     */
    _createTooltip() {
        this._createOverlay();
        let /** @type {?} */ portal = new ComponentPortal(TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = this._overlayRef.attach(portal).instance;
        // Dispose the overlay when finished the shown tooltip.
        this._tooltipInstance.afterHidden().subscribe(() => {
            // Check first if the tooltip has already been removed through this components destroy.
            if (this._tooltipInstance) {
                this._disposeTooltip();
            }
        });
    }
    /**
     * Create the overlay config and position strategy
     * @return {?}
     */
    _createOverlay() {
        let /** @type {?} */ origin = this._getOrigin();
        let /** @type {?} */ position = this._getOverlayPosition();
        // Create connected position strategy that listens for scroll events to reposition.
        // After position changes occur and the overlay is clipped by a parent scrollable then
        // close the tooltip.
        let /** @type {?} */ strategy = this._overlay.position().connectedTo(this._elementRef, origin, position);
        strategy.withScrollableContainers(this._scrollDispatcher.getScrollContainers(this._elementRef));
        strategy.onPositionChange.subscribe(change => {
            if (change.scrollableViewProperties.isOverlayClipped &&
                this._tooltipInstance && this._tooltipInstance.isVisible()) {
                this.hide(0);
            }
        });
        let /** @type {?} */ config = new OverlayState();
        config.positionStrategy = strategy;
        this._overlayRef = this._overlay.create(config);
    }
    /**
     * Disposes the current tooltip and the overlay it is attached to
     * @return {?}
     */
    _disposeTooltip() {
        this._overlayRef.dispose();
        this._overlayRef = null;
        this._tooltipInstance = null;
    }
    /**
     * Returns the origin position based on the user's position preference
     * @return {?}
     */
    _getOrigin() {
        if (this.position == 'above' || this.position == 'below') {
            return { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
        }
        const /** @type {?} */ isDirectionLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isDirectionLtr ||
            this.position == 'after' && !isDirectionLtr) {
            return { originX: 'start', originY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isDirectionLtr ||
            this.position == 'before' && !isDirectionLtr) {
            return { originX: 'end', originY: 'center' };
        }
        throw new MdTooltipInvalidPositionError(this.position);
    }
    /**
     * Returns the overlay position based on the user's preference
     * @return {?}
     */
    _getOverlayPosition() {
        if (this.position == 'above') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        if (this.position == 'below') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        const /** @type {?} */ isLtr = !this._dir || this._dir.value == 'ltr';
        if (this.position == 'left' ||
            this.position == 'before' && isLtr ||
            this.position == 'after' && !isLtr) {
            return { overlayX: 'end', overlayY: 'center' };
        }
        if (this.position == 'right' ||
            this.position == 'after' && isLtr ||
            this.position == 'before' && !isLtr) {
            return { overlayX: 'start', overlayY: 'center' };
        }
        throw new MdTooltipInvalidPositionError(this.position);
    }
    /**
     * Updates the tooltip message and repositions the overlay according to the new message length
     * @param {?} message
     * @return {?}
     */
    _setTooltipMessage(message) {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        this._tooltipInstance.message = message;
        this._tooltipInstance._markForCheck();
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => {
            if (this._tooltipInstance) {
                this._overlayRef.updatePosition();
            }
        });
    }
}
MdTooltip.decorators = [
    { type: Directive, args: [{
                selector: '[md-tooltip], [mdTooltip], [mat-tooltip], [matTooltip]',
                host: {
                    '(longpress)': 'show()',
                    '(touchend)': 'hide(' + TOUCHEND_HIDE_DELAY + ')',
                },
                exportAs: 'mdTooltip',
            },] },
];
/**
 * @nocollapse
 */
MdTooltip.ctorParameters = () => [
    { type: Overlay, },
    { type: ElementRef, },
    { type: ScrollDispatcher, },
    { type: ViewContainerRef, },
    { type: NgZone, },
    { type: Renderer, },
    { type: Platform, },
    { type: Dir, decorators: [{ type: Optional },] },
];
MdTooltip.propDecorators = {
    'position': [{ type: Input, args: ['mdTooltipPosition',] },],
    'disabled': [{ type: Input, args: ['mdTooltipDisabled',] },],
    '_positionDeprecated': [{ type: Input, args: ['tooltip-position',] },],
    'showDelay': [{ type: Input, args: ['mdTooltipShowDelay',] },],
    'hideDelay': [{ type: Input, args: ['mdTooltipHideDelay',] },],
    'message': [{ type: Input, args: ['mdTooltip',] },],
    '_deprecatedMessage': [{ type: Input, args: ['md-tooltip',] },],
    '_matMessage': [{ type: Input, args: ['matTooltip',] },],
    '_matPosition': [{ type: Input, args: ['matTooltipPosition',] },],
    '_matDisabled': [{ type: Input, args: ['matTooltipDisabled',] },],
    '_matHideDelay': [{ type: Input, args: ['matTooltipHideDelay',] },],
    '_matShowDelay': [{ type: Input, args: ['matTooltipShowDelay',] },],
};
function MdTooltip_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTooltip.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTooltip.ctorParameters;
    /** @type {?} */
    MdTooltip.propDecorators;
    /** @type {?} */
    MdTooltip.prototype._overlayRef;
    /** @type {?} */
    MdTooltip.prototype._tooltipInstance;
    /** @type {?} */
    MdTooltip.prototype.scrollSubscription;
    /** @type {?} */
    MdTooltip.prototype._position;
    /** @type {?} */
    MdTooltip.prototype._disabled;
    /**
     * The default delay in ms before showing the tooltip after show is called
     * @type {?}
     */
    MdTooltip.prototype.showDelay;
    /**
     * The default delay in ms before hiding the tooltip after hide is called
     * @type {?}
     */
    MdTooltip.prototype.hideDelay;
    /** @type {?} */
    MdTooltip.prototype._message;
    /** @type {?} */
    MdTooltip.prototype._overlay;
    /** @type {?} */
    MdTooltip.prototype._elementRef;
    /** @type {?} */
    MdTooltip.prototype._scrollDispatcher;
    /** @type {?} */
    MdTooltip.prototype._viewContainerRef;
    /** @type {?} */
    MdTooltip.prototype._ngZone;
    /** @type {?} */
    MdTooltip.prototype._renderer;
    /** @type {?} */
    MdTooltip.prototype._platform;
    /** @type {?} */
    MdTooltip.prototype._dir;
}
/**
 * Internal component that wraps the tooltip's content.
 * \@docs-private
 */
export class TooltipComponent {
    /**
     * @param {?} _dir
     * @param {?} _changeDetectorRef
     */
    constructor(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Property watched by the animation framework to show or hide the tooltip
         */
        this._visibility = 'initial';
        /**
         * Whether interactions on the page should close the tooltip
         */
        this._closeOnInteraction = false;
        /**
         * The transform origin used in the animation for showing and hiding the tooltip
         */
        this._transformOrigin = 'bottom';
        /**
         * Subject for notifying that the tooltip has been hidden from the view
         */
        this._onHide = new Subject();
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param {?} position Position of the tooltip.
     * @param {?} delay Amount of milliseconds to the delay showing the tooltip.
     * @return {?}
     */
    show(position, delay) {
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._setTransformOrigin(position);
        this._showTimeoutId = setTimeout(() => {
            this._visibility = 'visible';
            // If this was set to true immediately, then a body click that triggers show() would
            // trigger interaction and close the tooltip right after it was displayed.
            this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
            setTimeout(() => this._closeOnInteraction = true, 0);
        }, delay);
    }
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param {?} delay Amount of milliseconds to delay showing the tooltip.
     * @return {?}
     */
    hide(delay) {
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
        }
        this._hideTimeoutId = setTimeout(() => {
            this._visibility = 'hidden';
            this._closeOnInteraction = false;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
        }, delay);
    }
    /**
     * Returns an observable that notifies when the tooltip has been hidden from view
     * @return {?}
     */
    afterHidden() {
        return this._onHide.asObservable();
    }
    /**
     * Whether the tooltip is being displayed
     * @return {?}
     */
    isVisible() {
        return this._visibility === 'visible';
    }
    /**
     * Sets the tooltip transform origin according to the tooltip position
     * @param {?} value
     * @return {?}
     */
    _setTransformOrigin(value) {
        const /** @type {?} */ isLtr = !this._dir || this._dir.value == 'ltr';
        switch (value) {
            case 'before':
                this._transformOrigin = isLtr ? 'right' : 'left';
                break;
            case 'after':
                this._transformOrigin = isLtr ? 'left' : 'right';
                break;
            case 'left':
                this._transformOrigin = 'right';
                break;
            case 'right':
                this._transformOrigin = 'left';
                break;
            case 'above':
                this._transformOrigin = 'bottom';
                break;
            case 'below':
                this._transformOrigin = 'top';
                break;
            default: throw new MdTooltipInvalidPositionError(value);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _afterVisibilityAnimation(e) {
        if (e.toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
    }
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.google.com/components/tooltips.html#tooltips-interaction
     * @return {?}
     */
    _handleBodyInteraction() {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    }
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     * @return {?}
     */
    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
}
TooltipComponent.decorators = [
    { type: Component, args: [{selector: 'md-tooltip-component, mat-tooltip-component',
                template: "<div class=\"mat-tooltip\" [style.transform-origin]=\"_transformOrigin\" [innerHTML]=\"message\"> </div> ",
                styles: [":host{pointer-events:none}.mat-tooltip{color:#fff;padding:6px 8px;border-radius:2px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;margin:14px;max-width:250px}@media screen and (-ms-high-contrast:active){.mat-tooltip{outline:solid 1px}} /*# sourceMappingURL=tooltip.css.map */ "],
                host: {
                    '(body:click)': 'this._handleBodyInteraction()'
                }
            },] },
];
/**
 * @nocollapse
 */
TooltipComponent.ctorParameters = () => [
    { type: Dir, decorators: [{ type: Optional },] },
    { type: ChangeDetectorRef, },
];
function TooltipComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TooltipComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    TooltipComponent.ctorParameters;
    /**
     * Message to display in the tooltip
     * @type {?}
     */
    TooltipComponent.prototype.message;
    /**
     * The timeout ID of any current timer set to show the tooltip
     * @type {?}
     */
    TooltipComponent.prototype._showTimeoutId;
    /**
     * The timeout ID of any current timer set to hide the tooltip
     * @type {?}
     */
    TooltipComponent.prototype._hideTimeoutId;
    /**
     * Property watched by the animation framework to show or hide the tooltip
     * @type {?}
     */
    TooltipComponent.prototype._visibility;
    /**
     * Whether interactions on the page should close the tooltip
     * @type {?}
     */
    TooltipComponent.prototype._closeOnInteraction;
    /**
     * The transform origin used in the animation for showing and hiding the tooltip
     * @type {?}
     */
    TooltipComponent.prototype._transformOrigin;
    /**
     * Subject for notifying that the tooltip has been hidden from the view
     * @type {?}
     */
    TooltipComponent.prototype._onHide;
    /** @type {?} */
    TooltipComponent.prototype._dir;
    /** @type {?} */
    TooltipComponent.prototype._changeDetectorRef;
}
//# sourceMappingURL=tooltip.js.map