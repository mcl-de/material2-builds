import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer, ViewEncapsulation, Optional, SkipSelf, } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MdError } from '../core';
import { MdIconRegistry } from './icon-registry';
/**
 * Exception thrown when an invalid icon name is passed to an md-icon component.
 */
export class MdIconInvalidNameError extends MdError {
    /**
     * @param {?} iconName
     */
    constructor(iconName) {
        super(`Invalid icon name: "${iconName}"`);
    }
}
/**
 * Component to display an icon. It can be used in the following ways:
 * - Specify the svgSrc input to load an SVG icon from a URL. The SVG content is directly inlined
 *   as a child of the <md-icon> component, so that CSS styles can easily be applied to it.
 *   The URL is loaded via an XMLHttpRequest, so it must be on the same domain as the page or its
 *   server must be configured to allow cross-domain requests.
 *   Example:
 *     <md-icon svgSrc="assets/arrow.svg"></md-icon>
 *
 * - Specify the svgIcon input to load an SVG icon from a URL previously registered with the
 *   addSvgIcon, addSvgIconInNamespace, addSvgIconSet, or addSvgIconSetInNamespace methods of
 *   MdIconRegistry. If the svgIcon value contains a colon it is assumed to be in the format
 *   "[namespace]:[name]", if not the value will be the name of an icon in the default namespace.
 *   Examples:
 *     <md-icon svgIcon="left-arrow"></md-icon>
 *     <md-icon svgIcon="animals:cat"></md-icon>
 *
 * - Use a font ligature as an icon by putting the ligature text in the content of the <md-icon>
 *   component. By default the Material icons font is used as described at
 *   http://google.github.io/material-design-icons/#icon-font-for-the-web. You can specify an
 *   alternate font by setting the fontSet input to either the CSS class to apply to use the
 *   desired font, or to an alias previously registered with MdIconRegistry.registerFontClassAlias.
 *   Examples:
 *     <md-icon>home</md-icon>
 *     <md-icon fontSet="myfont">sun</md-icon>
 *
 * - Specify a font glyph to be included via CSS rules by setting the fontSet input to specify the
 *   font, and the fontIcon input to specify the icon. Typically the fontIcon will specify a
 *   CSS class which causes the glyph to be displayed via a :before selector, as in
 *   https://fortawesome.github.io/Font-Awesome/examples/
 *   Example:
 *     <md-icon fontSet="fa" fontIcon="alarm"></md-icon>
 */
export class MdIcon {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _mdIconRegistry
     */
    constructor(_elementRef, _renderer, _mdIconRegistry) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._mdIconRegistry = _mdIconRegistry;
        /** Screenreader label for the icon. */
        this.hostAriaLabel = '';
    }
    /**
     * Color of the icon.
     * @return {?}
     */
    get color() { return this._color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) { this._updateColor(value); }
    /**
     * @param {?} newColor
     * @return {?}
     */
    _updateColor(newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    }
    /**
     * @param {?} color
     * @param {?} isAdd
     * @return {?}
     */
    _setElementColor(color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, `mat-${color}`, isAdd);
        }
    }
    /**
     * Splits an svgIcon binding value into its icon set and icon name components.
     * Returns a 2-element array of [(icon set), (icon name)].
     * The separator for the two fields is ':'. If there is no separator, an empty
     * string is returned for the icon set and the entire value is returned for
     * the icon name. If the argument is falsy, returns an array of two empty strings.
     * Throws a MdIconInvalidNameError if the name contains two or more ':' separators.
     * Examples:
     *   'social:cake' -> ['social', 'cake']
     *   'penguin' -> ['', 'penguin']
     *   null -> ['', '']
     *   'a:b:c' -> (throws MdIconInvalidNameError)
     * @param {?} iconName
     * @return {?}
     */
    _splitIconName(iconName) {
        if (!iconName) {
            return ['', ''];
        }
        const /** @type {?} */ parts = iconName.split(':');
        switch (parts.length) {
            case 1:
                // Use default namespace.
                return ['', parts[0]];
            case 2:
                return (parts);
            default:
                throw new MdIconInvalidNameError(iconName);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ changedInputs = Object.keys(changes);
        // Only update the inline SVG icon if the inputs changed, to avoid unnecessary DOM operations.
        if (changedInputs.indexOf('svgIcon') != -1 || changedInputs.indexOf('svgSrc') != -1) {
            if (this.svgIcon) {
                const [namespace, iconName] = this._splitIconName(this.svgIcon);
                this._mdIconRegistry.getNamedSvgIcon(iconName, namespace).first().subscribe(svg => this._setSvgElement(svg), (err) => console.log(`Error retrieving icon: ${err.message}`));
            }
        }
        if (this._usingFontIcon()) {
            this._updateFontIconClasses();
        }
        this._updateAriaLabel();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Update font classes because ngOnChanges won't be called if none of the inputs are present,
        // e.g. <md-icon>arrow</md-icon>. In this case we need to add a CSS class for the default font.
        if (this._usingFontIcon()) {
            this._updateFontIconClasses();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        // Update aria label here because it may depend on the projected text content.
        // (e.g. <md-icon>home</md-icon> should use 'home').
        this._updateAriaLabel();
    }
    /**
     * @return {?}
     */
    _updateAriaLabel() {
        const /** @type {?} */ ariaLabel = this._getAriaLabel();
        if (ariaLabel && ariaLabel !== this._previousAriaLabel) {
            this._previousAriaLabel = ariaLabel;
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-label', ariaLabel);
        }
    }
    /**
     * @return {?}
     */
    _getAriaLabel() {
        // If the parent provided an aria-label attribute value, use it as-is. Otherwise look for a
        // reasonable value from the alt attribute, font icon name, SVG icon name, or (for ligatures)
        // the text content of the directive.
        const /** @type {?} */ label = this.hostAriaLabel ||
            this.alt ||
            this.fontIcon ||
            this._splitIconName(this.svgIcon)[1];
        if (label) {
            return label;
        }
        // The "content" of an SVG icon is not a useful label.
        if (this._usingFontIcon()) {
            const /** @type {?} */ text = this._elementRef.nativeElement.textContent;
            if (text) {
                return text;
            }
        }
        // TODO: Warn here in dev mode.
        return null;
    }
    /**
     * @return {?}
     */
    _usingFontIcon() {
        return !this.svgIcon;
    }
    /**
     * @param {?} svg
     * @return {?}
     */
    _setSvgElement(svg) {
        const /** @type {?} */ layoutElement = this._elementRef.nativeElement;
        // Remove existing child nodes and add the new SVG element.
        // We would use renderer.detachView(Array.from(layoutElement.childNodes)) here,
        // but it fails in IE11: https://github.com/angular/angular/issues/6327
        layoutElement.innerHTML = '';
        this._renderer.projectNodes(layoutElement, [svg]);
    }
    /**
     * @return {?}
     */
    _updateFontIconClasses() {
        if (!this._usingFontIcon()) {
            return;
        }
        const /** @type {?} */ elem = this._elementRef.nativeElement;
        const /** @type {?} */ fontSetClass = this.fontSet ?
            this._mdIconRegistry.classNameForFontAlias(this.fontSet) :
            this._mdIconRegistry.getDefaultFontSetClass();
        if (fontSetClass != this._previousFontSetClass) {
            if (this._previousFontSetClass) {
                this._renderer.setElementClass(elem, this._previousFontSetClass, false);
            }
            if (fontSetClass) {
                this._renderer.setElementClass(elem, fontSetClass, true);
            }
            this._previousFontSetClass = fontSetClass;
        }
        if (this.fontIcon != this._previousFontIconClass) {
            if (this._previousFontIconClass) {
                this._renderer.setElementClass(elem, this._previousFontIconClass, false);
            }
            if (this.fontIcon) {
                this._renderer.setElementClass(elem, this.fontIcon, true);
            }
            this._previousFontIconClass = this.fontIcon;
        }
    }
}
MdIcon.decorators = [
    { type: Component, args: [{template: '<ng-content></ng-content>',
                selector: 'md-icon, mat-icon',
                styles: [".mat-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px} /*# sourceMappingURL=icon.css.map */ "],
                host: {
                    'role': 'img',
                    '[class.mat-icon]': 'true',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/**
 * @nocollapse
 */
MdIcon.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
    { type: MdIconRegistry, },
];
MdIcon.propDecorators = {
    'svgIcon': [{ type: Input },],
    'fontSet': [{ type: Input },],
    'fontIcon': [{ type: Input },],
    'alt': [{ type: Input },],
    'hostAriaLabel': [{ type: Input, args: ['aria-label',] },],
    'color': [{ type: Input },],
};
function MdIcon_tsickle_Closure_declarations() {
    /** @type {?} */
    MdIcon.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdIcon.ctorParameters;
    /** @type {?} */
    MdIcon.propDecorators;
    /** @type {?} */
    MdIcon.prototype._color;
    /**
     * Name of the icon in the SVG icon set.
     * @type {?}
     */
    MdIcon.prototype.svgIcon;
    /**
     * Font set that the icon is a part of.
     * @type {?}
     */
    MdIcon.prototype.fontSet;
    /**
     * Name of an icon within a font set.
     * @type {?}
     */
    MdIcon.prototype.fontIcon;
    /**
     * Alt label to be used for accessibility.
     * @type {?}
     */
    MdIcon.prototype.alt;
    /**
     * Screenreader label for the icon.
     * @type {?}
     */
    MdIcon.prototype.hostAriaLabel;
    /** @type {?} */
    MdIcon.prototype._previousFontSetClass;
    /** @type {?} */
    MdIcon.prototype._previousFontIconClass;
    /** @type {?} */
    MdIcon.prototype._previousAriaLabel;
    /** @type {?} */
    MdIcon.prototype._elementRef;
    /** @type {?} */
    MdIcon.prototype._renderer;
    /** @type {?} */
    MdIcon.prototype._mdIconRegistry;
}
/**
 * @param {?} parentRegistry
 * @param {?} http
 * @param {?} sanitizer
 * @return {?}
 */
export function ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, http, sanitizer) {
    return parentRegistry || new MdIconRegistry(http, sanitizer);
}
;
export const /** @type {?} */ ICON_REGISTRY_PROVIDER = {
    // If there is already an MdIconRegistry available, use that. Otherwise, provide a new one.
    provide: MdIconRegistry,
    deps: [[new Optional(), new SkipSelf(), MdIconRegistry], Http, DomSanitizer],
    useFactory: ICON_REGISTRY_PROVIDER_FACTORY,
};
//# sourceMappingURL=icon.js.map