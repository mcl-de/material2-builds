import { MdError } from '../core';
/**
 * Exception thrown when a tooltip has an invalid position.
 * \@docs-private
 */
export class MdTooltipInvalidPositionError extends MdError {
    /**
     * @param {?} position
     */
    constructor(position) {
        super(`Tooltip position "${position}" is invalid.`);
    }
}
//# sourceMappingURL=tooltip-errors.js.map