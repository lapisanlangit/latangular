import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { KppnComponent } from './kppn/kppn.component';
import { SharedModule } from '../shared/shared/shared.module';
import { KppnService } from './kppn/kppn.service';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { SatkerService } from './satker/satker.service';
import { SatkerComponent } from './satker/satker.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { ShowSatkerComponent } from './kppn/showsatker/showsatker.component';
import { MonComponent } from './mon/mon.component';
import { LaporanRealisasiComponent } from './laporan-realisasi/laporan-realisasi.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    SatkerComponent,
    KppnComponent,
    ShowSatkerComponent,
    MonComponent,
    LaporanRealisasiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSelectModule
  ],
  providers:[
    KppnService,
    SatkerService
  ]
})
export class AdminModule { }
