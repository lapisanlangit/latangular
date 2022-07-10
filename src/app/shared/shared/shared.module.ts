import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './interceptor';
import { AjaxLoadingComponent } from '../ajax/ajax-loading.component';
import { PesanComponent } from '../pesan/pesan-component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({

  imports: [
    CommonModule,
    DataTablesModule
  ],
  declarations: [
    AjaxLoadingComponent,
    PesanComponent
  ],
  providers:[
    httpInterceptorProviders
  ],
  exports:[
    AjaxLoadingComponent,PesanComponent  ]
})
export class SharedModule { }
