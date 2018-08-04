import { EventEmitter, ElementRef } from '@angular/core';
import { ModalManager } from './modal.service';
import { Observable } from 'rxjs';
export declare class ModalComponent {
    private modalManager;
    opened: EventEmitter<{}>;
    closed: EventEmitter<{}>;
    private openObserver;
    private closeObserver;
    isOpened: boolean;
    modalRoot: ElementRef;
    settings: any;
    private backdropElement;
    constructor(modalManager: ModalManager);
    init(config: any): void;
    open(): void;
    close(): void;
    preventClosing(event: MouseEvent): void;
    onOpen(): Observable<any>;
    onClose(): Observable<any>;
    private createBackDrop();
}
