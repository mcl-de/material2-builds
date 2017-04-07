// Due to a bug in the ChromeDriver, Angular keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
export const /** @type {?} */ UP_ARROW = 38;
export const /** @type {?} */ DOWN_ARROW = 40;
export const /** @type {?} */ RIGHT_ARROW = 39;
export const /** @type {?} */ LEFT_ARROW = 37;
export const /** @type {?} */ PAGE_UP = 33;
export const /** @type {?} */ PAGE_DOWN = 34;
export const /** @type {?} */ HOME = 36;
export const /** @type {?} */ END = 35;
export const /** @type {?} */ ENTER = 13;
export const /** @type {?} */ SPACE = 32;
export const /** @type {?} */ TAB = 9;
export const /** @type {?} */ ESCAPE = 27;
export const /** @type {?} */ BACKSPACE = 8;
export const /** @type {?} */ DELETE = 46;
//# sourceMappingURL=keycodes.js.map