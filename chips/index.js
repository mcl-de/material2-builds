import { NgModule } from '@angular/core';
import { MdChipList } from './chip-list';
import { MdChip } from './chip';
export class MdChipsModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdChipsModule,
            providers: []
        };
    }
}
MdChipsModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [MdChipList, MdChip],
                declarations: [MdChipList, MdChip]
            },] },
];
/**
 * @nocollapse
 */
MdChipsModule.ctorParameters = () => [];
function MdChipsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdChipsModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdChipsModule.ctorParameters;
}
export { MdChipList } from './chip-list';
export { MdChip } from './chip';
//# sourceMappingURL=index.js.map