import { Injectable, Optional, SkipSelf } from '@angular/core';
/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
export class UniqueSelectionDispatcher {
    constructor() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    notify(id, name) {
        for (let /** @type {?} */ listener of this._listeners) {
            listener(id, name);
        }
    }
    /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?}
     */
    listen(listener) {
        this._listeners.push(listener);
    }
}
UniqueSelectionDispatcher.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UniqueSelectionDispatcher.ctorParameters = () => [];
function UniqueSelectionDispatcher_tsickle_Closure_declarations() {
    /** @type {?} */
    UniqueSelectionDispatcher.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    UniqueSelectionDispatcher.ctorParameters;
    /** @type {?} */
    UniqueSelectionDispatcher.prototype._listeners;
}
/**
 * @param {?} parentDispatcher
 * @return {?}
 */
export function UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new UniqueSelectionDispatcher();
}
export const /** @type {?} */ UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
    // If there is already a dispatcher available, use that. Otherwise, provide a new one.
    provide: UniqueSelectionDispatcher,
    deps: [[new Optional(), new SkipSelf(), UniqueSelectionDispatcher]],
    useFactory: UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY
};
//# sourceMappingURL=unique-selection-dispatcher.js.map