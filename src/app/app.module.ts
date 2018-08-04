import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from "ngb-modal";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './shared/shared.module';

import { AppComponent, ModalComp, ModalComp2 } from './app.component';


@NgModule({
  declarations: [
    AppComponent, ModalComp, ModalComp2
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgbModule,
    SharedModule,
    ModalModule,
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComp, ModalComp2]
})
export class AppModule { }
