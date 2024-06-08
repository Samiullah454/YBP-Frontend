import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private http: HttpClient) { }
  getAllShifts(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/Shifts/GetAll`);
   }
   addShift(newshift:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/Shifts/Create`,newshift);
   }
 
  updateShift(newshift:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/Shifts/Update`,newshift);
   }
   DeleteShiftt(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/Shifts/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
}
