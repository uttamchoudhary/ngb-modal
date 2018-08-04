import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalFooterComponent } from "./modal-footer.component";
import { ModalContentComponent } from "./modal-content.component";
import { ModalHeaderComponent } from "./modal-header.component";

import { ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalComponent, ModalFooterComponent, ModalContentComponent, ModalHeaderComponent],
  exports: [ModalComponent, ModalFooterComponent, ModalContentComponent, ModalHeaderComponent]
})
export class ModalModule { }
