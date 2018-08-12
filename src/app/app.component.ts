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
  config;
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

  openModal(){
    this.prepareCodeSnippets();
    this.modal.open(this.resultModal, this.configForm.value);
  }

  prepareCodeSnippets(){
    this.config = `config = ${JSON.stringify(this.configForm.value, null, 4)};`
  }

  copyToClipboard(){
    var textArea = document.createElement("textarea");
    textArea.value = JSON.stringify(this.configForm.value, null, 4);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  }

  
}