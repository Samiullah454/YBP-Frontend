import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartService {
constructor(private http: HttpClient) { }
  //#DiagnostocServices
  getAllParts(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/Part/GetAll`);
   }
   addPart(newPart:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/Part/Create`,newPart);
   }
 
  updatePart(newPart:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/Part/Update`,newPart);
   }
   DeletePart(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/Part/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#DiagnostocServices
  //#DiagnostocServicesTypes
  getAllPartsTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/PartType/GetAll`);
   }
   addPartType(newPartType:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/PartType/Create`,newPartType);
   }
 
  updatePartType(newPartType:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/PartType/Update`,newPartType);
   }
   DeleteParttype(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/PartType/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
}
