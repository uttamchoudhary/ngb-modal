/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import * as i0 from "@angular/core";
export class ModalManager {
    /**
     * @param {?} componentFactoryResolver
     */
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.globalConfig = {
            size: "md",
            modalClass: '',
            hideCloseButton: false,
            centered: false,
            backdrop: true,
            animation: true,
            keyboard: true,
            closeOnOutsideClick: true,
            backdropClass: "modal-backdrop"
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set defaults(config) {
        this.globalConfig = Object.assign(this.globalConfig, config);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setDefaults(config) {
        this.globalConfig = Object.assign(this.globalConfig, config);
    }
    /**
     * @return {?}
     */
    get defaults() {
        return this.globalConfig;
    }
    /**
     * @param {?} ref
     * @return {?}
     */
    setRootViewContainerRef(ref) {
        this.modalHost = ref;
    }
    /**
     * @param {?} modalInstance
     * @param {?=} settings
     * @return {?}
     */
    open(modalInstance, settings) {
        /** @type {?} */
        let config = settings || {};
        if (typeof modalInstance === "object") {
            modalInstance.init(config);
            modalInstance.open();
            return modalInstance;
        }
        else if (typeof modalInstance === "function") {
            /** @type {?} */
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalInstance);
            this.modalHost.remove();
            /** @type {?} */
            let componentRef = this.modalHost.createComponent(componentFactory);
            componentRef.instance['ModalComponent'].init(config);
            componentRef.instance['close'] = this.closeFactory();
            componentRef.instance['onClose'] = componentRef.instance['ModalComponent'].onClose;
            componentRef.instance['onOpen'] = componentRef.instance['ModalComponent'].onOpen;
            setTimeout(() => componentRef.instance['ModalComponent'].open());
            return componentRef.instance;
        }
    }
    /**
     * @param {?} modalInstance
     * @return {?}
     */
    close(modalInstance) {
        modalInstance.close();
    }
    /**
     * @return {?}
     */
    closeFactory() {
        /** @type {?} */
        var _self = this;
        return function () {
            this['ModalComponent'].close();
            _self.modalHost.remove();
        };
    }
}
ModalManager.decorators = [
    { type: Injectable, args: [{
                providedIn: "root"
            },] },
];
/** @nocollapse */
ModalManager.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
/** @nocollapse */ ModalManager.ngInjectableDef = i0.defineInjectable({ factory: function ModalManager_Factory() { return new ModalManager(i0.inject(i0.ComponentFactoryResolver)); }, token: ModalManager, providedIn: "root" });
function ModalManager_tsickle_Closure_declarations() {
    /** @type {?} */
    ModalManager.prototype.modalHost;
    /** @type {?} */
    ModalManager.prototype.globalConfig;
    /** @type {?} */
    ModalManager.prototype.componentFactoryResolver;
}
/**
 * @record
 */
export function ModalConfig() { }
function ModalConfig_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ModalConfig.prototype.title;
    /** @type {?|undefined} */
    ModalConfig.prototype.size;
    /** @type {?|undefined} */
    ModalConfig.prototype.modalClass;
    /** @type {?|undefined} */
    ModalConfig.prototype.hideCloseButton;
    /** @type {?|undefined} */
    ModalConfig.prototype.centered;
    /** @type {?|undefined} */
    ModalConfig.prototype.backdrop;
    /** @type {?|undefined} */
    ModalConfig.prototype.animation;
    /** @type {?|undefined} */
    ModalConfig.prototype.keyboard;
    /** @type {?|undefined} */
    ModalConfig.prototype.closeOnOutsideClick;
    /** @type {?|undefined} */
    ModalConfig.prototype.backdropClass;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nYi1tb2RhbC8iLCJzb3VyY2VzIjpbImxpYi9tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLHdCQUF3QixFQUFrQyxNQUFNLGVBQWUsQ0FBQzs7QUFLaEgsTUFBTTs7OztJQWdCSixZQUFvQix3QkFBa0Q7UUFBbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjs0QkFaakM7WUFDbkMsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsRUFBRTtZQUNkLGVBQWUsRUFBRyxLQUFLO1lBQ3ZCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUcsSUFBSTtZQUNoQixRQUFRLEVBQUUsSUFBSTtZQUNkLG1CQUFtQixFQUFFLElBQUk7WUFDekIsYUFBYSxFQUFFLGdCQUFnQjtTQUNoQztLQUUwRTs7Ozs7SUFFM0UsSUFBSSxRQUFRLENBQUMsTUFBbUI7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDOUQ7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQW1CO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzlEOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDMUI7Ozs7O0lBRUQsdUJBQXVCLENBQUMsR0FBRztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztLQUN0Qjs7Ozs7O0lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFTOztRQUMzQixJQUFJLE1BQU0sR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQzVCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sYUFBYSxLQUFLLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDcEMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsTUFBTSxDQUFDLGFBQWEsQ0FBQztTQUN0QjtRQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxPQUFPLGFBQWEsS0FBSyxVQUFVLENBQUMsQ0FBQSxDQUFDOztZQUM1QyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM1RixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDOztZQUN4QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3BFLFlBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDckQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ25GLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNqRixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7U0FDN0I7S0FDRjs7Ozs7SUFFRCxLQUFLLENBQUMsYUFBYTtRQUNqQixhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDdkI7Ozs7SUFFRCxZQUFZOztRQUNWLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixNQUFNLENBQUM7WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMvQixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzFCLENBQUE7S0FDRjs7O1lBbEVGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQUorQix3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBWaWV3Q2hpbGQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxNYW5hZ2VyIHtcblxuICBwcml2YXRlIG1vZGFsSG9zdDogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIGdsb2JhbENvbmZpZyA6IE1vZGFsQ29uZmlnID0ge1xuICAgIHNpemU6IFwibWRcIixcbiAgICBtb2RhbENsYXNzOiAnJyxcbiAgICBoaWRlQ2xvc2VCdXR0b24gOiBmYWxzZSxcbiAgICBjZW50ZXJlZDogZmFsc2UsXG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAgYW5pbWF0aW9uIDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgIGJhY2tkcm9wQ2xhc3M6IFwibW9kYWwtYmFja2Ryb3BcIiBcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7IH1cblxuICBzZXQgZGVmYXVsdHMoY29uZmlnOiBNb2RhbENvbmZpZykge1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbENvbmZpZywgY29uZmlnKTtcbiAgfVxuXG4gIHNldERlZmF1bHRzKGNvbmZpZzogTW9kYWxDb25maWcpe1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbENvbmZpZywgY29uZmlnKTsgICAgXG4gIH1cblxuICBnZXQgZGVmYXVsdHMoKSA6IE1vZGFsQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5nbG9iYWxDb25maWc7XG4gIH1cblxuICBzZXRSb290Vmlld0NvbnRhaW5lclJlZihyZWYpe1xuICAgIHRoaXMubW9kYWxIb3N0ID0gcmVmO1xuICB9XG5cbiAgb3Blbihtb2RhbEluc3RhbmNlLCBzZXR0aW5ncz8pe1xuICAgIGxldCBjb25maWcgPSBzZXR0aW5ncyB8fCB7fTtcbiAgICBpZih0eXBlb2YgbW9kYWxJbnN0YW5jZSA9PT0gXCJvYmplY3RcIil7XG4gICAgICBtb2RhbEluc3RhbmNlLmluaXQoY29uZmlnKTtcbiAgICAgIG1vZGFsSW5zdGFuY2Uub3BlbigpO1xuICAgICAgcmV0dXJuIG1vZGFsSW5zdGFuY2U7XG4gICAgfWVsc2UgaWYodHlwZW9mIG1vZGFsSW5zdGFuY2UgPT09IFwiZnVuY3Rpb25cIil7XG4gICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KG1vZGFsSW5zdGFuY2UpO1xuICAgICAgdGhpcy5tb2RhbEhvc3QucmVtb3ZlKCk7XG4gICAgICBsZXQgY29tcG9uZW50UmVmID0gdGhpcy5tb2RhbEhvc3QuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLmluaXQoY29uZmlnKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnY2xvc2UnXSA9IHRoaXMuY2xvc2VGYWN0b3J5KCk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ29uQ2xvc2UnXSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vbkNsb3NlO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydvbk9wZW4nXSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vbk9wZW47XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vcGVuKCkpO1xuICAgICByZXR1cm4gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIH0gXG4gIH1cblxuICBjbG9zZShtb2RhbEluc3RhbmNlKXtcbiAgICBtb2RhbEluc3RhbmNlLmNsb3NlKCk7XG4gIH1cblxuICBjbG9zZUZhY3RvcnkoKXtcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXNbJ01vZGFsQ29tcG9uZW50J10uY2xvc2UoKTtcbiAgICAgIF9zZWxmLm1vZGFsSG9zdC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29uZmlnIHtcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBzaXplPzogc3RyaW5nIHwgXCJtZFwiLFxuICAgIG1vZGFsQ2xhc3M/OiBzdHJpbmcgfCAnJyxcbiAgICBoaWRlQ2xvc2VCdXR0b24/OiBib29sZWFuIHwgZmFsc2UsXG4gICAgY2VudGVyZWQ/OiBib29sZWFuIHwgZmFsc2UsXG4gICAgYmFja2Ryb3A/OiBib29sZWFuIHwgJ3N0YXRpYycgfCB0cnVlLFxuICAgIGFuaW1hdGlvbj86IGJvb2xlYW4gfCB0cnVlLFxuICAgIGtleWJvYXJkPzogYm9vbGVhbiB8IHRydWUsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljaz86IGJvb2xlYW4gfCB0cnVlLFxuICAgIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmcgfCBcIm1vZGFsLWJhY2tkcm9wXCJcbn1cbiJdfQ==