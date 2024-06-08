import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceContractService {

  constructor(private http:HttpClient) { }
  getAllServiceContracts(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/ServiceContract/GetAll`);
   }
   addServiceContract(newServiceContract:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/ServiceContract/Create`,newServiceContract);
   }
 
  updateServiceContract(newServiceContract:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/ServiceContract/Update`,newServiceContract);
   }
   DeleteServiceContract(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/ServiceContract/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#ServiceContracts
  //#ServiceContractsTypes
  getAllServiceContractsTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/ServiceContractType/GetAll`);
   }
   addServiceContractType(newServiceContractType:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/ServiceContractType/Create`,newServiceContractType);
   }
 
  updateServiceContractType(newServiceContractType:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/ServiceContractType/Update`,newServiceContractType);
   }
   DeleteServiceContracttype(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/ServiceContractType/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
}
