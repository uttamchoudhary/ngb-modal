(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngb-modal', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['ngb-modal'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        ModalManager.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver }
            ];
        };
        return ModalManager;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ModalComponent = (function () {
        function ModalComponent(modalManager) {
            this.modalManager = modalManager;
            this.onOpen = new core.EventEmitter(false);
            this.onClose = new core.EventEmitter(false);
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
            { type: core.Component, args: [{
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
            title: [{ type: core.Input }],
            size: [{ type: core.Input }],
            modalClass: [{ type: core.Input }],
            hideCloseButton: [{ type: core.Input }],
            centered: [{ type: core.Input }],
            backdrop: [{ type: core.Input }],
            animation: [{ type: core.Input }],
            keyboard: [{ type: core.Input }],
            closeOnOutsideClick: [{ type: core.Input }],
            backdropClass: [{ type: core.Input }],
            onOpen: [{ type: core.Output }],
            onClose: [{ type: core.Output }],
            modalRoot: [{ type: core.ViewChild, args: ["modalRoot",] }]
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
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
        /**
         * @return {?}
         */
        ModalModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: ModalModule,
                    providers: [
                        ModalManager
                    ]
                };
            };
        ModalModule.decorators = [
            { type: core.NgModule, args: [{
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLW1vZGFsLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLmNvbXBvbmVudC50cyIsIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC1mb290ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWhlYWRlci5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vZGFsTWFuYWdlciB7XG5cbiAgcHJpdmF0ZSBtb2RhbEhvc3Q6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSBnbG9iYWxDb25maWcgOiBNb2RhbENvbmZpZyA9IHtcbiAgICBzaXplOiBcIm1kXCIsXG4gICAgbW9kYWxDbGFzczogJycsXG4gICAgaGlkZUNsb3NlQnV0dG9uIDogZmFsc2UsXG4gICAgY2VudGVyZWQ6IGZhbHNlLFxuICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgIGFuaW1hdGlvbiA6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogdHJ1ZSxcbiAgICBiYWNrZHJvcENsYXNzOiBcIm1vZGFsLWJhY2tkcm9wXCIgXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikgeyB9XG5cbiAgc2V0IGRlZmF1bHRzKGNvbmZpZzogTW9kYWxDb25maWcpIHtcbiAgICB0aGlzLmdsb2JhbENvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWxDb25maWcsIGNvbmZpZyk7XG4gIH1cblxuICBzZXREZWZhdWx0cyhjb25maWc6IE1vZGFsQ29uZmlnKXtcbiAgICB0aGlzLmdsb2JhbENvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWxDb25maWcsIGNvbmZpZyk7ICAgIFxuICB9XG5cbiAgZ2V0IGRlZmF1bHRzKCkgOiBNb2RhbENvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2xvYmFsQ29uZmlnO1xuICB9XG5cbiAgc2V0Um9vdFZpZXdDb250YWluZXJSZWYocmVmKXtcbiAgICB0aGlzLm1vZGFsSG9zdCA9IHJlZjtcbiAgfVxuXG4gIG9wZW4obW9kYWxJbnN0YW5jZSwgY29uZmlnKXtcbiAgICBpZih0eXBlb2YgbW9kYWxJbnN0YW5jZSA9PT0gXCJvYmplY3RcIil7XG4gICAgICBtb2RhbEluc3RhbmNlLmluaXQoY29uZmlnKTtcbiAgICAgIG1vZGFsSW5zdGFuY2Uub3BlbigpO1xuICAgICAgcmV0dXJuIG1vZGFsSW5zdGFuY2U7XG4gICAgfWVsc2UgaWYodHlwZW9mIG1vZGFsSW5zdGFuY2UgPT09IFwiZnVuY3Rpb25cIil7XG4gICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KG1vZGFsSW5zdGFuY2UpO1xuICAgICAgdGhpcy5tb2RhbEhvc3QucmVtb3ZlKCk7XG4gICAgICBsZXQgY29tcG9uZW50UmVmID0gdGhpcy5tb2RhbEhvc3QuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLmluaXQoY29uZmlnKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnY2xvc2UnXSA9IHRoaXMuY2xvc2VGYWN0b3J5KCk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ29uQ2xvc2UnXSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vbkNsb3NlO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydvbk9wZW4nXSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vbk9wZW47XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vcGVuKCkpO1xuICAgICByZXR1cm4gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIH0gXG4gIH1cblxuICBjbG9zZShtb2RhbEluc3RhbmNlKXtcbiAgICBtb2RhbEluc3RhbmNlLmNsb3NlKCk7XG4gIH1cblxuICBjbG9zZUZhY3RvcnkoKXtcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXNbJ01vZGFsQ29tcG9uZW50J10uY2xvc2UoKTtcbiAgICAgIF9zZWxmLm1vZGFsSG9zdC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29uZmlnIHtcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBzaXplPzogc3RyaW5nIHwgXCJtZFwiLFxuICAgIG1vZGFsQ2xhc3M/OiBzdHJpbmcgfCAnJyxcbiAgICBoaWRlQ2xvc2VCdXR0b24/OiBib29sZWFuIHwgZmFsc2UsXG4gICAgY2VudGVyZWQ/OiBib29sZWFuIHwgZmFsc2UsXG4gICAgYmFja2Ryb3A/OiBib29sZWFuIHwgJ3N0YXRpYycgfCB0cnVlLFxuICAgIGFuaW1hdGlvbj86IGJvb2xlYW4gfCB0cnVlLFxuICAgIGtleWJvYXJkPzogYm9vbGVhbiB8IHRydWUsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljaz86IGJvb2xlYW4gfCB0cnVlLFxuICAgIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmcgfCBcIm1vZGFsLWJhY2tkcm9wXCJcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZGFsTWFuYWdlciB9IGZyb20gJy4vbW9kYWwuc2VydmljZSc7XG5cbmRlY2xhcmUgdmFyIGRvY3VtZW50OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibW9kYWxcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiICNtb2RhbFJvb3QgKGtleWRvd24uZXNjKT1cInNldHRpbmdzPy5rZXlib2FyZCA/IGNsb3NlKCkgOiAwXCIgW25nU3R5bGVdPVwieyBkaXNwbGF5OiBpc09wZW5lZCA/ICdibG9jaycgOiAnbm9uZScgfVwiIFtuZ0NsYXNzXT1cInsnZmFkZSc6IHNldHRpbmdzPy5hbmltYXRpb259XCIgKGNsaWNrKT1cInNldHRpbmdzPy5iYWNrZHJvcCAhPT0gJ3N0YXRpYycgJiYgc2V0dGluZ3M/LmNsb3NlT25PdXRzaWRlQ2xpY2sgPyBjbG9zZSgpIDogMFwiPlxuICAgIDxkaXYgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cgbW9kYWwtJysgc2V0dGluZ3M/LnNpemUgKyAnICcgKyBzZXR0aW5ncz8ubW9kYWxDbGFzc1wiIChjbGljayk9XCJwcmV2ZW50Q2xvc2luZygkZXZlbnQpXCIgW25nQ2xhc3NdPVwieydtb2RhbC1kaWFsb2ctY2VudGVyZWQnOiBzZXR0aW5ncz8uY2VudGVyZWR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCIgdGFiaW5kZXg9XCIwXCIgKm5nSWY9XCJpc09wZW5lZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCIhc2V0dGluZ3M/LmhpZGVDbG9zZUJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJzZXR0aW5ncz8uY2FuY2VsQnV0dG9uTGFiZWwgfHwgJ0Nsb3NlJ1wiIChjbGljayk9XCJjbG9zZSgpXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiICpuZ0lmPVwic2V0dGluZ3M/LnRpdGxlXCI+e3sgc2V0dGluZ3M/LnRpdGxlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczpbYC5tb2RhbC1kaWFsb2ctY2VudGVyZWQge1xuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSAtICgwLjVyZW0gKiAyKSk7XG4gIH1cbiAgQG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KSB7XG4gICAgLm1vZGFsLWRpYWxvZy1jZW50ZXJlZCB7XG4gICAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMCUgLSAoMS43NXJlbSAqIDIpKTtcbiAgICB9XG4gIH1gXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLy90aXRsZSBvZiBtb2RhbFxuICBASW5wdXQoKSB0aXRsZTtcblxuICAvL3NpemUgb2YgbW9kYWwuIHNtLGxnLG1kXG4gIEBJbnB1dCgpIHNpemU7XG5cbiAgLy9tb2RhbENsYXNzIGFkZGVkIHRvIG1vZGFsIGRpYWxvZ1xuICBASW5wdXQoKSBtb2RhbENsYXNzO1xuXG4gIC8vaGlkZSBjbG9zZSBidXR0b25cbiAgQElucHV0KCkgaGlkZUNsb3NlQnV0dG9uO1xuXG4gIC8vaWYgbW9kYWwgaXMgdmVydGljYWxseSBjZW50ZXJlZFxuICBASW5wdXQoKSBjZW50ZXJlZFxuXG4gIC8vaWYgYmFja2Ryb3AgaXMgYXBwbGllZCBvbiBtb2RhbFxuICBASW5wdXQoKSBiYWNrZHJvcFxuXG4gIC8vaWYgdHJ1ZSwgYW5pbWF0aW9uIGlzIGFkZGVkIHRvIG1vZGFsIGRpYWxvZ1xuICBASW5wdXQoKSBhbmltYXRpb247XG5cbiAgLy9saXN0ZW4gdG8ga2V5Ym9hcmQgZXZlbnRzXG4gIEBJbnB1dCgpIGtleWJvYXJkO1xuXG4gIC8vY2xvc2Ugb24gb3V0c2lkZSBjbGlja1xuICBASW5wdXQoKSBjbG9zZU9uT3V0c2lkZUNsaWNrO1xuXG4gIC8vY3VzdG9tIGJhY2tkcm9wIGNsYXNzXG4gIEBJbnB1dCgpIGJhY2tkcm9wQ2xhc3M7XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBvbk9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gXG5cbiAgQFZpZXdDaGlsZChcIm1vZGFsUm9vdFwiKSBwdWJsaWMgbW9kYWxSb290OiBFbGVtZW50UmVmO1xuICAgXG4gIHB1YmxpYyBpc09wZW5lZCA9IGZhbHNlO1xuICBwcml2YXRlIGlucHV0U2V0dGluZ3M7XG4gIHB1YmxpYyBzZXR0aW5ncztcbiAgcHJpdmF0ZSBiYWNrZHJvcEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxNYW5hZ2VyIDogTW9kYWxNYW5hZ2VyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpe1xuICAgIHRoaXMuaW5wdXRTZXR0aW5ncyA9IHtcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgc2l6ZTogdGhpcy5zaXplIHx8IFwibWRcIixcbiAgICAgIG1vZGFsQ2xhc3M6IHRoaXMubW9kYWxDbGFzcyB8fCAnJyxcbiAgICAgIGhpZGVDbG9zZUJ1dHRvbiA6IHRoaXMuaGlkZUNsb3NlQnV0dG9uIHx8IGZhbHNlLFxuICAgICAgY2VudGVyZWQ6IHRoaXMuY2VudGVyZWQgfHwgZmFsc2UsXG4gICAgICBiYWNrZHJvcDogdGhpcy5iYWNrZHJvcCB8fCB0cnVlLFxuICAgICAgYW5pbWF0aW9uIDogdGhpcy5hbmltYXRpb24gfHwgdHJ1ZSxcbiAgICAgIGtleWJvYXJkOiB0aGlzLmtleWJvYXJkIHx8IHRydWUsXG4gICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2sgfHwgdHJ1ZSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IHRoaXMuYmFja2Ryb3BDbGFzcyB8fCBcIm1vZGFsLWJhY2tkcm9wXCJcbiAgICB9XG4gIH1cblxuICBpbml0KGNvbmZpZykge1xuICAgIHRoaXMub25PcGVuLm9ic2VydmVycyA9IFtdO1xuICAgIHRoaXMub25DbG9zZS5vYnNlcnZlcnMgPSBbXTtcbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5tb2RhbE1hbmFnZXIuZGVmYXVsdHMsIHRoaXMuaW5wdXRTZXR0aW5ncywgY29uZmlnKTtcbiAgICB0aGlzLmNyZWF0ZUJhY2tEcm9wKCk7XG4gIH1cblxuXG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuZWQpXG4gICAgICByZXR1cm47XG4gICAgXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tkcm9wRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibW9kYWwtb3BlblwiKTtcbiAgICB0aGlzLmlzT3BlbmVkID0gdHJ1ZTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2luJyk7XG4gICAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLm9uT3Blbi5lbWl0KCk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pc09wZW5lZClcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuYmFja2Ryb3BFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoL21vZGFsLW9wZW5cXGIvLCBcIlwiKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICB0aGlzLm9uQ2xvc2UuZW1pdCgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcHJldmVudENsb3NpbmcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQmFja0Ryb3AoKSB7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmYWRlXCIpO1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpblwiKTtcbiAgICBpZiAodGhpcy5zZXR0aW5ncyAmJiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wICYmIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3AgPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmJhY2tkcm9wQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1mb290ZXInLFxuICB0ZW1wbGF0ZTpgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxGb290ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwtY29udGVudCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsLWhlYWRlcicsXG4gIHRlbXBsYXRlOmA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcblxuZXhwb3J0IGNsYXNzIE1vZGFsSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsRm9vdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwtZm9vdGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxDb250ZW50Q29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwtY29udGVudC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsSGVhZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwtaGVhZGVyLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kYWxNYW5hZ2VyIH0gZnJvbSAnLi9tb2RhbC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNb2RhbENvbXBvbmVudCwgTW9kYWxGb290ZXJDb21wb25lbnQsIE1vZGFsQ29udGVudENvbXBvbmVudCwgTW9kYWxIZWFkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTW9kYWxDb21wb25lbnQsIE1vZGFsRm9vdGVyQ29tcG9uZW50LCBNb2RhbENvbnRlbnRDb21wb25lbnQsIE1vZGFsSGVhZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTW9kYWxNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTW9kYWxNYW5hZ2VyXG4gICAgICBdXG4gICAgfTtcbiAgfVxuIH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJWaWV3Q2hpbGQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBbUJFLHNCQUFvQix3QkFBa0Q7WUFBbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtnQ0FaakM7Z0JBQ25DLElBQUksRUFBRSxJQUFJO2dCQUNWLFVBQVUsRUFBRSxFQUFFO2dCQUNkLGVBQWUsRUFBRyxLQUFLO2dCQUN2QixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsSUFBSTtnQkFDZCxTQUFTLEVBQUcsSUFBSTtnQkFDaEIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsbUJBQW1CLEVBQUUsSUFBSTtnQkFDekIsYUFBYSxFQUFFLGdCQUFnQjthQUNoQztTQUUwRTtRQUUzRSxzQkFBSSxrQ0FBUTs7O2dCQVFaO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQzthQUMxQjs7OztnQkFWRCxVQUFhLE1BQW1CO2dCQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM5RDs7O1dBQUE7Ozs7O1FBRUQsa0NBQVc7Ozs7WUFBWCxVQUFZLE1BQW1CO2dCQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM5RDs7Ozs7UUFNRCw4Q0FBdUI7Ozs7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