import { Component, HostBinding, ChangeDetectionStrategy, Input, ElementRef, NgZone, Renderer, Directive } from '@angular/core';
// TODO(josephperrott): Benchpress tests.
/** A single degree in radians. */
const /** @type {?} */ DEGREE_IN_RADIANS = Math.PI / 180;
/** Duration of the indeterminate animation. */
const /** @type {?} */ DURATION_INDETERMINATE = 667;
/** Duration of the indeterminate animation. */
const /** @type {?} */ DURATION_DETERMINATE = 225;
/** Start animation value of the indeterminate animation */
const /** @type {?} */ startIndeterminate = 3;
/** End animation value of the indeterminate animation */
const /** @type {?} */ endIndeterminate = 80;
/* Maximum angle for the arc. The angle can't be exactly 360, because the arc becomes hidden. */
const /** @type {?} */ MAX_ANGLE = 359.99 / 100;
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
export class MdProgressSpinnerCssMatStyler {
}
MdProgressSpinnerCssMatStyler.decorators = [
    { type: Directive, args: [{
                selector: 'md-progress-spinner, mat-progress-spinner',
                host: {
                    '[class.mat-progress-spinner]': 'true'
                }
            },] },
];
/**
 * @nocollapse
 */
MdProgressSpinnerCssMatStyler.ctorParameters = () => [];
function MdProgressSpinnerCssMatStyler_tsickle_Closure_declarations() {
    /** @type {?} */
    MdProgressSpinnerCssMatStyler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdProgressSpinnerCssMatStyler.ctorParameters;
}
/**
 * <md-progress-spinner> component.
 */
export class MdProgressSpinner {
    /**
     * @param {?} _ngZone
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_ngZone, _elementRef, _renderer) {
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._lastAnimationId = 0;
        this._mode = 'determinate';
        this._color = 'primary';
    }
    /**
     * Values for aria max and min are only defined as numbers when in a determinate mode.  We do this
     * because voiceover does not report the progress indicator as indeterminate if the aria min
     * and/or max value are number values.
     * @return {?}
     */
    get _ariaValueMin() {
        return this.mode == 'determinate' ? 0 : null;
    }
    /**
     * @return {?}
     */
    get _ariaValueMax() {
        return this.mode == 'determinate' ? 100 : null;
    }
    /**
     * \@docs-private
     * @return {?}
     */
    get interdeterminateInterval() {
        return this._interdeterminateInterval;
    }
    /**
     * \@docs-private
     * @param {?} interval
     * @return {?}
     */
    set interdeterminateInterval(interval) {
        clearInterval(this._interdeterminateInterval);
        this._interdeterminateInterval = interval;
    }
    /**
     * Clean up any animations that were running.
     * @return {?}
     */
    ngOnDestroy() {
        this._cleanupIndeterminateAnimation();
    }
    /**
     * The color of the progress-spinner. Can be primary, accent, or warn.
     * @return {?}
     */
    get color() { return this._color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._updateColor(value);
    }
    /**
     * Value of the progress circle. It is bound to the host as the attribute aria-valuenow.
     * @return {?}
     */
    get value() {
        if (this.mode == 'determinate') {
            return this._value;
        }
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v != null && this.mode == 'determinate') {
            let /** @type {?} */ newValue = clamp(v);
            this._animateCircle(this.value || 0, newValue);
            this._value = newValue;
        }
    }
    /**
     * Mode of the progress circle
     *
     * Input must be one of the values from ProgressMode, defaults to 'determinate'.
     * mode is bound to the host as the attribute host.
     * @return {?}
     */
    get mode() {
        return this._mode;
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    set mode(mode) {
        if (mode !== this._mode) {
            if (mode === 'indeterminate') {
                this._startIndeterminateAnimation();
            }
            else {
                this._cleanupIndeterminateAnimation();
                this._animateCircle(0, this._value);
            }
            this._mode = mode;
        }
    }
    /**
     * Animates the circle from one percentage value to another.
     *
     * @param {?} animateFrom The percentage of the circle filled starting the animation.
     * @param {?} animateTo The percentage of the circle filled ending the animation.
     * @param {?=} ease The easing function to manage the pace of change in the animation.
     * @param {?=} duration The length of time to show the animation, in milliseconds.
     * @param {?=} rotation The starting angle of the circle fill, with 0° represented at the top center
     *    of the circle.
     * @return {?}
     */
    _animateCircle(animateFrom, animateTo, ease = linearEase, duration = DURATION_DETERMINATE, rotation = 0) {
        let /** @type {?} */ id = ++this._lastAnimationId;
        let /** @type {?} */ startTime = Date.now();
        let /** @type {?} */ changeInValue = animateTo - animateFrom;
        // No need to animate it if the values are the same
        if (animateTo === animateFrom) {
            this._renderArc(animateTo, rotation);
        }
        else {
            let /** @type {?} */ animation = () => {
                let /** @type {?} */ elapsedTime = Math.max(0, Math.min(Date.now() - startTime, duration));
                this._renderArc(ease(elapsedTime, animateFrom, changeInValue, duration), rotation);
                // Prevent overlapping animations by checking if a new animation has been called for and
                // if the animation has lasted longer than the animation duration.
                if (id === this._lastAnimationId && elapsedTime < duration) {
                    requestAnimationFrame(animation);
                }
            };
            // Run the animation outside of Angular's zone, in order to avoid
            // hitting ZoneJS and change detection on each frame.
            this._ngZone.runOutsideAngular(animation);
        }
    }
    /**
     * Starts the indeterminate animation interval, if it is not already running.
     * @return {?}
     */
    _startIndeterminateAnimation() {
        let /** @type {?} */ rotationStartPoint = 0;
        let /** @type {?} */ start = startIndeterminate;
        let /** @type {?} */ end = endIndeterminate;
        let /** @type {?} */ duration = DURATION_INDETERMINATE;
        let /** @type {?} */ animate = () => {
            this._animateCircle(start, end, materialEase, duration, rotationStartPoint);
            // Prevent rotation from reaching Number.MAX_SAFE_INTEGER.
            rotationStartPoint = (rotationStartPoint + end) % 100;
            let /** @type {?} */ temp = start;
            start = -end;
            end = -temp;
        };
        if (!this.interdeterminateInterval) {
            this._ngZone.runOutsideAngular(() => {
                this.interdeterminateInterval = setInterval(animate, duration + 50, 0, false);
                animate();
            });
        }
    }
    /**
     * Removes interval, ending the animation.
     * @return {?}
     */
    _cleanupIndeterminateAnimation() {
        this.interdeterminateInterval = null;
    }
    /**
     * Renders the arc onto the SVG element. Proxies `getArc` while setting the proper
     * DOM attribute on the `<path>`.
     * @param {?} currentValue
     * @param {?=} rotation
     * @return {?}
     */
    _renderArc(currentValue, rotation = 0) {
        // Caches the path reference so it doesn't have to be looked up every time.
        let /** @type {?} */ path = this._path = this._path || this._elementRef.nativeElement.querySelector('path');
        // Ensure that the path was found. This may not be the case if the
        // animation function fires too early.
        if (path) {
            path.setAttribute('d', getSvgArc(currentValue, rotation));
        }
    }
    /**
     * Updates the color of the progress-spinner by adding the new palette class to the element
     * and removing the old one.
     * @param {?} newColor
     * @return {?}
     */
    _updateColor(newColor) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    }
    /**
     * Sets the given palette class on the component element.
     * @param {?} color
     * @param {?} isAdd
     * @return {?}
     */
    _setElementColor(color, isAdd) {
        if (color != null && color != '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, `mat-${color}`, isAdd);
        }
    }
}
MdProgressSpinner.decorators = [
    { type: Component, args: [{selector: 'md-progress-spinner, mat-progress-spinner',
                host: {
                    'role': 'progressbar',
                    '[attr.aria-valuemin]': '_ariaValueMin',
                    '[attr.aria-valuemax]': '_ariaValueMax'
                },
                template: "<!-- preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's center. The center of the circle will remain at the center of the md-progress-spinner element containing the SVG. --> <svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\"> <path></path> </svg> ",
                styles: [":host{display:block;height:100px;width:100px;overflow:hidden}:host svg{height:100%;width:100%;transform-origin:center}:host path{fill:transparent;stroke-width:10px;transition:stroke .3s cubic-bezier(.35,0,.25,1)}:host[mode=indeterminate] svg{animation-duration:5.25s,2.887s;animation-name:mat-progress-spinner-sporadic-rotate,mat-progress-spinner-linear-rotate;animation-timing-function:cubic-bezier(.35,0,.25,1),linear;animation-iteration-count:infinite;transition:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-sporadic-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}} /*# sourceMappingURL=progress-spinner.css.map */ "],
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/**
 * @nocollapse
 */
MdProgressSpinner.ctorParameters = () => [
    { type: NgZone, },
    { type: ElementRef, },
    { type: Renderer, },
];
MdProgressSpinner.propDecorators = {
    'color': [{ type: Input },],
    'value': [{ type: Input }, { type: HostBinding, args: ['attr.aria-valuenow',] },],
    'mode': [{ type: HostBinding, args: ['attr.mode',] }, { type: Input },],
};
function MdProgressSpinner_tsickle_Closure_declarations() {
    /** @type {?} */
    MdProgressSpinner.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdProgressSpinner.ctorParameters;
    /** @type {?} */
    MdProgressSpinner.propDecorators;
    /**
     * The id of the last requested animation.
     * @type {?}
     */
    MdProgressSpinner.prototype._lastAnimationId;
    /**
     * The id of the indeterminate interval.
     * @type {?}
     */
    MdProgressSpinner.prototype._interdeterminateInterval;
    /**
     * The SVG <path> node that is used to draw the circle.
     * @type {?}
     */
    MdProgressSpinner.prototype._path;
    /** @type {?} */
    MdProgressSpinner.prototype._mode;
    /** @type {?} */
    MdProgressSpinner.prototype._value;
    /** @type {?} */
    MdProgressSpinner.prototype._color;
    /** @type {?} */
    MdProgressSpinner.prototype._ngZone;
    /** @type {?} */
    MdProgressSpinner.prototype._elementRef;
    /** @type {?} */
    MdProgressSpinner.prototype._renderer;
}
/**
 * <md-spinner> component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate <md-progress-spinner> instance.
 */
export class MdSpinner extends MdProgressSpinner {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} renderer
     */
    constructor(elementRef, ngZone, renderer) {
        super(ngZone, elementRef, renderer);
        this.mode = 'indeterminate';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // The `ngOnDestroy` from `MdProgressSpinner` should be called explicitly, because
        // in certain cases Angular won't call it (e.g. when using AoT and in unit tests).
        super.ngOnDestroy();
    }
}
MdSpinner.decorators = [
    { type: Component, args: [{selector: 'md-spinner, mat-spinner',
                host: {
                    'role': 'progressbar',
                    'mode': 'indeterminate',
                    '[class.mat-spinner]': 'true',
                },
                template: "<!-- preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's center. The center of the circle will remain at the center of the md-progress-spinner element containing the SVG. --> <svg viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid meet\"> <path></path> </svg> ",
                styles: [":host{display:block;height:100px;width:100px;overflow:hidden}:host svg{height:100%;width:100%;transform-origin:center}:host path{fill:transparent;stroke-width:10px;transition:stroke .3s cubic-bezier(.35,0,.25,1)}:host[mode=indeterminate] svg{animation-duration:5.25s,2.887s;animation-name:mat-progress-spinner-sporadic-rotate,mat-progress-spinner-linear-rotate;animation-timing-function:cubic-bezier(.35,0,.25,1),linear;animation-iteration-count:infinite;transition:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-sporadic-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}} /*# sourceMappingURL=progress-spinner.css.map */ "],
            },] },
];
/**
 * @nocollapse
 */
MdSpinner.ctorParameters = () => [
    { type: ElementRef, },
    { type: NgZone, },
    { type: Renderer, },
];
function MdSpinner_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSpinner.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSpinner.ctorParameters;
}
/**
 * Clamps a value to be between 0 and 100.
 * @param {?} v
 * @return {?}
 */
function clamp(v) {
    return Math.max(0, Math.min(100, v));
}
/**
 * Converts Polar coordinates to Cartesian.
 * @param {?} radius
 * @param {?} pathRadius
 * @param {?} angleInDegrees
 * @return {?}
 */
function polarToCartesian(radius, pathRadius, angleInDegrees) {
    let /** @type {?} */ angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
    return (radius + (pathRadius * Math.cos(angleInRadians))) +
        ',' + (radius + (pathRadius * Math.sin(angleInRadians)));
}
/**
 * Easing function for linear animation.
 * @param {?} currentTime
 * @param {?} startValue
 * @param {?} changeInValue
 * @param {?} duration
 * @return {?}
 */
function linearEase(currentTime, startValue, changeInValue, duration) {
    return changeInValue * currentTime / duration + startValue;
}
/**
 * Easing function to match material design indeterminate animation.
 * @param {?} currentTime
 * @param {?} startValue
 * @param {?} changeInValue
 * @param {?} duration
 * @return {?}
 */
function materialEase(currentTime, startValue, changeInValue, duration) {
    let /** @type {?} */ time = currentTime / duration;
    let /** @type {?} */ timeCubed = Math.pow(time, 3);
    let /** @type {?} */ timeQuad = Math.pow(time, 4);
    let /** @type {?} */ timeQuint = Math.pow(time, 5);
    return startValue + changeInValue * ((6 * timeQuint) + (-15 * timeQuad) + (10 * timeCubed));
}
/**
 * Determines the path value to define the arc.  Converting percentage values to to polar
 * coordinates on the circle, and then to cartesian coordinates in the viewport.
 *
 * @param {?} currentValue The current percentage value of the progress circle, the percentage of the
 *    circle to fill.
 * @param {?} rotation The starting point of the circle with 0 being the 0 degree point.
 * @return {?} A string for an SVG path representing a circle filled from the starting point to the
 *    percentage value provided.
 */
function getSvgArc(currentValue, rotation) {
    let /** @type {?} */ startPoint = rotation || 0;
    let /** @type {?} */ radius = 50;
    let /** @type {?} */ pathRadius = 40;
    let /** @type {?} */ startAngle = startPoint * MAX_ANGLE;
    let /** @type {?} */ endAngle = currentValue * MAX_ANGLE;
    let /** @type {?} */ start = polarToCartesian(radius, pathRadius, startAngle);
    let /** @type {?} */ end = polarToCartesian(radius, pathRadius, endAngle + startAngle);
    let /** @type {?} */ arcSweep = endAngle < 0 ? 0 : 1;
    let /** @type {?} */ largeArcFlag;
    if (endAngle < 0) {
        largeArcFlag = endAngle >= -180 ? 0 : 1;
    }
    else {
        largeArcFlag = endAngle <= 180 ? 0 : 1;
    }
    return `M${start}A${pathRadius},${pathRadius} 0 ${largeArcFlag},${arcSweep} ${end}`;
}
//# sourceMappingURL=progress-spinner.js.map