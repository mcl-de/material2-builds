/**
 * Configuration for opening a modal dialog with the MdDialog service.
 */
export class MdDialogConfig {
    constructor() {
        /**
         * The ARIA role of the dialog element.
         */
        this.role = 'dialog';
        /**
         * Whether the user can use escape or clicking outside to close a modal.
         */
        this.disableClose = false;
        /**
         * Width of the dialog.
         */
        this.width = '';
        /**
         * Height of the dialog.
         */
        this.height = '';
        // TODO(jelbourn): add configuration for lifecycle hooks, ARIA labelling.
    }
}
function MdDialogConfig_tsickle_Closure_declarations() {
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the dialog. This does not affect where the dialog
     * content will be rendered.
     * @type {?}
     */
    MdDialogConfig.prototype.viewContainerRef;
    /**
     * The ARIA role of the dialog element.
     * @type {?}
     */
    MdDialogConfig.prototype.role;
    /**
     * Whether the user can use escape or clicking outside to close a modal.
     * @type {?}
     */
    MdDialogConfig.prototype.disableClose;
    /**
     * Width of the dialog.
     * @type {?}
     */
    MdDialogConfig.prototype.width;
    /**
     * Height of the dialog.
     * @type {?}
     */
    MdDialogConfig.prototype.height;
    /**
     * Position overrides.
     * @type {?}
     */
    MdDialogConfig.prototype.position;
    /**
     * Data being injected into the child component.
     * @type {?}
     */
    MdDialogConfig.prototype.data;
}
//# sourceMappingURL=dialog-config.js.map