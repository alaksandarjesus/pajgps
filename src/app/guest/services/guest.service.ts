import { Injectable } from '@angular/core';
import { GuestServicesModule } from '../guest-services.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: GuestServicesModule
})
export class GuestService {

  constructor(private http:HttpClient) { }


  login(payload:any){
    const url = `${environment.api}/v1/login`;
    return this.http.post(url, payload);
  }
}
