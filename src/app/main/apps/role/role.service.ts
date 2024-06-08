import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CreateRoleDto } from '@shared/service-proxies/service-proxies';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoleService implements Resolve<any> {

  public rows: any;
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getAllPermissions()]).then(() => {
        resolve();
      }, reject);
    });
  }

  // getDataTableRows(): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(`${environment.apiLiveUrl}/services/app/User/GetAll`).subscribe((response: any) => {
        
  //       this.rows = response.result.items;
  //       this.onUserListChanged.next(this.rows);
  //       resolve(this.rows);
  //     }, reject);
  //   });
  // }
  getRoles() 
  {
    
    return this._httpClient.get<any>(`${environment.apiLiveUrl}/services/app/Role/GetRoles`)
      .pipe(
        map(response => {
          return response.result.items;
        })
      );
  }

  getAllPermissions() {    
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Role/GetAllPermissions`)
      .pipe(
        map(response => {
          return response;  
        })
      );
  }
  
  delete(Id:number) {
    debugger
    return this._httpClient
      .delete<any>(`${environment.apiLiveUrl}/services/app/Role/Delete?Id=`+Id)
      .pipe(
        map(response => {
          
          return response;  
        })
      );
  }

  create(roledto:CreateRoleDto) 
  {  
    if(roledto.id>0)
    {
      return this._httpClient
      .put<any>(`${environment.apiLiveUrl}/services/app/Role/Update`,roledto)
      .pipe(
        map(response => {         
          return response.result.items;  
        })
      );
    }
    else 
    {      
      return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Role/Create`,roledto)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );   
    }
  }

}

