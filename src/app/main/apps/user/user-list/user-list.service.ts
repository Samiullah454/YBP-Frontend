import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CreateUserDto, UserDto, ChangePasswordDto } from '@shared/service-proxies/service-proxies';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserListService implements Resolve<any> {

  public rows: any;
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([]).then(() => {
        resolve();
      }, reject);
    });
  }

  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiLiveUrl}/services/app/User/GetAll`).subscribe((response: any) => {
        
        this.rows = response.result.items;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getAllusers() {    
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/User/GetAll`)
      .pipe(
        map(response => {
          return response.result.items;  
        })
      );
  }
  
  delete(id: number) {
      return this._httpClient
      .delete<any>(`${environment.apiLiveUrl}/services/app/User/Delete?Id=`+id)
      .pipe(
        map(response => {          
          return response;  
        })
      ); 
  }

  create(userdto:CreateUserDto) 
  {  
    if(userdto.id>0)
    {
      return this._httpClient
      .put<any>(`${environment.apiLiveUrl}/services/app/User/Update`,userdto)
      .pipe(
        map(response => {         
          return response.result.items;  
        })
      );
    }
    else 
    { 
      return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/User/Create`,userdto)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );   
    }
  }

  update(userdto:UserDto) 
  {  
      return this._httpClient
      .put<any>(`${environment.apiLiveUrl}/services/app/User/Update`,userdto)
      .pipe(
        map(response => {          
          return response.result;  
        })
      );   
  }


  changePassword(password:ChangePasswordDto) 
  {  
      debugger
      return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/User/ChangePassword`,password)
      .pipe(
        map(response => {          
          return response;  
        })
      );   
  }


  get(id: number){
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/User/Get?Id=`+id)
      .pipe(
        map(response => {          
          return response.result;  
        })
      );   
    }

}
