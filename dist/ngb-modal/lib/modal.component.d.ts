import { OnInit, EventEmitter, ElementRef } from '@angular/core';
import { ModalManager } from './modal.service';
export declare class ModalComponent implements OnInit {
    private modalManager;
    title: any;
    size: any;
    modalClass: any;
    hideCloseButton: any;
    centered: any;
    backdrop: any;
    animation: any;
    keyboard: any;
    closeOnOutsideClick: any;
    backdropClass: any;
    onOpen: EventEmitter<{}>;
    onClose: EventEmitter<{}>;
    modalRoot: ElementRef;
    isOpened: boolean;
    private inputSettings;
    settings: any;
    private backdropElement;
    constructor(modalManager: ModalManager);
    ngOnInit(): void;
    init(config: any): void;
    open(): void;
    close(): void;
    preventClosing(event: MouseEvent): void;
    private createBackDrop();
}
