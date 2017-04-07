import { Directive, ElementRef, Input, Inject, NgZone, OpaqueToken, Optional, } from '@angular/core';
import { RippleRenderer } from './ripple-renderer';
import { ViewportRuler } from '../overlay/position/viewport-ruler';
/** OpaqueToken that can be used to specify the global ripple options. */
export const /** @type {?} */ MD_RIPPLE_GLOBAL_OPTIONS = new OpaqueToken('md-ripple-global-options');
export class MdRipple {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} ruler
     * @param {?} globalOptions
     */
    constructor(elementRef, ngZone, ruler, 
        // Type needs to be `any` because of https://github.com/angular/angular/issues/12631
        globalOptions) {
        /**
         * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
         * will be the distance from the center of the ripple to the furthest corner of the host element's
         * bounding rectangle.
         */
        this.radius = 0;
        /**
         * If set, the normal duration of ripple animations is divided by this value. For example,
         * setting it to 0.5 will cause the animations to take twice as long.
         * A changed speedFactor will not modify the fade-out duration of the ripples.
         */
        this.speedFactor = 1;
        this._rippleRenderer = new RippleRenderer(elementRef, ngZone, ruler);
        this._globalOptions = globalOptions ? globalOptions : {};
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['trigger'] && this.trigger) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        this._rippleRenderer.rippleDisabled = this._globalOptions.disabled || this.disabled;
        this._rippleRenderer.rippleConfig = this.rippleConfig;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // Set the trigger element to null to cleanup all listeners.
        this._rippleRenderer.setTriggerElement(null);
    }
    /**
     * Launches a manual ripple at the specified position.
     * @param {?} pageX
     * @param {?} pageY
     * @param {?=} config
     * @return {?}
     */
    launch(pageX, pageY, config = this.rippleConfig) {
        return this._rippleRenderer.fadeInRipple(pageX, pageY, config);
    }
    /**
     * Fades out all currently showing ripple elements.
     * @return {?}
     */
    fadeOutAll() {
        this._rippleRenderer.fadeOutAll();
    }
    /**
     * Ripple configuration from the directive's input values.
     * @return {?}
     */
    get rippleConfig() {
        return {
            centered: this.centered,
            speedFactor: this.speedFactor * (this._globalOptions.baseSpeedFactor || 1),
            radius: this.radius,
            color: this.color
        };
    }
}
MdRipple.decorators = [
    { type: Directive, args: [{
                selector: '[md-ripple], [mat-ripple], [mdRipple], [matRipple]',
                exportAs: 'mdRipple',
                host: {
                    '[class.mat-ripple]': 'true',
                    '[class.mat-ripple-unbounded]': 'unbounded'
                }
            },] },
];
/**
 * @nocollapse
 */
MdRipple.ctorParameters = () => [
    { type: ElementRef, },
    { type: NgZone, },
    { type: ViewportRuler, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_RIPPLE_GLOBAL_OPTIONS,] },] },
];
MdRipple.propDecorators = {
    'trigger': [{ type: Input, args: ['mdRippleTrigger',] },],
    'centered': [{ type: Input, args: ['mdRippleCentered',] },],
    'disabled': [{ type: Input, args: ['mdRippleDisabled',] },],
    'radius': [{ type: Input, args: ['mdRippleRadius',] },],
    'speedFactor': [{ type: Input, args: ['mdRippleSpeedFactor',] },],
    'color': [{ type: Input, args: ['mdRippleColor',] },],
    'unbounded': [{ type: Input, args: ['mdRippleUnbounded',] },],
};
function MdRipple_tsickle_Closure_declarations() {
    /** @type {?} */
    MdRipple.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdRipple.ctorParameters;
    /** @type {?} */
    MdRipple.propDecorators;
    /** @type {?} */
    MdRipple.prototype.trigger;
    /**
     * Whether the ripple always originates from the center of the host element's bounds, rather
     * than originating from the location of the click event.
     * @type {?}
     */
    MdRipple.prototype.centered;
    /**
     * Whether click events will not trigger the ripple. It can still be triggered by manually
     * calling createRipple()
     * @type {?}
     */
    MdRipple.prototype.disabled;
    /**
     * If set, the radius in pixels of foreground ripples when fully expanded. If unset, the radius
     * will be the distance from the center of the ripple to the furthest corner of the host element's
     * bounding rectangle.
     * @type {?}
     */
    MdRipple.prototype.radius;
    /**
     * If set, the normal duration of ripple animations is divided by this value. For example,
     * setting it to 0.5 will cause the animations to take twice as long.
     * A changed speedFactor will not modify the fade-out duration of the ripples.
     * @type {?}
     */
    MdRipple.prototype.speedFactor;
    /**
     * Custom color for ripples.
     * @type {?}
     */
    MdRipple.prototype.color;
    /**
     * Whether foreground ripples should be visible outside the component's bounds.
     * @type {?}
     */
    MdRipple.prototype.unbounded;
    /**
     * Renderer for the ripple DOM manipulations.
     * @type {?}
     */
    MdRipple.prototype._rippleRenderer;
    /**
     * Options that are set globally for all ripples.
     * @type {?}
     */
    MdRipple.prototype._globalOptions;
}
//# sourceMappingURL=ripple.js.map