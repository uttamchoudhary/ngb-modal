import { Component, ViewChild, ViewContainerRef, Input, OnInit } from '@angular/core';
import { ModalManager, ModalComponent } from 'ngb-modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { CONSTANTS } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('resultModal') resultModal;

  private CONSTANTS = CONSTANTS;

  configForm : FormGroup;
  constructor(private modal: ModalManager, private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.configForm = this._fb.group({
      title: ["Your Custom Modal"],
      size: ["md"],
      modalClass: [""],
      hideCloseButton: [false],
      centered: [false],
      backdrop: [true],
      animation: [true],
      keyboard: [true],
      closeOnOutsideClick: [true],
      backdropClass: ["modal-backdrop"]
    });
  }

  

  asTemplate(){
    let ref = this.modal.open(this.resultModal, {
      title: "abcd",
      size: "abc",
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    });
    ref.onOpen.subscribe((res) => {
      console.log("opened template");
    })
    ref.onClose.subscribe((res) => {
      console.log("closed template");
    })

  }

  close(ref){
    this.modal.close(ref);
  }
}