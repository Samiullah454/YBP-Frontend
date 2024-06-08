import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getAllCustomer(): Observable<any> {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/Customer/GetAll`);
   }
   getCustomerById(itemId: number) {
    return this.http.get<any>(`${environment.apiLiveUrl}/services/app/Customer/Get/?Id=${itemId}`); // Replace with your API endpoint
  }
  addCustomer(newtechnician:any ): Observable<any> {
    return this.http.post<any>(`${environment.apiLiveUrl}/services/app/Customer/Create`,newtechnician);
   }
   updateCustomer(newtechnician:any ): Observable<any> {
    return this.http.put<any>(`${environment.apiLiveUrl}/services/app/Customer/Update`,newtechnician);
   }
   DeleteCustomer(itemId: number) {
    return this.http.delete<any>(`${environment.apiLiveUrl}/services/app/Customer/Delete/?Id=${itemId}`); // Replace with your API endpoint
  }
}
