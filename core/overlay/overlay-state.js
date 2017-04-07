/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
export class OverlayState {
    constructor() {
        /** Whether the overlay has a backdrop. */
        this.hasBackdrop = false;
        /** Custom class to add to the backdrop **/
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        /** The direction of the text in the overlay panel. */
        this.direction = 'ltr';
        // TODO(jelbourn): configuration still to add
        // - focus trap
        // - disable pointer events
        // - z-index
    }
}
function OverlayState_tsickle_Closure_declarations() {
    /**
     * Strategy with which to position the overlay.
     * @type {?}
     */
    OverlayState.prototype.positionStrategy;
    /**
     * Whether the overlay has a backdrop.
     * @type {?}
     */
    OverlayState.prototype.hasBackdrop;
    /**
     * Custom class to add to the backdrop *
     * @type {?}
     */
    OverlayState.prototype.backdropClass;
    /**
     * The width of the overlay panel. If a number is provided, pixel units are assumed. *
     * @type {?}
     */
    OverlayState.prototype.width;
    /**
     * The height of the overlay panel. If a number is provided, pixel units are assumed. *
     * @type {?}
     */
    OverlayState.prototype.height;
    /**
     * The min-width of the overlay panel. If a number is provided, pixel units are assumed. *
     * @type {?}
     */
    OverlayState.prototype.minWidth;
    /**
     * The min-height of the overlay panel. If a number is provided, pixel units are assumed. *
     * @type {?}
     */
    OverlayState.prototype.minHeight;
    /**
     * The direction of the text in the overlay panel.
     * @type {?}
     */
    OverlayState.prototype.direction;
}
//# sourceMappingURL=overlay-state.js.map