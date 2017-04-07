import { Directive, ElementRef, NgModule, Output, EventEmitter } from '@angular/core';
/**
 * Directive that triggers a callback whenever the content of
 * its associated element has changed.
 */
export class ObserveContent {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        /** Event emitted for each change in the element's content. */
        this.event = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._observer = new MutationObserver(mutations => mutations.forEach(() => this.event.emit()));
        this._observer.observe(this._elementRef.nativeElement, {
            characterData: true,
            childList: true,
            subtree: true
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._observer) {
            this._observer.disconnect();
        }
    }
}
ObserveContent.decorators = [
    { type: Directive, args: [{
                selector: '[cdkObserveContent]'
            },] },
];
/**
 * @nocollapse
 */
ObserveContent.ctorParameters = () => [
    { type: ElementRef, },
];
ObserveContent.propDecorators = {
    'event': [{ type: Output, args: ['cdkObserveContent',] },],
};
function ObserveContent_tsickle_Closure_declarations() {
    /** @type {?} */
    ObserveContent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ObserveContent.ctorParameters;
    /** @type {?} */
    ObserveContent.propDecorators;
    /** @type {?} */
    ObserveContent.prototype._observer;
    /**
     * Event emitted for each change in the element's content.
     * @type {?}
     */
    ObserveContent.prototype.event;
    /** @type {?} */
    ObserveContent.prototype._elementRef;
}
export class ObserveContentModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: ObserveContentModule,
            providers: []
        };
    }
}
ObserveContentModule.decorators = [
    { type: NgModule, args: [{
                exports: [ObserveContent],
                declarations: [ObserveContent]
            },] },
];
/**
 * @nocollapse
 */
ObserveContentModule.ctorParameters = () => [];
function ObserveContentModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ObserveContentModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ObserveContentModule.ctorParameters;
}
//# sourceMappingURL=observe-content.js.map