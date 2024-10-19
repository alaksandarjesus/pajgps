import { Injectable } from '@angular/core';
import { DeviceServicesModule } from '../device-services.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: DeviceServicesModule
})
export class DevicesService {

  constructor(private http:HttpClient) { }


  get(){
    const url = `${environment.api}/device`;
    
    return this.http.get(url);
  }

  trackerData(deviceId:string, lastPoints = 1){
    const url = `${environment.api}/trackerdata/${deviceId}/last_points?lastPoints=${lastPoints}`;
    
    return this.http.get(url);
  }
}
