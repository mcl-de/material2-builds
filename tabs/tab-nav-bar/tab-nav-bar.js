import { Component, Input, ViewChild, ElementRef, ViewEncapsulation, Directive, NgZone, Inject, Optional, } from '@angular/core';
import { MdInkBar } from '../ink-bar';
import { MdRipple } from '../../core/ripple/index';
import { ViewportRuler } from '../../core/overlay/position/viewport-ruler';
import { MD_RIPPLE_GLOBAL_OPTIONS, Dir } from '../../core';
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export class MdTabNavBar {
    /**
     * @param {?} _dir
     */
    constructor(_dir) {
        this._dir = _dir;
        if (_dir) {
            this._directionChange = _dir.dirChange.subscribe(() => this._alignInkBar());
        }
    }
    /**
     * Notifies the component that the active link has been changed.
     * @param {?} element
     * @return {?}
     */
    updateActiveLink(element) {
        this._activeLinkChanged = this._activeLinkElement != element;
        this._activeLinkElement = element;
    }
    /**
     * Checks if the active link has been changed and, if so, will update the ink bar.
     * @return {?}
     */
    ngAfterContentChecked() {
        if (this._activeLinkChanged) {
            this._alignInkBar();
            this._activeLinkChanged = false;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._directionChange) {
            this._directionChange.unsubscribe();
            this._directionChange = null;
        }
    }
    /**
     * Aligns the ink bar to the active link.
     * @return {?}
     */
    _alignInkBar() {
        this._inkBar.alignToElement(this._activeLinkElement.nativeElement);
    }
}
MdTabNavBar.decorators = [
    { type: Component, args: [{selector: '[md-tab-nav-bar], [mat-tab-nav-bar]',
                template: "<div class=\"mat-tab-links\"> <ng-content></ng-content> <md-ink-bar></md-ink-bar> </div> ",
                styles: [".mat-tab-nav-bar{overflow:hidden;position:relative;flex-shrink:0}.mat-tab-links{position:relative}.mat-tab-link{line-height:48px;height:48px;padding:0 12px;font-size:14px;font-family:Roboto,\"Helvetica Neue\",sans-serif;font-weight:500;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-block;vertical-align:top;text-decoration:none;position:relative;overflow:hidden}.mat-tab-link:focus{outline:0;opacity:1}@media (max-width:600px){.mat-tab-link{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0} /*# sourceMappingURL=tab-nav-bar.css.map */ "],
                host: {
                    '[class.mat-tab-nav-bar]': 'true',
                },
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
MdTabNavBar.ctorParameters = () => [
    { type: Dir, decorators: [{ type: Optional },] },
];
MdTabNavBar.propDecorators = {
    '_inkBar': [{ type: ViewChild, args: [MdInkBar,] },],
};
function MdTabNavBar_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTabNavBar.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTabNavBar.ctorParameters;
    /** @type {?} */
    MdTabNavBar.propDecorators;
    /** @type {?} */
    MdTabNavBar.prototype._directionChange;
    /** @type {?} */
    MdTabNavBar.prototype._activeLinkChanged;
    /** @type {?} */
    MdTabNavBar.prototype._activeLinkElement;
    /** @type {?} */
    MdTabNavBar.prototype._inkBar;
    /** @type {?} */
    MdTabNavBar.prototype._dir;
}
/**
 * Link inside of a `md-tab-nav-bar`.
 */
export class MdTabLink {
    /**
     * @param {?} _mdTabNavBar
     * @param {?} _elementRef
     */
    constructor(_mdTabNavBar, _elementRef) {
        this._mdTabNavBar = _mdTabNavBar;
        this._elementRef = _elementRef;
        this._isActive = false;
    }
    /**
     * Whether the link is active.
     * @return {?}
     */
    get active() { return this._isActive; }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        this._isActive = value;
        if (value) {
            this._mdTabNavBar.updateActiveLink(this._elementRef);
        }
    }
}
MdTabLink.decorators = [
    { type: Directive, args: [{
                selector: '[md-tab-link], [mat-tab-link]',
                host: {
                    '[class.mat-tab-link]': 'true',
                }
            },] },
];
/**
 * @nocollapse
 */
MdTabLink.ctorParameters = () => [
    { type: MdTabNavBar, },
    { type: ElementRef, },
];
MdTabLink.propDecorators = {
    'active': [{ type: Input },],
};
function MdTabLink_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTabLink.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTabLink.ctorParameters;
    /** @type {?} */
    MdTabLink.propDecorators;
    /** @type {?} */
    MdTabLink.prototype._isActive;
    /** @type {?} */
    MdTabLink.prototype._mdTabNavBar;
    /** @type {?} */
    MdTabLink.prototype._elementRef;
}
/**
 * Simple directive that extends the ripple and matches the selector of the MdTabLink. This
 * adds the ripple behavior to nav bar labels.
 */
export class MdTabLinkRipple extends MdRipple {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} ruler
     * @param {?} globalOptions
     */
    constructor(elementRef, ngZone, ruler, globalOptions) {
        super(elementRef, ngZone, ruler, globalOptions);
    }
}
MdTabLinkRipple.decorators = [
    { type: Directive, args: [{
                selector: '[md-tab-link], [mat-tab-link]',
                host: {
                    '[class.mat-tab-link]': 'true',
                },
            },] },
];
/**
 * @nocollapse
 */
MdTabLinkRipple.ctorParameters = () => [
    { type: ElementRef, },
    { type: NgZone, },
    { type: ViewportRuler, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MD_RIPPLE_GLOBAL_OPTIONS,] },] },
];
function MdTabLinkRipple_tsickle_Closure_declarations() {
    /** @type {?} */
    MdTabLinkRipple.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdTabLinkRipple.ctorParameters;
}
//# sourceMappingURL=tab-nav-bar.js.map