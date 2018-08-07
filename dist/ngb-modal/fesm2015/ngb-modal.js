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
                providedIn: "root"
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLW1vZGFsLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLnNlcnZpY2UudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ2ItbW9kYWwvbGliL21vZGFsLWZvb3Rlci5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwtY29udGVudC5jb21wb25lbnQudHMiLCJuZzovL25nYi1tb2RhbC9saWIvbW9kYWwtaGVhZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmdiLW1vZGFsL2xpYi9tb2RhbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVmlld0NoaWxkLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsTWFuYWdlciB7XG5cbiAgcHJpdmF0ZSBtb2RhbEhvc3Q6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSBnbG9iYWxDb25maWcgOiBNb2RhbENvbmZpZyA9IHtcbiAgICBzaXplOiBcIm1kXCIsXG4gICAgbW9kYWxDbGFzczogJycsXG4gICAgaGlkZUNsb3NlQnV0dG9uIDogZmFsc2UsXG4gICAgY2VudGVyZWQ6IGZhbHNlLFxuICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgIGFuaW1hdGlvbiA6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogdHJ1ZSxcbiAgICBiYWNrZHJvcENsYXNzOiBcIm1vZGFsLWJhY2tkcm9wXCIgXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikgeyB9XG5cbiAgc2V0IGRlZmF1bHRzKGNvbmZpZzogTW9kYWxDb25maWcpIHtcbiAgICB0aGlzLmdsb2JhbENvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWxDb25maWcsIGNvbmZpZyk7XG4gIH1cblxuICBzZXREZWZhdWx0cyhjb25maWc6IE1vZGFsQ29uZmlnKXtcbiAgICB0aGlzLmdsb2JhbENvbmZpZyA9IE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWxDb25maWcsIGNvbmZpZyk7ICAgIFxuICB9XG5cbiAgZ2V0IGRlZmF1bHRzKCkgOiBNb2RhbENvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2xvYmFsQ29uZmlnO1xuICB9XG5cbiAgc2V0Um9vdFZpZXdDb250YWluZXJSZWYocmVmKXtcbiAgICB0aGlzLm1vZGFsSG9zdCA9IHJlZjtcbiAgfVxuXG4gIG9wZW4obW9kYWxJbnN0YW5jZSwgY29uZmlnKXtcbiAgICBpZih0eXBlb2YgbW9kYWxJbnN0YW5jZSA9PT0gXCJvYmplY3RcIil7XG4gICAgICBtb2RhbEluc3RhbmNlLmluaXQoY29uZmlnKTtcbiAgICAgIG1vZGFsSW5zdGFuY2Uub3BlbigpO1xuICAgICAgcmV0dXJuIG1vZGFsSW5zdGFuY2U7XG4gICAgfWVsc2UgaWYodHlwZW9mIG1vZGFsSW5zdGFuY2UgPT09IFwiZnVuY3Rpb25cIil7XG4gICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KG1vZGFsSW5zdGFuY2UpO1xuICAgICAgdGhpcy5tb2RhbEhvc3QucmVtb3ZlKCk7XG4gICAgICBsZXQgY29tcG9uZW50UmVmID0gdGhpcy5tb2RhbEhvc3QuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydNb2RhbENvbXBvbmVudCddLmluaXQoY29uZmlnKTtcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnY2xvc2UnXSA9IHRoaXMuY2xvc2VGYWN0b3J5KCk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbJ29uQ2xvc2UnXSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vbkNsb3NlO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlWydvbk9wZW4nXSA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vbk9wZW47XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGNvbXBvbmVudFJlZi5pbnN0YW5jZVsnTW9kYWxDb21wb25lbnQnXS5vcGVuKCkpO1xuICAgICByZXR1cm4gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIH0gXG4gIH1cblxuICBjbG9zZShtb2RhbEluc3RhbmNlKXtcbiAgICBtb2RhbEluc3RhbmNlLmNsb3NlKCk7XG4gIH1cblxuICBjbG9zZUZhY3RvcnkoKXtcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXNbJ01vZGFsQ29tcG9uZW50J10uY2xvc2UoKTtcbiAgICAgIF9zZWxmLm1vZGFsSG9zdC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29uZmlnIHtcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBzaXplPzogc3RyaW5nIHwgXCJtZFwiLFxuICAgIG1vZGFsQ2xhc3M/OiBzdHJpbmcgfCAnJyxcbiAgICBoaWRlQ2xvc2VCdXR0b24/OiBib29sZWFuIHwgZmFsc2UsXG4gICAgY2VudGVyZWQ/OiBib29sZWFuIHwgZmFsc2UsXG4gICAgYmFja2Ryb3A/OiBib29sZWFuIHwgJ3N0YXRpYycgfCB0cnVlLFxuICAgIGFuaW1hdGlvbj86IGJvb2xlYW4gfCB0cnVlLFxuICAgIGtleWJvYXJkPzogYm9vbGVhbiB8IHRydWUsXG4gICAgY2xvc2VPbk91dHNpZGVDbGljaz86IGJvb2xlYW4gfCB0cnVlLFxuICAgIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmcgfCBcIm1vZGFsLWJhY2tkcm9wXCJcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZGFsTWFuYWdlciB9IGZyb20gJy4vbW9kYWwuc2VydmljZSc7XG5cbmRlY2xhcmUgdmFyIGRvY3VtZW50OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibW9kYWxcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiICNtb2RhbFJvb3QgKGtleWRvd24uZXNjKT1cInNldHRpbmdzPy5rZXlib2FyZCA/IGNsb3NlKCkgOiAwXCIgW25nU3R5bGVdPVwieyBkaXNwbGF5OiBpc09wZW5lZCA/ICdibG9jaycgOiAnbm9uZScgfVwiIFtuZ0NsYXNzXT1cInsnZmFkZSc6IHNldHRpbmdzPy5hbmltYXRpb259XCIgKGNsaWNrKT1cInNldHRpbmdzPy5iYWNrZHJvcCAhPT0gJ3N0YXRpYycgJiYgc2V0dGluZ3M/LmNsb3NlT25PdXRzaWRlQ2xpY2sgPyBjbG9zZSgpIDogMFwiPlxuICAgIDxkaXYgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cgbW9kYWwtJysgc2V0dGluZ3M/LnNpemUgKyAnICcgKyBzZXR0aW5ncz8ubW9kYWxDbGFzc1wiIChjbGljayk9XCJwcmV2ZW50Q2xvc2luZygkZXZlbnQpXCIgW25nQ2xhc3NdPVwieydtb2RhbC1kaWFsb2ctY2VudGVyZWQnOiBzZXR0aW5ncz8uY2VudGVyZWR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCIgdGFiaW5kZXg9XCIwXCIgKm5nSWY9XCJpc09wZW5lZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCIhc2V0dGluZ3M/LmhpZGVDbG9zZUJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJzZXR0aW5ncz8uY2FuY2VsQnV0dG9uTGFiZWwgfHwgJ0Nsb3NlJ1wiIChjbGljayk9XCJjbG9zZSgpXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiICpuZ0lmPVwic2V0dGluZ3M/LnRpdGxlXCI+e3sgc2V0dGluZ3M/LnRpdGxlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczpbYC5tb2RhbC1kaWFsb2ctY2VudGVyZWQge1xuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSAtICgwLjVyZW0gKiAyKSk7XG4gIH1cbiAgQG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KSB7XG4gICAgLm1vZGFsLWRpYWxvZy1jZW50ZXJlZCB7XG4gICAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMCUgLSAoMS43NXJlbSAqIDIpKTtcbiAgICB9XG4gIH1gXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLy90aXRsZSBvZiBtb2RhbFxuICBASW5wdXQoKSB0aXRsZTtcblxuICAvL3NpemUgb2YgbW9kYWwuIHNtLGxnLG1kXG4gIEBJbnB1dCgpIHNpemU7XG5cbiAgLy9tb2RhbENsYXNzIGFkZGVkIHRvIG1vZGFsIGRpYWxvZ1xuICBASW5wdXQoKSBtb2RhbENsYXNzO1xuXG4gIC8vaGlkZSBjbG9zZSBidXR0b25cbiAgQElucHV0KCkgaGlkZUNsb3NlQnV0dG9uO1xuXG4gIC8vaWYgbW9kYWwgaXMgdmVydGljYWxseSBjZW50ZXJlZFxuICBASW5wdXQoKSBjZW50ZXJlZFxuXG4gIC8vaWYgYmFja2Ryb3AgaXMgYXBwbGllZCBvbiBtb2RhbFxuICBASW5wdXQoKSBiYWNrZHJvcFxuXG4gIC8vaWYgdHJ1ZSwgYW5pbWF0aW9uIGlzIGFkZGVkIHRvIG1vZGFsIGRpYWxvZ1xuICBASW5wdXQoKSBhbmltYXRpb247XG5cbiAgLy9saXN0ZW4gdG8ga2V5Ym9hcmQgZXZlbnRzXG4gIEBJbnB1dCgpIGtleWJvYXJkO1xuXG4gIC8vY2xvc2Ugb24gb3V0c2lkZSBjbGlja1xuICBASW5wdXQoKSBjbG9zZU9uT3V0c2lkZUNsaWNrO1xuXG4gIC8vY3VzdG9tIGJhY2tkcm9wIGNsYXNzXG4gIEBJbnB1dCgpIGJhY2tkcm9wQ2xhc3M7XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBvbk9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gXG5cbiAgQFZpZXdDaGlsZChcIm1vZGFsUm9vdFwiKSBwdWJsaWMgbW9kYWxSb290OiBFbGVtZW50UmVmO1xuICAgXG4gIHB1YmxpYyBpc09wZW5lZCA9IGZhbHNlO1xuICBwcml2YXRlIGlucHV0U2V0dGluZ3M7XG4gIHB1YmxpYyBzZXR0aW5ncztcbiAgcHJpdmF0ZSBiYWNrZHJvcEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxNYW5hZ2VyIDogTW9kYWxNYW5hZ2VyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpe1xuICAgIHRoaXMuaW5wdXRTZXR0aW5ncyA9IHtcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgc2l6ZTogdGhpcy5zaXplIHx8IFwibWRcIixcbiAgICAgIG1vZGFsQ2xhc3M6IHRoaXMubW9kYWxDbGFzcyB8fCAnJyxcbiAgICAgIGhpZGVDbG9zZUJ1dHRvbiA6IHRoaXMuaGlkZUNsb3NlQnV0dG9uIHx8IGZhbHNlLFxuICAgICAgY2VudGVyZWQ6IHRoaXMuY2VudGVyZWQgfHwgZmFsc2UsXG4gICAgICBiYWNrZHJvcDogdGhpcy5iYWNrZHJvcCB8fCB0cnVlLFxuICAgICAgYW5pbWF0aW9uIDogdGhpcy5hbmltYXRpb24gfHwgdHJ1ZSxcbiAgICAgIGtleWJvYXJkOiB0aGlzLmtleWJvYXJkIHx8IHRydWUsXG4gICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2sgfHwgdHJ1ZSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IHRoaXMuYmFja2Ryb3BDbGFzcyB8fCBcIm1vZGFsLWJhY2tkcm9wXCJcbiAgICB9XG4gIH1cblxuICBpbml0KGNvbmZpZykge1xuICAgIHRoaXMub25PcGVuLm9ic2VydmVycyA9IFtdO1xuICAgIHRoaXMub25DbG9zZS5vYnNlcnZlcnMgPSBbXTtcbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5tb2RhbE1hbmFnZXIuZGVmYXVsdHMsIHRoaXMuaW5wdXRTZXR0aW5ncywgY29uZmlnKTtcbiAgICB0aGlzLmNyZWF0ZUJhY2tEcm9wKCk7XG4gIH1cblxuXG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuZWQpXG4gICAgICByZXR1cm47XG4gICAgXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tkcm9wRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibW9kYWwtb3BlblwiKTtcbiAgICB0aGlzLmlzT3BlbmVkID0gdHJ1ZTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2luJyk7XG4gICAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLm9uT3Blbi5lbWl0KCk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pc09wZW5lZClcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuYmFja2Ryb3BFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoL21vZGFsLW9wZW5cXGIvLCBcIlwiKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlzT3BlbmVkID0gZmFsc2U7XG4gICAgICB0aGlzLm9uQ2xvc2UuZW1pdCgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcHJldmVudENsb3NpbmcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQmFja0Ryb3AoKSB7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmYWRlXCIpO1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpblwiKTtcbiAgICBpZiAodGhpcy5zZXR0aW5ncyAmJiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wICYmIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3AgPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmJhY2tkcm9wQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1mb290ZXInLFxuICB0ZW1wbGF0ZTpgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxGb290ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbW9kYWwtY29udGVudCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsLWhlYWRlcicsXG4gIHRlbXBsYXRlOmA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YFxufSlcblxuZXhwb3J0IGNsYXNzIE1vZGFsSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsRm9vdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwtZm9vdGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxDb250ZW50Q29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwtY29udGVudC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsSGVhZGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwtaGVhZGVyLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW01vZGFsQ29tcG9uZW50LCBNb2RhbEZvb3RlckNvbXBvbmVudCwgTW9kYWxDb250ZW50Q29tcG9uZW50LCBNb2RhbEhlYWRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtNb2RhbENvbXBvbmVudCwgTW9kYWxGb290ZXJDb21wb25lbnQsIE1vZGFsQ29udGVudENvbXBvbmVudCwgTW9kYWxIZWFkZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsTW9kdWxlIHtcbiB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0lBcUJFLFlBQW9CLHdCQUFrRDtRQUFsRCw2QkFBd0IsR0FBeEIs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