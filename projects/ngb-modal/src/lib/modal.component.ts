import { Component, OnInit, Input, Output, OnDestroy, OnChanges, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ModalManager } from './modal.service';
import { Subject, Observable } from 'rxjs';

declare var document: any;

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styles:[`.modal-dialog-centered {
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
})
export class ModalComponent {

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

  @Output() public opened = new EventEmitter(false);
  @Output() public closed = new EventEmitter(false);

  private openObserver = new Subject<any>();
  private closeObserver = new Subject<any>();
  
  public isOpened = false;

  @ViewChild("modalRoot")
  public modalRoot: ElementRef;
  public settings;
  private backdropElement: HTMLElement;

  constructor(private modalManager : ModalManager) {
    this.settings = {
      closeOnEscape: true,
      closeOnOutsideClick: true,
      hideCloseButton: false,
      backdrop: true
    }
  }

  init(config) {
    this.settings = Object.assign({}, this.modalManager.defaults, config);
    this.createBackDrop();
  }


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

  public preventClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  onOpen(){
    return this.openObserver.asObservable();
  }

  onClose(){
    return this.closeObserver.asObservable();
  }

  private createBackDrop() {
    this.backdropElement = document.createElement("div");
    this.backdropElement.classList.add("fade");
    this.backdropElement.classList.add("in");
    if (this.settings && this.settings.backdrop && this.settings.backdrop == true) {
      this.backdropElement.classList.add(this.settings.backdropClass);
    }
  }

}
