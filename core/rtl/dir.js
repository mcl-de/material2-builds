import { NgModule, Directive, HostBinding, Output, Input, EventEmitter } from '@angular/core';
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Applications should use this directive instead of the native attribute so that Material
 * components can listen on changes of direction.
 */
export class Dir {
    constructor() {
        /** Layout direction of the element. */
        this._dir = 'ltr';
        /** Event emitted when the direction changes. */
        this.dirChange = new EventEmitter();
    }
    /**
     * \@docs-private
     * @return {?}
     */
    get dir() {
        return this._dir;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set dir(v) {
        let /** @type {?} */ old = this._dir;
        this._dir = v;
        if (old != this._dir) {
            this.dirChange.emit();
        }
    }
    /**
     * Current layout direction of the element.
     * @return {?}
     */
    get value() { return this.dir; }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) { this.dir = v; }
}
Dir.decorators = [
    { type: Directive, args: [{
                selector: '[dir]',
                // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
                exportAs: '$implicit'
            },] },
];
/**
 * @nocollapse
 */
Dir.ctorParameters = () => [];
Dir.propDecorators = {
    '_dir': [{ type: Input, args: ['dir',] },],
    'dirChange': [{ type: Output },],
    'dir': [{ type: HostBinding, args: ['attr.dir',] },],
};
function Dir_tsickle_Closure_declarations() {
    /** @type {?} */
    Dir.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Dir.ctorParameters;
    /** @type {?} */
    Dir.propDecorators;
    /**
     * Layout direction of the element.
     * @type {?}
     */
    Dir.prototype._dir;
    /**
     * Event emitted when the direction changes.
     * @type {?}
     */
    Dir.prototype.dirChange;
}
export class RtlModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: RtlModule,
            providers: []
        };
    }
}
RtlModule.decorators = [
    { type: NgModule, args: [{
                exports: [Dir],
                declarations: [Dir]
            },] },
];
/**
 * @nocollapse
 */
RtlModule.ctorParameters = () => [];
function RtlModule_tsickle_Closure_declarations() {
    /** @type {?} */
    RtlModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    RtlModule.ctorParameters;
}
//# sourceMappingURL=dir.js.map