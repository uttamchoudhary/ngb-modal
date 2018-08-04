import { Injectable, ViewChild, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalManager {

  private modalHost: ViewContainerRef;

  private globalConfig : ModalConfig = {
    size: "md",
    modalClass: undefined,
    hideCloseButton : false,
    centered: false,
    backdrop: true,
    animation : true,
    keyboard: true,
    closeOnOutsideClick: true,
    backdropClass: "modal-backdrop" 
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  set defaults(config: ModalConfig) {
    this.globalConfig = Object.assign(this.globalConfig, config);
  }

  setDefaults(config: ModalConfig){
    this.globalConfig = Object.assign(this.globalConfig, config);    
  }

  get defaults() : ModalConfig {
    return this.globalConfig;
  }

  setRootViewContainerRef(ref){
    this.modalHost = ref;
  }

  open(modalInstance, config){
    if(typeof modalInstance === "object"){
      modalInstance.init(config);
      modalInstance.open();
      return modalInstance;
    }else if(typeof modalInstance === "function"){
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalInstance);
      this.modalHost.remove();
      let componentRef = this.modalHost.createComponent(componentFactory);
      setTimeout(() => {
        componentRef.instance['ModalComponent'].init(config);
        componentRef.instance['ModalComponent'].open();        
      })
      componentRef.instance['onOpen'] = this.closeFactory();
      componentRef.instance['onClose'] = componentRef.instance['ModalComponent'].onClose;
      componentRef.instance['close'] = componentRef.instance['ModalComponent'].onOpen;
     return componentRef.instance;
    } 

  }

  close(modalInstance){
    modalInstance.close();
  }

  closeFactory(){
    var _self = this;
    return function() {
      this['ModalComponent'].close();
      _self.modalHost.remove();
    }
  }

}

export interface ModalConfig {
    title?: string,
    size?: string | "md",
    modalClass?: string | '',
    hideCloseButton?: boolean | false,
    centered?: boolean | false,
    backdrop?: boolean | 'static' | true,
    animation?: boolean | true,
    keyboard?: boolean | true,
    closeOnOutsideClick?: boolean | true,
    backdropClass?: string | "modal-backdrop"
}
