import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout1Component } from '../layouts/layout-1/layout-1.component';
import { AllComponent } from './all/all.component';
import { AuthGuard } from '../guards/auth.guard';
import { DeviceComponent } from './device/device.component';

const routes: Routes = [
  {path:"", component: Layout1Component, canActivate:[AuthGuard], children:[
    {path: "", component:AllComponent},
    {path:":id", component: DeviceComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
