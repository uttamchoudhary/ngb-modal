import { Component, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { ModalManager, ModalComponent } from 'ngb-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('modal1') modal1;
  @ViewChild('modal2') modal2;  

  title = 'app';
  settings = {
    title: "hello world",
    closeOnEscape: true,
    closeOnOutsideClick: true,
    hideCloseButton: false,
    backdrop: true
  }
  currentRef;
  constructor(private modal: ModalManager, private vcr: ViewContainerRef) {
    this.modal.defaults = {
      title: "tried modal",
      size: "sm",
      modalClass: 'mymodal',
      hideCloseButton: true,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: true,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    }
    this.modal.setRootViewContainerRef(this.vcr);
  }

  asComponent(){
    this.modal.open(ModalComp, {});
  }

  asComponent2(){
    let currentRef = this.modal.open(ModalComp2, {});
    currentRef['data'] = "uttam";
    currentRef.onOpen.subscribe(() => {
      console.log("comp opened");
    })
    currentRef.onClose.subscribe(() => {
      console.log("comp closed");
    })
    setTimeout(()=> {
      currentRef.close()
    },5000)
  }

  asTemplate(){
    let ref = this.modal.open(this.modal1, {
      size: "md",
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
    // setTimeout(()=> {
    //   this.close(ref)
    // },3000)
  }

  close(ref){
    this.modal.close(ref);
  }
}

@Component({
  selector: 'app-modal',
  template: `<modal>
  <modal-header>
      Modal as a component
  </modal-header>

  <modal-content>
      Modal body content goes there.
  </modal-content>

  <modal-footer>
      Modal footer content goes there.
  </modal-footer>
</modal>`
})
export class ModalComp{

}

@Component({
  selector: 'app-modal2',
  template: `<modal>
  <modal-header>
      Modal 2 as a component
  </modal-header>

  <modal-content>
  <span>{{data}}</span>
      Modal body content goes there.
  </modal-content>

  <modal-footer>
      Modal footer content goes there.
  </modal-footer>
</modal>`
})
export class ModalComp2{
  @ViewChild(ModalComponent) ModalComponent;
  @Input() data;
}
