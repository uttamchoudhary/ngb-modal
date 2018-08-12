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
                    _this.modalRoot.nativeElement.classList.add('show');
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
                this.modalRoot.nativeElement.classList.remove('show');
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
                this.backdropElement.classList.add("show");
                if (this.settings && this.settings.backdrop && this.settings.backdrop == true) {
                    this.backdropElement.classList.add(this.settings.backdropClass);
                }
            };
        ModalComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'modal',
                        template: "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" #modalRoot (keydown.esc)=\"settings?.keyboard ? close() : 0\" [ngStyle]=\"{ display: isOpened ? 'block' : 'none' }\" [ngClass]=\"{'fade': settings?.animation}\" (click)=\"settings?.backdrop !== 'static' && settings?.closeOnOutsideClick ? close() : 0\">\n    <div [class]=\"'modal-dialog modal-'+ settings?.size + ' ' + settings?.modalClass\" (click)=\"preventClosing($event)\" [ngClass]=\"{'modal-dialog-centered': settings?.centered}\">\n        <div class=\"modal-content\" tabindex=\"0\" *ngIf=\"isOpened\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\" *ngIf=\"settings?.title\">{{ settings?.title }}</h4>\n                <ng-content select=\"modal-header\"></ng-content>\n                <button *ngIf=\"!settings?.hideCloseButton\" type=\"button\" class=\"close\" [attr.aria-label]=\"settings?.cancelButtonLabel || 'Close'\" (click)=\"close()\"><span aria-hidden=\"true\">&times;</span></button>\n            </div>\n            <div class=\"modal-body\">\n                <ng-content select=\"modal-content\"></ng-content>\n            </div>\n            <div class=\"modal-footer\">\n                <ng-content select=\"modal-footer\"></ng-content>\n            </div>\n        </div>\n    </div>\n</div>",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLW1vZGFsLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLmNvbXBvbmVudC50cyIsIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC1mb290ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWhlYWRlci5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1hbmFnZXIge1xuXG4gIHByaXZhdGUgbW9kYWxIb3N0OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgZ2xvYmFsQ29uZmlnIDogTW9kYWxDb25maWcgPSB7XG4gICAgc2l6ZTogXCJtZFwiLFxuICAgIG1vZGFsQ2xhc3M6ICcnLFxuICAgIGhpZGVDbG9zZUJ1dHRvbiA6IGZhbHNlLFxuICAgIGNlbnRlcmVkOiBmYWxzZSxcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBhbmltYXRpb24gOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgYmFja2Ryb3BDbGFzczogXCJtb2RhbC1iYWNrZHJvcFwiIFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHsgfVxuXG4gIHNldCBkZWZhdWx0cyhjb25maWc6IE1vZGFsQ29uZmlnKSB7XG4gICAgdGhpcy5nbG9iYWxDb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsQ29uZmlnLCBjb25maWcpO1xuICB9XG5cbiAgc2V0RGVmYXVsdHMoY29uZmlnOiBNb2RhbENvbmZpZyl7XG4gICAgdGhpcy5nbG9iYWxDb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsQ29uZmlnLCBjb25maWcpOyAgICBcbiAgfVxuXG4gIGdldCBkZWZhdWx0cygpIDogTW9kYWxDb25maWcge1xuICAgIHJldHVybiB0aGlzLmdsb2JhbENvbmZpZztcbiAgfVxuXG4gIHNldFJvb3RWaWV3Q29udGFpbmVyUmVmKHJlZil7XG4gICAgdGhpcy5tb2RhbEhvc3QgPSByZWY7XG4gIH1cblxuICBvcGVuKG1vZGFsSW5zdGFuY2UsIHNldHRpbmdzPyl7XG4gICAgbGV0IGNvbmZpZyA9IHNldHRpbmdzIHx8IHt9O1xuICAgIGlmKHR5cGVvZiBtb2RhbEluc3RhbmNlID09PSBcIm9iamVjdFwiKXtcbiAgICAgIG1vZGFsSW5zdGFuY2UuaW5pdChjb25maWcpO1xuICAgICAgbW9kYWxJbnN0YW5jZS5vcGVuKCk7XG4gICAgICByZXR1cm4gbW9kYWxJbnN0YW5jZTtcbiAgICB9ZWxzZSBpZih0eXBlb2YgbW9kYWxJbnN0YW5jZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkobW9kYWxJbnN0YW5jZSk7XG4gICAgICB0aGlzLm1vZGFsSG9zdC5yZW1vdmUoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB0aGlzLm1vZGFsSG9zdC5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10uaW5pdChjb25maWcpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydjbG9zZSddID0gdGhpcy5jbG9zZUZhY3RvcnkoKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnb25DbG9zZSddID0gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9uQ2xvc2U7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ29uT3BlbiddID0gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9uT3BlbjtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9wZW4oKSk7XG4gICAgIHJldHVybiBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgfSBcbiAgfVxuXG4gIGNsb3NlKG1vZGFsSW5zdGFuY2Upe1xuICAgIG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlRmFjdG9yeSgpe1xuICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpc1snTW9kYWxDb21wb25lbnQnXS5jbG9zZSgpO1xuICAgICAgX3NlbGYubW9kYWxIb3N0LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb25maWcge1xuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIHNpemU/OiBzdHJpbmcgfCBcIm1kXCIsXG4gICAgbW9kYWxDbGFzcz86IHN0cmluZyB8ICcnLFxuICAgIGhpZGVDbG9zZUJ1dHRvbj86IGJvb2xlYW4gfCBmYWxzZSxcbiAgICBjZW50ZXJlZD86IGJvb2xlYW4gfCBmYWxzZSxcbiAgICBiYWNrZHJvcD86IGJvb2xlYW4gfCAnc3RhdGljJyB8IHRydWUsXG4gICAgYW5pbWF0aW9uPzogYm9vbGVhbiB8IHRydWUsXG4gICAga2V5Ym9hcmQ/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrPzogYm9vbGVhbiB8IHRydWUsXG4gICAgYmFja2Ryb3BDbGFzcz86IHN0cmluZyB8IFwibW9kYWwtYmFja2Ryb3BcIlxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxNYW5hZ2VyIH0gZnJvbSAnLi9tb2RhbC5zZXJ2aWNlJztcblxuZGVjbGFyZSB2YXIgZG9jdW1lbnQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtb2RhbFwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgI21vZGFsUm9vdCAoa2V5ZG93bi5lc2MpPVwic2V0dGluZ3M/LmtleWJvYXJkID8gY2xvc2UoKSA6IDBcIiBbbmdTdHlsZV09XCJ7IGRpc3BsYXk6IGlzT3BlbmVkID8gJ2Jsb2NrJyA6ICdub25lJyB9XCIgW25nQ2xhc3NdPVwieydmYWRlJzogc2V0dGluZ3M/LmFuaW1hdGlvbn1cIiAoY2xpY2spPVwic2V0dGluZ3M/LmJhY2tkcm9wICE9PSAnc3RhdGljJyAmJiBzZXR0aW5ncz8uY2xvc2VPbk91dHNpZGVDbGljayA/IGNsb3NlKCkgOiAwXCI+XG4gICAgPGRpdiBbY2xhc3NdPVwiJ21vZGFsLWRpYWxvZyBtb2RhbC0nKyBzZXR0aW5ncz8uc2l6ZSArICcgJyArIHNldHRpbmdzPy5tb2RhbENsYXNzXCIgKGNsaWNrKT1cInByZXZlbnRDbG9zaW5nKCRldmVudClcIiBbbmdDbGFzc109XCJ7J21vZGFsLWRpYWxvZy1jZW50ZXJlZCc6IHNldHRpbmdzPy5jZW50ZXJlZH1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIiB0YWJpbmRleD1cIjBcIiAqbmdJZj1cImlzT3BlbmVkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiAqbmdJZj1cInNldHRpbmdzPy50aXRsZVwiPnt7IHNldHRpbmdzPy50aXRsZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCIhc2V0dGluZ3M/LmhpZGVDbG9zZUJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJzZXR0aW5ncz8uY2FuY2VsQnV0dG9uTGFiZWwgfHwgJ0Nsb3NlJ1wiIChjbGljayk9XCJjbG9zZSgpXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOltgLm1vZGFsLWRpYWxvZy1jZW50ZXJlZCB7XG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gKDAuNXJlbSAqIDIpKTtcbiAgfVxuICBAbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpIHtcbiAgICAubW9kYWwtZGlhbG9nLWNlbnRlcmVkIHtcbiAgICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSAtICgxLjc1cmVtICogMikpO1xuICAgIH1cbiAgfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvL3RpdGxlIG9mIG1vZGFsXG4gIEBJbnB1dCgpIHRpdGxlO1xuXG4gIC8vc2l6ZSBvZiBtb2RhbC4gc20sbGcsbWRcbiAgQElucHV0KCkgc2l6ZTtcblxuICAvL21vZGFsQ2xhc3MgYWRkZWQgdG8gbW9kYWwgZGlhbG9nXG4gIEBJbnB1dCgpIG1vZGFsQ2xhc3M7XG5cbiAgLy9oaWRlIGNsb3NlIGJ1dHRvblxuICBASW5wdXQoKSBoaWRlQ2xvc2VCdXR0b247XG5cbiAgLy9pZiBtb2RhbCBpcyB2ZXJ0aWNhbGx5IGNlbnRlcmVkXG4gIEBJbnB1dCgpIGNlbnRlcmVkXG5cbiAgLy9pZiBiYWNrZHJvcCBpcyBhcHBsaWVkIG9uIG1vZGFsXG4gIEBJbnB1dCgpIGJhY2tkcm9wXG5cbiAgLy9pZiB0cnVlLCBhbmltYXRpb24gaXMgYWRkZWQgdG8gbW9kYWwgZGlhbG9nXG4gIEBJbnB1dCgpIGFuaW1hdGlvbjtcblxuICAvL2xpc3RlbiB0byBrZXlib2FyZCBldmVudHNcbiAgQElucHV0KCkga2V5Ym9hcmQ7XG5cbiAgLy9jbG9zZSBvbiBvdXRzaWRlIGNsaWNrXG4gIEBJbnB1dCgpIGNsb3NlT25PdXRzaWRlQ2xpY2s7XG5cbiAgLy9jdXN0b20gYmFja2Ryb3AgY2xhc3NcbiAgQElucHV0KCkgYmFja2Ryb3BDbGFzcztcblxuICBAT3V0cHV0KCkgcHVibGljIG9uT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiBcblxuICBAVmlld0NoaWxkKFwibW9kYWxSb290XCIpIHB1YmxpYyBtb2RhbFJvb3Q6IEVsZW1lbnRSZWY7XG4gICBcbiAgcHVibGljIGlzT3BlbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgaW5wdXRTZXR0aW5ncztcbiAgcHVibGljIHNldHRpbmdzO1xuICBwcml2YXRlIGJhY2tkcm9wRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbE1hbmFnZXIgOiBNb2RhbE1hbmFnZXIpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCl7XG4gICAgdGhpcy5pbnB1dFNldHRpbmdzID0ge1xuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICBzaXplOiB0aGlzLnNpemUgfHwgXCJtZFwiLFxuICAgICAgbW9kYWxDbGFzczogdGhpcy5tb2RhbENsYXNzIHx8ICcnLFxuICAgICAgaGlkZUNsb3NlQnV0dG9uIDogdGhpcy5oaWRlQ2xvc2VCdXR0b24gfHwgZmFsc2UsXG4gICAgICBjZW50ZXJlZDogdGhpcy5jZW50ZXJlZCB8fCBmYWxzZSxcbiAgICAgIGJhY2tkcm9wOiB0aGlzLmJhY2tkcm9wIHx8IHRydWUsXG4gICAgICBhbmltYXRpb24gOiB0aGlzLmFuaW1hdGlvbiB8fCB0cnVlLFxuICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQgfHwgdHJ1ZSxcbiAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRoaXMuY2xvc2VPbk91dHNpZGVDbGljayB8fCB0cnVlLFxuICAgICAgYmFja2Ryb3BDbGFzczogdGhpcy5iYWNrZHJvcENsYXNzIHx8IFwibW9kYWwtYmFja2Ryb3BcIlxuICAgIH1cbiAgfVxuXG4gIGluaXQoY29uZmlnKSB7XG4gICAgdGhpcy5vbk9wZW4ub2JzZXJ2ZXJzID0gW107XG4gICAgdGhpcy5vbkNsb3NlLm9ic2VydmVycyA9IFtdO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm1vZGFsTWFuYWdlci5kZWZhdWx0cywgdGhpcy5pbnB1dFNldHRpbmdzLCBjb25maWcpO1xuICAgIHRoaXMuY3JlYXRlQmFja0Ryb3AoKTtcbiAgfVxuXG5cbiAgb3BlbigpIHtcbiAgICBpZiAodGhpcy5pc09wZW5lZClcbiAgICAgIHJldHVybjtcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYmFja2Ryb3BFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1vcGVuXCIpO1xuICAgIHRoaXMuaXNPcGVuZWQgPSB0cnVlO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5vbk9wZW4uZW1pdCgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuZWQpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuYmFja2Ryb3BFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoL21vZGFsLW9wZW5cXGIvLCBcIlwiKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICB0aGlzLm9uQ2xvc2UuZW1pdCgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcHJldmVudENsb3NpbmcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQmFja0Ryb3AoKSB7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmYWRlXCIpO1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgIGlmICh0aGlzLnNldHRpbmdzICYmIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3AgJiYgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcCA9PSB0cnVlKSB7XG4gICAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BDbGFzcyk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsLWZvb3RlcicsXG4gIHRlbXBsYXRlOmA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbEZvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwtaGVhZGVyJyxcbiAgdGVtcGxhdGU6YDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXG59KVxuXG5leHBvcnQgY2xhc3MgTW9kYWxIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxGb290ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC1mb290ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbENvbnRlbnRDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC1jb250ZW50LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxIZWFkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC1oZWFkZXIuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTW9kYWxDb21wb25lbnQsIE1vZGFsRm9vdGVyQ29tcG9uZW50LCBNb2RhbENvbnRlbnRDb21wb25lbnQsIE1vZGFsSGVhZGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW01vZGFsQ29tcG9uZW50LCBNb2RhbEZvb3RlckNvbXBvbmVudCwgTW9kYWxDb250ZW50Q29tcG9uZW50LCBNb2RhbEhlYWRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxNb2R1bGUge1xuIH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJWaWV3Q2hpbGQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBcUJFLHNCQUFvQix3QkFBa0Q7WUFBbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtnQ0FaakM7Z0JBQ25DLElBQUksRUFBRSxJQUFJO2dCQUNWLFVBQVUsRUFBRSxFQUFFO2dCQUNkLGVBQWUsRUFBRyxLQUFLO2dCQUN2QixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsSUFBSTtnQkFDZCxTQUFTLEVBQUcsSUFBSTtnQkFDaEIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsbUJBQW1CLEVBQUUsSUFBSTtnQkFDekIsYUFBYSxFQUFFLGdCQUFnQjthQUNoQztTQUUwRTtRQUUzRSxzQkFBSSxrQ0FBUTs7O2dCQVFaO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQzthQUMxQjs7OztnQkFWRCxVQUFhLE1BQW1CO2dCQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM5RDs7O1dBQUE7Ozs7O1FBRUQsa0NBQVc7Ozs7WUFBWCxVQUFZLE1BQW1CO2dCQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM5RDs7Ozs7UUFNRCw4Q0FBdUI7Ozs7WUFBdkIsVUFBd0IsR0FBRztnQkFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7YUFDdEI7Ozs7OztRQUVELDJCQUFJOzs7OztZQUFKLFVBQUssYUFBYSxFQUFFLFFBQVM7O2dCQUMzQixJQUFJLE1BQU0sR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDO2dCQUM1QixJQUFHLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFB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