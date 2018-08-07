/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import * as i0 from "@angular/core";
var ModalManager = /** @class */ (function () {
    function ModalManager(componentFactoryResolver) {
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
    Object.defineProperty(ModalManager.prototype, "defaults", {
        get: /**
         * @return {?}
         */
        function () {
            return this.globalConfig;
        },
        set: /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            this.globalConfig = Object.assign(this.globalConfig, config);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} config
     * @return {?}
     */
    ModalManager.prototype.setDefaults = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.globalConfig = Object.assign(this.globalConfig, config);
    };
    /**
     * @param {?} ref
     * @return {?}
     */
    ModalManager.prototype.setRootViewContainerRef = /**
     * @param {?} ref
     * @return {?}
     */
    function (ref) {
        this.modalHost = ref;
    };
    /**
     * @param {?} modalInstance
     * @param {?=} settings
     * @return {?}
     */
    ModalManager.prototype.open = /**
     * @param {?} modalInstance
     * @param {?=} settings
     * @return {?}
     */
    function (modalInstance, settings) {
        /** @type {?} */
        var config = settings || {};
        if (typeof modalInstance === "object") {
            modalInstance.init(config);
            modalInstance.open();
            return modalInstance;
        }
        else if (typeof modalInstance === "function") {
            /** @type {?} */
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalInstance);
            this.modalHost.remove();
            /** @type {?} */
            var componentRef_1 = this.modalHost.createComponent(componentFactory);
            componentRef_1.instance['ModalComponent'].init(config);
            componentRef_1.instance['close'] = this.closeFactory();
            componentRef_1.instance['onClose'] = componentRef_1.instance['ModalComponent'].onClose;
            componentRef_1.instance['onOpen'] = componentRef_1.instance['ModalComponent'].onOpen;
            setTimeout(function () { return componentRef_1.instance['ModalComponent'].open(); });
            return componentRef_1.instance;
        }
    };
    /**
     * @param {?} modalInstance
     * @return {?}
     */
    ModalManager.prototype.close = /**
     * @param {?} modalInstance
     * @return {?}
     */
    function (modalInstance) {
        modalInstance.close();
    };
    /**
     * @return {?}
     */
    ModalManager.prototype.closeFactory = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var _self = this;
        return function () {
            this['ModalComponent'].close();
            _self.modalHost.remove();
        };
    };
    ModalManager.decorators = [
        { type: Injectable, args: [{
                    providedIn: "root"
                },] },
    ];
    /** @nocollapse */
    ModalManager.ctorParameters = function () { return [
        { type: ComponentFactoryResolver }
    ]; };
    /** @nocollapse */ ModalManager.ngInjectableDef = i0.defineInjectable({ factory: function ModalManager_Factory() { return new ModalManager(i0.inject(i0.ComponentFactoryResolver)); }, token: ModalManager, providedIn: "root" });
    return ModalManager;
}());
export { ModalManager };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nYi1tb2RhbC8iLCJzb3VyY2VzIjpbImxpYi9tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLHdCQUF3QixFQUFrQyxNQUFNLGVBQWUsQ0FBQzs7O0lBcUI5RyxzQkFBb0Isd0JBQWtEO1FBQWxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7NEJBWmpDO1lBQ25DLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLEVBQUU7WUFDZCxlQUFlLEVBQUcsS0FBSztZQUN2QixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFHLElBQUk7WUFDaEIsUUFBUSxFQUFFLElBQUk7WUFDZCxtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGFBQWEsRUFBRSxnQkFBZ0I7U0FDaEM7S0FFMEU7SUFFM0Usc0JBQUksa0NBQVE7Ozs7UUFRWjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFCOzs7OztRQVZELFVBQWEsTUFBbUI7WUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDOUQ7OztPQUFBOzs7OztJQUVELGtDQUFXOzs7O0lBQVgsVUFBWSxNQUFtQjtRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM5RDs7Ozs7SUFNRCw4Q0FBdUI7Ozs7SUFBdkIsVUFBd0IsR0FBRztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztLQUN0Qjs7Ozs7O0lBRUQsMkJBQUk7Ozs7O0lBQUosVUFBSyxhQUFhLEVBQUUsUUFBUzs7UUFDM0IsSUFBSSxNQUFNLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUM1QixFQUFFLENBQUEsQ0FBQyxPQUFPLGFBQWEsS0FBSyxRQUFRLENBQUMsQ0FBQSxDQUFDO1lBQ3BDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0IsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxhQUFhLENBQUM7U0FDdEI7UUFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsT0FBTyxhQUFhLEtBQUssVUFBVSxDQUFDLENBQUEsQ0FBQzs7WUFDNUMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7WUFDeEIsSUFBSSxjQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNwRSxjQUFZLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELGNBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3JELGNBQVksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsY0FBWSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuRixjQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLGNBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDakYsVUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFZLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLEVBQTlDLENBQThDLENBQUMsQ0FBQztZQUNsRSxNQUFNLENBQUMsY0FBWSxDQUFDLFFBQVEsQ0FBQztTQUM3QjtLQUNGOzs7OztJQUVELDRCQUFLOzs7O0lBQUwsVUFBTSxhQUFhO1FBQ2pCLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVELG1DQUFZOzs7SUFBWjs7UUFDRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsTUFBTSxDQUFDO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMxQixDQUFBO0tBQ0Y7O2dCQWxFRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQUorQix3QkFBd0I7Ozt1QkFBeEQ7O1NBS2EsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1hbmFnZXIge1xuXG4gIHByaXZhdGUgbW9kYWxIb3N0OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgZ2xvYmFsQ29uZmlnIDogTW9kYWxDb25maWcgPSB7XG4gICAgc2l6ZTogXCJtZFwiLFxuICAgIG1vZGFsQ2xhc3M6ICcnLFxuICAgIGhpZGVDbG9zZUJ1dHRvbiA6IGZhbHNlLFxuICAgIGNlbnRlcmVkOiBmYWxzZSxcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBhbmltYXRpb24gOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgYmFja2Ryb3BDbGFzczogXCJtb2RhbC1iYWNrZHJvcFwiIFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHsgfVxuXG4gIHNldCBkZWZhdWx0cyhjb25maWc6IE1vZGFsQ29uZmlnKSB7XG4gICAgdGhpcy5nbG9iYWxDb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsQ29uZmlnLCBjb25maWcpO1xuICB9XG5cbiAgc2V0RGVmYXVsdHMoY29uZmlnOiBNb2RhbENvbmZpZyl7XG4gICAgdGhpcy5nbG9iYWxDb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsQ29uZmlnLCBjb25maWcpOyAgICBcbiAgfVxuXG4gIGdldCBkZWZhdWx0cygpIDogTW9kYWxDb25maWcge1xuICAgIHJldHVybiB0aGlzLmdsb2JhbENvbmZpZztcbiAgfVxuXG4gIHNldFJvb3RWaWV3Q29udGFpbmVyUmVmKHJlZil7XG4gICAgdGhpcy5tb2RhbEhvc3QgPSByZWY7XG4gIH1cblxuICBvcGVuKG1vZGFsSW5zdGFuY2UsIHNldHRpbmdzPyl7XG4gICAgbGV0IGNvbmZpZyA9IHNldHRpbmdzIHx8IHt9O1xuICAgIGlmKHR5cGVvZiBtb2RhbEluc3RhbmNlID09PSBcIm9iamVjdFwiKXtcbiAgICAgIG1vZGFsSW5zdGFuY2UuaW5pdChjb25maWcpO1xuICAgICAgbW9kYWxJbnN0YW5jZS5vcGVuKCk7XG4gICAgICByZXR1cm4gbW9kYWxJbnN0YW5jZTtcbiAgICB9ZWxzZSBpZih0eXBlb2YgbW9kYWxJbnN0YW5jZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkobW9kYWxJbnN0YW5jZSk7XG4gICAgICB0aGlzLm1vZGFsSG9zdC5yZW1vdmUoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB0aGlzLm1vZGFsSG9zdC5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10uaW5pdChjb25maWcpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydjbG9zZSddID0gdGhpcy5jbG9zZUZhY3RvcnkoKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnb25DbG9zZSddID0gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9uQ2xvc2U7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ29uT3BlbiddID0gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9uT3BlbjtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9wZW4oKSk7XG4gICAgIHJldHVybiBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgfSBcbiAgfVxuXG4gIGNsb3NlKG1vZGFsSW5zdGFuY2Upe1xuICAgIG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlRmFjdG9yeSgpe1xuICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpc1snTW9kYWxDb21wb25lbnQnXS5jbG9zZSgpO1xuICAgICAgX3NlbGYubW9kYWxIb3N0LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb25maWcge1xuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIHNpemU/OiBzdHJpbmcgfCBcIm1kXCIsXG4gICAgbW9kYWxDbGFzcz86IHN0cmluZyB8ICcnLFxuICAgIGhpZGVDbG9zZUJ1dHRvbj86IGJvb2xlYW4gfCBmYWxzZSxcbiAgICBjZW50ZXJlZD86IGJvb2xlYW4gfCBmYWxzZSxcbiAgICBiYWNrZHJvcD86IGJvb2xlYW4gfCAnc3RhdGljJyB8IHRydWUsXG4gICAgYW5pbWF0aW9uPzogYm9vbGVhbiB8IHRydWUsXG4gICAga2V5Ym9hcmQ/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrPzogYm9vbGVhbiB8IHRydWUsXG4gICAgYmFja2Ryb3BDbGFzcz86IHN0cmluZyB8IFwibW9kYWwtYmFja2Ryb3BcIlxufVxuIl19