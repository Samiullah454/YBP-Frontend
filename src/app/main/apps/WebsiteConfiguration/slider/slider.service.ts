import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient,) { }
  addSlider(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/Slider/Create`,body);

    
  }
  
}