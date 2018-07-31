import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[control-state]'
})
export class ControlStateDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    setTimeout(() => {
      this.ngControl.control[action]();      
    })
  }
  
  constructor(private ngControl : NgControl) { }

}
