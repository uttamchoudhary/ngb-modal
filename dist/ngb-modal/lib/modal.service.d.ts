import { ComponentFactoryResolver } from '@angular/core';
export declare class ModalManager {
    private componentFactoryResolver;
    private modalHost;
    private globalConfig;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    defaults: ModalConfig;
    setDefaults(config: ModalConfig): void;
    setRootViewContainerRef(ref: any): void;
    open(modalInstance: any, settings?: any): any;
    close(modalInstance: any): void;
    closeFactory(): () => void;
}
export interface ModalConfig {
    title?: string;
    size?: string | "md";
    modalClass?: string | '';
    hideCloseButton?: boolean | false;
    centered?: boolean | false;
    backdrop?: boolean | 'static' | true;
    animation?: boolean | true;
    keyboard?: boolean | true;
    closeOnOutsideClick?: boolean | true;
    backdropClass?: string | "modal-backdrop";
}
