import { ViewChild, Component, Input, Output, EventEmitter, ElementRef, Optional, ChangeDetectorRef, } from '@angular/core';
import { trigger, state, style, animate, transition, } from '@angular/animations';
import { PortalHostDirective, Dir } from '../core';
import 'rxjs/add/operator/map';
/**
 * Wrapper for the contents of a tab.
 * \@docs-private
 */
export class MdTabBody {
    /**
     * @param {?} _dir
     * @param {?} _elementRef
     * @param {?} _changeDetectorRef
     */
    constructor(_dir, _elementRef, _changeDetectorRef) {
        this._dir = _dir;
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        /** Event emitted when the tab begins to animate towards the center as the active tab. */
        this.onCentering = new EventEmitter();
        /** Event emitted when the tab completes its animation towards the center. */
        this.onCentered = new EventEmitter(true);
        /** Whether the element is allowed to be animated. */
        this._canBeAnimated = false;
    }
    /**
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        if (position < 0) {
            this._position = this._getLayoutDirection() == 'ltr' ? 'left' : 'right';
        }
        else if (position > 0) {
            this._position = this._getLayoutDirection() == 'ltr' ? 'right' : 'left';
        }
        else {
            this._position = 'center';
        }
    }
    /**
     * The origin position from which this tab should appear when it is centered into view.
     * @param {?} origin
     * @return {?}
     */
    set origin(origin) {
        if (origin == null) {
            return;
        }
        const /** @type {?} */ dir = this._getLayoutDirection();
        if ((dir == 'ltr' && origin <= 0) || (dir == 'rtl' && origin > 0)) {
            this._origin = 'left';
        }
        else {
            this._origin = 'right';
        }
    }
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     * @return {?}
     */
    ngOnInit() {
        if (this._position == 'center' && this._origin) {
            this._position = this._origin == 'left' ? 'left-origin-center' : 'right-origin-center';
        }
    }
    /**
     * After the view has been set, check if the tab content is set to the center and attach the
     * content if it is not already attached.
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this._isCenterPosition(this._position) && !this._portalHost.hasAttached()) {
            this._portalHost.attach(this._content);
        }
    }
    /**
     * After the content has been checked, determines whether the element should be allowed to
     * animate. This has to be limited, because under a specific set of circumstances (see #2151),
     * the animations can be triggered too early, which either crashes Chrome by putting it into an
     * infinite loop (with Angular < 2.3.0) or throws an error because the element doesn't have a
     * computed style (with Angular > 2.3.0). This can alternatively be determined by checking the
     * transform: canBeAnimated = getComputedStyle(element) !== '', however document.contains should
     * be faster since it doesn't cause a reflow.
     *
     * TODO: This can safely be removed after we stop supporting Angular < 2.4.2. The fix landed via
     * https://github.com/angular/angular/commit/21030e9a1cf30e8101399d8535ed72d847a23ba6
     * @return {?}
     */
    ngAfterContentChecked() {
        if (!this._canBeAnimated) {
            this._canBeAnimated = document.body.contains(this._elementRef.nativeElement);
            if (this._canBeAnimated) {
                this._changeDetectorRef.markForCheck();
            }
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _onTranslateTabStarted(e) {
        if (this._isCenterPosition(e.toState)) {
            this.onCentering.emit(this._elementRef.nativeElement.clientHeight);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _onTranslateTabComplete(e) {
        // If the end state is that the tab is not centered, then detach the content.
        if (!this._isCenterPosition(e.toState) && !this._isCenterPosition(this._position)) {
            this._portalHost.detach();
        }
        // If the transition to the center is complete, emit an event.
        if (this._isCenterPosition(e.toState) && this._isCenterPosition(this._position)) {
            this.onCentered.emit();
        }
    }
    /**
     * The text direction of the containing app.
     * @return {?}
     */
    _getLayoutDirection() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /**
     * Whether the provided position state is considered center, regardless of origin.
     * @param {?} position
     * @return {?}
     */
    _isCenterPosition(position) {
        return position == 'center' ||
            position == 'left-origin-center' ||
            position == 'right-origin-center';
    }
}
MdTabBody.decorators = [
    { type: Component, args: [{selector: 'md-tab-body, mat-tab-body',
                template: "<div class=\"mat-tab-body-content\" #content [@translateTab]=\"_canBeAnimated ? _position : null\" (@translateTab.start)=\"_onTranslateTabStarted($event)\" (@translateTab.done)=\"_onTranslateTabComplete($event)\"> <ng-template cdkPortalHost></ng-template> </div> ",
                styles: [".mat-tab-body-content{height:100%} /*# sourceMappingURL=tab-body.css.map */ "],
                host: {
                    '[class.mat-tab-body]': 'true',
                },
                animations: [
                    trigger('translateTab', [
                        state('left', style({ transform: 'translate3d(-100%, 0, 0)' })),
                        state('left-origin-center', style({ transform: 'translate3d(0, 0, 0)' })),
                        state('right-origin-center', style({ transform: 'translate3d(0, 0, 0)' })),
                        state('center', style({ transform: 'translate3d(0, 0, 0)' })),
                        state('right', style({ transform: 'translate3d(100%, 0, 0)' })),
                        transition('* => left, * => right, left => center, right => center', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
                        transition('void => left-origin-center', [
                            style({ transform: 'translate3d(-100%, 0, 0)' }),
                            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
                        ]),
                        transition('void => right-origin-center', [
                            style({ transform: 'translate3d(100%, 0, 0)' }),
                            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
                        ])
                    ])
                ]
            },] },
];
/**
 * @nocollapse
 */
MdTabBody.ctorParameters = () => [
    { type: Dir, decorators: [{ type: Optional },] },
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
];
MdTabBody.propDecorators = {
    '_portalHost': [{ type: ViewChild, args: [PortalHostDirective,] },],
    'onCentering': [{ type: Output },],
    'onCentered': [{ type: Output },],
    '_content': [{ type: Input, args: ['content',] },],
    'position': [{ type: Input, args: ['position',] },],
    'origin': [{ type: Input, args: ['origin',] },],
};
function MdTabBody_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTabBody.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTabBody.ctorParameters;
    /** @type {?} */
    MdTabBody.propDecorators;
    /**
     * The portal host inside of this container into which the tab body content will be loaded.
     * @type {?}
     */
    MdTabBody.prototype._portalHost;
    /**
     * Event emitted when the tab begins to animate towards the center as the active tab.
     * @type {?}
     */
    MdTabBody.prototype.onCentering;
    /**
     * Event emitted when the tab completes its animation towards the center.
     * @type {?}
     */
    MdTabBody.prototype.onCentered;
    /**
     * The tab body content to display.
     * @type {?}
     */
    MdTabBody.prototype._content;
    /**
     * The shifted index position of the tab body, where zero represents the active center tab.
     * @type {?}
     */
    MdTabBody.prototype._position;
    /**
     * Whether the element is allowed to be animated.
     * @type {?}
     */
    MdTabBody.prototype._canBeAnimated;
    /**
     * The origin position from which this tab should appear when it is centered into view.
     * @type {?}
     */
    MdTabBody.prototype._origin;
    /** @type {?} */
    MdTabBody.prototype._dir;
    /** @type {?} */
    MdTabBody.prototype._elementRef;
    /** @type {?} */
    MdTabBody.prototype._changeDetectorRef;
}
//# sourceMappingURL=tab-body.js.map