import { NgModule } from '@angular/core';
import { CompatibilityModule } from '../core';
import { MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle, MdCardActions, MdCardFooter, MdCardSmImage, MdCardMdImage, MdCardLgImage, MdCardImage, MdCardXlImage, MdCardAvatar, } from './card';
export class MdCardModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MdCardModule,
            providers: []
        };
    }
}
MdCardModule.decorators = [
    { type: NgModule, args: [{
                imports: [CompatibilityModule],
                exports: [
                    MdCard,
                    MdCardHeader,
                    MdCardTitleGroup,
                    MdCardContent,
                    MdCardTitle,
                    MdCardSubtitle,
                    MdCardActions,
                    MdCardFooter,
                    MdCardSmImage,
                    MdCardMdImage,
                    MdCardLgImage,
                    MdCardImage,
                    MdCardXlImage,
                    MdCardAvatar,
                    CompatibilityModule,
                ],
                declarations: [
                    MdCard, MdCardHeader, MdCardTitleGroup, MdCardContent, MdCardTitle, MdCardSubtitle,
                    MdCardActions, MdCardFooter, MdCardSmImage, MdCardMdImage, MdCardLgImage, MdCardImage,
                    MdCardXlImage, MdCardAvatar,
                ],
            },] },
];
/**
 * @nocollapse
 */
MdCardModule.ctorParameters = () => [];
function MdCardModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MdCardModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdCardModule.ctorParameters;
}
export { MdCardContent, MdCardTitle, MdCardSubtitle, MdCardActions, MdCardFooter, MdCardSmImage, MdCardMdImage, MdCardLgImage, MdCardImage, MdCardXlImage, MdCardAvatar, MdCard, MdCardHeader, MdCardTitleGroup } from './card';
//# sourceMappingURL=index.js.map