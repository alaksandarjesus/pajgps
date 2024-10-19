import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceServicesModule } from './device-services.module';
import { DevicesRoutingModule } from './devices-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DeviceServicesModule,
    DevicesRoutingModule
  ]
})
export class DevicesModule { }
