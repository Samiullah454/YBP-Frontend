import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PermissionDto } from '@shared/service-proxies/service-proxies';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService implements Resolve<any> {
  public rows: any;
  public onpackageListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onpackageListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getPermissions()]).then(() => {
        resolve();
      }, reject);
    });
  }

  // getDataTableRows(): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(environment.apiLiveUrl+ '/services/app/Package/GetAll').subscribe((response: any) => {
        
  //       this.rows = response.result.items;
  //       this.onpackageListChanged.next(this.rows);
  //       resolve(this.rows);
  //     }, reject);
  //   });
  // }

  getPermissions() 
  {    
    
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Permission/GetAll`)
      .pipe(
        map(response => {
          
          return response.result.items;  
        })
      );
  }
  
  create(permissiondto:PermissionDto) {

    
    if(permissiondto.id>0)
    {
      return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Permission/Create`,permissiondto)
      .pipe(
        map(response => {         
          return response.result.items;  
        })
      );
    }
    else 
    {
      
      return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Permission/Create`,permissiondto)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );   
    }
  }

  delete(permissiondto:PermissionDto) 
  {  
    permissiondto.isDeleted=true;
    return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Permission/Create`,permissiondto)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );   
  }
  
}
