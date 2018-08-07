(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngb-modal', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['ngb-modal'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,i0,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ModalManager = (function () {
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
             */ function () {
                return this.globalConfig;
            },
            set: /**
             * @param {?} config
             * @return {?}
             */ function (config) {
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
            { type: i0.Injectable, args: [{
                        providedIn: "root"
                    },] },
        ];
        /** @nocollapse */
        ModalManager.ctorParameters = function () {
            return [
                { type: i0.ComponentFactoryResolver }
            ];
        };
        /** @nocollapse */ ModalManager.ngInjectableDef = i0.defineInjectable({ factory: function ModalManager_Factory() { return new ModalManager(i0.inject(i0.ComponentFactoryResolver)); }, token: ModalManager, providedIn: "root" });
        return ModalManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ModalComponent = (function () {
        function ModalComponent(modalManager) {
            this.modalManager = modalManager;
            this.onOpen = new i0.EventEmitter(false);
            this.onClose = new i0.EventEmitter(false);
            this.isOpened = false;
        }
        /**
         * @return {?}
         */
        ModalComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.inputSettings = {
                    title: this.title,
                    size: this.size || "md",
                    modalClass: this.modalClass || '',
                    hideCloseButton: this.hideCloseButton || false,
                    centered: this.centered || false,
                    backdrop: this.backdrop || true,
                    animation: this.animation || true,
                    keyboard: this.keyboard || true,
                    closeOnOutsideClick: this.closeOnOutsideClick || true,
                    backdropClass: this.backdropClass || "modal-backdrop"
                };
            };
        /**
         * @param {?} config
         * @return {?}
         */
        ModalComponent.prototype.init = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                this.onOpen.observers = [];
                this.onClose.observers = [];
                this.settings = Object.assign({}, this.modalManager.defaults, this.inputSettings, config);
                this.createBackDrop();
            };
        /**
         * @return {?}
         */
        ModalComponent.prototype.open = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.isOpened)
                    return;
                document.body.appendChild(this.backdropElement);
                document.body.classList.add("modal-open");
                this.isOpened = true;
                window.setTimeout(function () {
                    _this.modalRoot.nativeElement.classList.add('in');
                    _this.modalRoot.nativeElement.focus();
                    _this.onOpen.emit();
                }, 100);
            };
        /**
         * @return {?}
         */
        ModalComponent.prototype.close = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.isOpened)
                    return;
                this.modalRoot.nativeElement.classList.remove('in');
                document.body.removeChild(this.backdropElement);
                document.body.className = document.body.className.replace(/modal-open\b/, "");
                window.setTimeout(function () {
                    _this.isOpened = false;
                    _this.onClose.emit();
                }, 100);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        ModalComponent.prototype.preventClosing = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                event.stopPropagation();
            };
        /**
         * @return {?}
         */
        ModalComponent.prototype.createBackDrop = /**
         * @return {?}
         */
            function () {
                this.backdropElement = document.createElement("div");
                this.backdropElement.classList.add("fade");
                this.backdropElement.classList.add("in");
                if (this.settings && this.settings.backdrop && this.settings.backdrop == true) {
                    this.backdropElement.classList.add(this.settings.backdropClass);
                }
            };
        ModalComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'modal',
                        template: "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" #modalRoot (keydown.esc)=\"settings?.keyboard ? close() : 0\" [ngStyle]=\"{ display: isOpened ? 'block' : 'none' }\" [ngClass]=\"{'fade': settings?.animation}\" (click)=\"settings?.backdrop !== 'static' && settings?.closeOnOutsideClick ? close() : 0\">\n    <div [class]=\"'modal-dialog modal-'+ settings?.size + ' ' + settings?.modalClass\" (click)=\"preventClosing($event)\" [ngClass]=\"{'modal-dialog-centered': settings?.centered}\">\n        <div class=\"modal-content\" tabindex=\"0\" *ngIf=\"isOpened\">\n            <div class=\"modal-header\">\n                <button *ngIf=\"!settings?.hideCloseButton\" type=\"button\" class=\"close\" [attr.aria-label]=\"settings?.cancelButtonLabel || 'Close'\" (click)=\"close()\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" *ngIf=\"settings?.title\">{{ settings?.title }}</h4>\n                <ng-content select=\"modal-header\"></ng-content>\n            </div>\n            <div class=\"modal-body\">\n                <ng-content select=\"modal-content\"></ng-content>\n            </div>\n            <div class=\"modal-footer\">\n                <ng-content select=\"modal-footer\"></ng-content>\n            </div>\n        </div>\n    </div>\n</div>",
                        styles: [".modal-dialog-centered {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    min-height: calc(100% - (0.5rem * 2));\n  }\n  @media (min-width: 576px) {\n    .modal-dialog-centered {\n      min-height: calc(100% - (1.75rem * 2));\n    }\n  }"]
                    },] },
        ];
        /** @nocollapse */
        ModalComponent.ctorParameters = function () {
            return [
                { type: ModalManager }
            ];
        };
        ModalComponent.propDecorators = {
            title: [{ type: i0.Input }],
            size: [{ type: i0.Input }],
            modalClass: [{ type: i0.Input }],
            hideCloseButton: [{ type: i0.Input }],
            centered: [{ type: i0.Input }],
            backdrop: [{ type: i0.Input }],
            animation: [{ type: i0.Input }],
            keyboard: [{ type: i0.Input }],
            closeOnOutsideClick: [{ type: i0.Input }],
            backdropClass: [{ type: i0.Input }],
            onOpen: [{ type: i0.Output }],
            onClose: [{ type: i0.Output }],
            modalRoot: [{ type: i0.ViewChild, args: ["modalRoot",] }]
        };
        return ModalComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ModalFooterComponent = (function () {
        function ModalFooterComponent() {
        }
        /**
         * @return {?}
         */
        ModalFooterComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        ModalFooterComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'modal-footer',
                        template: "<ng-content></ng-content>"
                    },] },
        ];
        /** @nocollapse */
        ModalFooterComponent.ctorParameters = function () { return []; };
        return ModalFooterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ModalContentComponent = (function () {
        function ModalContentComponent() {
        }
        /**
         * @return {?}
         */
        ModalContentComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        ModalContentComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'modal-content',
                        template: "<ng-content></ng-content>"
                    },] },
        ];
        /** @nocollapse */
        ModalContentComponent.ctorParameters = function () { return []; };
        return ModalContentComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ModalHeaderComponent = (function () {
        function ModalHeaderComponent() {
        }
        /**
         * @return {?}
         */
        ModalHeaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        ModalHeaderComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'modal-header',
                        template: "<ng-content></ng-content>"
                    },] },
        ];
        /** @nocollapse */
        ModalHeaderComponent.ctorParameters = function () { return []; };
        return ModalHeaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ModalModule = (function () {
        function ModalModule() {
        }
        ModalModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [ModalComponent, ModalFooterComponent, ModalContentComponent, ModalHeaderComponent],
                        exports: [ModalComponent, ModalFooterComponent, ModalContentComponent, ModalHeaderComponent]
                    },] },
        ];
        return ModalModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.ModalManager = ModalManager;
    exports.ModalComponent = ModalComponent;
    exports.ModalModule = ModalModule;
    exports.ModalContentComponent = ModalContentComponent;
    exports.ModalHeaderComponent = ModalHeaderComponent;
    exports.ModalFooterComponent = ModalFooterComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLW1vZGFsLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLmNvbXBvbmVudC50cyIsIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC1mb290ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWhlYWRlci5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1hbmFnZXIge1xuXG4gIHByaXZhdGUgbW9kYWxIb3N0OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgZ2xvYmFsQ29uZmlnIDogTW9kYWxDb25maWcgPSB7XG4gICAgc2l6ZTogXCJtZFwiLFxuICAgIG1vZGFsQ2xhc3M6ICcnLFxuICAgIGhpZGVDbG9zZUJ1dHRvbiA6IGZhbHNlLFxuICAgIGNlbnRlcmVkOiBmYWxzZSxcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBhbmltYXRpb24gOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgYmFja2Ryb3BDbGFzczogXCJtb2RhbC1iYWNrZHJvcFwiIFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHsgfVxuXG4gIHNldCBkZWZhdWx0cyhjb25maWc6IE1vZGFsQ29uZmlnKSB7XG4gICAgdGhpcy5nbG9iYWxDb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsQ29uZmlnLCBjb25maWcpO1xuICB9XG5cbiAgc2V0RGVmYXVsdHMoY29uZmlnOiBNb2RhbENvbmZpZyl7XG4gICAgdGhpcy5nbG9iYWxDb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsQ29uZmlnLCBjb25maWcpOyAgICBcbiAgfVxuXG4gIGdldCBkZWZhdWx0cygpIDogTW9kYWxDb25maWcge1xuICAgIHJldHVybiB0aGlzLmdsb2JhbENvbmZpZztcbiAgfVxuXG4gIHNldFJvb3RWaWV3Q29udGFpbmVyUmVmKHJlZil7XG4gICAgdGhpcy5tb2RhbEhvc3QgPSByZWY7XG4gIH1cblxuICBvcGVuKG1vZGFsSW5zdGFuY2UsIGNvbmZpZyl7XG4gICAgaWYodHlwZW9mIG1vZGFsSW5zdGFuY2UgPT09IFwib2JqZWN0XCIpe1xuICAgICAgbW9kYWxJbnN0YW5jZS5pbml0KGNvbmZpZyk7XG4gICAgICBtb2RhbEluc3RhbmNlLm9wZW4oKTtcbiAgICAgIHJldHVybiBtb2RhbEluc3RhbmNlO1xuICAgIH1lbHNlIGlmKHR5cGVvZiBtb2RhbEluc3RhbmNlID09PSBcImZ1bmN0aW9uXCIpe1xuICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShtb2RhbEluc3RhbmNlKTtcbiAgICAgIHRoaXMubW9kYWxIb3N0LnJlbW92ZSgpO1xuICAgICAgbGV0IGNvbXBvbmVudFJlZiA9IHRoaXMubW9kYWxIb3N0LmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5pbml0KGNvbmZpZyk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ2Nsb3NlJ10gPSB0aGlzLmNsb3NlRmFjdG9yeSgpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydvbkNsb3NlJ10gPSBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10ub25DbG9zZTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnb25PcGVuJ10gPSBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10ub25PcGVuO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10ub3BlbigpKTtcbiAgICAgcmV0dXJuIGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB9IFxuICB9XG5cbiAgY2xvc2UobW9kYWxJbnN0YW5jZSl7XG4gICAgbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICB9XG5cbiAgY2xvc2VGYWN0b3J5KCl7XG4gICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzWydNb2RhbENvbXBvbmVudCddLmNsb3NlKCk7XG4gICAgICBfc2VsZi5tb2RhbEhvc3QucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvbmZpZyB7XG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgc2l6ZT86IHN0cmluZyB8IFwibWRcIixcbiAgICBtb2RhbENsYXNzPzogc3RyaW5nIHwgJycsXG4gICAgaGlkZUNsb3NlQnV0dG9uPzogYm9vbGVhbiB8IGZhbHNlLFxuICAgIGNlbnRlcmVkPzogYm9vbGVhbiB8IGZhbHNlLFxuICAgIGJhY2tkcm9wPzogYm9vbGVhbiB8ICdzdGF0aWMnIHwgdHJ1ZSxcbiAgICBhbmltYXRpb24/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBrZXlib2FyZD86IGJvb2xlYW4gfCB0cnVlLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBiYWNrZHJvcENsYXNzPzogc3RyaW5nIHwgXCJtb2RhbC1iYWNrZHJvcFwiXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbE1hbmFnZXIgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuXG5kZWNsYXJlIHZhciBkb2N1bWVudDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1vZGFsXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiAjbW9kYWxSb290IChrZXlkb3duLmVzYyk9XCJzZXR0aW5ncz8ua2V5Ym9hcmQgPyBjbG9zZSgpIDogMFwiIFtuZ1N0eWxlXT1cInsgZGlzcGxheTogaXNPcGVuZWQgPyAnYmxvY2snIDogJ25vbmUnIH1cIiBbbmdDbGFzc109XCJ7J2ZhZGUnOiBzZXR0aW5ncz8uYW5pbWF0aW9ufVwiIChjbGljayk9XCJzZXR0aW5ncz8uYmFja2Ryb3AgIT09ICdzdGF0aWMnICYmIHNldHRpbmdzPy5jbG9zZU9uT3V0c2lkZUNsaWNrID8gY2xvc2UoKSA6IDBcIj5cbiAgICA8ZGl2IFtjbGFzc109XCInbW9kYWwtZGlhbG9nIG1vZGFsLScrIHNldHRpbmdzPy5zaXplICsgJyAnICsgc2V0dGluZ3M/Lm1vZGFsQ2xhc3NcIiAoY2xpY2spPVwicHJldmVudENsb3NpbmcoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsnbW9kYWwtZGlhbG9nLWNlbnRlcmVkJzogc2V0dGluZ3M/LmNlbnRlcmVkfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIHRhYmluZGV4PVwiMFwiICpuZ0lmPVwiaXNPcGVuZWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIXNldHRpbmdzPy5oaWRlQ2xvc2VCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIFthdHRyLmFyaWEtbGFiZWxdPVwic2V0dGluZ3M/LmNhbmNlbEJ1dHRvbkxhYmVsIHx8ICdDbG9zZSdcIiAoY2xpY2spPVwiY2xvc2UoKVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiAqbmdJZj1cInNldHRpbmdzPy50aXRsZVwiPnt7IHNldHRpbmdzPy50aXRsZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6W2AubW9kYWwtZGlhbG9nLWNlbnRlcmVkIHtcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMCUgLSAoMC41cmVtICogMikpO1xuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkge1xuICAgIC5tb2RhbC1kaWFsb2ctY2VudGVyZWQge1xuICAgICAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gKDEuNzVyZW0gKiAyKSk7XG4gICAgfVxuICB9YF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8vdGl0bGUgb2YgbW9kYWxcbiAgQElucHV0KCkgdGl0bGU7XG5cbiAgLy9zaXplIG9mIG1vZGFsLiBzbSxsZyxtZFxuICBASW5wdXQoKSBzaXplO1xuXG4gIC8vbW9kYWxDbGFzcyBhZGRlZCB0byBtb2RhbCBkaWFsb2dcbiAgQElucHV0KCkgbW9kYWxDbGFzcztcblxuICAvL2hpZGUgY2xvc2UgYnV0dG9uXG4gIEBJbnB1dCgpIGhpZGVDbG9zZUJ1dHRvbjtcblxuICAvL2lmIG1vZGFsIGlzIHZlcnRpY2FsbHkgY2VudGVyZWRcbiAgQElucHV0KCkgY2VudGVyZWRcblxuICAvL2lmIGJhY2tkcm9wIGlzIGFwcGxpZWQgb24gbW9kYWxcbiAgQElucHV0KCkgYmFja2Ryb3BcblxuICAvL2lmIHRydWUsIGFuaW1hdGlvbiBpcyBhZGRlZCB0byBtb2RhbCBkaWFsb2dcbiAgQElucHV0KCkgYW5pbWF0aW9uO1xuXG4gIC8vbGlzdGVuIHRvIGtleWJvYXJkIGV2ZW50c1xuICBASW5wdXQoKSBrZXlib2FyZDtcblxuICAvL2Nsb3NlIG9uIG91dHNpZGUgY2xpY2tcbiAgQElucHV0KCkgY2xvc2VPbk91dHNpZGVDbGljaztcblxuICAvL2N1c3RvbSBiYWNrZHJvcCBjbGFzc1xuICBASW5wdXQoKSBiYWNrZHJvcENsYXNzO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgb25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuIFxuXG4gIEBWaWV3Q2hpbGQoXCJtb2RhbFJvb3RcIikgcHVibGljIG1vZGFsUm9vdDogRWxlbWVudFJlZjtcbiAgIFxuICBwdWJsaWMgaXNPcGVuZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpbnB1dFNldHRpbmdzO1xuICBwdWJsaWMgc2V0dGluZ3M7XG4gIHByaXZhdGUgYmFja2Ryb3BFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsTWFuYWdlciA6IE1vZGFsTWFuYWdlcikge1xuICB9XG5cbiAgbmdPbkluaXQoKXtcbiAgICB0aGlzLmlucHV0U2V0dGluZ3MgPSB7XG4gICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgIHNpemU6IHRoaXMuc2l6ZSB8fCBcIm1kXCIsXG4gICAgICBtb2RhbENsYXNzOiB0aGlzLm1vZGFsQ2xhc3MgfHwgJycsXG4gICAgICBoaWRlQ2xvc2VCdXR0b24gOiB0aGlzLmhpZGVDbG9zZUJ1dHRvbiB8fCBmYWxzZSxcbiAgICAgIGNlbnRlcmVkOiB0aGlzLmNlbnRlcmVkIHx8IGZhbHNlLFxuICAgICAgYmFja2Ryb3A6IHRoaXMuYmFja2Ryb3AgfHwgdHJ1ZSxcbiAgICAgIGFuaW1hdGlvbiA6IHRoaXMuYW5pbWF0aW9uIHx8IHRydWUsXG4gICAgICBrZXlib2FyZDogdGhpcy5rZXlib2FyZCB8fCB0cnVlLFxuICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogdGhpcy5jbG9zZU9uT3V0c2lkZUNsaWNrIHx8IHRydWUsXG4gICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmJhY2tkcm9wQ2xhc3MgfHwgXCJtb2RhbC1iYWNrZHJvcFwiXG4gICAgfVxuICB9XG5cbiAgaW5pdChjb25maWcpIHtcbiAgICB0aGlzLm9uT3Blbi5vYnNlcnZlcnMgPSBbXTtcbiAgICB0aGlzLm9uQ2xvc2Uub2JzZXJ2ZXJzID0gW107XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMubW9kYWxNYW5hZ2VyLmRlZmF1bHRzLCB0aGlzLmlucHV0U2V0dGluZ3MsIGNvbmZpZyk7XG4gICAgdGhpcy5jcmVhdGVCYWNrRHJvcCgpO1xuICB9XG5cblxuICBvcGVuKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbmVkKVxuICAgICAgcmV0dXJuO1xuICAgIFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm1vZGFsLW9wZW5cIik7XG4gICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpbicpO1xuICAgICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5vbk9wZW4uZW1pdCgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuZWQpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJhY2tkcm9wRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKC9tb2RhbC1vcGVuXFxiLywgXCJcIik7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xuICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHVibGljIHByZXZlbnRDbG9zaW5nKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJhY2tEcm9wKCkge1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZmFkZVwiKTtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW5cIik7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MgJiYgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcCAmJiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wID09IHRydWUpIHtcbiAgICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5iYWNrZHJvcENsYXNzKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwtZm9vdGVyJyxcbiAgdGVtcGxhdGU6YDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsRm9vdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1oZWFkZXInLFxuICB0ZW1wbGF0ZTpgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5cbmV4cG9ydCBjbGFzcyBNb2RhbEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RhbEZvb3RlckNvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWZvb3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsQ29udGVudENvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWNvbnRlbnQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbEhlYWRlckNvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWhlYWRlci5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNb2RhbENvbXBvbmVudCwgTW9kYWxGb290ZXJDb21wb25lbnQsIE1vZGFsQ29udGVudENvbXBvbmVudCwgTW9kYWxIZWFkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTW9kYWxDb21wb25lbnQsIE1vZGFsRm9vdGVyQ29tcG9uZW50LCBNb2RhbENvbnRlbnRDb21wb25lbnQsIE1vZGFsSGVhZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1vZHVsZSB7XG4gfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25l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