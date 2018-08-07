import { Injectable, ComponentFactoryResolver, Component, Input, Output, EventEmitter, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalManager {
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
     * @param {?} config
     * @return {?}
     */
    open(modalInstance, config) {
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
    { type: Injectable },
];
/** @nocollapse */
ModalManager.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalComponent {
    /**
     * @param {?} modalManager
     */
    constructor(modalManager) {
        this.modalManager = modalManager;
        this.onOpen = new EventEmitter(false);
        this.onClose = new EventEmitter(false);
        this.isOpened = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @param {?} config
     * @return {?}
     */
    init(config) {
        this.onOpen.observers = [];
        this.onClose.observers = [];
        this.settings = Object.assign({}, this.modalManager.defaults, this.inputSettings, config);
        this.createBackDrop();
    }
    /**
     * @return {?}
     */
    open() {
        if (this.isOpened)
            return;
        document.body.appendChild(this.backdropElement);
        document.body.classList.add("modal-open");
        this.isOpened = true;
        window.setTimeout(() => {
            this.modalRoot.nativeElement.classList.add('in');
            this.modalRoot.nativeElement.focus();
            this.onOpen.emit();
        }, 100);
    }
    /**
     * @return {?}
     */
    close() {
        if (!this.isOpened)
            return;
        this.modalRoot.nativeElement.classList.remove('in');
        document.body.removeChild(this.backdropElement);
        document.body.className = document.body.className.replace(/modal-open\b/, "");
        window.setTimeout(() => {
            this.isOpened = false;
            this.onClose.emit();
        }, 100);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    preventClosing(event) {
        event.stopPropagation();
    }
    /**
     * @return {?}
     */
    createBackDrop() {
        this.backdropElement = document.createElement("div");
        this.backdropElement.classList.add("fade");
        this.backdropElement.classList.add("in");
        if (this.settings && this.settings.backdrop && this.settings.backdrop == true) {
            this.backdropElement.classList.add(this.settings.backdropClass);
        }
    }
}
ModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'modal',
                template: `<div class="modal" tabindex="-1" role="dialog" #modalRoot (keydown.esc)="settings?.keyboard ? close() : 0" [ngStyle]="{ display: isOpened ? 'block' : 'none' }" [ngClass]="{'fade': settings?.animation}" (click)="settings?.backdrop !== 'static' && settings?.closeOnOutsideClick ? close() : 0">
    <div [class]="'modal-dialog modal-'+ settings?.size + ' ' + settings?.modalClass" (click)="preventClosing($event)" [ngClass]="{'modal-dialog-centered': settings?.centered}">
        <div class="modal-content" tabindex="0" *ngIf="isOpened">
            <div class="modal-header">
                <button *ngIf="!settings?.hideCloseButton" type="button" class="close" [attr.aria-label]="settings?.cancelButtonLabel || 'Close'" (click)="close()"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" *ngIf="settings?.title">{{ settings?.title }}</h4>
                <ng-content select="modal-header"></ng-content>
            </div>
            <div class="modal-body">
                <ng-content select="modal-content"></ng-content>
            </div>
            <div class="modal-footer">
                <ng-content select="modal-footer"></ng-content>
            </div>
        </div>
    </div>
</div>`,
                styles: [`.modal-dialog-centered {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    min-height: calc(100% - (0.5rem * 2));
  }
  @media (min-width: 576px) {
    .modal-dialog-centered {
      min-height: calc(100% - (1.75rem * 2));
    }
  }`]
            },] },
];
/** @nocollapse */
ModalComponent.ctorParameters = () => [
    { type: ModalManager }
];
ModalComponent.propDecorators = {
    title: [{ type: Input }],
    size: [{ type: Input }],
    modalClass: [{ type: Input }],
    hideCloseButton: [{ type: Input }],
    centered: [{ type: Input }],
    backdrop: [{ type: Input }],
    animation: [{ type: Input }],
    keyboard: [{ type: Input }],
    closeOnOutsideClick: [{ type: Input }],
    backdropClass: [{ type: Input }],
    onOpen: [{ type: Output }],
    onClose: [{ type: Output }],
    modalRoot: [{ type: ViewChild, args: ["modalRoot",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalFooterComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ModalFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'modal-footer',
                template: `<ng-content></ng-content>`
            },] },
];
/** @nocollapse */
ModalFooterComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalContentComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ModalContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'modal-content',
                template: `<ng-content></ng-content>`
            },] },
];
/** @nocollapse */
ModalContentComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalHeaderComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
ModalHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'modal-header',
                template: `<ng-content></ng-content>`
            },] },
];
/** @nocollapse */
ModalHeaderComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: ModalModule,
            providers: [
                ModalManager
            ]
        };
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { ModalManager, ModalComponent, ModalModule, ModalContentComponent, ModalHeaderComponent, ModalFooterComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLW1vZGFsLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLnNlcnZpY2UudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWZvb3Rlci5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwtY29udGVudC5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwtaGVhZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9kYWxNYW5hZ2VyIHtcblxuICBwcml2YXRlIG1vZGFsSG9zdDogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIGdsb2JhbENvbmZpZyA6IE1vZGFsQ29uZmlnID0ge1xuICAgIHNpemU6IFwibWRcIixcbiAgICBtb2RhbENsYXNzOiAnJyxcbiAgICBoaWRlQ2xvc2VCdXR0b24gOiBmYWxzZSxcbiAgICBjZW50ZXJlZDogZmFsc2UsXG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAgYW5pbWF0aW9uIDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0cnVlLFxuICAgIGJhY2tkcm9wQ2xhc3M6IFwibW9kYWwtYmFja2Ryb3BcIiBcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7IH1cblxuICBzZXQgZGVmYXVsdHMoY29uZmlnOiBNb2RhbENvbmZpZykge1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbENvbmZpZywgY29uZmlnKTtcbiAgfVxuXG4gIHNldERlZmF1bHRzKGNvbmZpZzogTW9kYWxDb25maWcpe1xuICAgIHRoaXMuZ2xvYmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbENvbmZpZywgY29uZmlnKTsgICAgXG4gIH1cblxuICBnZXQgZGVmYXVsdHMoKSA6IE1vZGFsQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5nbG9iYWxDb25maWc7XG4gIH1cblxuICBzZXRSb290Vmlld0NvbnRhaW5lclJlZihyZWYpe1xuICAgIHRoaXMubW9kYWxIb3N0ID0gcmVmO1xuICB9XG5cbiAgb3Blbihtb2RhbEluc3RhbmNlLCBjb25maWcpe1xuICAgIGlmKHR5cGVvZiBtb2RhbEluc3RhbmNlID09PSBcIm9iamVjdFwiKXtcbiAgICAgIG1vZGFsSW5zdGFuY2UuaW5pdChjb25maWcpO1xuICAgICAgbW9kYWxJbnN0YW5jZS5vcGVuKCk7XG4gICAgICByZXR1cm4gbW9kYWxJbnN0YW5jZTtcbiAgICB9ZWxzZSBpZih0eXBlb2YgbW9kYWxJbnN0YW5jZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkobW9kYWxJbnN0YW5jZSk7XG4gICAgICB0aGlzLm1vZGFsSG9zdC5yZW1vdmUoKTtcbiAgICAgIGxldCBjb21wb25lbnRSZWYgPSB0aGlzLm1vZGFsSG9zdC5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10uaW5pdChjb25maWcpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydjbG9zZSddID0gdGhpcy5jbG9zZUZhY3RvcnkoKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnb25DbG9zZSddID0gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9uQ2xvc2U7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ29uT3BlbiddID0gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9uT3BlbjtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLm9wZW4oKSk7XG4gICAgIHJldHVybiBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgfSBcbiAgfVxuXG4gIGNsb3NlKG1vZGFsSW5zdGFuY2Upe1xuICAgIG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlRmFjdG9yeSgpe1xuICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpc1snTW9kYWxDb21wb25lbnQnXS5jbG9zZSgpO1xuICAgICAgX3NlbGYubW9kYWxIb3N0LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb25maWcge1xuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIHNpemU/OiBzdHJpbmcgfCBcIm1kXCIsXG4gICAgbW9kYWxDbGFzcz86IHN0cmluZyB8ICcnLFxuICAgIGhpZGVDbG9zZUJ1dHRvbj86IGJvb2xlYW4gfCBmYWxzZSxcbiAgICBjZW50ZXJlZD86IGJvb2xlYW4gfCBmYWxzZSxcbiAgICBiYWNrZHJvcD86IGJvb2xlYW4gfCAnc3RhdGljJyB8IHRydWUsXG4gICAgYW5pbWF0aW9uPzogYm9vbGVhbiB8IHRydWUsXG4gICAga2V5Ym9hcmQ/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrPzogYm9vbGVhbiB8IHRydWUsXG4gICAgYmFja2Ryb3BDbGFzcz86IHN0cmluZyB8IFwibW9kYWwtYmFja2Ryb3BcIlxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxNYW5hZ2VyIH0gZnJvbSAnLi9tb2RhbC5zZXJ2aWNlJztcblxuZGVjbGFyZSB2YXIgZG9jdW1lbnQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtb2RhbFwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgI21vZGFsUm9vdCAoa2V5ZG93bi5lc2MpPVwic2V0dGluZ3M/LmtleWJvYXJkID8gY2xvc2UoKSA6IDBcIiBbbmdTdHlsZV09XCJ7IGRpc3BsYXk6IGlzT3BlbmVkID8gJ2Jsb2NrJyA6ICdub25lJyB9XCIgW25nQ2xhc3NdPVwieydmYWRlJzogc2V0dGluZ3M/LmFuaW1hdGlvbn1cIiAoY2xpY2spPVwic2V0dGluZ3M/LmJhY2tkcm9wICE9PSAnc3RhdGljJyAmJiBzZXR0aW5ncz8uY2xvc2VPbk91dHNpZGVDbGljayA/IGNsb3NlKCkgOiAwXCI+XG4gICAgPGRpdiBbY2xhc3NdPVwiJ21vZGFsLWRpYWxvZyBtb2RhbC0nKyBzZXR0aW5ncz8uc2l6ZSArICcgJyArIHNldHRpbmdzPy5tb2RhbENsYXNzXCIgKGNsaWNrKT1cInByZXZlbnRDbG9zaW5nKCRldmVudClcIiBbbmdDbGFzc109XCJ7J21vZGFsLWRpYWxvZy1jZW50ZXJlZCc6IHNldHRpbmdzPy5jZW50ZXJlZH1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIiB0YWJpbmRleD1cIjBcIiAqbmdJZj1cImlzT3BlbmVkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIiFzZXR0aW5ncz8uaGlkZUNsb3NlQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInNldHRpbmdzPy5jYW5jZWxCdXR0b25MYWJlbCB8fCAnQ2xvc2UnXCIgKGNsaWNrKT1cImNsb3NlKClcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgKm5nSWY9XCJzZXR0aW5ncz8udGl0bGVcIj57eyBzZXR0aW5ncz8udGl0bGUgfX08L2g0PlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOltgLm1vZGFsLWRpYWxvZy1jZW50ZXJlZCB7XG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gKDAuNXJlbSAqIDIpKTtcbiAgfVxuICBAbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpIHtcbiAgICAubW9kYWwtZGlhbG9nLWNlbnRlcmVkIHtcbiAgICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSAtICgxLjc1cmVtICogMikpO1xuICAgIH1cbiAgfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvL3RpdGxlIG9mIG1vZGFsXG4gIEBJbnB1dCgpIHRpdGxlO1xuXG4gIC8vc2l6ZSBvZiBtb2RhbC4gc20sbGcsbWRcbiAgQElucHV0KCkgc2l6ZTtcblxuICAvL21vZGFsQ2xhc3MgYWRkZWQgdG8gbW9kYWwgZGlhbG9nXG4gIEBJbnB1dCgpIG1vZGFsQ2xhc3M7XG5cbiAgLy9oaWRlIGNsb3NlIGJ1dHRvblxuICBASW5wdXQoKSBoaWRlQ2xvc2VCdXR0b247XG5cbiAgLy9pZiBtb2RhbCBpcyB2ZXJ0aWNhbGx5IGNlbnRlcmVkXG4gIEBJbnB1dCgpIGNlbnRlcmVkXG5cbiAgLy9pZiBiYWNrZHJvcCBpcyBhcHBsaWVkIG9uIG1vZGFsXG4gIEBJbnB1dCgpIGJhY2tkcm9wXG5cbiAgLy9pZiB0cnVlLCBhbmltYXRpb24gaXMgYWRkZWQgdG8gbW9kYWwgZGlhbG9nXG4gIEBJbnB1dCgpIGFuaW1hdGlvbjtcblxuICAvL2xpc3RlbiB0byBrZXlib2FyZCBldmVudHNcbiAgQElucHV0KCkga2V5Ym9hcmQ7XG5cbiAgLy9jbG9zZSBvbiBvdXRzaWRlIGNsaWNrXG4gIEBJbnB1dCgpIGNsb3NlT25PdXRzaWRlQ2xpY2s7XG5cbiAgLy9jdXN0b20gYmFja2Ryb3AgY2xhc3NcbiAgQElucHV0KCkgYmFja2Ryb3BDbGFzcztcblxuICBAT3V0cHV0KCkgcHVibGljIG9uT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiBcblxuICBAVmlld0NoaWxkKFwibW9kYWxSb290XCIpIHB1YmxpYyBtb2RhbFJvb3Q6IEVsZW1lbnRSZWY7XG4gICBcbiAgcHVibGljIGlzT3BlbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgaW5wdXRTZXR0aW5ncztcbiAgcHVibGljIHNldHRpbmdzO1xuICBwcml2YXRlIGJhY2tkcm9wRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbE1hbmFnZXIgOiBNb2RhbE1hbmFnZXIpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCl7XG4gICAgdGhpcy5pbnB1dFNldHRpbmdzID0ge1xuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICBzaXplOiB0aGlzLnNpemUgfHwgXCJtZFwiLFxuICAgICAgbW9kYWxDbGFzczogdGhpcy5tb2RhbENsYXNzIHx8ICcnLFxuICAgICAgaGlkZUNsb3NlQnV0dG9uIDogdGhpcy5oaWRlQ2xvc2VCdXR0b24gfHwgZmFsc2UsXG4gICAgICBjZW50ZXJlZDogdGhpcy5jZW50ZXJlZCB8fCBmYWxzZSxcbiAgICAgIGJhY2tkcm9wOiB0aGlzLmJhY2tkcm9wIHx8IHRydWUsXG4gICAgICBhbmltYXRpb24gOiB0aGlzLmFuaW1hdGlvbiB8fCB0cnVlLFxuICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQgfHwgdHJ1ZSxcbiAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRoaXMuY2xvc2VPbk91dHNpZGVDbGljayB8fCB0cnVlLFxuICAgICAgYmFja2Ryb3BDbGFzczogdGhpcy5iYWNrZHJvcENsYXNzIHx8IFwibW9kYWwtYmFja2Ryb3BcIlxuICAgIH1cbiAgfVxuXG4gIGluaXQoY29uZmlnKSB7XG4gICAgdGhpcy5vbk9wZW4ub2JzZXJ2ZXJzID0gW107XG4gICAgdGhpcy5vbkNsb3NlLm9ic2VydmVycyA9IFtdO1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm1vZGFsTWFuYWdlci5kZWZhdWx0cywgdGhpcy5pbnB1dFNldHRpbmdzLCBjb25maWcpO1xuICAgIHRoaXMuY3JlYXRlQmFja0Ryb3AoKTtcbiAgfVxuXG5cbiAgb3BlbigpIHtcbiAgICBpZiAodGhpcy5pc09wZW5lZClcbiAgICAgIHJldHVybjtcbiAgICBcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYmFja2Ryb3BFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1vcGVuXCIpO1xuICAgIHRoaXMuaXNPcGVuZWQgPSB0cnVlO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaW4nKTtcbiAgICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMub25PcGVuLmVtaXQoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbmVkKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZSgvbW9kYWwtb3BlblxcYi8sIFwiXCIpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2ZW50Q2xvc2luZyhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCYWNrRHJvcCgpIHtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZhZGVcIik7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImluXCIpO1xuICAgIGlmICh0aGlzLnNldHRpbmdzICYmIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3AgJiYgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcCA9PSB0cnVlKSB7XG4gICAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BDbGFzcyk7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsLWZvb3RlcicsXG4gIHRlbXBsYXRlOmA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbEZvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1jb250ZW50JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwtaGVhZGVyJyxcbiAgdGVtcGxhdGU6YDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXG59KVxuXG5leHBvcnQgY2xhc3MgTW9kYWxIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxGb290ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC1mb290ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbENvbnRlbnRDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC1jb250ZW50LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxIZWFkZXJDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC1oZWFkZXIuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2RhbE1hbmFnZXIgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW01vZGFsQ29tcG9uZW50LCBNb2RhbEZvb3RlckNvbXBvbmVudCwgTW9kYWxDb250ZW50Q29tcG9uZW50LCBNb2RhbEhlYWRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtNb2RhbENvbXBvbmVudCwgTW9kYWxGb290ZXJDb21wb25lbnQsIE1vZGFsQ29udGVudENvbXBvbmVudCwgTW9kYWxIZWFkZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNb2RhbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNb2RhbE1hbmFnZXJcbiAgICAgIF1cbiAgICB9O1xuICB9XG4gfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztJQW1CRSxZQUFvQix3QkFBa0Q7UUFBbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjs0QkFaakM7WUFDbkMsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsRUFBRTtZQUNkLGVBQWUsRUFBRyxLQUFLO1lBQ3ZCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUcsSUFBSTtZQUNoQixRQUFRLEVBQUUsSUFBSTtZQUNkLG1CQUFtQixFQUFFLElBQUk7WUFDekIsYUFBYSxFQUFFLGdCQUFnQjtTQUNoQztLQUUwRTs7Ozs7SUFFM0UsSUFBSSxRQUFRLENBQUMsTUFBbUI7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDOUQ7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQW1CO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzlEOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzFCOzs7OztJQUVELHVCQUF1QixDQUFDLEdBQUc7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7S0FDdEI7Ozs7OztJQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTTtRQUN4QixJQUFHLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBQztZQUNuQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0s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