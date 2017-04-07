import { NullPortalHostError, PortalAlreadyAttachedError, NoPortalAttachedError, NullPortalError, PortalHostAlreadyDisposedError, UnknownPortalTypeError } from './portal-errors';
/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 * @abstract
 */
export class Portal {
    /**
     * Attach this portal to a host.
     * @param {?} host
     * @return {?}
     */
    attach(host) {
        if (host == null) {
            throw new NullPortalHostError();
        }
        if (host.hasAttached()) {
            throw new PortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return (host.attach(this));
    }
    /**
     * Detach this portal from its host
     * @return {?}
     */
    detach() {
        let /** @type {?} */ host = this._attachedHost;
        if (host == null) {
            throw new NoPortalAttachedError();
        }
        this._attachedHost = null;
        return host.detach();
    }
    /**
     * Whether this portal is attached to a host.
     * @return {?}
     */
    get isAttached() {
        return this._attachedHost != null;
    }
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?} host
     * @return {?}
     */
    setAttachedHost(host) {
        this._attachedHost = host;
    }
}
function Portal_tsickle_Closure_declarations() {
    /** @type {?} */
    Portal.prototype._attachedHost;
}
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
export class ComponentPortal extends Portal {
    /**
     * @param {?} component
     * @param {?=} viewContainerRef
     * @param {?=} injector
     */
    constructor(component, viewContainerRef = null, injector = null) {
        super();
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
}
function ComponentPortal_tsickle_Closure_declarations() {
    /**
     * The type of the component that will be instantiated for attachment.
     * @type {?}
     */
    ComponentPortal.prototype.component;
    /**
     * [Optional] Where the attached component should live in Angular's *logical* component tree.
     * This is different from where the component *renders*, which is determined by the PortalHost.
     * The origin is necessary when the host is outside of the Angular application context.
     * @type {?}
     */
    ComponentPortal.prototype.viewContainerRef;
    /**
     * [Optional] Injector used for the instantiation of the component.
     * @type {?}
     */
    ComponentPortal.prototype.injector;
}
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
export class TemplatePortal extends Portal {
    /**
     * @param {?} template
     * @param {?} viewContainerRef
     */
    constructor(template, viewContainerRef) {
        super();
        /**
         * Additional locals for the instantiated embedded view.
         * These locals can be seen as "exports" for the template, such as how ngFor has
         * index / event / odd.
         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
         */
        this.locals = new Map();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
    }
    /**
     * @return {?}
     */
    get origin() {
        return this.templateRef.elementRef;
    }
    /**
     * @param {?} host
     * @param {?=} locals
     * @return {?}
     */
    attach(host, locals) {
        this.locals = locals == null ? new Map() : locals;
        return super.attach(host);
    }
    /**
     * @return {?}
     */
    detach() {
        this.locals = new Map();
        return super.detach();
    }
}
function TemplatePortal_tsickle_Closure_declarations() {
    /**
     * The embedded template that will be used to instantiate an embedded View in the host.
     * @type {?}
     */
    TemplatePortal.prototype.templateRef;
    /**
     * Reference to the ViewContainer into which the template will be stamped out.
     * @type {?}
     */
    TemplatePortal.prototype.viewContainerRef;
    /**
     * Additional locals for the instantiated embedded view.
     * These locals can be seen as "exports" for the template, such as how ngFor has
     * index / event / odd.
     * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
     * @type {?}
     */
    TemplatePortal.prototype.locals;
}
/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 * @abstract
 */
export class BasePortalHost {
    constructor() {
        this._isDisposed = false;
    }
    /**
     * Whether this host has an attached portal.
     * @return {?}
     */
    hasAttached() {
        return !!this._attachedPortal;
    }
    /**
     * @param {?} portal
     * @return {?}
     */
    attach(portal) {
        if (!portal) {
            throw new NullPortalError();
        }
        if (this.hasAttached()) {
            throw new PortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            throw new PortalHostAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throw new UnknownPortalTypeError();
    }
    /**
     * @abstract
     * @template T
     * @param {?} portal
     * @return {?}
     */
    attachComponentPortal(portal) { }
    /**
     * @abstract
     * @param {?} portal
     * @return {?}
     */
    attachTemplatePortal(portal) { }
    /**
     * @return {?}
     */
    detach() {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    setDisposeFn(fn) {
        this._disposeFn = fn;
    }
    /**
     * @return {?}
     */
    _invokeDisposeFn() {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }
}
function BasePortalHost_tsickle_Closure_declarations() {
    /**
     * The portal currently attached to the host.
     * @type {?}
     */
    BasePortalHost.prototype._attachedPortal;
    /**
     * A function that will permanently dispose this host.
     * @type {?}
     */
    BasePortalHost.prototype._disposeFn;
    /**
     * Whether this host has already been permanently disposed.
     * @type {?}
     */
    BasePortalHost.prototype._isDisposed;
}
//# sourceMappingURL=portal.js.map