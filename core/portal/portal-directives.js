import { NgModule, Directive, TemplateRef, ComponentFactoryResolver, ViewContainerRef, Input, } from '@angular/core';
import { TemplatePortal, BasePortalHost } from './portal';
/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <ng-template portal #greeting>
 *   <p> Hello {{name}} </p>
 * </ng-template>
 */
export class TemplatePortalDirective extends TemplatePortal {
    /**
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(templateRef, viewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}
TemplatePortalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-portal], [portal]',
                exportAs: 'cdkPortal',
            },] },
];
/**
 * @nocollapse
 */
TemplatePortalDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
function TemplatePortalDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    TemplatePortalDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    TemplatePortalDirective.ctorParameters;
}
/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <ng-template [cdkPortalHost]="greeting"></ng-template>
 */
export class PortalHostDirective extends BasePortalHost {
    /**
     * @param {?} _componentFactoryResolver
     * @param {?} _viewContainerRef
     */
    constructor(_componentFactoryResolver, _viewContainerRef) {
        super();
        this._componentFactoryResolver = _componentFactoryResolver;
        this._viewContainerRef = _viewContainerRef;
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedPortal() { return this.portal; }
    /**
     * @param {?} v
     * @return {?}
     */
    set _deprecatedPortal(v) { this.portal = v; }
    /**
     * Portal associated with the Portal host.
     * @return {?}
     */
    get portal() {
        return this._portal;
    }
    /**
     * @param {?} portal
     * @return {?}
     */
    set portal(portal) {
        if (this.hasAttached()) {
            super.detach();
        }
        if (portal) {
            super.attach(portal);
        }
        this._portal = portal;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.dispose();
        this._portal = null;
    }
    /**
     * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
     *
     * @template T
     * @param {?} portal Portal to be attached to the portal host.
     * @return {?}
     */
    attachComponentPortal(portal) {
        portal.setAttachedHost(this);
        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalHost.
        let /** @type {?} */ viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        let /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let /** @type {?} */ ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        super.setDisposeFn(() => ref.destroy());
        this._portal = portal;
        return ref;
    }
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param {?} portal Portal to be attached.
     * @return {?}
     */
    attachTemplatePortal(portal) {
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        super.setDisposeFn(() => this._viewContainerRef.clear());
        this._portal = portal;
        // TODO(jelbourn): return locals from view
        return new Map();
    }
}
PortalHostDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdkPortalHost], [portalHost]',
                inputs: ['portal: cdkPortalHost']
            },] },
];
/**
 * @nocollapse
 */
PortalHostDirective.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: ViewContainerRef, },
];
PortalHostDirective.propDecorators = {
    '_deprecatedPortal': [{ type: Input, args: ['portalHost',] },],
};
function PortalHostDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    PortalHostDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PortalHostDirective.ctorParameters;
    /** @type {?} */
    PortalHostDirective.propDecorators;
    /**
     * The attached portal.
     * @type {?}
     */
    PortalHostDirective.prototype._portal;
    /** @type {?} */
    PortalHostDirective.prototype._componentFactoryResolver;
    /** @type {?} */
    PortalHostDirective.prototype._viewContainerRef;
}
export class PortalModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: PortalModule,
            providers: []
        };
    }
}
PortalModule.decorators = [
    { type: NgModule, args: [{
                exports: [TemplatePortalDirective, PortalHostDirective],
                declarations: [TemplatePortalDirective, PortalHostDirective],
            },] },
];
/**
 * @nocollapse
 */
PortalModule.ctorParameters = () => [];
function PortalModule_tsickle_Closure_declarations() {
    /** @type {?} */
    PortalModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    PortalModule.ctorParameters;
}
//# sourceMappingURL=portal-directives.js.map