(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngb-modal', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (factory((global['ngb-modal'] = {}),global.ng.core,global.rxjs,global.ng.common));
}(this, (function (exports,i0,rxjs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ModalManager = (function () {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
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
            // //title of modal
            // @Input() title;
            // //size of modal. sm,lg,md
            // @Input() size;
            // //modalClass added to modal dialog
            // @Input() modalClass;
            // //hide close button
            // @Input() hideCloseButton;
            // //if modal is vertically centered
            // @Input() centered
            // //if backdrop is applied on modal
            // @Input() backdrop
            // //if true, animation is added to modal dialog
            // @Input() animation;
            // //listen to keyboard events
            // @Input() keyboard;
            // //close on outside click
            // @Input() closeOnOutsideClick;
            // //custom backdrop class
            // @Input() backdropClass;
            this.opened = new i0.EventEmitter(false);
            this.closed = new i0.EventEmitter(false);
            this.openObserver = new rxjs.Subject();
            this.closeObserver = new rxjs.Subject();
            this.isOpened = false;
            this.settings = {
                closeOnEscape: true,
                closeOnOutsideClick: true,
                hideCloseButton: false,
                backdrop: true
            };
        }
        /**
         * @param {?} config
         * @return {?}
         */
        ModalComponent.prototype.init = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                this.settings = Object.assign({}, this.modalManager.defaults, config);
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
                    _this.opened.emit();
                    _this.openObserver.next(true);
                }, 0);
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
                    _this.closed.emit();
                    _this.closeObserver.next(true);
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
        ModalComponent.prototype.onOpen = /**
         * @return {?}
         */
            function () {
                return this.openObserver.asObservable();
            };
        /**
         * @return {?}
         */
        ModalComponent.prototype.onClose = /**
         * @return {?}
         */
            function () {
                return this.closeObserver.asObservable();
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
                        template: "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" #modalRoot (keydown.esc)=\"settings?.keyboard ? close() : 0\" [ngStyle]=\"{ display: isOpened ? 'block' : 'none' }\" [ngClass]=\"{'fade': settings.animation}\" (click)=\"settings?.backdrop !== 'static' && settings?.closeOnOutsideClick ? close() : 0\">\n    <div [class]=\"'modal-dialog modal-'+ settings?.size + ' ' + settings?.modalClass\" (click)=\"preventClosing($event)\" [ngClass]=\"{'modal-dialog-centered': settings.centered}\">\n        <div class=\"modal-content\" tabindex=\"0\" *ngIf=\"isOpened\">\n            <div class=\"modal-header\">\n                <button *ngIf=\"!settings?.hideCloseButton\" type=\"button\" class=\"close\" [attr.aria-label]=\"settings?.cancelButtonLabel || 'Close'\" (click)=\"close()\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" *ngIf=\"settings?.title\">{{ settings?.title }}</h4>\n                <ng-content select=\"modal-header\"></ng-content>\n            </div>\n            <div class=\"modal-body\">\n                <ng-content select=\"modal-content\"></ng-content>\n            </div>\n            <div class=\"modal-footer\">\n                <ng-content select=\"modal-footer\"></ng-content>\n            </div>\n        </div>\n    </div>\n</div>",
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
            opened: [{ type: i0.Output }],
            closed: [{ type: i0.Output }],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLW1vZGFsLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLmNvbXBvbmVudC50cyIsIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC1mb290ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWNvbnRlbnQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWhlYWRlci5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxNYW5hZ2VyIHtcblxuICBwcml2YXRlIG1vZGFsSG9zdDogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIGdsb2JhbENvbmZpZyA6IE1vZGFsQ29uZmlnID0ge1xuICAgIHNpemU6IFwibWRcIixcbiAgICBtb2RhbENsYXNzOiB1bmRlZmluZWQsXG4gICAgaGlkZUNsb3NlQnV0dG9uIDogZmFsc2UsXG4gICAgY2VudGVyZWQ6IGZhbHNlLFxuICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgIGFuaW1hdGlvbiA6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogdHJ1ZSxcbiAgICBiYWNrZHJvcENsYXNzOiBcIm1vZGFsLWJhY2tkcm9wXCIgXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikgeyB9XG5cbiAgc2V0IGRlZmF1bHRzKGNvbmZpZzogTW9kYWxDb25maWcpIHtcbiAgICB0aGlzLmdsb2JhbENvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWxDb25maWcsIGNvbmZpZyk7XG4gIH1cblxuICBzZXREZWZhdWx0cyhjb25maWc6IE1vZGFsQ29uZmlnKXtcbiAgICB0aGlzLmdsb2JhbENvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWxDb25maWcsIGNvbmZpZyk7ICAgIFxuICB9XG5cbiAgZ2V0IGRlZmF1bHRzKCkgOiBNb2RhbENvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2xvYmFsQ29uZmlnO1xuICB9XG5cbiAgc2V0Um9vdFZpZXdDb250YWluZXJSZWYocmVmKXtcbiAgICB0aGlzLm1vZGFsSG9zdCA9IHJlZjtcbiAgfVxuXG4gIG9wZW4obW9kYWxJbnN0YW5jZSwgY29uZmlnKXtcbiAgICBpZih0eXBlb2YgbW9kYWxJbnN0YW5jZSA9PT0gXCJvYmplY3RcIil7XG4gICAgICBtb2RhbEluc3RhbmNlLmluaXQoY29uZmlnKTtcbiAgICAgIG1vZGFsSW5zdGFuY2Uub3BlbigpO1xuICAgICAgcmV0dXJuIG1vZGFsSW5zdGFuY2U7XG4gICAgfWVsc2UgaWYodHlwZW9mIG1vZGFsSW5zdGFuY2UgPT09IFwiZnVuY3Rpb25cIil7XG4gICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KG1vZGFsSW5zdGFuY2UpO1xuICAgICAgdGhpcy5tb2RhbEhvc3QucmVtb3ZlKCk7XG4gICAgICBsZXQgY29tcG9uZW50UmVmID0gdGhpcy5tb2RhbEhvc3QuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5pbml0KGNvbmZpZyk7XG4gICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vcGVuKCk7ICAgICAgICBcbiAgICAgIH0pXG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ29uT3BlbiddID0gdGhpcy5jbG9zZUZhY3RvcnkoKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnb25DbG9zZSddID0gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9uQ2xvc2U7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ2Nsb3NlJ10gPSBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10ub25PcGVuO1xuICAgICByZXR1cm4gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIH0gXG5cbiAgfVxuXG4gIGNsb3NlKG1vZGFsSW5zdGFuY2Upe1xuICAgIG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlRmFjdG9yeSgpe1xuICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpc1snTW9kYWxDb21wb25lbnQnXS5jbG9zZSgpO1xuICAgICAgX3NlbGYubW9kYWxIb3N0LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb25maWcge1xuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIHNpemU/OiBzdHJpbmcgfCBcIm1kXCIsXG4gICAgbW9kYWxDbGFzcz86IHN0cmluZyB8ICcnLFxuICAgIGhpZGVDbG9zZUJ1dHRvbj86IGJvb2xlYW4gfCBmYWxzZSxcbiAgICBjZW50ZXJlZD86IGJvb2xlYW4gfCBmYWxzZSxcbiAgICBiYWNrZHJvcD86IGJvb2xlYW4gfCAnc3RhdGljJyB8IHRydWUsXG4gICAgYW5pbWF0aW9uPzogYm9vbGVhbiB8IHRydWUsXG4gICAga2V5Ym9hcmQ/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrPzogYm9vbGVhbiB8IHRydWUsXG4gICAgYmFja2Ryb3BDbGFzcz86IHN0cmluZyB8IFwibW9kYWwtYmFja2Ryb3BcIlxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxNYW5hZ2VyIH0gZnJvbSAnLi9tb2RhbC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZGVjbGFyZSB2YXIgZG9jdW1lbnQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtb2RhbFwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgI21vZGFsUm9vdCAoa2V5ZG93bi5lc2MpPVwic2V0dGluZ3M/LmtleWJvYXJkID8gY2xvc2UoKSA6IDBcIiBbbmdTdHlsZV09XCJ7IGRpc3BsYXk6IGlzT3BlbmVkID8gJ2Jsb2NrJyA6ICdub25lJyB9XCIgW25nQ2xhc3NdPVwieydmYWRlJzogc2V0dGluZ3MuYW5pbWF0aW9ufVwiIChjbGljayk9XCJzZXR0aW5ncz8uYmFja2Ryb3AgIT09ICdzdGF0aWMnICYmIHNldHRpbmdzPy5jbG9zZU9uT3V0c2lkZUNsaWNrID8gY2xvc2UoKSA6IDBcIj5cbiAgICA8ZGl2IFtjbGFzc109XCInbW9kYWwtZGlhbG9nIG1vZGFsLScrIHNldHRpbmdzPy5zaXplICsgJyAnICsgc2V0dGluZ3M/Lm1vZGFsQ2xhc3NcIiAoY2xpY2spPVwicHJldmVudENsb3NpbmcoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsnbW9kYWwtZGlhbG9nLWNlbnRlcmVkJzogc2V0dGluZ3MuY2VudGVyZWR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCIgdGFiaW5kZXg9XCIwXCIgKm5nSWY9XCJpc09wZW5lZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCIhc2V0dGluZ3M/LmhpZGVDbG9zZUJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJzZXR0aW5ncz8uY2FuY2VsQnV0dG9uTGFiZWwgfHwgJ0Nsb3NlJ1wiIChjbGljayk9XCJjbG9zZSgpXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiICpuZ0lmPVwic2V0dGluZ3M/LnRpdGxlXCI+e3sgc2V0dGluZ3M/LnRpdGxlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczpbYC5tb2RhbC1kaWFsb2ctY2VudGVyZWQge1xuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSAtICgwLjVyZW0gKiAyKSk7XG4gIH1cbiAgQG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KSB7XG4gICAgLm1vZGFsLWRpYWxvZy1jZW50ZXJlZCB7XG4gICAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMCUgLSAoMS43NXJlbSAqIDIpKTtcbiAgICB9XG4gIH1gXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCB7XG5cbiAgLy8gLy90aXRsZSBvZiBtb2RhbFxuICAvLyBASW5wdXQoKSB0aXRsZTtcblxuICAvLyAvL3NpemUgb2YgbW9kYWwuIHNtLGxnLG1kXG4gIC8vIEBJbnB1dCgpIHNpemU7XG5cbiAgLy8gLy9tb2RhbENsYXNzIGFkZGVkIHRvIG1vZGFsIGRpYWxvZ1xuICAvLyBASW5wdXQoKSBtb2RhbENsYXNzO1xuXG4gIC8vIC8vaGlkZSBjbG9zZSBidXR0b25cbiAgLy8gQElucHV0KCkgaGlkZUNsb3NlQnV0dG9uO1xuXG4gIC8vIC8vaWYgbW9kYWwgaXMgdmVydGljYWxseSBjZW50ZXJlZFxuICAvLyBASW5wdXQoKSBjZW50ZXJlZFxuXG4gIC8vIC8vaWYgYmFja2Ryb3AgaXMgYXBwbGllZCBvbiBtb2RhbFxuICAvLyBASW5wdXQoKSBiYWNrZHJvcFxuXG4gIC8vIC8vaWYgdHJ1ZSwgYW5pbWF0aW9uIGlzIGFkZGVkIHRvIG1vZGFsIGRpYWxvZ1xuICAvLyBASW5wdXQoKSBhbmltYXRpb247XG5cbiAgLy8gLy9saXN0ZW4gdG8ga2V5Ym9hcmQgZXZlbnRzXG4gIC8vIEBJbnB1dCgpIGtleWJvYXJkO1xuXG4gIC8vIC8vY2xvc2Ugb24gb3V0c2lkZSBjbGlja1xuICAvLyBASW5wdXQoKSBjbG9zZU9uT3V0c2lkZUNsaWNrO1xuXG4gIC8vIC8vY3VzdG9tIGJhY2tkcm9wIGNsYXNzXG4gIC8vIEBJbnB1dCgpIGJhY2tkcm9wQ2xhc3M7XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBvcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcblxuICBwcml2YXRlIG9wZW5PYnNlcnZlciA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHJpdmF0ZSBjbG9zZU9ic2VydmVyID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBcbiAgcHVibGljIGlzT3BlbmVkID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZChcIm1vZGFsUm9vdFwiKVxuICBwdWJsaWMgbW9kYWxSb290OiBFbGVtZW50UmVmO1xuICBwdWJsaWMgc2V0dGluZ3M7XG4gIHByaXZhdGUgYmFja2Ryb3BFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsTWFuYWdlciA6IE1vZGFsTWFuYWdlcikge1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBjbG9zZU9uRXNjYXBlOiB0cnVlLFxuICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogdHJ1ZSxcbiAgICAgIGhpZGVDbG9zZUJ1dHRvbjogZmFsc2UsXG4gICAgICBiYWNrZHJvcDogdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGluaXQoY29uZmlnKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMubW9kYWxNYW5hZ2VyLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIHRoaXMuY3JlYXRlQmFja0Ryb3AoKTtcbiAgfVxuXG5cbiAgb3BlbigpIHtcbiAgICBpZiAodGhpcy5pc09wZW5lZClcbiAgICAgIHJldHVybjtcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYmFja2Ryb3BFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1vcGVuXCIpO1xuICAgIHRoaXMuaXNPcGVuZWQgPSB0cnVlO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaW4nKTtcbiAgICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMub3BlbmVkLmVtaXQoKTtcbiAgICAgIHRoaXMub3Blbk9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuZWQpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJhY2tkcm9wRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKC9tb2RhbC1vcGVuXFxiLywgXCJcIik7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xuICAgICAgdGhpcy5jbG9zZU9ic2VydmVyLm5leHQodHJ1ZSk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2ZW50Q2xvc2luZyhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgb25PcGVuKCl7XG4gICAgcmV0dXJuIHRoaXMub3Blbk9ic2VydmVyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgb25DbG9zZSgpe1xuICAgIHJldHVybiB0aGlzLmNsb3NlT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJhY2tEcm9wKCkge1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZmFkZVwiKTtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW5cIik7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MgJiYgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcCAmJiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wID09IHRydWUpIHtcbiAgICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5iYWNrZHJvcENsYXNzKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwtZm9vdGVyJyxcbiAgdGVtcGxhdGU6YDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsRm9vdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1oZWFkZXInLFxuICB0ZW1wbGF0ZTpgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5cbmV4cG9ydCBjbGFzcyBNb2RhbEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RhbEZvb3RlckNvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWZvb3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsQ29udGVudENvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWNvbnRlbnQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbEhlYWRlckNvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWhlYWRlci5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNb2RhbENvbXBvbmVudCwgTW9kYWxGb290ZXJDb21wb25lbnQsIE1vZGFsQ29udGVudENvbXBvbmVudCwgTW9kYWxIZWFkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTW9kYWxDb21wb25lbnQsIE1vZGFsRm9vdGVyQ29tcG9uZW50LCBNb2RhbENvbnRlbnRDb21wb25lbnQsIE1vZGFsSGVhZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiRXZlbnRFbWl0dGVyIiwiU3ViamVj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