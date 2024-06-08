import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private http: HttpClient) { }
  //#Technicians
  getAllTechnicians(): Observable<any> {
   return this.http.get<any>(`${environment.apiLiveUrl}/services/app/Technician/GetAll`);
  }
  addTechnicians(newtechnician:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/Technician/Create`,newtechnician);
   }
   getTechnicianById(itemId: number) {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/Technician/Get/?Id=${itemId}`); // Replace with your API endpoint
  }
  updateTechnicians(newtechnician:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/Technician/Update`,newtechnician);
   }
   assignTechniciansToShift(assignment:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/Technician/AssignTechniciansToShift`,assignment);
   }
   DeleteTechnician(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/Technician/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#CrewGroups
  getAllCrewGroups(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/CrewGroup/GetAllCrewGroupsWithTechnicians`);
   }
   addCrewGroups(newcrewgroup:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/CrewGroup/Create`,newcrewgroup);
   }
   updateCrewGroups(newcrewgroup:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/CrewGroup/Update`,newcrewgroup);
   }
   deleteCrewGroups(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/CrewGroup/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#ServiceAreas
  getAllServiceAreas(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/ServiceArea/GetAll`);
   }
   addServiceArea(newServiceArea:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/ServiceArea/Create`,newServiceArea);
   }
   updateServiceArea(newServiceArea:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/ServiceArea/Update`,newServiceArea);
   }
   deleteServiceArea(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/ServiceArea/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  //#TechnicianTypes
  getAllTechnicianTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/TechnicianType/GetAll`);
   }
   addTechnicianTypes(newServiceArea:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/TechnicianType/Create`,newServiceArea);
   }
   updateTechnicianTypes(newServiceArea:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/TechnicianType/Update`,newServiceArea);
   }
   deleteTechnicianTypes(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/TechnicianType/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
}
