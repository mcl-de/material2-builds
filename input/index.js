import { NgModule } from '@angular/core';
import { MdErrorDirective, MdHint, MdInputContainer, MdInputDirective, MdPlaceholder, MdPrefix, MdSuffix } from './input-container';
import { MdTextareaAutosize } from './autosize';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlatformModule } from '../core/platform/index';
export class MdInputModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdInputModule,
            providers: [],
        };
    }
}
MdInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MdErrorDirective,
                    MdHint,
                    MdInputContainer,
                    MdInputDirective,
                    MdPlaceholder,
                    MdPrefix,
                    MdSuffix,
                    MdTextareaAutosize,
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    PlatformModule,
                ],
                exports: [
                    MdErrorDirective,
                    MdHint,
                    MdInputContainer,
                    MdInputDirective,
                    MdPlaceholder,
                    MdPrefix,
                    MdSuffix,
                    MdTextareaAutosize,
                ],
            },] },
];
/**
 * @nocollapse
 */
MdInputModule.ctorParameters = () => [];
function MdInputModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdInputModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdInputModule.ctorParameters;
}
export { MdTextareaAutosize } from './autosize';
export { MdPlaceholder, MdHint, MdErrorDirective, MdPrefix, MdSuffix, MdInputDirective, MdInputContainer } from './input-container';
export { MdInputContainerPlaceholderConflictError, MdInputContainerUnsupportedTypeError, MdInputContainerDuplicatedHintError, MdInputContainerMissingMdInputError } from './input-container-errors';
//# sourceMappingURL=index.js.map