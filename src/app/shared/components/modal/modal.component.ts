import { Component, OnInit, Input, Output, OnDestroy, OnChanges, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Settings } from './models';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnChanges {

  @Input() config: Settings;

  @Output() public onOpen = new EventEmitter(false);
  @Output() public onClose = new EventEmitter(false);
  @Output() public onSubmit = new EventEmitter(false);

  public isOpened = false;

  @ViewChild("modalRoot")
  public modalRoot: ElementRef;
  private settings: Settings;
  private backdropElement: HTMLElement;

  constructor() {
    this.settings = {
      closeOnEscape: true,
      closeOnOutsideClick: true,
      hideCloseButton: false,
      backdrop: true
    }
  }

  ngOnChanges() {
    this.settings = Object.assign(this.settings, this.config);
    this.createBackDrop();
  }


  open() {
    if (this.isOpened)
      return;

    this.isOpened = true;
    this.onOpen.emit();
    document.body.appendChild(this.backdropElement);
    document.body.className += " modal-open";

    window.setTimeout(() => {
      this.modalRoot.nativeElement.classList.add('in');
      this.modalRoot.nativeElement.focus();
    }, 0);

  }

  close() {
    if (!this.isOpened)
      return;

    this.modalRoot.nativeElement.classList.remove('in');
    this.onClose.emit();
    document.body.removeChild(this.backdropElement);
    document.body.className = document.body.className.replace(/modal-open\b/, "");
    window.setTimeout(() => this.isOpened = false, 100);
  }

  public preventClosing(event: MouseEvent) {
    //event.stopPropagation();
  }

  private createBackDrop() {
    this.backdropElement = document.createElement("div");
    this.backdropElement.classList.add("fade");
    this.backdropElement.classList.add("in");
    if (this.settings && this.settings.backdrop) {
      this.backdropElement.classList.add("modal-backdrop");
    }
  }

}
