import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  constructor(private http: HttpClient) {}

  getIndustries(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/Industry/GetAll`);
  }
  addIndustry(newIndustry: any): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/Industry/Create`, newIndustry);
  }
  updateIndustry(newIndustry: any): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/Industry/Update`, newIndustry);
  }
  deleteIndustry(industryId: number): Observable<any> {
    const deleteUrl = `${environment.apiLiveUrl}/services/app/Industry/Delete?Id=${industryId}`; // Construct the delete URL
    return this.http.delete(deleteUrl);
  }

}
