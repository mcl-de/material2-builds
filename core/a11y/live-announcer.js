import { Injectable, OpaqueToken, Optional, Inject, SkipSelf, } from '@angular/core';
export const /** @type {?} */ LIVE_ANNOUNCER_ELEMENT_TOKEN = new OpaqueToken('liveAnnouncerElement');
export class LiveAnnouncer {
    /**
     * @param {?} elementToken
     */
    constructor(elementToken) {
        // We inject the live element as `any` because the constructor signature cannot reference
        // browser globals (HTMLElement) on non-browser environments, since having a class decorator
        // causes TypeScript to preserve the constructor signature types.
        this._liveElement = elementToken || this._createLiveElement();
    }
    /**
     * Announces a message to screenreaders.
     * @param {?} message Message to be announced to the screenreader
     * @param {?=} politeness The politeness of the announcer element
     * @return {?}
     */
    announce(message, politeness = 'polite') {
        this._liveElement.textContent = '';
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', politeness);
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        setTimeout(() => this._liveElement.textContent = message, 100);
    }
    /**
     * Removes the aria-live element from the DOM.
     * @return {?}
     */
    _removeLiveElement() {
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
        }
    }
    /**
     * @return {?}
     */
    _createLiveElement() {
        let /** @type {?} */ liveEl = document.createElement('div');
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveEl);
        return liveEl;
    }
}
LiveAnnouncer.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
LiveAnnouncer.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] },] },
];
function LiveAnnouncer_tsickle_Closure_declarations() {
    /** @type {?} */
    LiveAnnouncer.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    LiveAnnouncer.ctorParameters;
    /** @type {?} */
    LiveAnnouncer.prototype._liveElement;
}
/**
 * @param {?} parentDispatcher
 * @param {?} liveElement
 * @return {?}
 */
export function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentDispatcher, liveElement) {
    return parentDispatcher || new LiveAnnouncer(liveElement);
}
;
export const /** @type {?} */ LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new Optional(), new SkipSelf(), LiveAnnouncer],
        [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)]
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};
//# sourceMappingURL=live-announcer.js.map