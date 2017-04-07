import { Component, ViewChild, NgZone, Renderer, ElementRef, } from '@angular/core';
import { trigger, state, style, transition, animate, } from '@angular/animations';
import { BasePortalHost, PortalHostDirective, } from '../core';
import { MdSnackBarContentAlreadyAttached } from './snack-bar-errors';
import { Subject } from 'rxjs/Subject';
// TODO(jelbourn): we can't use constants from animation.ts here because you can't use
// a text interpolation in anything that is analyzed statically with ngc (for AoT compile).
export const /** @type {?} */ SHOW_ANIMATION = '225ms cubic-bezier(0.4,0.0,1,1)';
export const /** @type {?} */ HIDE_ANIMATION = '195ms cubic-bezier(0.0,0.0,0.2,1)';
/**
 * Internal component that wraps user-provided snack bar content.
 * \@docs-private
 */
export class MdSnackBarContainer extends BasePortalHost {
    /**
     * @param {?} _ngZone
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_ngZone, _renderer, _elementRef) {
        super();
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onExit = new Subject();
        this.onEnter = new Subject();
        /** The state of the snack bar animations. */
        this.animationState = 'initial';
    }
    /**
     * Attach a component portal as content to this snack bar container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    attachComponentPortal(portal) {
        if (this._portalHost.hasAttached()) {
            throw new MdSnackBarContentAlreadyAttached();
        }
        if (this.snackBarConfig.extraClasses) {
            // Not the most efficient way of adding classes, but the renderer doesn't allow us
            // to pass in an array or a space-separated list.
            for (let /** @type {?} */ cssClass of this.snackBarConfig.extraClasses) {
                this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, true);
            }
        }
        return this._portalHost.attachComponentPortal(portal);
    }
    /**
     * Attach a template portal as content to this snack bar container.
     * @param {?} portal
     * @return {?}
     */
    attachTemplatePortal(portal) {
        throw Error('Not yet implemented');
    }
    /**
     * Handle end of animations, updating the state of the snackbar.
     * @param {?} event
     * @return {?}
     */
    onAnimationEnd(event) {
        if (event.toState === 'void' || event.toState === 'complete') {
            this._completeExit();
        }
        if (event.toState === 'visible') {
            this._ngZone.run(() => {
                this.onEnter.next();
                this.onEnter.complete();
            });
        }
    }
    /**
     * Begin animation of snack bar entrance into view.
     * @return {?}
     */
    enter() {
        this.animationState = 'visible';
    }
    /**
     * Returns an observable resolving when the enter animation completes.
     * @return {?}
     */
    _onEnter() {
        this.animationState = 'visible';
        return this.onEnter.asObservable();
    }
    /**
     * Begin animation of the snack bar exiting from view.
     * @return {?}
     */
    exit() {
        this.animationState = 'complete';
        return this._onExit();
    }
    /**
     * Returns an observable that completes after the closing animation is done.
     * @return {?}
     */
    _onExit() {
        return this.onExit.asObservable();
    }
    /**
     * Makes sure the exit callbacks have been invoked when the element is destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        this._completeExit();
    }
    /**
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     * @return {?}
     */
    _completeExit() {
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => {
            this.onExit.next();
            this.onExit.complete();
        });
    }
}
MdSnackBarContainer.decorators = [
    { type: Component, args: [{selector: 'snack-bar-container',
                template: "<ng-template cdkPortalHost></ng-template> ",
                styles: [":host{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);background:#323232;border-radius:2px;box-sizing:content-box;display:block;height:20px;max-width:568px;min-width:288px;overflow:hidden;padding:14px 24px;transform:translateY(100%)}@media screen and (-ms-high-contrast:active){:host{border:solid 1px}} /*# sourceMappingURL=snack-bar-container.css.map */ "],
                host: {
                    'role': 'alert',
                    '[@state]': 'animationState',
                    '(@state.done)': 'onAnimationEnd($event)'
                },
                animations: [
                    trigger('state', [
                        state('initial', style({ transform: 'translateY(100%)' })),
                        state('visible', style({ transform: 'translateY(0%)' })),
                        state('complete', style({ transform: 'translateY(100%)' })),
                        transition('visible => complete', animate(HIDE_ANIMATION)),
                        transition('initial => visible, void => visible', animate(SHOW_ANIMATION)),
                    ])
                ],
            },] },
];
/**
 * @nocollapse
 */
MdSnackBarContainer.ctorParameters = () => [
    { type: NgZone, },
    { type: Renderer, },
    { type: ElementRef, },
];
MdSnackBarContainer.propDecorators = {
    '_portalHost': [{ type: ViewChild, args: [PortalHostDirective,] },],
};
function MdSnackBarContainer_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSnackBarContainer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSnackBarContainer.ctorParameters;
    /** @type {?} */
    MdSnackBarContainer.propDecorators;
    /**
     * The portal host inside of this container into which the snack bar content will be loaded.
     * @type {?}
     */
    MdSnackBarContainer.prototype._portalHost;
    /**
     * Subject for notifying that the snack bar has exited from view.
     * @type {?}
     */
    MdSnackBarContainer.prototype.onExit;
    /**
     * Subject for notifying that the snack bar has finished entering the view.
     * @type {?}
     */
    MdSnackBarContainer.prototype.onEnter;
    /**
     * The state of the snack bar animations.
     * @type {?}
     */
    MdSnackBarContainer.prototype.animationState;
    /**
     * The snack bar configuration.
     * @type {?}
     */
    MdSnackBarContainer.prototype.snackBarConfig;
    /** @type {?} */
    MdSnackBarContainer.prototype._ngZone;
    /** @type {?} */
    MdSnackBarContainer.prototype._renderer;
    /** @type {?} */
    MdSnackBarContainer.prototype._elementRef;
}
//# sourceMappingURL=snack-bar-container.js.map