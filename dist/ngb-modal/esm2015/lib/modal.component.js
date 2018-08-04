/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ModalManager } from './modal.service';
import { Subject } from 'rxjs';
export class ModalComponent {
    /**
     * @param {?} modalManager
     */
    constructor(modalManager) {
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
    init(config) {
        this.settings = Object.assign({}, this.modalManager.defaults, config);
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
            this.opened.emit();
            this.openObserver.next(true);
        }, 0);
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
            this.closed.emit();
            this.closeObserver.next(true);
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
    onOpen() {
        return this.openObserver.asObservable();
    }
    /**
     * @return {?}
     */
    onClose() {
        return this.closeObserver.asObservable();
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
                template: `<div class="modal" tabindex="-1" role="dialog" #modalRoot (keydown.esc)="settings?.keyboard ? close() : 0" [ngStyle]="{ display: isOpened ? 'block' : 'none' }" [ngClass]="{'fade': settings.animation}" (click)="settings?.backdrop !== 'static' && settings?.closeOnOutsideClick ? close() : 0">
    <div [class]="'modal-dialog modal-'+ settings?.size + ' ' + settings?.modalClass" (click)="preventClosing($event)" [ngClass]="{'modal-dialog-centered': settings.centered}">
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
    opened: [{ type: Output }],
    closed: [{ type: Output }],
    modalRoot: [{ type: ViewChild, args: ["modalRoot",] }]
};
function ModalComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ModalComponent.prototype.opened;
    /** @type {?} */
    ModalComponent.prototype.closed;
    /** @type {?} */
    ModalComponent.prototype.openObserver;
    /** @type {?} */
    ModalComponent.prototype.closeObserver;
    /** @type {?} */
    ModalComponent.prototype.isOpened;
    /** @type {?} */
    ModalComponent.prototype.modalRoot;
    /** @type {?} */
    ModalComponent.prototype.settings;
    /** @type {?} */
    ModalComponent.prototype.backdropElement;
    /** @type {?} */
    ModalComponent.prototype.modalManager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdiLW1vZGFsLyIsInNvdXJjZXMiOlsibGliL21vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxFQUF3QixZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQW9DM0MsTUFBTTs7OztJQTZDSixZQUFvQixZQUEyQjtRQUEzQixpQkFBWSxHQUFaLFlBQVksQ0FBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQWJyQixJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUM7c0JBQ3ZCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQzs0QkFFMUIsSUFBSSxPQUFPLEVBQU87NkJBQ2pCLElBQUksT0FBTyxFQUFPO3dCQUV4QixLQUFLO1FBUXJCLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZCxhQUFhLEVBQUUsSUFBSTtZQUNuQixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQTtLQUNGOzs7OztJQUVELElBQUksQ0FBQyxNQUFNO1FBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7SUFHRCxJQUFJO1FBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFFVCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ1A7Ozs7SUFFRCxLQUFLO1FBQ0gsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztRQUVULElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ1Q7Ozs7O0lBRU0sY0FBYyxDQUFDLEtBQWlCO1FBQ3JDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Ozs7SUFHMUIsTUFBTTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3pDOzs7O0lBRUQsT0FBTztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzFDOzs7O0lBRU8sY0FBYztRQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDakU7Ozs7WUEzSUosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkw7Z0JBQ0wsTUFBTSxFQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBV04sQ0FBQzthQUNKOzs7O1lBcENRLFlBQVk7OztxQkFxRWxCLE1BQU07cUJBQ04sTUFBTTt3QkFPTixTQUFTLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZGFsTWFuYWdlciB9IGZyb20gJy4vbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmRlY2xhcmUgdmFyIGRvY3VtZW50OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibW9kYWxcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiICNtb2RhbFJvb3QgKGtleWRvd24uZXNjKT1cInNldHRpbmdzPy5rZXlib2FyZCA/IGNsb3NlKCkgOiAwXCIgW25nU3R5bGVdPVwieyBkaXNwbGF5OiBpc09wZW5lZCA/ICdibG9jaycgOiAnbm9uZScgfVwiIFtuZ0NsYXNzXT1cInsnZmFkZSc6IHNldHRpbmdzLmFuaW1hdGlvbn1cIiAoY2xpY2spPVwic2V0dGluZ3M/LmJhY2tkcm9wICE9PSAnc3RhdGljJyAmJiBzZXR0aW5ncz8uY2xvc2VPbk91dHNpZGVDbGljayA/IGNsb3NlKCkgOiAwXCI+XG4gICAgPGRpdiBbY2xhc3NdPVwiJ21vZGFsLWRpYWxvZyBtb2RhbC0nKyBzZXR0aW5ncz8uc2l6ZSArICcgJyArIHNldHRpbmdzPy5tb2RhbENsYXNzXCIgKGNsaWNrKT1cInByZXZlbnRDbG9zaW5nKCRldmVudClcIiBbbmdDbGFzc109XCJ7J21vZGFsLWRpYWxvZy1jZW50ZXJlZCc6IHNldHRpbmdzLmNlbnRlcmVkfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIHRhYmluZGV4PVwiMFwiICpuZ0lmPVwiaXNPcGVuZWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIXNldHRpbmdzPy5oaWRlQ2xvc2VCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIFthdHRyLmFyaWEtbGFiZWxdPVwic2V0dGluZ3M/LmNhbmNlbEJ1dHRvbkxhYmVsIHx8ICdDbG9zZSdcIiAoY2xpY2spPVwiY2xvc2UoKVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIiAqbmdJZj1cInNldHRpbmdzPy50aXRsZVwiPnt7IHNldHRpbmdzPy50aXRsZSB9fTwvaDQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJtb2RhbC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6W2AubW9kYWwtZGlhbG9nLWNlbnRlcmVkIHtcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMCUgLSAoMC41cmVtICogMikpO1xuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkge1xuICAgIC5tb2RhbC1kaWFsb2ctY2VudGVyZWQge1xuICAgICAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gKDEuNzVyZW0gKiAyKSk7XG4gICAgfVxuICB9YF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQge1xuXG4gIC8vIC8vdGl0bGUgb2YgbW9kYWxcbiAgLy8gQElucHV0KCkgdGl0bGU7XG5cbiAgLy8gLy9zaXplIG9mIG1vZGFsLiBzbSxsZyxtZFxuICAvLyBASW5wdXQoKSBzaXplO1xuXG4gIC8vIC8vbW9kYWxDbGFzcyBhZGRlZCB0byBtb2RhbCBkaWFsb2dcbiAgLy8gQElucHV0KCkgbW9kYWxDbGFzcztcblxuICAvLyAvL2hpZGUgY2xvc2UgYnV0dG9uXG4gIC8vIEBJbnB1dCgpIGhpZGVDbG9zZUJ1dHRvbjtcblxuICAvLyAvL2lmIG1vZGFsIGlzIHZlcnRpY2FsbHkgY2VudGVyZWRcbiAgLy8gQElucHV0KCkgY2VudGVyZWRcblxuICAvLyAvL2lmIGJhY2tkcm9wIGlzIGFwcGxpZWQgb24gbW9kYWxcbiAgLy8gQElucHV0KCkgYmFja2Ryb3BcblxuICAvLyAvL2lmIHRydWUsIGFuaW1hdGlvbiBpcyBhZGRlZCB0byBtb2RhbCBkaWFsb2dcbiAgLy8gQElucHV0KCkgYW5pbWF0aW9uO1xuXG4gIC8vIC8vbGlzdGVuIHRvIGtleWJvYXJkIGV2ZW50c1xuICAvLyBASW5wdXQoKSBrZXlib2FyZDtcblxuICAvLyAvL2Nsb3NlIG9uIG91dHNpZGUgY2xpY2tcbiAgLy8gQElucHV0KCkgY2xvc2VPbk91dHNpZGVDbGljaztcblxuICAvLyAvL2N1c3RvbSBiYWNrZHJvcCBjbGFzc1xuICAvLyBASW5wdXQoKSBiYWNrZHJvcENsYXNzO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgb3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgY2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG5cbiAgcHJpdmF0ZSBvcGVuT2JzZXJ2ZXIgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgY2xvc2VPYnNlcnZlciA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgXG4gIHB1YmxpYyBpc09wZW5lZCA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoXCJtb2RhbFJvb3RcIilcbiAgcHVibGljIG1vZGFsUm9vdDogRWxlbWVudFJlZjtcbiAgcHVibGljIHNldHRpbmdzO1xuICBwcml2YXRlIGJhY2tkcm9wRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbE1hbmFnZXIgOiBNb2RhbE1hbmFnZXIpIHtcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgY2xvc2VPbkVzY2FwZTogdHJ1ZSxcbiAgICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IHRydWUsXG4gICAgICBoaWRlQ2xvc2VCdXR0b246IGZhbHNlLFxuICAgICAgYmFja2Ryb3A6IHRydWVcbiAgICB9XG4gIH1cblxuICBpbml0KGNvbmZpZykge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm1vZGFsTWFuYWdlci5kZWZhdWx0cywgY29uZmlnKTtcbiAgICB0aGlzLmNyZWF0ZUJhY2tEcm9wKCk7XG4gIH1cblxuXG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuZWQpXG4gICAgICByZXR1cm47XG4gICAgXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tkcm9wRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibW9kYWwtb3BlblwiKTtcbiAgICB0aGlzLmlzT3BlbmVkID0gdHJ1ZTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2luJyk7XG4gICAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLm9wZW5lZC5lbWl0KCk7XG4gICAgICB0aGlzLm9wZW5PYnNlcnZlci5uZXh0KHRydWUpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbmVkKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpbicpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZSgvbW9kYWwtb3BlblxcYi8sIFwiXCIpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2xvc2VkLmVtaXQoKTtcbiAgICAgIHRoaXMuY2xvc2VPYnNlcnZlci5uZXh0KHRydWUpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgcHJldmVudENsb3NpbmcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIG9uT3Blbigpe1xuICAgIHJldHVybiB0aGlzLm9wZW5PYnNlcnZlci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG9uQ2xvc2UoKXtcbiAgICByZXR1cm4gdGhpcy5jbG9zZU9ic2VydmVyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCYWNrRHJvcCgpIHtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZhZGVcIik7XG4gICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImluXCIpO1xuICAgIGlmICh0aGlzLnNldHRpbmdzICYmIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3AgJiYgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcCA9PSB0cnVlKSB7XG4gICAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BDbGFzcyk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==