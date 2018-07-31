import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal-content',
  template: `<ng-content></ng-content>`
})
export class ModalContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
