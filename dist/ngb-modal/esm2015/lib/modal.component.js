/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ModalManager } from './modal.service';
export class ModalComponent {
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
            this.modalRoot.nativeElement.classList.add('show');
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
        this.modalRoot.nativeElement.classList.remove('show');
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
        this.backdropElement.classList.add("show");
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
                <h4 class="modal-title" *ngIf="settings?.title">{{ settings?.title }}</h4>
                <ng-content select="modal-header"></ng-content>
                <button *ngIf="!settings?.hideCloseButton" type="button" class="close" [attr.aria-label]="settings?.cancelButtonLabel || 'Close'" (click)="close()"><span aria-hidden="true">&times;</span></button>
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
function ModalComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ModalComponent.prototype.title;
    /** @type {?} */
    ModalComponent.prototype.size;
    /** @type {?} */
    ModalComponent.prototype.modalClass;
    /** @type {?} */
    ModalComponent.prototype.hideCloseButton;
    /** @type {?} */
    ModalComponent.prototype.centered;
    /** @type {?} */
    ModalComponent.prototype.backdrop;
    /** @type {?} */
    ModalComponent.prototype.animation;
    /** @type {?} */
    ModalComponent.prototype.keyboard;
    /** @type {?} */
    ModalComponent.prototype.closeOnOutsideClick;
    /** @type {?} */
    ModalComponent.prototype.backdropClass;
    /** @type {?} */
    ModalComponent.prototype.onOpen;
    /** @type {?} */
    ModalComponent.prototype.onClose;
    /** @type {?} */
    ModalComponent.prototype.modalRoot;
    /** @type {?} */
    ModalComponent.prototype.isOpened;
    /** @type {?} */
    ModalComponent.prototype.inputSettings;
    /** @type {?} */
    ModalComponent.prototype.settings;
    /** @type {?} */
    ModalComponent.prototype.backdropElement;
    /** @type {?} */
    ModalComponent.prototype.modalManager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdiLW1vZGFsLyIsInNvdXJjZXMiOlsibGliL21vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUF3QixZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFvQy9DLE1BQU07Ozs7SUEyQ0osWUFBb0IsWUFBMkI7UUFBM0IsaUJBQVksR0FBWixZQUFZLENBQWU7c0JBWHJCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQzt1QkFDdEIsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO3dCQUtoQyxLQUFLO0tBTXRCOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUk7WUFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRTtZQUNqQyxlQUFlLEVBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxLQUFLO1lBQy9DLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUs7WUFDaEMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSTtZQUMvQixTQUFTLEVBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJO1lBQ2xDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUk7WUFDL0IsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUk7WUFDckQsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLElBQUksZ0JBQWdCO1NBQ3RELENBQUE7S0FDRjs7Ozs7SUFFRCxJQUFJLENBQUMsTUFBTTtRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUdELElBQUk7UUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQztRQUVULFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3BCLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDVDs7OztJQUVELEtBQUs7UUFDSCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBRVQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5RSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDVDs7Ozs7SUFFTSxjQUFjLENBQUMsS0FBaUI7UUFDckMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7OztJQUdsQixjQUFjO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNqRTs7OztZQTFJSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztPQWdCTDtnQkFDTCxNQUFNLEVBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFXTixDQUFDO2FBQ0o7Ozs7WUFuQ1EsWUFBWTs7O29CQXVDbEIsS0FBSzttQkFHTCxLQUFLO3lCQUdMLEtBQUs7OEJBR0wsS0FBSzt1QkFHTCxLQUFLO3VCQUdMLEtBQUs7d0JBR0wsS0FBSzt1QkFHTCxLQUFLO2tDQUdMLEtBQUs7NEJBR0wsS0FBSztxQkFFTCxNQUFNO3NCQUNOLE1BQU07d0JBR04sU0FBUyxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbE1hbmFnZXIgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuXG5kZWNsYXJlIHZhciBkb2N1bWVudDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1vZGFsXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiAjbW9kYWxSb290IChrZXlkb3duLmVzYyk9XCJzZXR0aW5ncz8ua2V5Ym9hcmQgPyBjbG9zZSgpIDogMFwiIFtuZ1N0eWxlXT1cInsgZGlzcGxheTogaXNPcGVuZWQgPyAnYmxvY2snIDogJ25vbmUnIH1cIiBbbmdDbGFzc109XCJ7J2ZhZGUnOiBzZXR0aW5ncz8uYW5pbWF0aW9ufVwiIChjbGljayk9XCJzZXR0aW5ncz8uYmFja2Ryb3AgIT09ICdzdGF0aWMnICYmIHNldHRpbmdzPy5jbG9zZU9uT3V0c2lkZUNsaWNrID8gY2xvc2UoKSA6IDBcIj5cbiAgICA8ZGl2IFtjbGFzc109XCInbW9kYWwtZGlhbG9nIG1vZGFsLScrIHNldHRpbmdzPy5zaXplICsgJyAnICsgc2V0dGluZ3M/Lm1vZGFsQ2xhc3NcIiAoY2xpY2spPVwicHJldmVudENsb3NpbmcoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsnbW9kYWwtZGlhbG9nLWNlbnRlcmVkJzogc2V0dGluZ3M/LmNlbnRlcmVkfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIHRhYmluZGV4PVwiMFwiICpuZ0lmPVwiaXNPcGVuZWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiICpuZ0lmPVwic2V0dGluZ3M/LnRpdGxlXCI+e3sgc2V0dGluZ3M/LnRpdGxlIH19PC9oND5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIiFzZXR0aW5ncz8uaGlkZUNsb3NlQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInNldHRpbmdzPy5jYW5jZWxCdXR0b25MYWJlbCB8fCAnQ2xvc2UnXCIgKGNsaWNrKT1cImNsb3NlKClcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6W2AubW9kYWwtZGlhbG9nLWNlbnRlcmVkIHtcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMCUgLSAoMC41cmVtICogMikpO1xuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkge1xuICAgIC5tb2RhbC1kaWFsb2ctY2VudGVyZWQge1xuICAgICAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gKDEuNzVyZW0gKiAyKSk7XG4gICAgfVxuICB9YF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIC8vdGl0bGUgb2YgbW9kYWxcbiAgQElucHV0KCkgdGl0bGU7XG5cbiAgLy9zaXplIG9mIG1vZGFsLiBzbSxsZyxtZFxuICBASW5wdXQoKSBzaXplO1xuXG4gIC8vbW9kYWxDbGFzcyBhZGRlZCB0byBtb2RhbCBkaWFsb2dcbiAgQElucHV0KCkgbW9kYWxDbGFzcztcblxuICAvL2hpZGUgY2xvc2UgYnV0dG9uXG4gIEBJbnB1dCgpIGhpZGVDbG9zZUJ1dHRvbjtcblxuICAvL2lmIG1vZGFsIGlzIHZlcnRpY2FsbHkgY2VudGVyZWRcbiAgQElucHV0KCkgY2VudGVyZWRcblxuICAvL2lmIGJhY2tkcm9wIGlzIGFwcGxpZWQgb24gbW9kYWxcbiAgQElucHV0KCkgYmFja2Ryb3BcblxuICAvL2lmIHRydWUsIGFuaW1hdGlvbiBpcyBhZGRlZCB0byBtb2RhbCBkaWFsb2dcbiAgQElucHV0KCkgYW5pbWF0aW9uO1xuXG4gIC8vbGlzdGVuIHRvIGtleWJvYXJkIGV2ZW50c1xuICBASW5wdXQoKSBrZXlib2FyZDtcblxuICAvL2Nsb3NlIG9uIG91dHNpZGUgY2xpY2tcbiAgQElucHV0KCkgY2xvc2VPbk91dHNpZGVDbGljaztcblxuICAvL2N1c3RvbSBiYWNrZHJvcCBjbGFzc1xuICBASW5wdXQoKSBiYWNrZHJvcENsYXNzO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgb25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgb25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuIFxuXG4gIEBWaWV3Q2hpbGQoXCJtb2RhbFJvb3RcIikgcHVibGljIG1vZGFsUm9vdDogRWxlbWVudFJlZjtcbiAgIFxuICBwdWJsaWMgaXNPcGVuZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpbnB1dFNldHRpbmdzO1xuICBwdWJsaWMgc2V0dGluZ3M7XG4gIHByaXZhdGUgYmFja2Ryb3BFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsTWFuYWdlciA6IE1vZGFsTWFuYWdlcikge1xuICB9XG5cbiAgbmdPbkluaXQoKXtcbiAgICB0aGlzLmlucHV0U2V0dGluZ3MgPSB7XG4gICAgICB0aXRsZTogdGhpcy50aXRsZSxcbiAgICAgIHNpemU6IHRoaXMuc2l6ZSB8fCBcIm1kXCIsXG4gICAgICBtb2RhbENsYXNzOiB0aGlzLm1vZGFsQ2xhc3MgfHwgJycsXG4gICAgICBoaWRlQ2xvc2VCdXR0b24gOiB0aGlzLmhpZGVDbG9zZUJ1dHRvbiB8fCBmYWxzZSxcbiAgICAgIGNlbnRlcmVkOiB0aGlzLmNlbnRlcmVkIHx8IGZhbHNlLFxuICAgICAgYmFja2Ryb3A6IHRoaXMuYmFja2Ryb3AgfHwgdHJ1ZSxcbiAgICAgIGFuaW1hdGlvbiA6IHRoaXMuYW5pbWF0aW9uIHx8IHRydWUsXG4gICAgICBrZXlib2FyZDogdGhpcy5rZXlib2FyZCB8fCB0cnVlLFxuICAgICAgY2xvc2VPbk91dHNpZGVDbGljazogdGhpcy5jbG9zZU9uT3V0c2lkZUNsaWNrIHx8IHRydWUsXG4gICAgICBiYWNrZHJvcENsYXNzOiB0aGlzLmJhY2tkcm9wQ2xhc3MgfHwgXCJtb2RhbC1iYWNrZHJvcFwiXG4gICAgfVxuICB9XG5cbiAgaW5pdChjb25maWcpIHtcbiAgICB0aGlzLm9uT3Blbi5vYnNlcnZlcnMgPSBbXTtcbiAgICB0aGlzLm9uQ2xvc2Uub2JzZXJ2ZXJzID0gW107XG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMubW9kYWxNYW5hZ2VyLmRlZmF1bHRzLCB0aGlzLmlucHV0U2V0dGluZ3MsIGNvbmZpZyk7XG4gICAgdGhpcy5jcmVhdGVCYWNrRHJvcCgpO1xuICB9XG5cblxuICBvcGVuKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbmVkKVxuICAgICAgcmV0dXJuO1xuICAgIFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcIm1vZGFsLW9wZW5cIik7XG4gICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLm9uT3Blbi5lbWl0KCk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGlmICghdGhpcy5pc09wZW5lZClcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZSgvbW9kYWwtb3BlblxcYi8sIFwiXCIpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2ZW50Q2xvc2luZyhldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCYWNrRHJvcCgpIHtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZhZGVcIik7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MgJiYgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcCAmJiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wID09IHRydWUpIHtcbiAgICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5iYWNrZHJvcENsYXNzKTtcbiAgICB9XG4gIH1cblxufVxuIl19