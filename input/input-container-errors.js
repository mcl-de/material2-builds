import { MdError } from '../core/errors/error';
/**
 * \@docs-private
 */
export class MdInputContainerPlaceholderConflictError extends MdError {
    constructor() {
        super('Placeholder attribute and child element were both specified.');
    }
}
/**
 * \@docs-private
 */
export class MdInputContainerUnsupportedTypeError extends MdError {
    /**
     * @param {?} type
     */
    constructor(type) {
        super(`Input type "${type}" isn't supported by md-input-container.`);
    }
}
/**
 * \@docs-private
 */
export class MdInputContainerDuplicatedHintError extends MdError {
    /**
     * @param {?} align
     */
    constructor(align) {
        super(`A hint was already declared for 'align="${align}"'.`);
    }
}
/**
 * \@docs-private
 */
export class MdInputContainerMissingMdInputError extends MdError {
    constructor() {
        super('md-input-container must contain an mdInput directive. Did you forget to add mdInput ' +
            'to the native input or textarea element?');
    }
}
//# sourceMappingURL=input-container-errors.js.map