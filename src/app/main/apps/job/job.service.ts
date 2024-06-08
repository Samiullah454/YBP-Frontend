import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }
  getAllJobs(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/Job/GetAll`);
   }
   addJob(newJob:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/Job/Create`,newJob);
   }
 
  updateJob(newJob:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/Job/Update`,newJob);
   }
   DeleteJob(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/Job/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  getAllJobTypes(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/JobType/GetAll`);
   }
   addJobType(newJobType:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/JobType/Create`,newJobType);
   }
 
  updateJobType(newJobType:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/JobType/Update`,newJobType);
   }
   DeleteJobtype(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/JobType/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
  getAllChecklist(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/CheckList/GetAll`);
   }
   addCheckList(newCheckList:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/CheckList/Create`,newCheckList);
   }
 
  updateCheckList(newCheckList:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/CheckList/Update`,newCheckList);
   }
   DeleteCheckList(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/CheckList/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
}
