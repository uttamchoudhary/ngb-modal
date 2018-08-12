/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ModalManager } from './modal.service';
var ModalComponent = /** @class */ (function () {
    function ModalComponent(modalManager) {
        this.modalManager = modalManager;
        this.onOpen = new EventEmitter(false);
        this.onClose = new EventEmitter(false);
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
        { type: Component, args: [{
                    selector: 'modal',
                    template: "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" #modalRoot (keydown.esc)=\"settings?.keyboard ? close() : 0\" [ngStyle]=\"{ display: isOpened ? 'block' : 'none' }\" [ngClass]=\"{'fade': settings?.animation}\" (click)=\"settings?.backdrop !== 'static' && settings?.closeOnOutsideClick ? close() : 0\">\n    <div [class]=\"'modal-dialog modal-'+ settings?.size + ' ' + settings?.modalClass\" (click)=\"preventClosing($event)\" [ngClass]=\"{'modal-dialog-centered': settings?.centered}\">\n        <div class=\"modal-content\" tabindex=\"0\" *ngIf=\"isOpened\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\" *ngIf=\"settings?.title\">{{ settings?.title }}</h4>\n                <ng-content select=\"modal-header\"></ng-content>\n                <button *ngIf=\"!settings?.hideCloseButton\" type=\"button\" class=\"close\" [attr.aria-label]=\"settings?.cancelButtonLabel || 'Close'\" (click)=\"close()\"><span aria-hidden=\"true\">&times;</span></button>\n            </div>\n            <div class=\"modal-body\">\n                <ng-content select=\"modal-content\"></ng-content>\n            </div>\n            <div class=\"modal-footer\">\n                <ng-content select=\"modal-footer\"></ng-content>\n            </div>\n        </div>\n    </div>\n</div>",
                    styles: [".modal-dialog-centered {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    min-height: calc(100% - (0.5rem * 2));\n  }\n  @media (min-width: 576px) {\n    .modal-dialog-centered {\n      min-height: calc(100% - (1.75rem * 2));\n    }\n  }"]
                },] },
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = function () { return [
        { type: ModalManager }
    ]; };
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
    return ModalComponent;
}());
export { ModalComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdiLW1vZGFsLyIsInNvdXJjZXMiOlsibGliL21vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUF3QixZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBK0U3Qyx3QkFBb0IsWUFBMkI7UUFBM0IsaUJBQVksR0FBWixZQUFZLENBQWU7c0JBWHJCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQzt1QkFDdEIsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO3dCQUtoQyxLQUFLO0tBTXRCOzs7O0lBRUQsaUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSTtZQUN2QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFO1lBQ2pDLGVBQWUsRUFBRyxJQUFJLENBQUMsZUFBZSxJQUFJLEtBQUs7WUFDL0MsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSztZQUNoQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJO1lBQy9CLFNBQVMsRUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUk7WUFDbEMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSTtZQUMvQixtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSTtZQUNyRCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsSUFBSSxnQkFBZ0I7U0FDdEQsQ0FBQTtLQUNGOzs7OztJQUVELDZCQUFJOzs7O0lBQUosVUFBSyxNQUFN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Q0FHTCxLQUFLOzJCQUdMLEtBQUs7MkJBR0wsS0FBSzs0QkFHTCxLQUFLOzJCQUdMLEtBQUs7c0NBR0wsS0FBSztnQ0FHTCxLQUFLO3lCQUVMLE1BQU07MEJBQ04sTUFBTTs0QkFHTixTQUFTLFNBQUMsV0FBVzs7eUJBekV4Qjs7U0FxQ2EsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZGFsTWFuYWdlciB9IGZyb20gJy4vbW9kYWwuc2VydmljZSc7XG5cbmRlY2xhcmUgdmFyIGRvY3VtZW50OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21vZGFsJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibW9kYWxcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiICNtb2RhbFJvb3QgKGtleWRvd24uZXNjKT1cInNldHRpbmdzPy5rZXlib2FyZCA/IGNsb3NlKCkgOiAwXCIgW25nU3R5bGVdPVwieyBkaXNwbGF5OiBpc09wZW5lZCA/ICdibG9jaycgOiAnbm9uZScgfVwiIFtuZ0NsYXNzXT1cInsnZmFkZSc6IHNldHRpbmdzPy5hbmltYXRpb259XCIgKGNsaWNrKT1cInNldHRpbmdzPy5iYWNrZHJvcCAhPT0gJ3N0YXRpYycgJiYgc2V0dGluZ3M/LmNsb3NlT25PdXRzaWRlQ2xpY2sgPyBjbG9zZSgpIDogMFwiPlxuICAgIDxkaXYgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cgbW9kYWwtJysgc2V0dGluZ3M/LnNpemUgKyAnICcgKyBzZXR0aW5ncz8ubW9kYWxDbGFzc1wiIChjbGljayk9XCJwcmV2ZW50Q2xvc2luZygkZXZlbnQpXCIgW25nQ2xhc3NdPVwieydtb2RhbC1kaWFsb2ctY2VudGVyZWQnOiBzZXR0aW5ncz8uY2VudGVyZWR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCIgdGFiaW5kZXg9XCIwXCIgKm5nSWY9XCJpc09wZW5lZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgKm5nSWY9XCJzZXR0aW5ncz8udGl0bGVcIj57eyBzZXR0aW5ncz8udGl0bGUgfX08L2g0PlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIXNldHRpbmdzPy5oaWRlQ2xvc2VCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIFthdHRyLmFyaWEtbGFiZWxdPVwic2V0dGluZ3M/LmNhbmNlbEJ1dHRvbkxhYmVsIHx8ICdDbG9zZSdcIiAoY2xpY2spPVwiY2xvc2UoKVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibW9kYWwtY29udGVudFwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1vZGFsLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczpbYC5tb2RhbC1kaWFsb2ctY2VudGVyZWQge1xuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSAtICgwLjVyZW0gKiAyKSk7XG4gIH1cbiAgQG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KSB7XG4gICAgLm1vZGFsLWRpYWxvZy1jZW50ZXJlZCB7XG4gICAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMCUgLSAoMS43NXJlbSAqIDIpKTtcbiAgICB9XG4gIH1gXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLy90aXRsZSBvZiBtb2RhbFxuICBASW5wdXQoKSB0aXRsZTtcblxuICAvL3NpemUgb2YgbW9kYWwuIHNtLGxnLG1kXG4gIEBJbnB1dCgpIHNpemU7XG5cbiAgLy9tb2RhbENsYXNzIGFkZGVkIHRvIG1vZGFsIGRpYWxvZ1xuICBASW5wdXQoKSBtb2RhbENsYXNzO1xuXG4gIC8vaGlkZSBjbG9zZSBidXR0b25cbiAgQElucHV0KCkgaGlkZUNsb3NlQnV0dG9uO1xuXG4gIC8vaWYgbW9kYWwgaXMgdmVydGljYWxseSBjZW50ZXJlZFxuICBASW5wdXQoKSBjZW50ZXJlZFxuXG4gIC8vaWYgYmFja2Ryb3AgaXMgYXBwbGllZCBvbiBtb2RhbFxuICBASW5wdXQoKSBiYWNrZHJvcFxuXG4gIC8vaWYgdHJ1ZSwgYW5pbWF0aW9uIGlzIGFkZGVkIHRvIG1vZGFsIGRpYWxvZ1xuICBASW5wdXQoKSBhbmltYXRpb247XG5cbiAgLy9saXN0ZW4gdG8ga2V5Ym9hcmQgZXZlbnRzXG4gIEBJbnB1dCgpIGtleWJvYXJkO1xuXG4gIC8vY2xvc2Ugb24gb3V0c2lkZSBjbGlja1xuICBASW5wdXQoKSBjbG9zZU9uT3V0c2lkZUNsaWNrO1xuXG4gIC8vY3VzdG9tIGJhY2tkcm9wIGNsYXNzXG4gIEBJbnB1dCgpIGJhY2tkcm9wQ2xhc3M7XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBvbk9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gXG5cbiAgQFZpZXdDaGlsZChcIm1vZGFsUm9vdFwiKSBwdWJsaWMgbW9kYWxSb290OiBFbGVtZW50UmVmO1xuICAgXG4gIHB1YmxpYyBpc09wZW5lZCA9IGZhbHNlO1xuICBwcml2YXRlIGlucHV0U2V0dGluZ3M7XG4gIHB1YmxpYyBzZXR0aW5ncztcbiAgcHJpdmF0ZSBiYWNrZHJvcEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxNYW5hZ2VyIDogTW9kYWxNYW5hZ2VyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpe1xuICAgIHRoaXMuaW5wdXRTZXR0aW5ncyA9IHtcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgc2l6ZTogdGhpcy5zaXplIHx8IFwibWRcIixcbiAgICAgIG1vZGFsQ2xhc3M6IHRoaXMubW9kYWxDbGFzcyB8fCAnJyxcbiAgICAgIGhpZGVDbG9zZUJ1dHRvbiA6IHRoaXMuaGlkZUNsb3NlQnV0dG9uIHx8IGZhbHNlLFxuICAgICAgY2VudGVyZWQ6IHRoaXMuY2VudGVyZWQgfHwgZmFsc2UsXG4gICAgICBiYWNrZHJvcDogdGhpcy5iYWNrZHJvcCB8fCB0cnVlLFxuICAgICAgYW5pbWF0aW9uIDogdGhpcy5hbmltYXRpb24gfHwgdHJ1ZSxcbiAgICAgIGtleWJvYXJkOiB0aGlzLmtleWJvYXJkIHx8IHRydWUsXG4gICAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiB0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2sgfHwgdHJ1ZSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IHRoaXMuYmFja2Ryb3BDbGFzcyB8fCBcIm1vZGFsLWJhY2tkcm9wXCJcbiAgICB9XG4gIH1cblxuICBpbml0KGNvbmZpZykge1xuICAgIHRoaXMub25PcGVuLm9ic2VydmVycyA9IFtdO1xuICAgIHRoaXMub25DbG9zZS5vYnNlcnZlcnMgPSBbXTtcbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5tb2RhbE1hbmFnZXIuZGVmYXVsdHMsIHRoaXMuaW5wdXRTZXR0aW5ncywgY29uZmlnKTtcbiAgICB0aGlzLmNyZWF0ZUJhY2tEcm9wKCk7XG4gIH1cblxuXG4gIG9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuZWQpXG4gICAgICByZXR1cm47XG4gICAgXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tkcm9wRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibW9kYWwtb3BlblwiKTtcbiAgICB0aGlzLmlzT3BlbmVkID0gdHJ1ZTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm1vZGFsUm9vdC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgIHRoaXMubW9kYWxSb290Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMub25PcGVuLmVtaXQoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbmVkKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy5tb2RhbFJvb3QubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmJhY2tkcm9wRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKC9tb2RhbC1vcGVuXFxiLywgXCJcIik7XG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xuICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHVibGljIHByZXZlbnRDbG9zaW5nKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUJhY2tEcm9wKCkge1xuICAgIHRoaXMuYmFja2Ryb3BFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZmFkZVwiKTtcbiAgICB0aGlzLmJhY2tkcm9wRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICBpZiAodGhpcy5zZXR0aW5ncyAmJiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wICYmIHRoaXMuc2V0dGluZ3MuYmFja2Ryb3AgPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmJhY2tkcm9wQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=