/**
 * Wrapper around Error that sets the error message.
 * \@docs-private
 */
export class MdError extends Error {
    /**
     * @param {?} value
     */
    constructor(value) {
        super();
        this.message = value;
    }
}
//# sourceMappingURL=error.js.map