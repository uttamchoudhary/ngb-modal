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
            modalClass: undefined,
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
     * @param {?} config
     * @return {?}
     */
    ModalManager.prototype.open = /**
     * @param {?} modalInstance
     * @param {?} config
     * @return {?}
     */
    function (modalInstance, config) {
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
            setTimeout(function () {
                componentRef_1.instance['ModalComponent'].init(config);
                componentRef_1.instance['ModalComponent'].open();
            });
            componentRef_1.instance['onOpen'] = this.closeFactory();
            componentRef_1.instance['onClose'] = componentRef_1.instance['ModalComponent'].onClose;
            componentRef_1.instance['close'] = componentRef_1.instance['ModalComponent'].onOpen;
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
                    providedIn: 'root'
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nYi1tb2RhbC8iLCJzb3VyY2VzIjpbImxpYi9tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLHdCQUF3QixFQUFrQyxNQUFNLGVBQWUsQ0FBQzs7O0lBcUI5RyxzQkFBb0Isd0JBQWtEO1FBQWxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7NEJBWmpDO1lBQ25DLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLFNBQVM7WUFDckIsZUFBZSxFQUFHLEtBQUs7WUFDdkIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsRUFBRyxJQUFJO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixhQUFhLEVBQUUsZ0JBQWdCO1NBQ2hDO0tBRTBFO0lBRTNFLHNCQUFJLGtDQUFROzs7O1FBUVo7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjs7Ozs7UUFWRCxVQUFhLE1BQW1CO1lBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzlEOzs7T0FBQTs7Ozs7SUFFRCxrQ0FBVzs7OztJQUFYLFVBQVksTUFBbUI7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDOUQ7Ozs7O0lBTUQsOENBQXVCOzs7O0lBQXZCLFVBQXdCLEdBQUc7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7S0FDdEI7Ozs7OztJQUVELDJCQUFJOzs7OztJQUFKLFVBQUssYUFBYSxFQUFFLE1BQU07UUFDeEIsRUFBRSxDQUFBLENBQUMsT0FBTyxhQUFhLEtBQUssUUFBUSxDQUFDLENBQUEsQ0FBQztZQUNwQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixNQUFNLENBQUMsYUFBYSxDQUFDO1NBQ3RCO1FBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sYUFBYSxLQUFLLFVBQVUsQ0FBQyxDQUFBLENBQUM7O1lBQzVDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVGLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7O1lBQ3hCLElBQUksY0FBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDcEUsVUFBVSxDQUFDO2dCQUNULGNBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JELGNBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNoRCxDQUFDLENBQUE7WUFDRixjQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0RCxjQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLGNBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDbkYsY0FBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxjQUFZLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ2pGLE1BQU0sQ0FBQyxjQUFZLENBQUMsUUFBUSxDQUFDO1NBQzdCO0tBRUY7Ozs7O0lBRUQsNEJBQUs7Ozs7SUFBTCxVQUFNLGFBQWE7UUFDakIsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3ZCOzs7O0lBRUQsbUNBQVk7OztJQUFaOztRQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixNQUFNLENBQUM7WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMvQixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzFCLENBQUE7S0FDRjs7Z0JBcEVGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBSitCLHdCQUF3Qjs7O3VCQUF4RDs7U0FLYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1hbmFnZXIge1xuXG4gIHByaXZhdGUgbW9kYWxIb3N0OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgZ2xvYmFsQ29uZmlnIDogTW9kYWxDb25maWcgPSB7XG4gICAgc2l6ZTogXCJtZFwiLFxuICAgIG1vZGFsQ2xhc3M6IHVuZGVmaW5lZCxcbiAgICBoaWRlQ2xvc2VCdXR0b24gOiBmYWxzZSxcbiAgICBjZW50ZXJlZDogZmFsc2UsXG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAgYW5pbWF0aW9uIDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgIGJhY2tkcm9wQ2xhc3M6IFwibW9kYWwtYmFja2Ryb3BcIiBcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7IH1cblxuICBzZXQgZGVmYXVsdHMoY29uZmlnOiBNb2RhbENvbmZpZykge1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbENvbmZpZywgY29uZmlnKTtcbiAgfVxuXG4gIHNldERlZmF1bHRzKGNvbmZpZzogTW9kYWxDb25maWcpe1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbENvbmZpZywgY29uZmlnKTsgICAgXG4gIH1cblxuICBnZXQgZGVmYXVsdHMoKSA6IE1vZGFsQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5nbG9iYWxDb25maWc7XG4gIH1cblxuICBzZXRSb290Vmlld0NvbnRhaW5lclJlZihyZWYpe1xuICAgIHRoaXMubW9kYWxIb3N0ID0gcmVmO1xuICB9XG5cbiAgb3Blbihtb2RhbEluc3RhbmNlLCBjb25maWcpe1xuICAgIGlmKHR5cGVvZiBtb2RhbEluc3RhbmNlID09PSBcIm9iamVjdFwiKXtcbiAgICAgIG1vZGFsSW5zdGFuY2UuaW5pdChjb25maWcpO1xuICAgICAgbW9kYWxJbnN0YW5jZS5vcGVuKCk7XG4gICAgICByZXR1cm4gbW9kYWxJbnN0YW5jZTtcbiAgICB9ZWxzZSBpZih0eXBlb2YgbW9kYWxJbnN0YW5jZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkobW9kYWxJbnN0YW5jZSk7XG4gICAgICB0aGlzLm1vZGFsSG9zdC5yZW1vdmUoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB0aGlzLm1vZGFsSG9zdC5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLmluaXQoY29uZmlnKTtcbiAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9wZW4oKTsgICAgICAgIFxuICAgICAgfSlcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnb25PcGVuJ10gPSB0aGlzLmNsb3NlRmFjdG9yeSgpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydvbkNsb3NlJ10gPSBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10ub25DbG9zZTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnY2xvc2UnXSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vbk9wZW47XG4gICAgIHJldHVybiBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgfSBcblxuICB9XG5cbiAgY2xvc2UobW9kYWxJbnN0YW5jZSl7XG4gICAgbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICB9XG5cbiAgY2xvc2VGYWN0b3J5KCl7XG4gICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzWydNb2RhbENvbXBvbmVudCddLmNsb3NlKCk7XG4gICAgICBfc2VsZi5tb2RhbEhvc3QucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvbmZpZyB7XG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgc2l6ZT86IHN0cmluZyB8IFwibWRcIixcbiAgICBtb2RhbENsYXNzPzogc3RyaW5nIHwgJycsXG4gICAgaGlkZUNsb3NlQnV0dG9uPzogYm9vbGVhbiB8IGZhbHNlLFxuICAgIGNlbnRlcmVkPzogYm9vbGVhbiB8IGZhbHNlLFxuICAgIGJhY2tkcm9wPzogYm9vbGVhbiB8ICdzdGF0aWMnIHwgdHJ1ZSxcbiAgICBhbmltYXRpb24/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBrZXlib2FyZD86IGJvb2xlYW4gfCB0cnVlLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBiYWNrZHJvcENsYXNzPzogc3RyaW5nIHwgXCJtb2RhbC1iYWNrZHJvcFwiXG59XG4iXX0=