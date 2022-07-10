import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { KppnComponent } from './kppn/kppn.component';
import { SatkerComponent } from './satker/satker.component';
import { AuthGuard } from '../auth-guard.service';
import { MonComponent } from './mon/mon.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'kppn',
        component: KppnComponent
      },
      {
        path: 'satker',
        component: SatkerComponent
      },
      {
        path: 'mon/:id',
        component: MonComponent
      },
    ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
