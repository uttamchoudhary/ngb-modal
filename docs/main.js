(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/ngb-modal/fesm5/ngb-modal.js":
/*!*******************************************!*\
  !*** ./dist/ngb-modal/fesm5/ngb-modal.js ***!
  \*******************************************/
/*! exports provided: ModalManager, ModalComponent, ModalModule, ModalContentComponent, ModalHeaderComponent, ModalFooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalManager", function() { return ModalManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalComponent", function() { return ModalComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalModule", function() { return ModalModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalContentComponent", function() { return ModalContentComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalHeaderComponent", function() { return ModalHeaderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalFooterComponent", function() { return ModalFooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    ModalManager.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"] }
    ]; };
    return ModalManager;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ModalComponent = /** @class */ (function () {
    function ModalComponent(modalManager) {
        this.modalManager = modalManager;
        this.onOpen = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](false);
        this.onClose = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](false);
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'modal',
                    template: "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" #modalRoot (keydown.esc)=\"settings?.keyboard ? close() : 0\" [ngStyle]=\"{ display: isOpened ? 'block' : 'none' }\" [ngClass]=\"{'fade': settings?.animation}\" (click)=\"settings?.backdrop !== 'static' && settings?.closeOnOutsideClick ? close() : 0\">\n    <div [class]=\"'modal-dialog modal-'+ settings?.size + ' ' + settings?.modalClass\" (click)=\"preventClosing($event)\" [ngClass]=\"{'modal-dialog-centered': settings?.centered}\">\n        <div class=\"modal-content\" tabindex=\"0\" *ngIf=\"isOpened\">\n            <div class=\"modal-header\">\n                <button *ngIf=\"!settings?.hideCloseButton\" type=\"button\" class=\"close\" [attr.aria-label]=\"settings?.cancelButtonLabel || 'Close'\" (click)=\"close()\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" *ngIf=\"settings?.title\">{{ settings?.title }}</h4>\n                <ng-content select=\"modal-header\"></ng-content>\n            </div>\n            <div class=\"modal-body\">\n                <ng-content select=\"modal-content\"></ng-content>\n            </div>\n            <div class=\"modal-footer\">\n                <ng-content select=\"modal-footer\"></ng-content>\n            </div>\n        </div>\n    </div>\n</div>",
                    styles: [".modal-dialog-centered {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    min-height: calc(100% - (0.5rem * 2));\n  }\n  @media (min-width: 576px) {\n    .modal-dialog-centered {\n      min-height: calc(100% - (1.75rem * 2));\n    }\n  }"]
                },] },
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = function () { return [
        { type: ModalManager }
    ]; };
    ModalComponent.propDecorators = {
        title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        size: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        modalClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        hideCloseButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        centered: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        backdrop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        animation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        keyboard: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        closeOnOutsideClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        backdropClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        onOpen: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        onClose: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        modalRoot: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ["modalRoot",] }]
    };
    return ModalComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ModalFooterComponent = /** @class */ (function () {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
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
var ModalContentComponent = /** @class */ (function () {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
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
var ModalHeaderComponent = /** @class */ (function () {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
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
var ModalModule = /** @class */ (function () {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLW1vZGFsLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLnNlcnZpY2UudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWZvb3Rlci5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwtY29udGVudC5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwtaGVhZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9kYWxNYW5hZ2VyIHtcblxuICBwcml2YXRlIG1vZGFsSG9zdDogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIGdsb2JhbENvbmZpZyA6IE1vZGFsQ29uZmlnID0ge1xuICAgIHNpemU6IFwibWRcIixcbiAgICBtb2RhbENsYXNzOiAnJyxcbiAgICBoaWRlQ2xvc2VCdXR0b24gOiBmYWxzZSxcbiAgICBjZW50ZXJlZDogZmFsc2UsXG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAgYW5pbWF0aW9uIDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgIGJhY2tkcm9wQ2xhc3M6IFwibW9kYWwtYmFja2Ryb3BcIiBcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7IH1cblxuICBzZXQgZGVmYXVsdHMoY29uZmlnOiBNb2RhbENvbmZpZykge1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbENvbmZpZywgY29uZmlnKTtcbiAgfVxuXG4gIHNldERlZmF1bHRzKGNvbmZpZzogTW9kYWxDb25maWcpe1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbENvbmZpZywgY29uZmlnKTsgICAgXG4gIH1cblxuICBnZXQgZGVmYXVsdHMoKSA6IE1vZGFsQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5nbG9iYWxDb25maWc7XG4gIH1cblxuICBzZXRSb290Vmlld0NvbnRhaW5lclJlZihyZWYpe1xuICAgIHRoaXMubW9kYWxIb3N0ID0gcmVmO1xuICB9XG5cbiAgb3Blbihtb2RhbEluc3RhbmNlLCBjb25maWcpe1xuICAgIGlmKHR5cGVvZiBtb2RhbEluc3RhbmNlID09PSBcIm9iamVjdFwiKXtcbiAgICAgIG1vZGFsSW5zdGFuY2UuaW5pdChjb25maWcpO1xuICAgICAgbW9kYWxJbnN0YW5jZS5vcGVuKCk7XG4gICAgICByZXR1cm4gbW9kYWxJbnN0YW5jZTtcbiAgICB9ZWxzZSBpZih0eXBlb2YgbW9kYWxJbnN0YW5jZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkobW9kYWxJbnN0YW5jZSk7XG4gICAgICB0aGlzLm1vZGFsSG9zdC5yZW1vdmUoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB0aGlzLm1vZGFsSG9zdC5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10uaW5pdChjb25maWcpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydjbG9zZSddID0gdGhpcy5jbG9zZUZhY3RvcnkoKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnb25DbG9zZSddID0gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9uQ2xvc2U7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ29uT3BlbiddID0gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9uT3BlbjtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9wZW4oKSk7XG4gICAgIHJldHVybiBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgfSBcbiAgfVxuXG4gIGNsb3NlKG1vZGFsSW5zdGFuY2Upe1xuICAgIG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlRmFjdG9yeSgpe1xuICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpc1snTW9kYWxDb21wb25lbnQnXS5jbG9zZSgpO1xuICAgICAgX3NlbGYubW9kYWxIb3N0LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb25maWcge1xuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIHNpemU/OiBzdHJpbmcgfCBcIm1kXCIsXG4gICAgbW9kYWxDbGFzcz86IHN0cmluZyB8ICcnLFxuICAgIGhpZGVDbG9zZUJ1dHRvbj86IGJvb2xlYW4gfCBmYWxzZSxcbiAgICBjZW50ZXJlZD86IGJvb2xlYW4gfCBmYWxzZSxcbiAgICBiYWNrZHJvcD86IGJvb2xlYW4gfCAnc3RhdGljJyB8IHRydWUsXG4gICAgYW5pbWF0aW9uPzogYm9vbGVhbiB8IHRydWUsXG4gICAga2V5Ym9hcmQ/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrPzogYm9vbGVhbiB8IHRydWUsXG4gICAgYmFja2Ryb3BDbGFzcz86IHN0cmluZyB8IFwibW9kYWwtYmFja2Ryb3BcIlxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxNYW5hZ2VyIH0gZnJvbSAnLi9tb2RhbC5zZXJ2aWNlJztcblxuZGVjbGFyZSB2YXIgZG9jdW1lbnQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtb2RhbFwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgI21vZGFsUm9vdCAoa2V5ZG93bi5lc2MpPVwic2V0dGluZ3M/LmtleWJvYXJkID8gY2xvc2UoKSA6IDBcIiBbbmdTdHlsZV09XCJ7IGRpc3BsYXk6IGlzT3BlbmVkID8gJ2Jsb2NrJyA6ICdub25lJyB9XCIgW25nQ2xhc3NdPVwieydmYWRlJzogc2V0dGluZ3M/LmFuaW1hdGlvbn1cIiAoY2xpY2spPVwic2V0dGluZ3M/LmJhY2tkcm9wICE9PSAnc3RhdGljJyAmJiBzZXR0aW5ncz8uY2xvc2VPbk91dHNpZGVDbGljayA/IGNsb3NlKCkgOiAwXCI+XG4gICAgPGRpdiBbY2xhc3NdPVwiJ21vZGFsLWRpYWxvZyBtb2RhbC0nKyBzZXR0aW5ncz8uc2l6ZSArICcgJyArIHNldHRpbmdzPy5tb2RhbENsYXNzXCIgKGNsaWNrKT1cInByZXZlbnRDbG9zaW5nKCRldmVudClcIiBbbmdDbGFzc109XCJ7J21vZGFsLWRpYWxvZy1jZW50ZXJlZCc6IHNldHRpbmdzPy5jZW50ZXJlZH1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIiB0YWJpbmRleD1cIjBcIiAqbmdJZj1cImlzT3BlbmVkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIiFzZXR0aW5ncz8uaGlkZUNsb3NlQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInNldHRpbmdzPy5jYW5jZWxCdXR0b25MYWJlbCB8fCAnQ2xvc2UnXCIgKGNsaWNrKT1cImNsb3NlKClcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgKm5nSWY9XCJzZXR0aW5ncz8udGl0bGVcIj57eyBzZXR0aW5ncz8udGl0bGUgfX08L2g0PlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOltgLm1vZGFsLWRpYWxvZy1jZW50ZXJlZCB7XG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gKDAuNXJlbSAqIDIpKTtcbiAgfVxuICBAbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpIHtcbiAgICAubW9kYWwtZGlhbG9nLWNlbnRlcmVkIHtcbiAgICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSAtICgxLjc1cmVtICogMikpO1xuICAgIH1cbiAgfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvL3RpdGxlIG9mIG1vZGFsXG4gIEBJbnB1dCgpIHRpdGxlO1xuXG4gIC8vc2l6ZSBvZiBtb2RhbC4gc20sbGcsbWRcbiAgQElucHV0KCkgc2l6ZTtcblxuICAvL21vZGFsQ2xhc3MgYWRkZWQgdG8gbW9kYWwgZGlhbG9nXG4gIEBJbnB1dCgpIG1vZGFsQ2xhc3M7XG5cbiAgLy9oaWRlIGNsb3NlIGJ1dHRvblxuICBASW5wdXQoKSBoaWRlQ2xvc2VCdXR0b247XG5cbiAgLy9pZiBtb2RhbCBpcyB2ZXJ0aWNhbGx5IGNlbnRlcmVkXG4gIEBJbnB1dCgpIGNlbnRlcmVkXG5cbiAgLy9pZiBiYWNrZHJvcCBpcyBhcHBsaWVkIG9uIG1vZGFsXG4gIEBJbnB1dCgpIGJhY2tkcm9wXG5cbiAgLy9pZiB0cnVlLCBhbmltYXRpb24gaXMgYWRkZWQgdG8gbW9kYWwgZGlhbG9nXG4gIEBJbnB1dCgpIGFuaW1hdGlvbjtcblxuICAvL2xpc3RlbiB0byBrZXlib2FyZCBldmVudHNcbiAgQElucHV0KCkga2V5Ym9hcmQ7XG5cbiAgLy9jbG9zZSBvbiBvdXRzaWRlIGNsaWNrXG4gIEBJbnB1dCgpIGNsb3NlT25PdXRzaWRlQ2xpY2s7XG5cbiAgLy9jdXN0b20gYmFja2Ryb3AgY2xhc3NcbiAgQElucHV0KCkgYmFja2Ryb3BDbGFzcztcblxuICBAT3V0cHV0KCkgcHVibGljIG9uT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiBcblxuICBAVmlld0NoaWxkKFwibW9kYWxSb290XCIpIHB1YmxpYyBtb2RhbFJvb3Q6IEVsZW1lbnRSZWY7XG4gICBcbiAgcHVibGljIGlzT3BlbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgaW5wdXRTZXR0aW5ncztcbiAgcHVibGljIHNldHRpbmdzO1xuICBwcml2YXRlIGJhY2tkcm9wRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbE1hbmFnZXIgOiBNb2RhbE1hbmFnZXIpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCl7XG4gICAgdGhpcy5pbnB1dFNldHRpbmdzID0ge1xuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICBzaXplOiB0aGlzLnNpemUgfHwgXCJtZFwiLFxuICAgICAgbW9kYWxDbGFzczogdGhpcy5tb2RhbENsYXNzIHx8ICcnLFxuICAgICAgaGlkZUNsb3NlQnV0dG9uIDogdGhpcy5oaWRlQ2xvc2VCdXR0b24gfHwgZmFsc2UsXG4gICAgICBjZW50ZXJlZDogdGhpcy5jZW50ZXJlZCB8fCBmYWxzZSxcbiAgICAgIGJhY2tkcm9wOiB0aGlzLmJhY2tkcm9wIHx8IHRydWUsXG4gICAgICBhbmltYXRpb24gOiB0aGlzLmFuaW1hdGlvbiB8fCB0cnVlLFxuICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQgfHwgdHJ1ZSxcbiAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRoaXMuY2xvc2VPbk91dHNpZGVDbGljayB8fCB0cnVlLFxuICAgICAgYmFja2Ryb3BDbGFzczogdGhpcy5iYWNrZHJvcENsYXNzIHx8IFwibW9kYWwtYmFja2Ryb3BcIlxuICAgIH1cbiAgfVxuXG4gIGluaXQoY29uZmlnKSB7XG4gICAgdGhpcy5vbk9wZW4ub2JzZXJ2ZXJzID0gW107XG4gICAgdGhpcy5vbkNsb3NlLm9ic2VydmVycyA9IFtdO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm1vZGFsTWFuYWdlci5kZWZhdWx0cywgdGhpcy5pbnB1dFNldHRpbmdzLCBjb25maWcpO1xuICAgIHRoaXMuY3JlYXRlQmFja0Ryb3AoKTtcbiAgfVxuXG5cbiAgb3BlbigpIHtcbiAgICBpZiAodGhpcy5pc09wZW5lZClcbiAgICAgIHJldHVybjtcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYmFja2Ryb3BFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1vcGVuXCIpO1xuICAgIHRoaXMuaXNPcGVuZWQgPSB0cnVlO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaW4nKTtcbiAgICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMub25PcGVuLmVtaXQoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbmVkKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZSgvbW9kYWwtb3BlblxcYi8sIFwiXCIpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2ZW50Q2xvc2luZyhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCYWNrRHJvcCgpIHtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZhZGVcIik7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImluXCIpO1xuICAgIGlmICh0aGlzLnNldHRpbmdzICYmIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3AgJiYgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcCA9PSB0cnVlKSB7XG4gICAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BDbGFzcyk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsLWZvb3RlcicsXG4gIHRlbXBsYXRlOmA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbEZvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwtaGVhZGVyJyxcbiAgdGVtcGxhdGU6YDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXG59KVxuXG5leHBvcnQgY2xhc3MgTW9kYWxIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxGb290ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC1mb290ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbENvbnRlbnRDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC1jb250ZW50LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxIZWFkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC1oZWFkZXIuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2RhbE1hbmFnZXIgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW01vZGFsQ29tcG9uZW50LCBNb2RhbEZvb3RlckNvbXBvbmVudCwgTW9kYWxDb250ZW50Q29tcG9uZW50LCBNb2RhbEhlYWRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtNb2RhbENvbXBvbmVudCwgTW9kYWxGb290ZXJDb21wb25lbnQsIE1vZGFsQ29udGVudENvbXBvbmVudCwgTW9kYWxIZWFkZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNb2RhbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNb2RhbE1hbmFnZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG4gfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtJQW1CRSxzQkFBb0Isd0JBQWtEO1FBQWxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7NEJBWmpDO1lBQ25DLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLEVBQUU7WUFDZCxlQUFlLEVBQUcsS0FBSztZQUN2QixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFHLElBQUk7WUFDaEIsUUFBUSxFQUFFLElBQUk7WUFDZCxtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGFBQWEsRUFBRSxnQkFBZ0I7U0FDaEM7S0FFMEU7SUFFM0Usc0JBQUksa0NBQVE7Ozs7UUFRWjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjs7Ozs7UUFWRCxVQUFhLE1BQW1CO1lBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzlEOzs7T0FBQTs7Ozs7SUFFRCxrQ0FBVzs7OztJQUFYLFVBQVksTUFBbUI7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDOUQ7Ozs7O0lBTUQsOENBQXVCOzs7O0lBQXZCLFVBQXdCLEdBQUc7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7S0FDdEI7Ozs7OztJQUVELDJCQUFJOzs7OztJQUFKLFVBQUssYUFBYSxFQUFFLE1BQU07UUFDeEIsSUFBRyxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUM7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

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"btn btn-primary\" (click)=\"modal1.open()\">open</button>\n<modal #modal1 title=\"input title\">\n    <modal-header>\n        Modal 1\n    </modal-header>\n\n    <modal-content>\n        Modal body content goes there.\n    </modal-content>\n\n    <modal-footer>\n        Modal footer content goes there.\n        <button class=\"btn btn-primary\" (click)=\"asComponent2()\">open1</button>\n\n    </modal-footer>\n</modal>\n<button class=\"btn btn-primary\" (click)=\"modal2.open()\">open1</button>\n\n<modal #modal2>\n    <modal-header>\n        Modal header content goes there.\n    </modal-header>\n\n    <modal-content>\n        Modal body content goes there.\n    </modal-content>\n\n    <modal-footer>\n        Modal footer content goes there.\n    </modal-footer>\n</modal>\n\n<button class=\"btn btn-primary\" (click)=\"asComponent()\">As Comp</button>\n<button class=\"btn btn-primary\" (click)=\"asComponent2()\">As Comp2</button>\n\n<button class=\"btn btn-primary\" (click)=\"asTemplate()\">template</button>\n\n<button class=\"btn btn-primary\" (click)=\"close()\">close</button>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent, ModalComp, ModalComp2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalComp", function() { return ModalComp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalComp2", function() { return ModalComp2; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngb_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngb-modal */ "./dist/ngb-modal/fesm5/ngb-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(modal, vcr) {
        this.modal = modal;
        this.vcr = vcr;
        this.title = 'app';
        this.settings = {
            title: "hello world",
            closeOnEscape: true,
            closeOnOutsideClick: true,
            hideCloseButton: false,
            backdrop: true
        };
        this.modal.defaults = {
            title: "tried modal",
            size: "sm",
            modalClass: 'mymodal',
            hideCloseButton: true,
            centered: false,
            backdrop: true,
            animation: true,
            keyboard: true,
            closeOnOutsideClick: true,
            backdropClass: "modal-backdrop"
        };
        this.modal.setRootViewContainerRef(this.vcr);
    }
    AppComponent.prototype.asComponent = function () {
        this.modal.open(ModalComp, {});
    };
    AppComponent.prototype.asComponent2 = function () {
        var currentRef = this.modal.open(ModalComp2, {});
        currentRef['data'] = "uttam";
        currentRef.onOpen.subscribe(function () {
            console.log("comp opened");
        });
        currentRef.onClose.subscribe(function () {
            console.log("comp closed");
        });
        setTimeout(function () {
            currentRef.close();
        }, 5000);
    };
    AppComponent.prototype.asTemplate = function () {
        var ref = this.modal.open(this.modal1, {
            size: "md",
            modalClass: 'mymodal',
            hideCloseButton: false,
            centered: false,
            backdrop: true,
            animation: true,
            keyboard: false,
            closeOnOutsideClick: true,
            backdropClass: "modal-backdrop"
        });
        ref.onOpen.subscribe(function (res) {
            console.log("opened template");
        });
        ref.onClose.subscribe(function (res) {
            console.log("closed template");
        });
        // setTimeout(()=> {
        //   this.close(ref)
        // },3000)
    };
    AppComponent.prototype.close = function (ref) {
        this.modal.close(ref);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modal1'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "modal1", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modal2'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "modal2", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [ngb_modal__WEBPACK_IMPORTED_MODULE_1__["ModalManager"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]])
    ], AppComponent);
    return AppComponent;
}());

var ModalComp = /** @class */ (function () {
    function ModalComp() {
    }
    ModalComp = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-modal',
            template: "<modal>\n  <modal-header>\n      Modal as a component\n  </modal-header>\n\n  <modal-content>\n      Modal body content goes there.\n  </modal-content>\n\n  <modal-footer>\n      Modal footer content goes there.\n  </modal-footer>\n</modal>"
        })
    ], ModalComp);
    return ModalComp;
}());

var ModalComp2 = /** @class */ (function () {
    function ModalComp2() {
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(ngb_modal__WEBPACK_IMPORTED_MODULE_1__["ModalComponent"]),
        __metadata("design:type", Object)
    ], ModalComp2.prototype, "ModalComponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModalComp2.prototype, "data", void 0);
    ModalComp2 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-modal2',
            template: "<modal>\n  <modal-header>\n      Modal 2 as a component\n  </modal-header>\n\n  <modal-content>\n  <span>{{data}}</span>\n      Modal body content goes there.\n  </modal-content>\n\n  <modal-footer>\n      Modal footer content goes there.\n  </modal-footer>\n</modal>"
        })
    ], ModalComp2);
    return ModalComp2;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngb_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngb-modal */ "./dist/ngb-modal/fesm5/ngb-modal.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"], _app_component__WEBPACK_IMPORTED_MODULE_7__["ModalComp"], _app_component__WEBPACK_IMPORTED_MODULE_7__["ModalComp2"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"].forRoot(),
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
                ngb_modal__WEBPACK_IMPORTED_MODULE_4__["ModalModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"].forRoot()
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]],
            entryComponents: [_app_component__WEBPACK_IMPORTED_MODULE_7__["ModalComp"], _app_component__WEBPACK_IMPORTED_MODULE_7__["ModalComp2"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/shared/components/index.ts":
/*!********************************************!*\
  !*** ./src/app/shared/components/index.ts ***!
  \********************************************/
/*! exports provided: Components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Components", function() { return Components; });
/* harmony import */ var _loader_loader_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader/loader.component */ "./src/app/shared/components/loader/loader.component.ts");

var Components = [
    _loader_loader_component__WEBPACK_IMPORTED_MODULE_0__["LoaderComponent"]
];


/***/ }),

/***/ "./src/app/shared/components/loader/loader.component.html":
/*!****************************************************************!*\
  !*** ./src/app/shared/components/loader/loader.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"showLoader\">\n    <div class=\"loader\" name=\"loader\">\n        <div class=\"line-spinner\"></div>\n    </div>\n    <!-- <img class=\"loading\" src=\"./../../../assets/images/ring.gif\" width=\"90\"> -->\n</div>"

/***/ }),

/***/ "./src/app/shared/components/loader/loader.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/shared/components/loader/loader.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".loader {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  background: #fff;\n  opacity: 0.8;\n  z-index: 1060; }\n\n.loading {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  z-index: 1060; }\n\n.line-spinner {\n  border: 4px solid #F0503C;\n  border-top: 4px solid rgba(255, 0, 0, 0);\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  -webkit-animation: spin 2s linear infinite;\n  animation: spin 1s linear infinite;\n  display: inline-block;\n  vertical-align: middle;\n  position: absolute;\n  margin: auto;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0; }\n\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n"

/***/ }),

/***/ "./src/app/shared/components/loader/loader.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/components/loader/loader.component.ts ***!
  \**************************************************************/
/*! exports provided: LoaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderComponent", function() { return LoaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/loader.service */ "./src/app/shared/services/loader.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoaderComponent = /** @class */ (function () {
    function LoaderComponent(LoaderService) {
        this.LoaderService = LoaderService;
        this.state = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.showLoader = false;
    }
    LoaderComponent.prototype.ngOnInit = function () {
        this.checkState();
    };
    LoaderComponent.prototype.checkState = function () {
        var _this = this;
        this.state = this.LoaderService.getLoadState().subscribe(function (res) {
            window.setTimeout(function () {
                _this.showLoader = res;
            });
        });
    };
    ;
    LoaderComponent.prototype.ngOnDestroy = function () {
        this.state.unsubscribe();
    };
    LoaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'loader',
            template: __webpack_require__(/*! ./loader.component.html */ "./src/app/shared/components/loader/loader.component.html"),
            styles: [__webpack_require__(/*! ./loader.component.scss */ "./src/app/shared/components/loader/loader.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_loader_service__WEBPACK_IMPORTED_MODULE_1__["LoaderService"]])
    ], LoaderComponent);
    return LoaderComponent;
}());



/***/ }),

/***/ "./src/app/shared/directives/control-state.directive.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/directives/control-state.directive.ts ***!
  \**************************************************************/
/*! exports provided: ControlStateDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlStateDirective", function() { return ControlStateDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ControlStateDirective = /** @class */ (function () {
    function ControlStateDirective(ngControl) {
        this.ngControl = ngControl;
    }
    Object.defineProperty(ControlStateDirective.prototype, "disableControl", {
        set: function (condition) {
            var _this = this;
            var action = condition ? 'disable' : 'enable';
            setTimeout(function () {
                _this.ngControl.control[action]();
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ControlStateDirective.prototype, "disableControl", null);
    ControlStateDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[control-state]'
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"]])
    ], ControlStateDirective);
    return ControlStateDirective;
}());



/***/ }),

/***/ "./src/app/shared/directives/disable-control.directive.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/directives/disable-control.directive.ts ***!
  \****************************************************************/
/*! exports provided: DisableControlDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisableControlDirective", function() { return DisableControlDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DisableControlDirective = /** @class */ (function () {
    function DisableControlDirective(ngControl) {
        this.ngControl = ngControl;
    }
    Object.defineProperty(DisableControlDirective.prototype, "disableControl", {
        set: function (condition) {
            var _this = this;
            var action = condition ? 'disable' : 'enable';
            setTimeout(function () {
                _this.ngControl.control[action]();
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], DisableControlDirective.prototype, "disableControl", null);
    DisableControlDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[disableControl]'
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"]])
    ], DisableControlDirective);
    return DisableControlDirective;
}());



/***/ }),

/***/ "./src/app/shared/directives/index.ts":
/*!********************************************!*\
  !*** ./src/app/shared/directives/index.ts ***!
  \********************************************/
/*! exports provided: Directives */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Directives", function() { return Directives; });
/* harmony import */ var _disable_control_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./disable-control.directive */ "./src/app/shared/directives/disable-control.directive.ts");
/* harmony import */ var _control_state_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control-state.directive */ "./src/app/shared/directives/control-state.directive.ts");


var Directives = [
    _disable_control_directive__WEBPACK_IMPORTED_MODULE_0__["DisableControlDirective"],
    _control_state_directive__WEBPACK_IMPORTED_MODULE_1__["ControlStateDirective"]
];


/***/ }),

/***/ "./src/app/shared/services/index.ts":
/*!******************************************!*\
  !*** ./src/app/shared/services/index.ts ***!
  \******************************************/
/*! exports provided: Services */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Services", function() { return Services; });
/* harmony import */ var _loader_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader.service */ "./src/app/shared/services/loader.service.ts");

var Services = [
    _loader_service__WEBPACK_IMPORTED_MODULE_0__["LoaderService"]
];


/***/ }),

/***/ "./src/app/shared/services/loader.service.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/services/loader.service.ts ***!
  \***************************************************/
/*! exports provided: LoaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderService", function() { return LoaderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoaderService = /** @class */ (function () {
    function LoaderService() {
        this.loadEvt = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    LoaderService.prototype.getLoadState = function () {
        return this.loadEvt;
    };
    LoaderService.prototype.start = function () {
        this.loadEvt.emit(true);
    };
    LoaderService.prototype.stop = function () {
        this.loadEvt.emit(false);
    };
    LoaderService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LoaderService);
    return LoaderService;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components */ "./src/app/shared/components/index.ts");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives */ "./src/app/shared/directives/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services */ "./src/app/shared/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: _services__WEBPACK_IMPORTED_MODULE_5__["Services"].slice()
        };
    };
    SharedModule = SharedModule_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"]
            ],
            declarations: _components__WEBPACK_IMPORTED_MODULE_3__["Components"].concat(_directives__WEBPACK_IMPORTED_MODULE_4__["Directives"]),
            exports: _components__WEBPACK_IMPORTED_MODULE_3__["Components"].concat(_directives__WEBPACK_IMPORTED_MODULE_4__["Directives"])
        })
    ], SharedModule);
    return SharedModule;
    var SharedModule_1;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/delhivery/Drive/Github/Open Sources/ngb-modal/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map