/**
 * Configuration used when opening a snack-bar.
 */
export class MdSnackBarConfig {
    constructor() {
        /** The politeness level for the MdAriaLiveAnnouncer announcement. */
        this.politeness = 'assertive';
        /** Message to be announced by the MdAriaLiveAnnouncer */
        this.announcementMessage = '';
        /** The view container to place the overlay for the snack bar into. */
        this.viewContainerRef = null;
        /** The length of time in milliseconds to wait before automatically dismissing the snack bar. */
        this.duration = 0;
    }
}
function MdSnackBarConfig_tsickle_Closure_declarations() {
    /**
     * The politeness level for the MdAriaLiveAnnouncer announcement.
     * @type {?}
     */
    MdSnackBarConfig.prototype.politeness;
    /**
     * Message to be announced by the MdAriaLiveAnnouncer
     * @type {?}
     */
    MdSnackBarConfig.prototype.announcementMessage;
    /**
     * The view container to place the overlay for the snack bar into.
     * @type {?}
     */
    MdSnackBarConfig.prototype.viewContainerRef;
    /**
     * The length of time in milliseconds to wait before automatically dismissing the snack bar.
     * @type {?}
     */
    MdSnackBarConfig.prototype.duration;
    /**
     * Extra CSS classes to be added to the snack bar container.
     * @type {?}
     */
    MdSnackBarConfig.prototype.extraClasses;
}
//# sourceMappingURL=snack-bar-config.js.map