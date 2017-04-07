/**
 * Coerces a data-bound value (typically a string) to a boolean.
 * @param {?} value
 * @return {?}
 */
export function coerceBooleanProperty(value) {
    return value != null && `${value}` !== 'false';
}
//# sourceMappingURL=boolean-property.js.map