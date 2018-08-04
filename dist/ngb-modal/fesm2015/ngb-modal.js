import { Injectable, ComponentFactoryResolver, Component, Input, Output, EventEmitter, ViewChild, NgModule, defineInjectable, inject } from '@angular/core';
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
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
ModalManager.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
/** @nocollapse */ ModalManager.ngInjectableDef = defineInjectable({ factory: function ModalManager_Factory() { return new ModalManager(inject(ComponentFactoryResolver)); }, token: ModalManager, providedIn: "root" });

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLW1vZGFsLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLnNlcnZpY2UudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWZvb3Rlci5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwtY29udGVudC5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwtaGVhZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1hbmFnZXIge1xuXG4gIHByaXZhdGUgbW9kYWxIb3N0OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgZ2xvYmFsQ29uZmlnIDogTW9kYWxDb25maWcgPSB7XG4gICAgc2l6ZTogXCJtZFwiLFxuICAgIG1vZGFsQ2xhc3M6ICcnLFxuICAgIGhpZGVDbG9zZUJ1dHRvbiA6IGZhbHNlLFxuICAgIGNlbnRlcmVkOiBmYWxzZSxcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBhbmltYXRpb24gOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgYmFja2Ryb3BDbGFzczogXCJtb2RhbC1iYWNrZHJvcFwiIFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHsgfVxuXG4gIHNldCBkZWZhdWx0cyhjb25maWc6IE1vZGFsQ29uZmlnKSB7XG4gICAgdGhpcy5nbG9iYWxDb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsQ29uZmlnLCBjb25maWcpO1xuICB9XG5cbiAgc2V0RGVmYXVsdHMoY29uZmlnOiBNb2RhbENvbmZpZyl7XG4gICAgdGhpcy5nbG9iYWxDb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsQ29uZmlnLCBjb25maWcpOyAgICBcbiAgfVxuXG4gIGdldCBkZWZhdWx0cygpIDogTW9kYWxDb25maWcge1xuICAgIHJldHVybiB0aGlzLmdsb2JhbENvbmZpZztcbiAgfVxuXG4gIHNldFJvb3RWaWV3Q29udGFpbmVyUmVmKHJlZil7XG4gICAgdGhpcy5tb2RhbEhvc3QgPSByZWY7XG4gIH1cblxuICBvcGVuKG1vZGFsSW5zdGFuY2UsIGNvbmZpZyl7XG4gICAgaWYodHlwZW9mIG1vZGFsSW5zdGFuY2UgPT09IFwib2JqZWN0XCIpe1xuICAgICAgbW9kYWxJbnN0YW5jZS5pbml0KGNvbmZpZyk7XG4gICAgICBtb2RhbEluc3RhbmNlLm9wZW4oKTtcbiAgICAgIHJldHVybiBtb2RhbEluc3RhbmNlO1xuICAgIH1lbHNlIGlmKHR5cGVvZiBtb2RhbEluc3RhbmNlID09PSBcImZ1bmN0aW9uXCIpe1xuICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShtb2RhbEluc3RhbmNlKTtcbiAgICAgIHRoaXMubW9kYWxIb3N0LnJlbW92ZSgpO1xuICAgICAgbGV0IGNvbXBvbmVudFJlZiA9IHRoaXMubW9kYWxIb3N0LmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5pbml0KGNvbmZpZyk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ2Nsb3NlJ10gPSB0aGlzLmNsb3NlRmFjdG9yeSgpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydvbkNsb3NlJ10gPSBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10ub25DbG9zZTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnb25PcGVuJ10gPSBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10ub25PcGVuO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ01vZGFsQ29tcG9uZW50J10ub3BlbigpKTtcbiAgICAgcmV0dXJuIGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB9IFxuICB9XG5cbiAgY2xvc2UobW9kYWxJbnN0YW5jZSl7XG4gICAgbW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICB9XG5cbiAgY2xvc2VGYWN0b3J5KCl7XG4gICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzWydNb2RhbENvbXBvbmVudCddLmNsb3NlKCk7XG4gICAgICBfc2VsZi5tb2RhbEhvc3QucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvbmZpZyB7XG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgc2l6ZT86IHN0cmluZyB8IFwibWRcIixcbiAgICBtb2RhbENsYXNzPzogc3RyaW5nIHwgJycsXG4gICAgaGlkZUNsb3NlQnV0dG9uPzogYm9vbGVhbiB8IGZhbHNlLFxuICAgIGNlbnRlcmVkPzogYm9vbGVhbiB8IGZhbHNlLFxuICAgIGJhY2tkcm9wPzogYm9vbGVhbiB8ICdzdGF0aWMnIHwgdHJ1ZSxcbiAgICBhbmltYXRpb24/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBrZXlib2FyZD86IGJvb2xlYW4gfCB0cnVlLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s/OiBib29sZWFuIHwgdHJ1ZSxcbiAgICBiYWNrZHJvcENsYXNzPzogc3RyaW5nIHwgXCJtb2RhbC1iYWNrZHJvcFwiXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbE1hbmFnZXIgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5kZWNsYXJlIHZhciBkb2N1bWVudDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1vZGFsXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiAjbW9kYWxSb290IChrZXlkb3duLmVzYyk9XCJzZXR0aW5ncz8ua2V5Ym9hcmQgPyBjbG9zZSgpIDogMFwiIFtuZ1N0eWxlXT1cInsgZGlzcGxheTogaXNPcGVuZWQgPyAnYmxvY2snIDogJ25vbmUnIH1cIiBbbmdDbGFzc109XCJ7J2ZhZGUnOiBzZXR0aW5ncz8uYW5pbWF0aW9ufVwiIChjbGljayk9XCJzZXR0aW5ncz8uYmFja2Ryb3AgIT09ICdzdGF0aWMnICYmIHNldHRpbmdzPy5jbG9zZU9uT3V0c2lkZUNsaWNrID8gY2xvc2UoKSA6IDBcIj5cbiAgICA8ZGl2IFtjbGFzc109XCInbW9kYWwtZGlhbG9nIG1vZGFsLScrIHNldHRpbmdzPy5zaXplICsgJyAnICsgc2V0dGluZ3M/Lm1vZGFsQ2xhc3NcIiAoY2xpY2spPVwicHJldmVudENsb3NpbmcoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsnbW9kYWwtZGlhbG9nLWNlbnRlcmVkJzogc2V0dGluZ3M/LmNlbnRlcmVkfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIHRhYmluZGV4PVwiMFwiICpuZ0lmPVwiaXNPcGVuZWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIXNldHRpbmdzPy5oaWRlQ2xvc2VCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIFthdHRyLmFyaWEtbGFiZWxdPVwic2V0dGluZ3M/LmNhbmNlbEJ1dHRvbkxhYmVsIHx8ICdDbG9zZSdcIiAoY2xpY2spPVwiY2xvc2UoKVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiAqbmdJZj1cInNldHRpbmdzPy50aXRsZVwiPnt7IHNldHRpbmdzPy50aXRsZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6W2AubW9kYWwtZGlhbG9nLWNlbnRlcmVkIHtcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMCUgLSAoMC41cmVtICogMikpO1xuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkge1xuICAgIC5tb2RhbC1kaWFsb2ctY2VudGVyZWQge1xuICAgICAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gKDEuNzVyZW0gKiAyKSk7XG4gICAgfVxuICB9YF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8vdGl0bGUgb2YgbW9kYWxcbiAgQElucHV0KCkgdGl0bGU7XG5cbiAgLy9zaXplIG9mIG1vZGFsLiBzbSxsZyxtZFxuICBASW5wdXQoKSBzaXplO1xuXG4gIC8vbW9kYWxDbGFzcyBhZGRlZCB0byBtb2RhbCBkaWFsb2dcbiAgQElucHV0KCkgbW9kYWxDbGFzcztcblxuICAvL2hpZGUgY2xvc2UgYnV0dG9uXG4gIEBJbnB1dCgpIGhpZGVDbG9zZUJ1dHRvbjtcblxuICAvL2lmIG1vZGFsIGlzIHZlcnRpY2FsbHkgY2VudGVyZWRcbiAgQElucHV0KCkgY2VudGVyZWRcblxuICAvL2lmIGJhY2tkcm9wIGlzIGFwcGxpZWQgb24gbW9kYWxcbiAgQElucHV0KCkgYmFja2Ryb3BcblxuICAvL2lmIHRydWUsIGFuaW1hdGlvbiBpcyBhZGRlZCB0byBtb2RhbCBkaWFsb2dcbiAgQElucHV0KCkgYW5pbWF0aW9uO1xuXG4gIC8vbGlzdGVuIHRvIGtleWJvYXJkIGV2ZW50c1xuICBASW5wdXQoKSBrZXlib2FyZDtcblxuICAvL2Nsb3NlIG9uIG91dHNpZGUgY2xpY2tcbiAgQElucHV0KCkgY2xvc2VPbk91dHNpZGVDbGljaztcblxuICAvL2N1c3RvbSBiYWNrZHJvcCBjbGFzc1xuICBASW5wdXQoKSBiYWNrZHJvcENsYXNzO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgb25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuIFxuXG4gIEBWaWV3Q2hpbGQoXCJtb2RhbFJvb3RcIikgcHVibGljIG1vZGFsUm9vdDogRWxlbWVudFJlZjtcbiAgIFxuICBwdWJsaWMgaXNPcGVuZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpbnB1dFNldHRpbmdzO1xuICBwdWJsaWMgc2V0dGluZ3M7XG4gIHByaXZhdGUgYmFja2Ryb3BFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsTWFuYWdlciA6IE1vZGFsTWFuYWdlcikge1xuICB9XG5cbiAgbmdPbkluaXQoKXtcbiAgICB0aGlzLmlucHV0U2V0dGluZ3MgPSB7XG4gICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgIHNpemU6IHRoaXMuc2l6ZSB8fCBcIm1kXCIsXG4gICAgICBtb2RhbENsYXNzOiB0aGlzLm1vZGFsQ2xhc3MgfHwgJycsXG4gICAgICBoaWRlQ2xvc2VCdXR0b24gOiB0aGlzLmhpZGVDbG9zZUJ1dHRvbiB8fCBmYWxzZSxcbiAgICAgIGNlbnRlcmVkOiB0aGlzLmNlbnRlcmVkIHx8IGZhbHNlLFxuICAgICAgYmFja2Ryb3A6IHRoaXMuYmFja2Ryb3AgfHwgdHJ1ZSxcbiAgICAgIGFuaW1hdGlvbiA6IHRoaXMuYW5pbWF0aW9uIHx8IHRydWUsXG4gICAgICBrZXlib2FyZDogdGhpcy5rZXlib2FyZCB8fCB0cnVlLFxuICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogdGhpcy5jbG9zZU9uT3V0c2lkZUNsaWNrIHx8IHRydWUsXG4gICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmJhY2tkcm9wQ2xhc3MgfHwgXCJtb2RhbC1iYWNrZHJvcFwiXG4gICAgfVxuICB9XG5cbiAgaW5pdChjb25maWcpIHtcbiAgICB0aGlzLm9uT3Blbi5vYnNlcnZlcnMgPSBbXTtcbiAgICB0aGlzLm9uQ2xvc2Uub2JzZXJ2ZXJzID0gW107XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMubW9kYWxNYW5hZ2VyLmRlZmF1bHRzLCB0aGlzLmlucHV0U2V0dGluZ3MsIGNvbmZpZyk7XG4gICAgdGhpcy5jcmVhdGVCYWNrRHJvcCgpO1xuICB9XG5cblxuICBvcGVuKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbmVkKVxuICAgICAgcmV0dXJuO1xuICAgIFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm1vZGFsLW9wZW5cIik7XG4gICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpbicpO1xuICAgICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgdGhpcy5vbk9wZW4uZW1pdCgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuZWQpXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJhY2tkcm9wRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKC9tb2RhbC1vcGVuXFxiLywgXCJcIik7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xuICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHVibGljIHByZXZlbnRDbG9zaW5nKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJhY2tEcm9wKCkge1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZmFkZVwiKTtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW5cIik7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MgJiYgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcCAmJiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wID09IHRydWUpIHtcbiAgICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5iYWNrZHJvcENsYXNzKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwtZm9vdGVyJyxcbiAgdGVtcGxhdGU6YDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsRm9vdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1oZWFkZXInLFxuICB0ZW1wbGF0ZTpgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5cbmV4cG9ydCBjbGFzcyBNb2RhbEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RhbEZvb3RlckNvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWZvb3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsQ29udGVudENvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWNvbnRlbnQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbEhlYWRlckNvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWhlYWRlci5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtNb2RhbENvbXBvbmVudCwgTW9kYWxGb290ZXJDb21wb25lbnQsIE1vZGFsQ29udGVudENvbXBvbmVudCwgTW9kYWxIZWFkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTW9kYWxDb21wb25lbnQsIE1vZGFsRm9vdGVyQ29tcG9uZW50LCBNb2RhbENvbnRlbnRDb21wb25lbnQsIE1vZGFsSGVhZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBN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