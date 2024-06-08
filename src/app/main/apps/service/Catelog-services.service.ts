import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatelogServicesService {

  constructor(private http: HttpClient) { }
  //#DiagnostocServices
  getAllDiagnosticServices(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/DiagnosticService/GetAll`);
   }
   addDiagnosticService(newDiagnosticService:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/DiagnosticService/Create`,newDiagnosticService);
   }
 
  updateDiagnosticService(newDiagnosticService:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/DiagnosticService/Update`,newDiagnosticService);
   }
   DeleteDiagnosticService(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/DiagnosticService/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#DiagnostocServices
  //#DiagnostocServicesTypes
  getAllDiagnosticServicesTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/DiagnosticType/GetAll`);
   }
   addDiagnosticServiceType(newDiagnosticServiceType:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/DiagnosticType/Create`,newDiagnosticServiceType);
   }
 
  updateDiagnosticServiceType(newDiagnosticServiceType:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/DiagnosticType/Update`,newDiagnosticServiceType);
   }
   DeleteDiagnosticServicetype(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/DiagnosticType/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#DiagnostocServicesTypes
  //#RepairServices
  getAllRepairServices(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/RepairService/GetAll`);
   }
   addRepairService(newRepairService:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/RepairService/Create`,newRepairService);
   }
 
  updateRepairService(newRepairService:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/RepairService/Update`,newRepairService);
   }
   DeleteRepairService(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/RepairService/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#RepairServices
  //#RepairServicesTypes
  getAllRepairServicesTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/RepairServiceType/GetAll`);
   }
   addRepairServiceType(newRepairServiceType:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/RepairServiceType/Create`,newRepairServiceType);
   }
 
  updateRepairServiceType(newRepairServiceType:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/RepairServiceType/Update`,newRepairServiceType);
   }
   DeleteRepairServicetype(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/RepairServiceType/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#RepairServicesTypes
  //#WarrantyClaimServices
  getAllWarrantyClaimServices(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/WarrantyClaimService/GetAll`);
   }
   addWarrantyClaimService(newWarrantyClaimService:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/WarrantyClaimService/Create`,newWarrantyClaimService);
   }
 
  updateWarrantyClaimService(newWarrantyClaimService:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/WarrantyClaimService/Update`,newWarrantyClaimService);
   }
   DeleteWarrantyClaimService(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/WarrantyClaimService/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#WarrantyClaimServices
  //#WarrantyClaimTypeServicesTypes
  getAllWarrantyClaimTypeServicesTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/WarrantyClaimServiceType/GetAll`);
   }
   addWarrantyClaimTypeServiceType(newWarrantyClaimTypeServiceType:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/WarrantyClaimServiceType/Create`,newWarrantyClaimTypeServiceType);
   }
 
  updateWarrantyClaimTypeServiceType(newWarrantyClaimTypeServiceType:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/WarrantyClaimServiceType/Update`,newWarrantyClaimTypeServiceType);
   }
   DeleteWarrantyClaimTypeServicetype(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/WarrantyClaimServiceType/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#WarrantyClaimTypeServicesTypes
  

}
