import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestServicesModule } from './guest-services.module';
import { GuestRoutingModule } from './guest-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GuestRoutingModule,
    GuestServicesModule
  ]
})
export class GuestModule { }
