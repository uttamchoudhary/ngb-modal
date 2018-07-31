import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal-header',
  template:`<ng-content></ng-content>`
})

export class ModalHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
