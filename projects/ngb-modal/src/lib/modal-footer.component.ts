import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal-footer',
  template:`<ng-content></ng-content>`
})
export class ModalFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
