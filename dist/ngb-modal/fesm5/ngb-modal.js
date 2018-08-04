import { Injectable, ComponentFactoryResolver, Component, Output, EventEmitter, ViewChild, NgModule, defineInjectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
    /** @nocollapse */ ModalManager.ngInjectableDef = defineInjectable({ factory: function ModalManager_Factory() { return new ModalManager(inject(ComponentFactoryResolver)); }, token: ModalManager, providedIn: "root" });
    return ModalManager;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ModalComponent = /** @class */ (function () {
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
        this.opened = new EventEmitter(false);
        this.closed = new EventEmitter(false);
        this.openObserver = new Subject();
        this.closeObserver = new Subject();
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
        { type: Component, args: [{
                    selector: 'modal',
                    template: "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" #modalRoot (keydown.esc)=\"settings?.keyboard ? close() : 0\" [ngStyle]=\"{ display: isOpened ? 'block' : 'none' }\" [ngClass]=\"{'fade': settings.animation}\" (click)=\"settings?.backdrop !== 'static' && settings?.closeOnOutsideClick ? close() : 0\">\n    <div [class]=\"'modal-dialog modal-'+ settings?.size + ' ' + settings?.modalClass\" (click)=\"preventClosing($event)\" [ngClass]=\"{'modal-dialog-centered': settings.centered}\">\n        <div class=\"modal-content\" tabindex=\"0\" *ngIf=\"isOpened\">\n            <div class=\"modal-header\">\n                <button *ngIf=\"!settings?.hideCloseButton\" type=\"button\" class=\"close\" [attr.aria-label]=\"settings?.cancelButtonLabel || 'Close'\" (click)=\"close()\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" *ngIf=\"settings?.title\">{{ settings?.title }}</h4>\n                <ng-content select=\"modal-header\"></ng-content>\n            </div>\n            <div class=\"modal-body\">\n                <ng-content select=\"modal-content\"></ng-content>\n            </div>\n            <div class=\"modal-footer\">\n                <ng-content select=\"modal-footer\"></ng-content>\n            </div>\n        </div>\n    </div>\n</div>",
                    styles: [".modal-dialog-centered {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    min-height: calc(100% - (0.5rem * 2));\n  }\n  @media (min-width: 576px) {\n    .modal-dialog-centered {\n      min-height: calc(100% - (1.75rem * 2));\n    }\n  }"]
                },] },
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = function () { return [
        { type: ModalManager }
    ]; };
    ModalComponent.propDecorators = {
        opened: [{ type: Output }],
        closed: [{ type: Output }],
        modalRoot: [{ type: ViewChild, args: ["modalRoot",] }]
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
        { type: Component, args: [{
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
        { type: Component, args: [{
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
        { type: Component, args: [{
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
    ModalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
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

export { ModalManager, ModalComponent, ModalModule, ModalContentComponent, ModalHeaderComponent, ModalFooterComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLW1vZGFsLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLnNlcnZpY2UudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWZvb3Rlci5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwtY29udGVudC5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwtaGVhZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1hbmFnZXIge1xuXG4gIHByaXZhdGUgbW9kYWxIb3N0OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgZ2xvYmFsQ29uZmlnIDogTW9kYWxDb25maWcgPSB7XG4gICAgc2l6ZTogXCJtZFwiLFxuICAgIG1vZGFsQ2xhc3M6IHVuZGVmaW5lZCxcbiAgICBoaWRlQ2xvc2VCdXR0b24gOiBmYWxzZSxcbiAgICBjZW50ZXJlZDogZmFsc2UsXG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAgYW5pbWF0aW9uIDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgIGJhY2tkcm9wQ2xhc3M6IFwibW9kYWwtYmFja2Ryb3BcIiBcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7IH1cblxuICBzZXQgZGVmYXVsdHMoY29uZmlnOiBNb2RhbENvbmZpZykge1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbENvbmZpZywgY29uZmlnKTtcbiAgfVxuXG4gIHNldERlZmF1bHRzKGNvbmZpZzogTW9kYWxDb25maWcpe1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbENvbmZpZywgY29uZmlnKTsgICAgXG4gIH1cblxuICBnZXQgZGVmYXVsdHMoKSA6IE1vZGFsQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5nbG9iYWxDb25maWc7XG4gIH1cblxuICBzZXRSb290Vmlld0NvbnRhaW5lclJlZihyZWYpe1xuICAgIHRoaXMubW9kYWxIb3N0ID0gcmVmO1xuICB9XG5cbiAgb3Blbihtb2RhbEluc3RhbmNlLCBjb25maWcpe1xuICAgIGlmKHR5cGVvZiBtb2RhbEluc3RhbmNlID09PSBcIm9iamVjdFwiKXtcbiAgICAgIG1vZGFsSW5zdGFuY2UuaW5pdChjb25maWcpO1xuICAgICAgbW9kYWxJbnN0YW5jZS5vcGVuKCk7XG4gICAgICByZXR1cm4gbW9kYWxJbnN0YW5jZTtcbiAgICB9ZWxzZSBpZih0eXBlb2YgbW9kYWxJbnN0YW5jZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkobW9kYWxJbnN0YW5jZSk7XG4gICAgICB0aGlzLm1vZGFsSG9zdC5yZW1vdmUoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB0aGlzLm1vZGFsSG9zdC5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLmluaXQoY29uZmlnKTtcbiAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9wZW4oKTsgICAgICAgIFxuICAgICAgfSlcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnb25PcGVuJ10gPSB0aGlzLmNsb3NlRmFjdG9yeSgpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydvbkNsb3NlJ10gPSBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10ub25DbG9zZTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnY2xvc2UnXSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vbk9wZW47XG4gICAgIHJldHVybiBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgfSBcblxuICB9XG5cbiAgY2xvc2UobW9kYWxJbnN0YW5jZSl7XG4gICAgbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICB9XG5cbiAgY2xvc2VGYWN0b3J5KCl7XG4gICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzWydNb2RhbENvbXBvbmVudCddLmNsb3NlKCk7XG4gICAgICBfc2VsZi5tb2RhbEhvc3QucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvbmZpZyB7XG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgc2l6ZT86IHN0cmluZyB8IFwibWRcIixcbiAgICBtb2RhbENsYXNzPzogc3RyaW5nIHwgJycsXG4gICAgaGlkZUNsb3NlQnV0dG9uPzogYm9vbGVhbiB8IGZhbHNlLFxuICAgIGNlbnRlcmVkPzogYm9vbGVhbiB8IGZhbHNlLFxuICAgIGJhY2tkcm9wPzogYm9vbGVhbiB8ICdzdGF0aWMnIHwgdHJ1ZSxcbiAgICBhbmltYXRpb24/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBrZXlib2FyZD86IGJvb2xlYW4gfCB0cnVlLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBiYWNrZHJvcENsYXNzPzogc3RyaW5nIHwgXCJtb2RhbC1iYWNrZHJvcFwiXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbE1hbmFnZXIgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5kZWNsYXJlIHZhciBkb2N1bWVudDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1vZGFsXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiAjbW9kYWxSb290IChrZXlkb3duLmVzYyk9XCJzZXR0aW5ncz8ua2V5Ym9hcmQgPyBjbG9zZSgpIDogMFwiIFtuZ1N0eWxlXT1cInsgZGlzcGxheTogaXNPcGVuZWQgPyAnYmxvY2snIDogJ25vbmUnIH1cIiBbbmdDbGFzc109XCJ7J2ZhZGUnOiBzZXR0aW5ncy5hbmltYXRpb259XCIgKGNsaWNrKT1cInNldHRpbmdzPy5iYWNrZHJvcCAhPT0gJ3N0YXRpYycgJiYgc2V0dGluZ3M/LmNsb3NlT25PdXRzaWRlQ2xpY2sgPyBjbG9zZSgpIDogMFwiPlxuICAgIDxkaXYgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cgbW9kYWwtJysgc2V0dGluZ3M/LnNpemUgKyAnICcgKyBzZXR0aW5ncz8ubW9kYWxDbGFzc1wiIChjbGljayk9XCJwcmV2ZW50Q2xvc2luZygkZXZlbnQpXCIgW25nQ2xhc3NdPVwieydtb2RhbC1kaWFsb2ctY2VudGVyZWQnOiBzZXR0aW5ncy5jZW50ZXJlZH1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIiB0YWJpbmRleD1cIjBcIiAqbmdJZj1cImlzT3BlbmVkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIiFzZXR0aW5ncz8uaGlkZUNsb3NlQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInNldHRpbmdzPy5jYW5jZWxCdXR0b25MYWJlbCB8fCAnQ2xvc2UnXCIgKGNsaWNrKT1cImNsb3NlKClcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgKm5nSWY9XCJzZXR0aW5ncz8udGl0bGVcIj57eyBzZXR0aW5ncz8udGl0bGUgfX08L2g0PlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOltgLm1vZGFsLWRpYWxvZy1jZW50ZXJlZCB7XG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gKDAuNXJlbSAqIDIpKTtcbiAgfVxuICBAbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpIHtcbiAgICAubW9kYWwtZGlhbG9nLWNlbnRlcmVkIHtcbiAgICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSAtICgxLjc1cmVtICogMikpO1xuICAgIH1cbiAgfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29tcG9uZW50IHtcblxuICAvLyAvL3RpdGxlIG9mIG1vZGFsXG4gIC8vIEBJbnB1dCgpIHRpdGxlO1xuXG4gIC8vIC8vc2l6ZSBvZiBtb2RhbC4gc20sbGcsbWRcbiAgLy8gQElucHV0KCkgc2l6ZTtcblxuICAvLyAvL21vZGFsQ2xhc3MgYWRkZWQgdG8gbW9kYWwgZGlhbG9nXG4gIC8vIEBJbnB1dCgpIG1vZGFsQ2xhc3M7XG5cbiAgLy8gLy9oaWRlIGNsb3NlIGJ1dHRvblxuICAvLyBASW5wdXQoKSBoaWRlQ2xvc2VCdXR0b247XG5cbiAgLy8gLy9pZiBtb2RhbCBpcyB2ZXJ0aWNhbGx5IGNlbnRlcmVkXG4gIC8vIEBJbnB1dCgpIGNlbnRlcmVkXG5cbiAgLy8gLy9pZiBiYWNrZHJvcCBpcyBhcHBsaWVkIG9uIG1vZGFsXG4gIC8vIEBJbnB1dCgpIGJhY2tkcm9wXG5cbiAgLy8gLy9pZiB0cnVlLCBhbmltYXRpb24gaXMgYWRkZWQgdG8gbW9kYWwgZGlhbG9nXG4gIC8vIEBJbnB1dCgpIGFuaW1hdGlvbjtcblxuICAvLyAvL2xpc3RlbiB0byBrZXlib2FyZCBldmVudHNcbiAgLy8gQElucHV0KCkga2V5Ym9hcmQ7XG5cbiAgLy8gLy9jbG9zZSBvbiBvdXRzaWRlIGNsaWNrXG4gIC8vIEBJbnB1dCgpIGNsb3NlT25PdXRzaWRlQ2xpY2s7XG5cbiAgLy8gLy9jdXN0b20gYmFja2Ryb3AgY2xhc3NcbiAgLy8gQElucHV0KCkgYmFja2Ryb3BDbGFzcztcblxuICBAT3V0cHV0KCkgcHVibGljIG9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICBAT3V0cHV0KCkgcHVibGljIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIHByaXZhdGUgb3Blbk9ic2VydmVyID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICBwcml2YXRlIGNsb3NlT2JzZXJ2ZXIgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIFxuICBwdWJsaWMgaXNPcGVuZWQgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKFwibW9kYWxSb290XCIpXG4gIHB1YmxpYyBtb2RhbFJvb3Q6IEVsZW1lbnRSZWY7XG4gIHB1YmxpYyBzZXR0aW5ncztcbiAgcHJpdmF0ZSBiYWNrZHJvcEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxNYW5hZ2VyIDogTW9kYWxNYW5hZ2VyKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIGNsb3NlT25Fc2NhcGU6IHRydWUsXG4gICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgICAgaGlkZUNsb3NlQnV0dG9uOiBmYWxzZSxcbiAgICAgIGJhY2tkcm9wOiB0cnVlXG4gICAgfVxuICB9XG5cbiAgaW5pdChjb25maWcpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5tb2RhbE1hbmFnZXIuZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgdGhpcy5jcmVhdGVCYWNrRHJvcCgpO1xuICB9XG5cblxuICBvcGVuKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbmVkKVxuICAgICAgcmV0dXJuO1xuICAgIFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm1vZGFsLW9wZW5cIik7XG4gICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpbicpO1xuICAgICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xuICAgICAgdGhpcy5vcGVuT2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pc09wZW5lZClcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuYmFja2Ryb3BFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoL21vZGFsLW9wZW5cXGIvLCBcIlwiKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICB0aGlzLmNsb3NlZC5lbWl0KCk7XG4gICAgICB0aGlzLmNsb3NlT2JzZXJ2ZXIubmV4dCh0cnVlKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHVibGljIHByZXZlbnRDbG9zaW5nKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBvbk9wZW4oKXtcbiAgICByZXR1cm4gdGhpcy5vcGVuT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBvbkNsb3NlKCl7XG4gICAgcmV0dXJuIHRoaXMuY2xvc2VPYnNlcnZlci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQmFja0Ryb3AoKSB7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmYWRlXCIpO1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpblwiKTtcbiAgICBpZiAodGhpcy5zZXR0aW5ncyAmJiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wICYmIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3AgPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmJhY2tkcm9wQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1mb290ZXInLFxuICB0ZW1wbGF0ZTpgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxGb290ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwtY29udGVudCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsLWhlYWRlcicsXG4gIHRlbXBsYXRlOmA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcblxuZXhwb3J0IGNsYXNzIE1vZGFsSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsRm9vdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwtZm9vdGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxDb250ZW50Q29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwtY29udGVudC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsSGVhZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwtaGVhZGVyLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW01vZGFsQ29tcG9uZW50LCBNb2RhbEZvb3RlckNvbXBvbmVudCwgTW9kYWxDb250ZW50Q29tcG9uZW50LCBNb2RhbEhlYWRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtNb2RhbENvbXBvbmVudCwgTW9kYWxGb290ZXJDb21wb25lbnQsIE1vZGFsQ29udGVudENvbXBvbmVudCwgTW9kYWxIZWFkZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7SUFxQkUsc0JBQW9CLHdCQUFrRDtRQUFsRCw2QkFBd0IsR0FBeEIs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