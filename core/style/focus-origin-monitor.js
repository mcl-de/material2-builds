import { Directive, ElementRef, EventEmitter, Injectable, NgZone, Optional, Output, Renderer, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// This is the value used by AngularJS Material. Through trial and error (on iPhone 6S) they found
// that a value of around 650ms seems appropriate.
export const /** @type {?} */ TOUCH_BUFFER_MS = 650;
/**
 * Monitors mouse and keyboard events to determine the cause of focus events.
 */
export class FocusOriginMonitor {
    /**
     * @param {?} _ngZone
     */
    constructor(_ngZone) {
        this._ngZone = _ngZone;
        this._origin = null;
        this._windowFocused = false;
        this._elementInfo = new WeakMap();
        this._ngZone.runOutsideAngular(() => this._registerDocumentEvents());
    }
    /**
     * Monitors focus on an element and applies appropriate CSS classes.
     * @param {?} element The element to monitor
     * @param {?} renderer The renderer to use to apply CSS classes to the element.
     * @param {?} checkChildren Whether to count the element as focused when its children are focused.
     * @return {?} An observable that emits when the focus state of the element changes.
     *     When the element is blurred, null will be emitted.
     */
    monitor(element, renderer, checkChildren) {
        // Check if we're already monitoring this element.
        if (this._elementInfo.has(element)) {
            let /** @type {?} */ info = this._elementInfo.get(element);
            info.checkChildren = checkChildren;
            return info.subject.asObservable();
        }
        // Create monitored element info.
        let /** @type {?} */ info = {
            unlisten: null,
            checkChildren: checkChildren,
            renderer: renderer,
            subject: new Subject()
        };
        this._elementInfo.set(element, info);
        // Start listening. We need to listen in capture phase since focus events don't bubble.
        let /** @type {?} */ focusListener = (event) => this._onFocus(event, element);
        let /** @type {?} */ blurListener = (event) => this._onBlur(event, element);
        this._ngZone.runOutsideAngular(() => {
            element.addEventListener('focus', focusListener, true);
            element.addEventListener('blur', blurListener, true);
        });
        // Create an unlisten function for later.
        info.unlisten = () => {
            element.removeEventListener('focus', focusListener, true);
            element.removeEventListener('blur', blurListener, true);
        };
        return info.subject.asObservable();
    }
    /**
     * Stops monitoring an element and removes all focus classes.
     * @param {?} element The element to stop monitoring.
     * @return {?}
     */
    stopMonitoring(element) {
        let /** @type {?} */ elementInfo = this._elementInfo.get(element);
        if (elementInfo) {
            elementInfo.unlisten();
            elementInfo.subject.complete();
            this._setClasses(element, null);
            this._elementInfo.delete(element);
        }
    }
    /**
     * Focuses the element via the specified focus origin.
     * @param {?} element The element to focus.
     * @param {?} renderer The renderer to use to invoke the focus method on the element.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    focusVia(element, renderer, origin) {
        this._setOriginForCurrentEventQueue(origin);
        renderer.invokeElementMethod(element, 'focus');
    }
    /**
     * Register necessary event listeners on the document and window.
     * @return {?}
     */
    _registerDocumentEvents() {
        // Note: we listen to events in the capture phase so we can detect them even if the user stops
        // propagation.
        // On keydown record the origin and clear any touch event that may be in progress.
        document.addEventListener('keydown', () => {
            this._lastTouchTarget = null;
            this._setOriginForCurrentEventQueue('keyboard');
        }, true);
        // On mousedown record the origin only if there is not touch target, since a mousedown can
        // happen as a result of a touch event.
        document.addEventListener('mousedown', () => {
            if (!this._lastTouchTarget) {
                this._setOriginForCurrentEventQueue('mouse');
            }
        }, true);
        // When the touchstart event fires the focus event is not yet in the event queue. This means
        // we can't rely on the trick used above (setting timeout of 0ms). Instead we wait 650ms to
        // see if a focus happens.
        document.addEventListener('touchstart', (event) => {
            if (this._touchTimeout != null) {
                clearTimeout(this._touchTimeout);
            }
            this._lastTouchTarget = event.target;
            this._touchTimeout = setTimeout(() => this._lastTouchTarget = null, TOUCH_BUFFER_MS);
        }, true);
        // Make a note of when the window regains focus, so we can restore the origin info for the
        // focused element.
        window.addEventListener('focus', () => {
            this._windowFocused = true;
            setTimeout(() => this._windowFocused = false, 0);
        });
    }
    /**
     * Sets the focus classes on the element based on the given focus origin.
     * @param {?} element The element to update the classes on.
     * @param {?} origin The focus origin.
     * @return {?}
     */
    _setClasses(element, origin) {
        let /** @type {?} */ renderer = this._elementInfo.get(element).renderer;
        renderer.setElementClass(element, 'cdk-focused', !!origin);
        renderer.setElementClass(element, 'cdk-touch-focused', origin === 'touch');
        renderer.setElementClass(element, 'cdk-keyboard-focused', origin === 'keyboard');
        renderer.setElementClass(element, 'cdk-mouse-focused', origin === 'mouse');
        renderer.setElementClass(element, 'cdk-program-focused', origin === 'program');
    }
    /**
     * Sets the origin and schedules an async function to clear it at the end of the event queue.
     * @param {?} origin The origin to set.
     * @return {?}
     */
    _setOriginForCurrentEventQueue(origin) {
        this._origin = origin;
        setTimeout(() => this._origin = null, 0);
    }
    /**
     * Checks whether the given focus event was caused by a touchstart event.
     * @param {?} event The focus event to check.
     * @return {?} Whether the event was caused by a touch.
     */
    _wasCausedByTouch(event) {
        // Note(mmalerba): This implementation is not quite perfect, there is a small edge case.
        // Consider the following dom structure:
        //
        // <div #parent tabindex="0" cdkFocusClasses>
        //   <div #child (click)="#parent.focus()"></div>
        // </div>
        //
        // If the user touches the #child element and the #parent is programmatically focused as a
        // result, this code will still consider it to have been caused by the touch event and will
        // apply the cdk-touch-focused class rather than the cdk-program-focused class. This is a
        // relatively small edge-case that can be worked around by using
        // focusVia(parentEl, renderer,  'program') to focus the parent element.
        //
        // If we decide that we absolutely must handle this case correctly, we can do so by listening
        // for the first focus event after the touchstart, and then the first blur event after that
        // focus event. When that blur event fires we know that whatever follows is not a result of the
        // touchstart.
        let /** @type {?} */ focusTarget = event.target;
        return this._lastTouchTarget instanceof Node && focusTarget instanceof Node &&
            (focusTarget === this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
    }
    /**
     * Handles focus events on a registered element.
     * @param {?} event The focus event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    _onFocus(event, element) {
        // NOTE(mmalerba): We currently set the classes based on the focus origin of the most recent
        // focus event affecting the monitored element. If we want to use the origin of the first event
        // instead we should check for the cdk-focused class here and return if the element already has
        // it. (This only matters for elements that have includesChildren = true).
        // If we are not counting child-element-focus as focused, make sure that the event target is the
        // monitored element itself.
        if (!this._elementInfo.get(element).checkChildren && element !== event.target) {
            return;
        }
        // If we couldn't detect a cause for the focus event, it's due to one of three reasons:
        // 1) The window has just regained focus, in which case we want to restore the focused state of
        //    the element from before the window blurred.
        // 2) It was caused by a touch event, in which case we mark the origin as 'touch'.
        // 3) The element was programmatically focused, in which case we should mark the origin as
        //    'program'.
        if (!this._origin) {
            if (this._windowFocused && this._lastFocusOrigin) {
                this._origin = this._lastFocusOrigin;
            }
            else if (this._wasCausedByTouch(event)) {
                this._origin = 'touch';
            }
            else {
                this._origin = 'program';
            }
        }
        this._setClasses(element, this._origin);
        this._elementInfo.get(element).subject.next(this._origin);
        this._lastFocusOrigin = this._origin;
        this._origin = null;
    }
    /**
     * Handles blur events on a registered element.
     * @param {?} event The blur event.
     * @param {?} element The monitored element.
     * @return {?}
     */
    _onBlur(event, element) {
        // If we are counting child-element-focus as focused, make sure that we aren't just blurring in
        // order to focus another child of the monitored element.
        if (this._elementInfo.get(element).checkChildren && event.relatedTarget instanceof Node &&
            element.contains(event.relatedTarget)) {
            return;
        }
        this._setClasses(element, null);
        this._elementInfo.get(element).subject.next(null);
    }
}
FocusOriginMonitor.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FocusOriginMonitor.ctorParameters = () => [
    { type: NgZone, },
];
function FocusOriginMonitor_tsickle_Closure_declarations() {
    /** @type {?} */
    FocusOriginMonitor.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    FocusOriginMonitor.ctorParameters;
    /**
     * The focus origin that the next focus event is a result of.
     * @type {?}
     */
    FocusOriginMonitor.prototype._origin;
    /**
     * The FocusOrigin of the last focus event tracked by the FocusOriginMonitor.
     * @type {?}
     */
    FocusOriginMonitor.prototype._lastFocusOrigin;
    /**
     * Whether the window has just been focused.
     * @type {?}
     */
    FocusOriginMonitor.prototype._windowFocused;
    /**
     * The target of the last touch event.
     * @type {?}
     */
    FocusOriginMonitor.prototype._lastTouchTarget;
    /**
     * The timeout id of the touch timeout, used to cancel timeout later.
     * @type {?}
     */
    FocusOriginMonitor.prototype._touchTimeout;
    /**
     * Weak map of elements being monitored to their info.
     * @type {?}
     */
    FocusOriginMonitor.prototype._elementInfo;
    /** @type {?} */
    FocusOriginMonitor.prototype._ngZone;
}
/**
 * Directive that determines how a particular element was focused (via keyboard, mouse, touch, or
 * programmatically) and adds corresponding classes to the element.
 *
 * There are two variants of this directive:
 * 1) cdkMonitorElementFocus: does not consider an element to be focused if one of its children is
 *    focused.
 * 2) cdkMonitorSubtreeFocus: considers an element focused if it or any of its children are focused.
 */
export class CdkMonitorFocus {
    /**
     * @param {?} _elementRef
     * @param {?} _focusOriginMonitor
     * @param {?} renderer
     */
    constructor(_elementRef, _focusOriginMonitor, renderer) {
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this.cdkFocusChange = new EventEmitter();
        this._focusOriginMonitor.monitor(this._elementRef.nativeElement, renderer, this._elementRef.nativeElement.hasAttribute('cdkMonitorSubtreeFocus'))
            .subscribe(origin => this.cdkFocusChange.emit(origin));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusOriginMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
}
CdkMonitorFocus.decorators = [
    { type: Directive, args: [{
                selector: '[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]',
            },] },
];
/**
 * @nocollapse
 */
CdkMonitorFocus.ctorParameters = () => [
    { type: ElementRef, },
    { type: FocusOriginMonitor, },
    { type: Renderer, },
];
CdkMonitorFocus.propDecorators = {
    'cdkFocusChange': [{ type: Output },],
};
function CdkMonitorFocus_tsickle_Closure_declarations() {
    /** @type {?} */
    CdkMonitorFocus.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    CdkMonitorFocus.ctorParameters;
    /** @type {?} */
    CdkMonitorFocus.propDecorators;
    /** @type {?} */
    CdkMonitorFocus.prototype.cdkFocusChange;
    /** @type {?} */
    CdkMonitorFocus.prototype._elementRef;
    /** @type {?} */
    CdkMonitorFocus.prototype._focusOriginMonitor;
}
/**
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @return {?}
 */
export function FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY(parentDispatcher, ngZone) {
    return parentDispatcher || new FocusOriginMonitor(ngZone);
}
export const /** @type {?} */ FOCUS_ORIGIN_MONITOR_PROVIDER = {
    // If there is already a FocusOriginMonitor available, use that. Otherwise, provide a new one.
    provide: FocusOriginMonitor,
    deps: [[new Optional(), new SkipSelf(), FocusOriginMonitor], NgZone],
    useFactory: FOCUS_ORIGIN_MONITOR_PROVIDER_FACTORY
};
//# sourceMappingURL=focus-origin-monitor.js.map