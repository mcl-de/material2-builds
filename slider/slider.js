import { Component, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '../core';
import { Dir } from '../core/rtl/dir';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '../core/keyboard/keycodes';
import { FocusOriginMonitor } from '../core/style/focus-origin-monitor';
/**
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 */
const /** @type {?} */ MIN_AUTO_TICK_SEPARATION = 30;
/** The thumb gap size for a disabled slider. */
const /** @type {?} */ DISABLED_THUMB_GAP = 7;
/** The thumb gap size for a non-active slider at its minimum value. */
const /** @type {?} */ MIN_VALUE_NONACTIVE_THUMB_GAP = 7;
/** The thumb gap size for an active slider at its minimum value. */
const /** @type {?} */ MIN_VALUE_ACTIVE_THUMB_GAP = 10;
/**
 * Provider Expression that allows md-slider to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and [formControl].
 */
export const /** @type {?} */ MD_SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdSlider),
    multi: true
};
/**
 * A simple change event emitted by the MdSlider component.
 */
export class MdSliderChange {
}
function MdSliderChange_tsickle_Closure_declarations() {
    /**
     * The MdSlider that changed.
     * @type {?}
     */
    MdSliderChange.prototype.source;
    /**
     * Thew new value of the source slider.
     * @type {?}
     */
    MdSliderChange.prototype.value;
}
/**
 * Allows users to select from a range of values by moving the slider thumb. It is similar in
 * behavior to the native `<input type="range">` element.
 */
export class MdSlider {
    /**
     * @param {?} renderer
     * @param {?} _elementRef
     * @param {?} _focusOriginMonitor
     * @param {?} _dir
     */
    constructor(renderer, _elementRef, _focusOriginMonitor, _dir) {
        this._elementRef = _elementRef;
        this._focusOriginMonitor = _focusOriginMonitor;
        this._dir = _dir;
        this._disabled = false;
        this._invert = false;
        this._max = 100;
        this._min = 0;
        this._step = 1;
        this._thumbLabel = false;
        this._tickInterval = 0;
        this._value = null;
        this._vertical = false;
        this.color = 'accent';
        /** Event emitted when the slider value has changed. */
        this.change = new EventEmitter();
        /** Event emitted when the slider thumb moves. */
        this.input = new EventEmitter();
        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
        this.onTouched = () => { };
        this._percent = 0;
        /**
         * Whether or not the thumb is sliding.
         * Used to determine if there should be a transition for the thumb and fill track.
         */
        this._isSliding = false;
        /**
         * Whether or not the slider is active (clicked or sliding).
         * Used to shrink and grow the thumb as according to the Material Design spec.
         */
        this._isActive = false;
        this._tickIntervalPercent = 0;
        this._renderer = null;
        this._sliderDimensions = null;
        this._controlValueAccessorChangeFn = () => { };
        this._lastChangeValue = null;
        this._lastInputValue = null;
        this._focusOriginMonitor.monitor(this._elementRef.nativeElement, renderer, true)
            .subscribe((origin) => this._isActive = !!origin && origin !== 'keyboard');
        this._renderer = new SliderRenderer(this._elementRef);
    }
    /**
     * Whether or not the slider is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * Whether the slider is inverted.
     * @return {?}
     */
    get invert() { return this._invert; }
    /**
     * @param {?} value
     * @return {?}
     */
    set invert(value) { this._invert = coerceBooleanProperty(value); }
    /**
     * The maximum value that the slider can have.
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set max(v) {
        this._max = coerceNumberProperty(v, this._max);
        this._percent = this._calculatePercentage(this._value);
    }
    /**
     * The minimum value that the slider can have.
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set min(v) {
        this._min = coerceNumberProperty(v, this._min);
        // If the value wasn't explicitly set by the user, set it to the min.
        if (this._value === null) {
            this.value = this._min;
        }
        this._percent = this._calculatePercentage(this._value);
    }
    /**
     * The values at which the thumb will snap.
     * @return {?}
     */
    get step() { return this._step; }
    /**
     * @param {?} v
     * @return {?}
     */
    set step(v) {
        this._step = coerceNumberProperty(v, this._step);
        if (this._step % 1 !== 0) {
            this._roundLabelTo = this._step.toString().split('.').pop().length;
        }
    }
    /**
     * Whether or not to show the thumb label.
     * @return {?}
     */
    get thumbLabel() { return this._thumbLabel; }
    /**
     * @param {?} value
     * @return {?}
     */
    set thumbLabel(value) { this._thumbLabel = coerceBooleanProperty(value); }
    /**
     * @deprecated
     * @return {?}
     */
    get _thumbLabelDeprecated() { return this._thumbLabel; }
    /**
     * @param {?} value
     * @return {?}
     */
    set _thumbLabelDeprecated(value) { this._thumbLabel = value; }
    /**
     * How often to show ticks. Relative to the step so that a tick always appears on a step.
     * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
     * @return {?}
     */
    get tickInterval() { return this._tickInterval; }
    /**
     * @param {?} value
     * @return {?}
     */
    set tickInterval(value) {
        if (value === 'auto') {
            this._tickInterval = 'auto';
        }
        else if (typeof value === 'number' || typeof value === 'string') {
            this._tickInterval = coerceNumberProperty(value, /** @type {?} */ (this._tickInterval));
        }
        else {
            this._tickInterval = 0;
        }
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _tickIntervalDeprecated() { return this.tickInterval; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _tickIntervalDeprecated(v) { this.tickInterval = v; }
    /**
     * Value of the slider.
     * @return {?}
     */
    get value() {
        // If the value needs to be read and it is still uninitialized, initialize it to the min.
        if (this._value === null) {
            this.value = this._min;
        }
        return this._value;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        this._value = coerceNumberProperty(v, this._value);
        this._percent = this._calculatePercentage(this._value);
    }
    /**
     * Whether the slider is vertical.
     * @return {?}
     */
    get vertical() { return this._vertical; }
    /**
     * @param {?} value
     * @return {?}
     */
    set vertical(value) { this._vertical = coerceBooleanProperty(value); }
    /**
     * The value to be used for display purposes.
     * @return {?}
     */
    get displayValue() {
        // Note that this could be improved further by rounding something like 0.999 to 1 or
        // 0.899 to 0.9, however it is very performance sensitive, because it gets called on
        // every change detection cycle.
        if (this._roundLabelTo && this.value % 1 !== 0) {
            return this.value.toFixed(this._roundLabelTo);
        }
        return this.value;
    }
    /**
     * The percentage of the slider that coincides with the value.
     * @return {?}
     */
    get percent() { return this._clamp(this._percent); }
    /**
     * Whether the axis of the slider is inverted.
     * (i.e. whether moving the thumb in the positive x or y direction decreases the slider's value).
     * @return {?}
     */
    get _invertAxis() {
        // Standard non-inverted mode for a vertical slider should be dragging the thumb from bottom to
        // top. However from a y-axis standpoint this is inverted.
        return this.vertical ? !this.invert : this.invert;
    }
    /**
     * Whether the slider is at its minimum value.
     * @return {?}
     */
    get _isMinValue() {
        return this.percent === 0;
    }
    /**
     * The amount of space to leave between the slider thumb and the track fill & track background
     * elements.
     * @return {?}
     */
    get _thumbGap() {
        if (this.disabled) {
            return DISABLED_THUMB_GAP;
        }
        if (this._isMinValue && !this.thumbLabel) {
            return this._isActive ? MIN_VALUE_ACTIVE_THUMB_GAP : MIN_VALUE_NONACTIVE_THUMB_GAP;
        }
        return 0;
    }
    /**
     * CSS styles for the track background element.
     * @return {?}
     */
    get _trackBackgroundStyles() {
        let /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
        let /** @type {?} */ sign = this._invertMouseCoords ? '-' : '';
        return {
            'transform': `translate${axis}(${sign}${this._thumbGap}px) scale${axis}(${1 - this.percent})`
        };
    }
    /**
     * CSS styles for the track fill element.
     * @return {?}
     */
    get _trackFillStyles() {
        let /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
        let /** @type {?} */ sign = this._invertMouseCoords ? '' : '-';
        return {
            'transform': `translate${axis}(${sign}${this._thumbGap}px) scale${axis}(${this.percent})`
        };
    }
    /**
     * CSS styles for the ticks container element.
     * @return {?}
     */
    get _ticksContainerStyles() {
        let /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
        // For a horizontal slider in RTL languages we push the ticks container off the left edge
        // instead of the right edge to avoid causing a horizontal scrollbar to appear.
        let /** @type {?} */ sign = !this.vertical && this._direction == 'rtl' ? '' : '-';
        let /** @type {?} */ offset = this._tickIntervalPercent / 2 * 100;
        return {
            'transform': `translate${axis}(${sign}${offset}%)`
        };
    }
    /**
     * CSS styles for the ticks element.
     * @return {?}
     */
    get _ticksStyles() {
        let /** @type {?} */ tickSize = this._tickIntervalPercent * 100;
        let /** @type {?} */ backgroundSize = this.vertical ? `2px ${tickSize}%` : `${tickSize}% 2px`;
        let /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
        // Depending on the direction we pushed the ticks container, push the ticks the opposite
        // direction to re-center them but clip off the end edge. In RTL languages we need to flip the
        // ticks 180 degrees so we're really cutting off the end edge abd not the start.
        let /** @type {?} */ sign = !this.vertical && this._direction == 'rtl' ? '-' : '';
        let /** @type {?} */ rotate = !this.vertical && this._direction == 'rtl' ? ' rotate(180deg)' : '';
        let /** @type {?} */ styles = {
            'backgroundSize': backgroundSize,
            // Without translateZ ticks sometimes jitter as the slider moves on Chrome & Firefox.
            'transform': `translateZ(0) translate${axis}(${sign}${tickSize / 2}%)${rotate}`
        };
        if (this._isMinValue && this._thumbGap) {
            let /** @type {?} */ side = this.vertical ?
                (this._invertAxis ? 'Bottom' : 'Top') :
                (this._invertAxis ? 'Right' : 'Left');
            styles[`padding${side}`] = `${this._thumbGap}px`;
        }
        return styles;
    }
    /**
     * @return {?}
     */
    get _thumbContainerStyles() {
        let /** @type {?} */ axis = this.vertical ? 'Y' : 'X';
        // For a horizontal slider in RTL languages we push the thumb container off the left edge
        // instead of the right edge to avoid causing a horizontal scrollbar to appear.
        let /** @type {?} */ invertOffset = (this._direction == 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
        let /** @type {?} */ offset = (invertOffset ? this.percent : 1 - this.percent) * 100;
        return {
            'transform': `translate${axis}(-${offset}%)`
        };
    }
    /**
     * Whether mouse events should be converted to a slider position by calculating their distance
     * from the right or bottom edge of the slider as opposed to the top or left.
     * @return {?}
     */
    get _invertMouseCoords() {
        return (this._direction == 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
    }
    /**
     * The language direction for this slider element.
     * @return {?}
     */
    get _direction() {
        return (this._dir && this._dir.value == 'rtl') ? 'rtl' : 'ltr';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusOriginMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    _onMouseenter() {
        if (this.disabled) {
            return;
        }
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._renderer.getSliderDimensions();
        this._updateTickIntervalPercent();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onClick(event) {
        if (this.disabled) {
            return;
        }
        this._isSliding = false;
        this._renderer.addFocus();
        this._updateValueFromPosition({ x: event.clientX, y: event.clientY });
        /* Emits a change and input event if the value changed. */
        this._emitInputEvent();
        this._emitValueIfChanged();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onSlide(event) {
        if (this.disabled) {
            return;
        }
        // Prevent the slide from selecting anything else.
        event.preventDefault();
        this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
        // Native range elements always emit `input` events when the value changed while sliding.
        this._emitInputEvent();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onSlideStart(event) {
        if (this.disabled) {
            return;
        }
        // Simulate mouseenter in case this is a mobile device.
        this._onMouseenter();
        event.preventDefault();
        this._isSliding = true;
        this._renderer.addFocus();
        this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
    }
    /**
     * @return {?}
     */
    _onSlideEnd() {
        this._isSliding = false;
        this._emitValueIfChanged();
    }
    /**
     * @return {?}
     */
    _onFocus() {
        // We save the dimensions of the slider here so we can use them to update the spacing of the
        // ticks and determine where on the slider click and slide events happen.
        this._sliderDimensions = this._renderer.getSliderDimensions();
        this._updateTickIntervalPercent();
    }
    /**
     * @return {?}
     */
    _onBlur() {
        this.onTouched();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onKeydown(event) {
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case PAGE_UP:
                this._increment(10);
                break;
            case PAGE_DOWN:
                this._increment(-10);
                break;
            case END:
                this.value = this.max;
                break;
            case HOME:
                this.value = this.min;
                break;
            case LEFT_ARROW:
                // NOTE: For a sighted user it would make more sense that when they press an arrow key on an
                // inverted slider the thumb moves in that direction. However for a blind user, nothing
                // about the slider indicates that it is inverted. They will expect left to be decrement,
                // regardless of how it appears on the screen. For speakers ofRTL languages, they probably
                // expect left to mean increment. Therefore we flip the meaning of the side arrow keys for
                // RTL. For inverted sliders we prefer a good a11y experience to having it "look right" for
                // sighted users, therefore we do not swap the meaning.
                this._increment(this._direction == 'rtl' ? 1 : -1);
                break;
            case UP_ARROW:
                this._increment(1);
                break;
            case RIGHT_ARROW:
                // See comment on LEFT_ARROW about the conditions under which we flip the meaning.
                this._increment(this._direction == 'rtl' ? -1 : 1);
                break;
            case DOWN_ARROW:
                this._increment(-1);
                break;
            default:
                // Return if the key is not one that we explicitly handle to avoid calling preventDefault on
                // it.
                return;
        }
        this._isSliding = true;
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    _onKeyup() {
        this._isSliding = false;
    }
    /**
     * Increments the slider by the given number of steps (negative number decrements).
     * @param {?} numSteps
     * @return {?}
     */
    _increment(numSteps) {
        this.value = this._clamp(this.value + this.step * numSteps, this.min, this.max);
        this._emitInputEvent();
        this._emitValueIfChanged();
    }
    /**
     * Calculate the new value from the new physical location. The value will always be snapped.
     * @param {?} pos
     * @return {?}
     */
    _updateValueFromPosition(pos) {
        if (!this._sliderDimensions) {
            return;
        }
        let /** @type {?} */ offset = this.vertical ? this._sliderDimensions.top : this._sliderDimensions.left;
        let /** @type {?} */ size = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
        let /** @type {?} */ posComponent = this.vertical ? pos.y : pos.x;
        // The exact value is calculated from the event and used to find the closest snap value.
        let /** @type {?} */ percent = this._clamp((posComponent - offset) / size);
        if (this._invertMouseCoords) {
            percent = 1 - percent;
        }
        let /** @type {?} */ exactValue = this._calculateValue(percent);
        // This calculation finds the closest step by finding the closest whole number divisible by the
        // step relative to the min.
        let /** @type {?} */ closestValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;
        // The value needs to snap to the min and max.
        this.value = this._clamp(closestValue, this.min, this.max);
    }
    /**
     * Emits a change event if the current value is different from the last emitted value.
     * @return {?}
     */
    _emitValueIfChanged() {
        if (this.value != this._lastChangeValue) {
            let /** @type {?} */ event = this._createChangeEvent();
            this._lastChangeValue = this.value;
            this._controlValueAccessorChangeFn(this.value);
            this.change.emit(event);
        }
    }
    /**
     * Emits an input event when the current value is different from the last emitted value.
     * @return {?}
     */
    _emitInputEvent() {
        if (this.value != this._lastInputValue) {
            let /** @type {?} */ event = this._createChangeEvent();
            this._lastInputValue = this.value;
            this.input.emit(event);
        }
    }
    /**
     * Updates the amount of space between ticks as a percentage of the width of the slider.
     * @return {?}
     */
    _updateTickIntervalPercent() {
        if (!this.tickInterval) {
            return;
        }
        if (this.tickInterval == 'auto') {
            let /** @type {?} */ trackSize = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
            let /** @type {?} */ pixelsPerStep = trackSize * this.step / (this.max - this.min);
            let /** @type {?} */ stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
            let /** @type {?} */ pixelsPerTick = stepsPerTick * this.step;
            this._tickIntervalPercent = pixelsPerTick / trackSize;
        }
        else {
            this._tickIntervalPercent = this.tickInterval * this.step / (this.max - this.min);
        }
    }
    /**
     * Creates a slider change object from the specified value.
     * @param {?=} value
     * @return {?}
     */
    _createChangeEvent(value = this.value) {
        let /** @type {?} */ event = new MdSliderChange();
        event.source = this;
        event.value = value;
        return event;
    }
    /**
     * Calculates the percentage of the slider that a value is.
     * @param {?} value
     * @return {?}
     */
    _calculatePercentage(value) {
        return (value - this.min) / (this.max - this.min);
    }
    /**
     * Calculates the value a percentage of the slider corresponds to.
     * @param {?} percentage
     * @return {?}
     */
    _calculateValue(percentage) {
        return this.min + percentage * (this.max - this.min);
    }
    /**
     * Return a number between two numbers.
     * @param {?} value
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    _clamp(value, min = 0, max = 1) {
        return Math.max(min, Math.min(value, max));
    }
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * Registers a callback to eb triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    /**
     * Registers a callback to be triggered when the component is touched.
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn Callback to be registered.
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Sets whether the component should be disabled.
     * Implemented as part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
MdSlider.decorators = [
    { type: Component, args: [{selector: 'md-slider, mat-slider',
                providers: [MD_SLIDER_VALUE_ACCESSOR],
                host: {
                    '[class.mat-slider]': 'true',
                    '(focus)': '_onFocus()',
                    '(blur)': '_onBlur()',
                    '(click)': '_onClick($event)',
                    '(keydown)': '_onKeydown($event)',
                    '(keyup)': '_onKeyup()',
                    '(mouseenter)': '_onMouseenter()',
                    '(slide)': '_onSlide($event)',
                    '(slideend)': '_onSlideEnd()',
                    '(slidestart)': '_onSlideStart($event)',
                    'role': 'slider',
                    'tabindex': '0',
                    '[attr.aria-disabled]': 'disabled',
                    '[attr.aria-valuemax]': 'max',
                    '[attr.aria-valuemin]': 'min',
                    '[attr.aria-valuenow]': 'value',
                    '[class.mat-primary]': 'color == "primary"',
                    '[class.mat-accent]': 'color != "primary" && color != "warn"',
                    '[class.mat-warn]': 'color == "warn"',
                    '[class.mat-slider-disabled]': 'disabled',
                    '[class.mat-slider-has-ticks]': 'tickInterval',
                    '[class.mat-slider-horizontal]': '!vertical',
                    '[class.mat-slider-axis-inverted]': '_invertAxis',
                    '[class.mat-slider-sliding]': '_isSliding',
                    '[class.mat-slider-thumb-label-showing]': 'thumbLabel',
                    '[class.mat-slider-vertical]': 'vertical',
                    '[class.mat-slider-min-value]': '_isMinValue',
                    '[class.mat-slider-hide-last-tick]': 'disabled || _isMinValue && _thumbGap && _invertAxis',
                },
                template: "<div class=\"mat-slider-wrapper\"> <div class=\"mat-slider-track-wrapper\"> <div class=\"mat-slider-track-background\" [ngStyle]=\"_trackBackgroundStyles\"></div> <div class=\"mat-slider-track-fill\" [ngStyle]=\"_trackFillStyles\"></div> </div> <div class=\"mat-slider-ticks-container\" [ngStyle]=\"_ticksContainerStyles\"> <div class=\"mat-slider-ticks\" [ngStyle]=\"_ticksStyles\"></div> </div> <div class=\"mat-slider-thumb-container\" [ngStyle]=\"_thumbContainerStyles\"> <div class=\"mat-slider-focus-ring\"></div> <div class=\"mat-slider-thumb\"></div> <div class=\"mat-slider-thumb-label\"> <span class=\"mat-slider-thumb-label-text\">{{displayValue}}</span> </div> </div> </div> ",
                styles: [".mat-slider{display:inline-block;position:relative;box-sizing:border-box;padding:8px;outline:0;vertical-align:middle}.mat-slider-wrapper{position:absolute}.mat-slider-track-wrapper{position:absolute;top:0;left:0;overflow:hidden}.mat-slider-track-fill{position:absolute;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-track-background{position:absolute;transform-origin:100% 100%;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-ticks-container{position:absolute;left:0;top:0;overflow:hidden}.mat-slider-ticks{box-sizing:border-box;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-container{position:absolute;z-index:1;transition:transform .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-focus-ring{position:absolute;width:30px;height:30px;border-radius:50%;transform:scale(0);opacity:0;transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),opacity .4s cubic-bezier(.25,.8,.25,1)}.cdk-keyboard-focused .mat-slider-focus-ring{transform:scale(1);opacity:1}.mat-slider-thumb{position:absolute;right:-10px;bottom:-10px;box-sizing:border-box;width:20px;height:20px;border:3px solid transparent;border-radius:50%;transform:scale(.7);transition:transform .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1),border-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label{display:none;align-items:center;justify-content:center;position:absolute;width:28px;height:28px;border-radius:50%;transition:transform .4s cubic-bezier(.25,.8,.25,1),border-radius .4s cubic-bezier(.25,.8,.25,1),background-color .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-thumb-label-text{z-index:1;font-size:12px;font-weight:700;opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-sliding .mat-slider-thumb-container,.mat-slider-sliding .mat-slider-track-background,.mat-slider-sliding .mat-slider-track-fill{transition-duration:0s}.mat-slider-has-ticks .mat-slider-wrapper::after{content:'';position:absolute;border:0 solid rgba(0,0,0,.6);opacity:0;transition:opacity .4s cubic-bezier(.25,.8,.25,1)}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after,.mat-slider-has-ticks:hover:not(.mat-slider-hide-last-tick) .mat-slider-wrapper::after{opacity:1}.mat-slider-has-ticks.cdk-focused:not(.mat-slider-disabled) .mat-slider-ticks,.mat-slider-has-ticks:hover:not(.mat-slider-disabled) .mat-slider-ticks{opacity:1}.mat-slider-thumb-label-showing .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-thumb-label-showing .mat-slider-thumb-label{display:flex}.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:100% 100%}.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:0 0}.cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(0)}.cdk-focused .mat-slider-thumb-label{border-radius:50% 50% 0}.cdk-focused .mat-slider-thumb-label-text{opacity:1}.cdk-mouse-focused .mat-slider-thumb,.cdk-program-focused .mat-slider-thumb,.cdk-touch-focused .mat-slider-thumb{border-width:2px;transform:scale(1)}.mat-slider-disabled .mat-slider-focus-ring{transform:scale(0);opacity:0}.mat-slider-disabled .mat-slider-thumb{border-width:4px;transform:scale(.5)}.mat-slider-disabled .mat-slider-thumb-label{display:none}.mat-slider-horizontal{height:48px;min-width:128px}.mat-slider-horizontal .mat-slider-wrapper{height:2px;top:23px;left:8px;right:8px}.mat-slider-horizontal .mat-slider-wrapper::after{height:2px;border-left-width:2px;right:0;top:0}.mat-slider-horizontal .mat-slider-track-wrapper{height:2px;width:100%}.mat-slider-horizontal .mat-slider-track-fill{height:2px;width:100%;transform:scaleX(0)}.mat-slider-horizontal .mat-slider-track-background{height:2px;width:100%;transform:scaleX(1)}.mat-slider-horizontal .mat-slider-ticks-container{height:2px;width:100%}.mat-slider-horizontal .mat-slider-ticks{background:repeating-linear-gradient(to right,rgba(0,0,0,.6),rgba(0,0,0,.6) 2px,transparent 0,transparent) repeat;background:-moz-repeating-linear-gradient(.0001deg,rgba(0,0,0,.6),rgba(0,0,0,.6) 2px,transparent 0,transparent) repeat;background-clip:content-box;height:2px;width:100%}.mat-slider-horizontal .mat-slider-thumb-container{width:100%;height:0;top:50%}.mat-slider-horizontal .mat-slider-focus-ring{top:-15px;right:-15px}.mat-slider-horizontal .mat-slider-thumb-label{right:-14px;top:-40px;transform:translateY(26px) scale(.01) rotate(45deg)}.mat-slider-horizontal .mat-slider-thumb-label-text{transform:rotate(-45deg)}.mat-slider-horizontal.cdk-focused .mat-slider-thumb-label{transform:rotate(45deg)}.mat-slider-vertical{width:48px;min-height:128px}.mat-slider-vertical .mat-slider-wrapper{width:2px;top:8px;bottom:8px;left:23px}.mat-slider-vertical .mat-slider-wrapper::after{width:2px;border-top-width:2px;bottom:0;left:0}.mat-slider-vertical .mat-slider-track-wrapper{height:100%;width:2px}.mat-slider-vertical .mat-slider-track-fill{height:100%;width:2px;transform:scaleY(0)}.mat-slider-vertical .mat-slider-track-background{height:100%;width:2px;transform:scaleY(1)}.mat-slider-vertical .mat-slider-ticks-container{width:2px;height:100%}.mat-slider-vertical .mat-slider-focus-ring{bottom:-15px;left:-15px}.mat-slider-vertical .mat-slider-ticks{background:repeating-linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.6) 2px,transparent 0,transparent) repeat;background-clip:content-box;width:2px;height:100%}.mat-slider-vertical .mat-slider-thumb-container{height:100%;width:0;left:50%}.mat-slider-vertical .mat-slider-thumb-label{bottom:-14px;left:-40px;transform:translateX(26px) scale(.01) rotate(-45deg)}.mat-slider-vertical .mat-slider-thumb-label-text{transform:rotate(45deg)}.mat-slider-vertical.cdk-focused .mat-slider-thumb-label{transform:rotate(-45deg)}[dir=rtl] .mat-slider-wrapper::after{left:0;right:auto}[dir=rtl] .mat-slider-horizontal .mat-slider-track-fill{transform-origin:100% 100%}[dir=rtl] .mat-slider-horizontal .mat-slider-track-background{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-fill{transform-origin:0 0}[dir=rtl] .mat-slider-horizontal.mat-slider-axis-inverted .mat-slider-track-background{transform-origin:100% 100%} /*# sourceMappingURL=slider.css.map */ "],
                encapsulation: ViewEncapsulation.None,
            },] },
];
/**
 * @nocollapse
 */
MdSlider.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
    { type: FocusOriginMonitor, },
    { type: Dir, decorators: [{ type: Optional },] },
];
MdSlider.propDecorators = {
    'disabled': [{ type: Input },],
    'invert': [{ type: Input },],
    'max': [{ type: Input },],
    'min': [{ type: Input },],
    'step': [{ type: Input },],
    'thumbLabel': [{ type: Input },],
    '_thumbLabelDeprecated': [{ type: Input, args: ['thumb-label',] },],
    'tickInterval': [{ type: Input },],
    '_tickIntervalDeprecated': [{ type: Input, args: ['tick-interval',] },],
    'value': [{ type: Input },],
    'vertical': [{ type: Input },],
    'color': [{ type: Input },],
    'change': [{ type: Output },],
    'input': [{ type: Output },],
};
function MdSlider_tsickle_Closure_declarations() {
    /** @type {?} */
    MdSlider.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MdSlider.ctorParameters;
    /** @type {?} */
    MdSlider.propDecorators;
    /** @type {?} */
    MdSlider.prototype._disabled;
    /** @type {?} */
    MdSlider.prototype._invert;
    /** @type {?} */
    MdSlider.prototype._max;
    /** @type {?} */
    MdSlider.prototype._min;
    /** @type {?} */
    MdSlider.prototype._step;
    /** @type {?} */
    MdSlider.prototype._thumbLabel;
    /** @type {?} */
    MdSlider.prototype._tickInterval;
    /** @type {?} */
    MdSlider.prototype._value;
    /** @type {?} */
    MdSlider.prototype._vertical;
    /** @type {?} */
    MdSlider.prototype.color;
    /**
     * Event emitted when the slider value has changed.
     * @type {?}
     */
    MdSlider.prototype.change;
    /**
     * Event emitted when the slider thumb moves.
     * @type {?}
     */
    MdSlider.prototype.input;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     * @type {?}
     */
    MdSlider.prototype.onTouched;
    /** @type {?} */
    MdSlider.prototype._percent;
    /**
     * Whether or not the thumb is sliding.
     * Used to determine if there should be a transition for the thumb and fill track.
     * @type {?}
     */
    MdSlider.prototype._isSliding;
    /**
     * Whether or not the slider is active (clicked or sliding).
     * Used to shrink and grow the thumb as according to the Material Design spec.
     * @type {?}
     */
    MdSlider.prototype._isActive;
    /**
     * The size of a tick interval as a percentage of the size of the track.
     * @type {?}
     */
    MdSlider.prototype._tickIntervalPercent;
    /**
     * A renderer to handle updating the slider's thumb and fill track.
     * @type {?}
     */
    MdSlider.prototype._renderer;
    /**
     * The dimensions of the slider.
     * @type {?}
     */
    MdSlider.prototype._sliderDimensions;
    /** @type {?} */
    MdSlider.prototype._controlValueAccessorChangeFn;
    /**
     * The last value for which a change event was emitted.
     * @type {?}
     */
    MdSlider.prototype._lastChangeValue;
    /**
     * The last value for which an input event was emitted.
     * @type {?}
     */
    MdSlider.prototype._lastInputValue;
    /**
     * Decimal places to round to, based on the step amount.
     * @type {?}
     */
    MdSlider.prototype._roundLabelTo;
    /** @type {?} */
    MdSlider.prototype._elementRef;
    /** @type {?} */
    MdSlider.prototype._focusOriginMonitor;
    /** @type {?} */
    MdSlider.prototype._dir;
}
/**
 * Renderer class in order to keep all dom manipulation in one place and outside of the main class.
 * \@docs-private
 */
export class SliderRenderer {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this._sliderElement = elementRef.nativeElement;
    }
    /**
     * Get the bounding client rect of the slider track element.
     * The track is used rather than the native element to ignore the extra space that the thumb can
     * take up.
     * @return {?}
     */
    getSliderDimensions() {
        let /** @type {?} */ wrapperElement = this._sliderElement.querySelector('.mat-slider-wrapper');
        return wrapperElement.getBoundingClientRect();
    }
    /**
     * Focuses the native element.
     * Currently only used to allow a blur event to fire but will be used with keyboard input later.
     * @return {?}
     */
    addFocus() {
        this._sliderElement.focus();
    }
}
function SliderRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    SliderRenderer.prototype._sliderElement;
}
//# sourceMappingURL=slider.js.map