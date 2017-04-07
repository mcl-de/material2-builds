import { Component, ContentChildren, ElementRef, Input, Optional, Output, ChangeDetectionStrategy, EventEmitter, Renderer, ViewEncapsulation, NgZone, } from '@angular/core';
import { Dir, MdError, coerceBooleanProperty } from '../core';
import { FocusTrapFactory } from '../core/a11y/focus-trap';
import { ESCAPE } from '../core/keyboard/keycodes';
import 'rxjs/add/operator/first';
/**
 * Exception thrown when two MdSidenav are matching the same side.
 */
export class MdDuplicatedSidenavError extends MdError {
    /**
     * @param {?} align
     */
    constructor(align) {
        super(`A sidenav was already declared for 'align="${align}"'`);
    }
}
/**
 * Sidenav toggle promise result.
 */
export class MdSidenavToggleResult {
    /**
     * @param {?} type
     * @param {?} animationFinished
     */
    constructor(type, animationFinished) {
        this.type = type;
        this.animationFinished = animationFinished;
    }
}
function MdSidenavToggleResult_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSidenavToggleResult.prototype.type;
    /** @type {?} */
    MdSidenavToggleResult.prototype.animationFinished;
}
/**
 * <md-sidenav> component.
 *
 * This component corresponds to the drawer of the sidenav.
 *
 * Please refer to README.md for examples on how to use it.
 */
export class MdSidenav {
    /**
     * @param {?} _elementRef The DOM element reference. Used for transition and width calculation.
     *     If not available we do not hook on transitions.
     * @param {?} _renderer
     * @param {?} _focusTrapFactory
     */
    constructor(_elementRef, _renderer, _focusTrapFactory) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._focusTrapFactory = _focusTrapFactory;
        this._align = 'start';
        /** Mode of the sidenav; whether 'over' or 'side'. */
        this.mode = 'over';
        this._disableClose = false;
        /** Whether the sidenav is opened. */
        this._opened = false;
        /** Event emitted when the sidenav is being opened. Use this to synchronize animations. */
        this.onOpenStart = new EventEmitter();
        /** Event emitted when the sidenav is fully opened. */
        this.onOpen = new EventEmitter();
        /** Event emitted when the sidenav is being closed. Use this to synchronize animations. */
        this.onCloseStart = new EventEmitter();
        /** Event emitted when the sidenav is fully closed. */
        this.onClose = new EventEmitter();
        /** Event emitted when the sidenav alignment changes. */
        this.onAlignChanged = new EventEmitter();
        this._toggleAnimationPromise = null;
        this._resolveToggleAnimationPromise = null;
        this._elementFocusedBeforeSidenavWasOpened = null;
        this.onOpen.subscribe(() => {
            this._elementFocusedBeforeSidenavWasOpened = document.activeElement;
            if (this.isFocusTrapEnabled && this._focusTrap) {
                this._focusTrap.focusFirstTabbableElementWhenReady();
            }
        });
        this.onClose.subscribe(() => {
            if (this._elementFocusedBeforeSidenavWasOpened instanceof HTMLElement) {
                this._renderer.invokeElementMethod(this._elementFocusedBeforeSidenavWasOpened, 'focus');
            }
            else {
                this._renderer.invokeElementMethod(this._elementRef.nativeElement, 'blur');
            }
            this._elementFocusedBeforeSidenavWasOpened = null;
        });
    }
    /**
     * Direction which the sidenav is aligned in.
     * @return {?}
     */
    get align() { return this._align; }
    /**
     * @param {?} value
     * @return {?}
     */
    set align(value) {
        // Make sure we have a valid value.
        value = (value == 'end') ? 'end' : 'start';
        if (value != this._align) {
            this._align = value;
            this.onAlignChanged.emit();
        }
    }
    /**
     * Whether the sidenav can be closed with the escape key or not.
     * @return {?}
     */
    get disableClose() { return this._disableClose; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disableClose(value) { this._disableClose = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get isFocusTrapEnabled() {
        // The focus trap is only enabled when the sidenav is open in any mode other than side.
        return this.opened && this.mode !== 'side';
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        this._focusTrap.enabled = this.isFocusTrapEnabled;
        // This can happen when the sidenav is set to opened in
        // the template and the transition hasn't ended.
        if (this._toggleAnimationPromise) {
            this._resolveToggleAnimationPromise(true);
            this._toggleAnimationPromise = this._resolveToggleAnimationPromise = null;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    }
    /**
     * Whether the sidenav is opened. We overload this because we trigger an event when it
     * starts or end.
     * @return {?}
     */
    get opened() { return this._opened; }
    /**
     * @param {?} v
     * @return {?}
     */
    set opened(v) {
        this.toggle(coerceBooleanProperty(v));
    }
    /**
     * Open this sidenav, and return a Promise that will resolve when it's fully opened (or get
     * rejected if it didn't).
     * @return {?}
     */
    open() {
        return this.toggle(true);
    }
    /**
     * Close this sidenav, and return a Promise that will resolve when it's fully closed (or get
     * rejected if it didn't).
     * @return {?}
     */
    close() {
        return this.toggle(false);
    }
    /**
     * Toggle this sidenav. This is equivalent to calling open() when it's already opened, or
     * close() when it's closed.
     * @param {?=} isOpen Whether the sidenav should be open.
     * @return {?} Resolves with the result of whether the sidenav was opened or closed.
     */
    toggle(isOpen = !this.opened) {
        // Shortcut it if we're already opened.
        if (isOpen === this.opened) {
            return this._toggleAnimationPromise ||
                Promise.resolve(new MdSidenavToggleResult(isOpen ? 'open' : 'close', true));
        }
        this._opened = isOpen;
        if (this._focusTrap) {
            this._focusTrap.enabled = this.isFocusTrapEnabled;
        }
        if (isOpen) {
            this.onOpenStart.emit();
        }
        else {
            this.onCloseStart.emit();
        }
        if (this._toggleAnimationPromise) {
            this._resolveToggleAnimationPromise(false);
        }
        this._toggleAnimationPromise = new Promise(resolve => {
            this._resolveToggleAnimationPromise = animationFinished => resolve(new MdSidenavToggleResult(isOpen ? 'open' : 'close', animationFinished));
        });
        return this._toggleAnimationPromise;
    }
    /**
     * Handles the keyboard events.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    handleKeydown(event) {
        if (event.keyCode === ESCAPE && !this.disableClose) {
            this.close();
            event.stopPropagation();
        }
    }
    /**
     * When transition has finished, set the internal state for classes and emit the proper event.
     * The event passed is actually of type TransitionEvent, but that type is not available in
     * Android so we use any.
     * @param {?} transitionEvent
     * @return {?}
     */
    _onTransitionEnd(transitionEvent) {
        if (transitionEvent.target == this._elementRef.nativeElement
            && transitionEvent.propertyName.endsWith('transform')) {
            if (this._opened) {
                this.onOpen.emit();
            }
            else {
                this.onClose.emit();
            }
            if (this._toggleAnimationPromise) {
                this._resolveToggleAnimationPromise(true);
                this._toggleAnimationPromise = this._resolveToggleAnimationPromise = null;
            }
        }
    }
    /**
     * @return {?}
     */
    get _isClosing() {
        return !this._opened && !!this._toggleAnimationPromise;
    }
    /**
     * @return {?}
     */
    get _isOpening() {
        return this._opened && !!this._toggleAnimationPromise;
    }
    /**
     * @return {?}
     */
    get _isClosed() {
        return !this._opened && !this._toggleAnimationPromise;
    }
    /**
     * @return {?}
     */
    get _isOpened() {
        return this._opened && !this._toggleAnimationPromise;
    }
    /**
     * @return {?}
     */
    get _isEnd() {
        return this.align == 'end';
    }
    /**
     * @return {?}
     */
    get _modeSide() {
        return this.mode == 'side';
    }
    /**
     * @return {?}
     */
    get _modeOver() {
        return this.mode == 'over';
    }
    /**
     * @return {?}
     */
    get _modePush() {
        return this.mode == 'push';
    }
    /**
     * @return {?}
     */
    get _width() {
        if (this._elementRef.nativeElement) {
            return this._elementRef.nativeElement.offsetWidth;
        }
        return 0;
    }
}
MdSidenav.decorators = [
    { type: Component, args: [{selector: 'md-sidenav, mat-sidenav',
                // TODO(mmalerba): move template to separate file.
                template: "<ng-content></ng-content> ",
                host: {
                    '[class.mat-sidenav]': 'true',
                    '(transitionend)': '_onTransitionEnd($event)',
                    '(keydown)': 'handleKeydown($event)',
                    // must prevent the browser from aligning text based on value
                    '[attr.align]': 'null',
                    '[class.mat-sidenav-closed]': '_isClosed',
                    '[class.mat-sidenav-closing]': '_isClosing',
                    '[class.mat-sidenav-end]': '_isEnd',
                    '[class.mat-sidenav-opened]': '_isOpened',
                    '[class.mat-sidenav-opening]': '_isOpening',
                    '[class.mat-sidenav-over]': '_modeOver',
                    '[class.mat-sidenav-push]': '_modePush',
                    '[class.mat-sidenav-side]': '_modeSide',
                    'tabIndex': '-1'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
MdSidenav.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
    { type: FocusTrapFactory, },
];
MdSidenav.propDecorators = {
    'align': [{ type: Input },],
    'mode': [{ type: Input },],
    'disableClose': [{ type: Input },],
    'onOpenStart': [{ type: Output, args: ['open-start',] },],
    'onOpen': [{ type: Output, args: ['open',] },],
    'onCloseStart': [{ type: Output, args: ['close-start',] },],
    'onClose': [{ type: Output, args: ['close',] },],
    'onAlignChanged': [{ type: Output, args: ['align-changed',] },],
    'opened': [{ type: Input },],
};
function MdSidenav_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSidenav.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSidenav.ctorParameters;
    /** @type {?} */
    MdSidenav.propDecorators;
    /** @type {?} */
    MdSidenav.prototype._focusTrap;
    /**
     * Alignment of the sidenav (direction neutral); whether 'start' or 'end'.
     * @type {?}
     */
    MdSidenav.prototype._align;
    /**
     * Mode of the sidenav; whether 'over' or 'side'.
     * @type {?}
     */
    MdSidenav.prototype.mode;
    /** @type {?} */
    MdSidenav.prototype._disableClose;
    /**
     * Whether the sidenav is opened.
     * @type {?}
     */
    MdSidenav.prototype._opened;
    /**
     * Event emitted when the sidenav is being opened. Use this to synchronize animations.
     * @type {?}
     */
    MdSidenav.prototype.onOpenStart;
    /**
     * Event emitted when the sidenav is fully opened.
     * @type {?}
     */
    MdSidenav.prototype.onOpen;
    /**
     * Event emitted when the sidenav is being closed. Use this to synchronize animations.
     * @type {?}
     */
    MdSidenav.prototype.onCloseStart;
    /**
     * Event emitted when the sidenav is fully closed.
     * @type {?}
     */
    MdSidenav.prototype.onClose;
    /**
     * Event emitted when the sidenav alignment changes.
     * @type {?}
     */
    MdSidenav.prototype.onAlignChanged;
    /**
     * The current toggle animation promise. `null` if no animation is in progress.
     * @type {?}
     */
    MdSidenav.prototype._toggleAnimationPromise;
    /**
     * The current toggle animation promise resolution function.
     * `null` if no animation is in progress.
     * @type {?}
     */
    MdSidenav.prototype._resolveToggleAnimationPromise;
    /** @type {?} */
    MdSidenav.prototype._elementFocusedBeforeSidenavWasOpened;
    /** @type {?} */
    MdSidenav.prototype._elementRef;
    /** @type {?} */
    MdSidenav.prototype._renderer;
    /** @type {?} */
    MdSidenav.prototype._focusTrapFactory;
}
/**
 * <md-sidenav-container> component.
 *
 * This is the parent component to one or two <md-sidenav>s that validates the state internally
 * and coordinates the backdrop and content styling.
 */
export class MdSidenavContainer {
    /**
     * @param {?} _dir
     * @param {?} _element
     * @param {?} _renderer
     * @param {?} _ngZone
     */
    constructor(_dir, _element, _renderer, _ngZone) {
        this._dir = _dir;
        this._element = _element;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        /** Event emitted when the sidenav backdrop is clicked. */
        this.backdropClick = new EventEmitter();
        /** Whether to enable open/close trantions. */
        this._enableTransitions = false;
        // If a `Dir` directive exists up the tree, listen direction changes and update the left/right
        // properties to point to the proper start/end.
        if (_dir != null) {
            _dir.dirChange.subscribe(() => this._validateDrawers());
        }
    }
    /**
     * The sidenav child with the `start` alignment.
     * @return {?}
     */
    get start() { return this._start; }
    /**
     * The sidenav child with the `end` alignment.
     * @return {?}
     */
    get end() { return this._end; }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // On changes, assert on consistency.
        this._sidenavs.changes.subscribe(() => this._validateDrawers());
        this._sidenavs.forEach((sidenav) => {
            this._watchSidenavToggle(sidenav);
            this._watchSidenavAlign(sidenav);
        });
        this._validateDrawers();
        // Give the view a chance to render the initial state, then enable transitions.
        this._ngZone.onMicrotaskEmpty.first().subscribe(() => this._enableTransitions = true);
    }
    /**
     * Subscribes to sidenav events in order to set a class on the main container element when the
     * sidenav is open and the backdrop is visible. This ensures any overflow on the container element
     * is properly hidden.
     * @param {?} sidenav
     * @return {?}
     */
    _watchSidenavToggle(sidenav) {
        if (!sidenav || sidenav.mode === 'side') {
            return;
        }
        sidenav.onOpen.subscribe(() => this._setContainerClass(sidenav, true));
        sidenav.onClose.subscribe(() => this._setContainerClass(sidenav, false));
    }
    /**
     * Subscribes to sidenav onAlignChanged event in order to re-validate drawers when the align
     * changes.
     * @param {?} sidenav
     * @return {?}
     */
    _watchSidenavAlign(sidenav) {
        if (!sidenav) {
            return;
        }
        // NOTE: We need to wait for the microtask queue to be empty before validating,
        // since both drawers may be swapping sides at the same time.
        sidenav.onAlignChanged.subscribe(() => this._ngZone.onMicrotaskEmpty.first().subscribe(() => this._validateDrawers()));
    }
    /**
     * Toggles the 'mat-sidenav-opened' class on the main 'md-sidenav-container' element.
     * @param {?} sidenav
     * @param {?} bool
     * @return {?}
     */
    _setContainerClass(sidenav, bool) {
        this._renderer.setElementClass(this._element.nativeElement, 'mat-sidenav-opened', bool);
    }
    /**
     * Validate the state of the sidenav children components.
     * @return {?}
     */
    _validateDrawers() {
        this._start = this._end = null;
        // Ensure that we have at most one start and one end sidenav.
        // NOTE: We must call toArray on _sidenavs even though it's iterable
        // (see https://github.com/Microsoft/TypeScript/issues/3164).
        for (let /** @type {?} */ sidenav of this._sidenavs.toArray()) {
            if (sidenav.align == 'end') {
                if (this._end != null) {
                    throw new MdDuplicatedSidenavError('end');
                }
                this._end = sidenav;
            }
            else {
                if (this._start != null) {
                    throw new MdDuplicatedSidenavError('start');
                }
                this._start = sidenav;
            }
        }
        this._right = this._left = null;
        // Detect if we're LTR or RTL.
        if (this._dir == null || this._dir.value == 'ltr') {
            this._left = this._start;
            this._right = this._end;
        }
        else {
            this._left = this._end;
            this._right = this._start;
        }
    }
    /**
     * @return {?}
     */
    _onBackdropClicked() {
        this.backdropClick.emit();
        this._closeModalSidenav();
    }
    /**
     * @return {?}
     */
    _closeModalSidenav() {
        // Close all open sidenav's where closing is not disabled and the mode is not `side`.
        [this._start, this._end]
            .filter(sidenav => sidenav && !sidenav.disableClose && sidenav.mode !== 'side')
            .forEach(sidenav => sidenav.close());
    }
    /**
     * @return {?}
     */
    _isShowingBackdrop() {
        return (this._isSidenavOpen(this._start) && this._start.mode != 'side')
            || (this._isSidenavOpen(this._end) && this._end.mode != 'side');
    }
    /**
     * @param {?} side
     * @return {?}
     */
    _isSidenavOpen(side) {
        return side != null && side.opened;
    }
    /**
     * Return the width of the sidenav, if it's in the proper mode and opened.
     * This may relayout the view, so do not call this often.
     * @param {?} sidenav
     * @param {?} mode
     * @return {?}
     */
    _getSidenavEffectiveWidth(sidenav, mode) {
        return (this._isSidenavOpen(sidenav) && sidenav.mode == mode) ? sidenav._width : 0;
    }
    /**
     * @return {?}
     */
    _getMarginLeft() {
        return this._getSidenavEffectiveWidth(this._left, 'side');
    }
    /**
     * @return {?}
     */
    _getMarginRight() {
        return this._getSidenavEffectiveWidth(this._right, 'side');
    }
    /**
     * @return {?}
     */
    _getPositionLeft() {
        return this._getSidenavEffectiveWidth(this._left, 'push');
    }
    /**
     * @return {?}
     */
    _getPositionRight() {
        return this._getSidenavEffectiveWidth(this._right, 'push');
    }
    /**
     * Returns the horizontal offset for the content area.  There should never be a value for both
     * left and right, so by subtracting the right value from the left value, we should always get
     * the appropriate offset.
     * @return {?}
     */
    _getPositionOffset() {
        return this._getPositionLeft() - this._getPositionRight();
    }
    /**
     * This is using [ngStyle] rather than separate [style...] properties because [style.transform]
     * doesn't seem to work right now.
     * @return {?}
     */
    _getStyles() {
        return {
            marginLeft: `${this._getMarginLeft()}px`,
            marginRight: `${this._getMarginRight()}px`,
            transform: `translate3d(${this._getPositionOffset()}px, 0, 0)`
        };
    }
}
MdSidenavContainer.decorators = [
    { type: Component, args: [{selector: 'md-sidenav-container, mat-sidenav-container',
                // Do not use ChangeDetectionStrategy.OnPush. It does not work for this component because
                // technically it is a sibling of MdSidenav (on the content tree) and isn't updated when MdSidenav
                // changes its state.
                template: "<div class=\"mat-sidenav-backdrop\" (click)=\"_onBackdropClicked()\" [class.mat-sidenav-shown]=\"_isShowingBackdrop()\"></div> <ng-content select=\"md-sidenav, mat-sidenav\"></ng-content> <div class=\"mat-sidenav-content\" [ngStyle]=\"_getStyles()\" cdk-scrollable> <ng-content></ng-content> </div> ",
                styles: [".mat-sidenav-container{position:relative;transform:translate3d(0,0,0);box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-sidenav-container[fullscreen]{position:absolute;top:0;left:0;right:0;bottom:0}.mat-sidenav-container[fullscreen].mat-sidenav-opened{overflow:hidden}.mat-sidenav-backdrop{position:absolute;top:0;left:0;right:0;bottom:0;display:block;z-index:2;visibility:hidden}.mat-sidenav-backdrop.mat-sidenav-shown{visibility:visible}@media screen and (-ms-high-contrast:active){.mat-sidenav-backdrop{opacity:.5}}.mat-sidenav-content{position:relative;transform:translate3d(0,0,0);display:block;height:100%;overflow:auto}.mat-sidenav{position:relative;transform:translate3d(0,0,0);display:block;position:absolute;top:0;bottom:0;z-index:3;min-width:5vw;outline:0;box-sizing:border-box;height:100%;overflow-y:auto;transform:translate3d(-100%,0,0)}.mat-sidenav.mat-sidenav-closed{visibility:hidden}.mat-sidenav.mat-sidenav-opened,.mat-sidenav.mat-sidenav-opening{transform:translate3d(0,0,0)}.mat-sidenav.mat-sidenav-side{z-index:1}.mat-sidenav.mat-sidenav-end{right:0;transform:translate3d(100%,0,0)}.mat-sidenav.mat-sidenav-end.mat-sidenav-closed{visibility:hidden}.mat-sidenav.mat-sidenav-end.mat-sidenav-opened,.mat-sidenav.mat-sidenav-end.mat-sidenav-opening{transform:translate3d(0,0,0)}[dir=rtl] .mat-sidenav{transform:translate3d(100%,0,0)}[dir=rtl] .mat-sidenav.mat-sidenav-closed{visibility:hidden}[dir=rtl] .mat-sidenav.mat-sidenav-opened,[dir=rtl] .mat-sidenav.mat-sidenav-opening{transform:translate3d(0,0,0)}[dir=rtl] .mat-sidenav.mat-sidenav-end{left:0;right:auto;transform:translate3d(-100%,0,0)}[dir=rtl] .mat-sidenav.mat-sidenav-end.mat-sidenav-closed{visibility:hidden}[dir=rtl] .mat-sidenav.mat-sidenav-end.mat-sidenav-opened,[dir=rtl] .mat-sidenav.mat-sidenav-end.mat-sidenav-opening{transform:translate3d(0,0,0)}.mat-sidenav.mat-sidenav-opened:not(.mat-sidenav-side),.mat-sidenav.mat-sidenav-opening:not(.mat-sidenav-side){box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)} /*# sourceMappingURL=sidenav.css.map */ ",
".mat-sidenav-transition .mat-sidenav{transition:transform .4s cubic-bezier(.25,.8,.25,1)}.mat-sidenav-transition .mat-sidenav-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-sidenav-transition .mat-sidenav-backdrop.mat-sidenav-shown{transition:background-color .4s cubic-bezier(.25,.8,.25,1)} /*# sourceMappingURL=sidenav-transitions.css.map */ "],
                host: {
                    '[class.mat-sidenav-container]': 'true',
                    '[class.mat-sidenav-transition]': '_enableTransitions',
                },
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
MdSidenavContainer.ctorParameters = () => [
    { type: Dir, decorators: [{ type: Optional },] },
    { type: ElementRef, },
    { type: Renderer, },
    { type: NgZone, },
];
MdSidenavContainer.propDecorators = {
    '_sidenavs': [{ type: ContentChildren, args: [MdSidenav,] },],
    'backdropClick': [{ type: Output },],
};
function MdSidenavContainer_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSidenavContainer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSidenavContainer.ctorParameters;
    /** @type {?} */
    MdSidenavContainer.propDecorators;
    /** @type {?} */
    MdSidenavContainer.prototype._sidenavs;
    /**
     * Event emitted when the sidenav backdrop is clicked.
     * @type {?}
     */
    MdSidenavContainer.prototype.backdropClick;
    /**
     * The sidenav at the start/end alignment, independent of direction.
     * @type {?}
     */
    MdSidenavContainer.prototype._start;
    /** @type {?} */
    MdSidenavContainer.prototype._end;
    /**
     * The sidenav at the left/right. When direction changes, these will change as well.
     * They're used as aliases for the above to set the left/right style properly.
     * In LTR, _left == _start and _right == _end.
     * In RTL, _left == _end and _right == _start.
     * @type {?}
     */
    MdSidenavContainer.prototype._left;
    /** @type {?} */
    MdSidenavContainer.prototype._right;
    /**
     * Whether to enable open/close trantions.
     * @type {?}
     */
    MdSidenavContainer.prototype._enableTransitions;
    /** @type {?} */
    MdSidenavContainer.prototype._dir;
    /** @type {?} */
    MdSidenavContainer.prototype._element;
    /** @type {?} */
    MdSidenavContainer.prototype._renderer;
    /** @type {?} */
    MdSidenavContainer.prototype._ngZone;
}
//# sourceMappingURL=sidenav.js.map