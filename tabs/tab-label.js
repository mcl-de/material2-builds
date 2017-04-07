import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortalDirective } from '../core';
/**
 * Used to flag tab labels for use with the portal directive
 */
export class MdTabLabel extends TemplatePortalDirective {
    /**
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(templateRef, viewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}
MdTabLabel.decorators = [
    { type: Directive, args: [{
                selector: '[md-tab-label], [mat-tab-label]',
            },] },
];
/**
 * @nocollapse
 */
MdTabLabel.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
function MdTabLabel_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTabLabel.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTabLabel.ctorParameters;
}
//# sourceMappingURL=tab-label.js.map