import { Component, OnInit, Input, Output, OnDestroy, OnChanges, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ModalManager } from './modal.service';

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
export class ModalComponent implements OnInit {

  //title of modal
  @Input() title;

  //size of modal. sm,lg,md
  @Input() size;

  //modalClass added to modal dialog
  @Input() modalClass;

  //hide close button
  @Input() hideCloseButton;

  //if modal is vertically centered
  @Input() centered

  //if backdrop is applied on modal
  @Input() backdrop

  //if true, animation is added to modal dialog
  @Input() animation;

  //listen to keyboard events
  @Input() keyboard;

  //close on outside click
  @Input() closeOnOutsideClick;

  //custom backdrop class
  @Input() backdropClass;

  @Output() public onOpen = new EventEmitter(false);
  @Output() public onClose = new EventEmitter(false);
 

  @ViewChild("modalRoot") public modalRoot: ElementRef;
   
  public isOpened = false;
  private inputSettings;
  public settings;
  private backdropElement: HTMLElement;

  constructor(private modalManager : ModalManager) {
  }

  ngOnInit(){
    this.inputSettings = {
      title: this.title,
      size: this.size || "md",
      modalClass: this.modalClass || '',
      hideCloseButton : this.hideCloseButton || false,
      centered: this.centered || false,
      backdrop: this.backdrop || true,
      animation : this.animation || true,
      keyboard: this.keyboard || true,
      closeOnOutsideClick: this.closeOnOutsideClick || true,
      backdropClass: this.backdropClass || "modal-backdrop"
    }
  }

  init(config) {
    this.onOpen.observers = [];
    this.onClose.observers = [];
    this.settings = Object.assign({}, this.modalManager.defaults, this.inputSettings, config);
    this.createBackDrop();
  }


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

  public preventClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  private createBackDrop() {
    this.backdropElement = document.createElement("div");
    this.backdropElement.classList.add("fade");
    this.backdropElement.classList.add("show");
    if (this.settings && this.settings.backdrop && this.settings.backdrop == true) {
      this.backdropElement.classList.add(this.settings.backdropClass);
    }
  }

}
