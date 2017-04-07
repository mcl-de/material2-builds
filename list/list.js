import { Component, ViewEncapsulation, ContentChildren, ContentChild, Directive, ElementRef, Inject, Input, OpaqueToken, Optional, Renderer, } from '@angular/core';
import { MdLine, MdLineSetter } from '../core';
export class MdListDivider {
}
MdListDivider.decorators = [
    { type: Directive, args: [{
                selector: 'md-divider, mat-divider'
            },] },
];
/**
 * @nocollapse
 */
MdListDivider.ctorParameters = () => [];
function MdListDivider_tsickle_Closure_declarations() {
    /** @type {?} */
    MdListDivider.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdListDivider.ctorParameters;
}
/**
 * Token used to inject the list type into child MdListItem components so they can know whether
 * they're in a nav list (and thus should use an MdRipple).
 */
export const /** @type {?} */ LIST_TYPE_TOKEN = new OpaqueToken('list_type');
const /** @type {?} */ NORMAL_LIST_TYPE = 'normal_list_type';
const /** @type {?} */ NAV_LIST_TYPE = 'nav_list_type';
export class MdList {
}
MdList.decorators = [
    { type: Component, args: [{selector: 'md-list, mat-list, md-nav-list, mat-nav-list',
                host: {
                    'role': 'list'
                },
                template: '<ng-content></ng-content>',
                styles: [".mat-list,.mat-nav-list{padding-top:8px;display:block}.mat-list .mat-subheader,.mat-nav-list .mat-subheader{display:block;box-sizing:border-box;height:48px;padding:16px;margin:0;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-list .mat-subheader:first-child,.mat-nav-list .mat-subheader:first-child{margin-top:-8px}.mat-list .mat-list-item,.mat-nav-list .mat-list-item{display:block}.mat-list .mat-list-item .mat-list-item-content,.mat-nav-list .mat-list-item .mat-list-item-content{display:flex;flex-direction:row;align-items:center;font-family:Roboto,\"Helvetica Neue\",sans-serif;box-sizing:border-box;font-size:16px;height:48px;padding:0 16px;position:relative}.mat-list .mat-list-item.mat-list-item-avatar .mat-list-item-content,.mat-nav-list .mat-list-item.mat-list-item-avatar .mat-list-item-content{height:56px}.mat-list .mat-list-item.mat-2-line .mat-list-item-content,.mat-nav-list .mat-list-item.mat-2-line .mat-list-item-content{height:72px}.mat-list .mat-list-item.mat-3-line .mat-list-item-content,.mat-nav-list .mat-list-item.mat-3-line .mat-list-item-content{height:88px}.mat-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list .mat-list-item.mat-multi-line .mat-list-item-content{height:100%;padding:8px 16px}.mat-list .mat-list-item .mat-list-text,.mat-nav-list .mat-list-item .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0 16px}.mat-list .mat-list-item .mat-list-text>*,.mat-nav-list .mat-list-item .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list .mat-list-item .mat-list-text:empty,.mat-nav-list .mat-list-item .mat-list-text:empty{display:none}.mat-list .mat-list-item .mat-list-text:first-child,.mat-nav-list .mat-list-item .mat-list-text:first-child{padding:0}.mat-list .mat-list-item .mat-list-avatar,.mat-nav-list .mat-list-item .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list .mat-list-item .mat-list-icon,.mat-nav-list .mat-list-item .mat-list-icon{width:24px;height:24px;border-radius:50%;padding:4px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list[dense],.mat-nav-list[dense]{padding-top:4px;display:block}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader{display:block;box-sizing:border-box;height:40px;padding:16px;margin:0;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:13px;font-weight:500}.mat-list[dense] .mat-subheader:first-child,.mat-nav-list[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item{display:block}.mat-list[dense] .mat-list-item .mat-list-item-content,.mat-nav-list[dense] .mat-list-item .mat-list-item-content{display:flex;flex-direction:row;align-items:center;font-family:Roboto,\"Helvetica Neue\",sans-serif;box-sizing:border-box;font-size:13px;height:40px;padding:0 16px;position:relative}.mat-list[dense] .mat-list-item.mat-list-item-avatar .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-list-item-avatar .mat-list-item-content{height:48px}.mat-list[dense] .mat-list-item.mat-2-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-2-line .mat-list-item-content{height:60px}.mat-list[dense] .mat-list-item.mat-3-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-3-line .mat-list-item-content{height:76px}.mat-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content{height:100%;padding:8px 16px}.mat-list[dense] .mat-list-item .mat-list-text,.mat-nav-list[dense] .mat-list-item .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0 16px}.mat-list[dense] .mat-list-item .mat-list-text>*,.mat-nav-list[dense] .mat-list-item .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list[dense] .mat-list-item .mat-list-text:empty,.mat-nav-list[dense] .mat-list-item .mat-list-text:empty{display:none}.mat-list[dense] .mat-list-item .mat-list-text:first-child,.mat-nav-list[dense] .mat-list-item .mat-list-text:first-child{padding:0}.mat-list[dense] .mat-list-item .mat-list-avatar,.mat-nav-list[dense] .mat-list-item .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list[dense] .mat-list-item .mat-list-icon,.mat-nav-list[dense] .mat-list-item .mat-list-icon{width:24px;height:24px;border-radius:50%;padding:4px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2){font-size:13px}.mat-divider{display:block;border-top-style:solid;border-top-width:1px;margin:0}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item-content{cursor:pointer}.mat-nav-list .mat-list-item-content.mat-list-item-focus,.mat-nav-list .mat-list-item-content:hover{outline:0} /*# sourceMappingURL=list.css.map */ "],
                providers: [{ provide: LIST_TYPE_TOKEN, useValue: NORMAL_LIST_TYPE }],
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
MdList.ctorParameters = () => [];
function MdList_tsickle_Closure_declarations() {
    /** @type {?} */
    MdList.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdList.ctorParameters;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
export class MdListCssMatStyler {
}
MdListCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: 'md-list, mat-list',
                host: {
                    '[class.mat-list]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdListCssMatStyler.ctorParameters = () => [];
function MdListCssMatStyler_tsickle_Closure_declarations() {
    /** @type {?} */
    MdListCssMatStyler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdListCssMatStyler.ctorParameters;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
export class MdNavListCssMatStyler {
}
MdNavListCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: 'md-nav-list, mat-nav-list',
                host: {
                    '[class.mat-nav-list]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdNavListCssMatStyler.ctorParameters = () => [];
function MdNavListCssMatStyler_tsickle_Closure_declarations() {
    /** @type {?} */
    MdNavListCssMatStyler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdNavListCssMatStyler.ctorParameters;
}
/**
 * Directive to set the ListType token to NAV_LIST_TYPE.
 */
export class MdNavListTokenSetter {
}
MdNavListTokenSetter.decorators = [
    { type: Directive, args: [{
                selector: 'md-nav-list, mat-nav-list',
                providers: [{ provide: LIST_TYPE_TOKEN, useValue: NAV_LIST_TYPE }],
            },] },
];
/**
 * @nocollapse
 */
MdNavListTokenSetter.ctorParameters = () => [];
function MdNavListTokenSetter_tsickle_Closure_declarations() {
    /** @type {?} */
    MdNavListTokenSetter.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdNavListTokenSetter.ctorParameters;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
export class MdDividerCssMatStyler {
}
MdDividerCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: 'md-divider, mat-divider',
                host: {
                    '[class.mat-divider]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdDividerCssMatStyler.ctorParameters = () => [];
function MdDividerCssMatStyler_tsickle_Closure_declarations() {
    /** @type {?} */
    MdDividerCssMatStyler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdDividerCssMatStyler.ctorParameters;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
export class MdListAvatarCssMatStyler {
}
MdListAvatarCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: '[md-list-avatar], [mat-list-avatar]',
                host: {
                    '[class.mat-list-avatar]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdListAvatarCssMatStyler.ctorParameters = () => [];
function MdListAvatarCssMatStyler_tsickle_Closure_declarations() {
    /** @type {?} */
    MdListAvatarCssMatStyler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdListAvatarCssMatStyler.ctorParameters;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
export class MdListIconCssMatStyler {
}
MdListIconCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: '[md-list-icon], [mat-list-icon]',
                host: {
                    '[class.mat-list-icon]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdListIconCssMatStyler.ctorParameters = () => [];
function MdListIconCssMatStyler_tsickle_Closure_declarations() {
    /** @type {?} */
    MdListIconCssMatStyler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdListIconCssMatStyler.ctorParameters;
}
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
export class MdListSubheaderCssMatStyler {
}
MdListSubheaderCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: '[md-subheader], [mat-subheader]',
                host: {
                    '[class.mat-subheader]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdListSubheaderCssMatStyler.ctorParameters = () => [];
function MdListSubheaderCssMatStyler_tsickle_Closure_declarations() {
    /** @type {?} */
    MdListSubheaderCssMatStyler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdListSubheaderCssMatStyler.ctorParameters;
}
export class MdListItem {
    /**
     * @param {?} _renderer
     * @param {?} _element
     * @param {?} _listType
     */
    constructor(_renderer, _element, _listType) {
        this._renderer = _renderer;
        this._element = _element;
        this._listType = _listType;
        /**
         * Whether the ripple effect on click should be disabled. This applies only to list items that
         * are children of an md-nav-list; md-list items never have ripples.
         */
        this.disableRipple = false;
        this._hasFocus = false;
    }
    /**
     * @param {?} avatar
     * @return {?}
     */
    set _hasAvatar(avatar) {
        this._renderer.setElementClass(this._element.nativeElement, 'mat-list-item-avatar', avatar != null);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._lineSetter = new MdLineSetter(this._lines, this._renderer, this._element);
    }
    /**
     * Whether this list item should show a ripple effect when clicked.
     * @return {?}
     */
    isRippleEnabled() {
        return !this.disableRipple && (this._listType === NAV_LIST_TYPE);
    }
    /**
     * @return {?}
     */
    _handleFocus() {
        this._hasFocus = true;
    }
    /**
     * @return {?}
     */
    _handleBlur() {
        this._hasFocus = false;
    }
}
MdListItem.decorators = [
    { type: Component, args: [{selector: 'md-list-item, mat-list-item, a[md-list-item], a[mat-list-item]',
                host: {
                    'role': 'listitem',
                    '(focus)': '_handleFocus()',
                    '(blur)': '_handleBlur()',
                    '[class.mat-list-item]': 'true',
                },
                template: "<div class=\"mat-list-item-content\" [class.mat-list-item-focus]=\"_hasFocus\" md-ripple [mdRippleDisabled]=\"!isRippleEnabled()\"> <ng-content select=\"[md-list-avatar],[md-list-icon], [mat-list-avatar], [mat-list-icon]\"></ng-content> <div class=\"mat-list-text\"><ng-content select=\"[md-line], [mat-line]\"></ng-content></div> <ng-content></ng-content> </div> ",
                encapsulation: ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
MdListItem.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIST_TYPE_TOKEN,] },] },
];
MdListItem.propDecorators = {
    'disableRipple': [{ type: Input },],
    '_lines': [{ type: ContentChildren, args: [MdLine,] },],
    '_hasAvatar': [{ type: ContentChild, args: [MdListAvatarCssMatStyler,] },],
};
function MdListItem_tsickle_Closure_declarations() {
    /** @type {?} */
    MdListItem.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdListItem.ctorParameters;
    /** @type {?} */
    MdListItem.propDecorators;
    /**
     * Whether the ripple effect on click should be disabled. This applies only to list items that
     * are children of an md-nav-list; md-list items never have ripples.
     * @type {?}
     */
    MdListItem.prototype.disableRipple;
    /** @type {?} */
    MdListItem.prototype._hasFocus;
    /** @type {?} */
    MdListItem.prototype._lineSetter;
    /** @type {?} */
    MdListItem.prototype._lines;
    /** @type {?} */
    MdListItem.prototype._renderer;
    /** @type {?} */
    MdListItem.prototype._element;
    /** @type {?} */
    MdListItem.prototype._listType;
}
//# sourceMappingURL=list.js.map