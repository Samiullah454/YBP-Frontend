import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TenantsService implements Resolve<any> {
  public rows: any;
  public onpackageListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) 
  {
    this.onpackageListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([]).then(() => {
        resolve();
      }, reject);
    });
  }

  getTenantList() 
  {  
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Tenant/GetAll`)
      .pipe(
        map(response => {
          return response.result.items;  
        })
      );
  }

  create(tenantdto:TenantDto) 
  {
      if(tenantdto.id)
      {
        return this._httpClient
        .put<any>(`${environment.apiLiveUrl}/services/app/Tenant/Update`,tenantdto)
        .pipe(
          map(response => {          
            return response.result.items;  
          })
        );   
      }
      else 
      {
        return this._httpClient
        .post<any>(`${environment.apiLiveUrl}/services/app/Tenant/Create`,tenantdto)
        .pipe(
          map(response => {          
            return response.result.items;  
          })
        );   
      }
  }

  update(tenantdto:TenantDto){
    return this._httpClient
        .put<any>(`${environment.apiLiveUrl}/services/app/Tenant/Update`,tenantdto)
        .pipe(
          map(response => {     
            debugger     
            return response.result;  
          })
        ); 
  }

  getTenant(id:number) 
  {  
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Tenant/Get?id=`+id)
      .pipe(
        map(response => {          
          return response.result;  
        })
      );   
  }

  delete(id:number) 
  {  
    return this._httpClient
      .delete<any>(`${environment.apiLiveUrl}/services/app/Tenant/Delete?id=`+id)
      .pipe(
        map(response => {          
          return response;  
        })
      );   
  }  
  getPackagesListfromhost(){
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Package/GetPackagesfromHost`)
      .pipe(
        map(response => {          
          return response.result;  
        })
      );   
  }
}


export class TenantDto implements ITenantDto {
  id:number;
  tenancyName:string; 
  name:string;
  isActive:boolean;
  company:string;
  username:string;
  passowrd:string;
  purpose:string;
  teamsize:string;
  payment_methode:string;
  name_on_card:string;
  cardnumber:string;
  expiry:string;
  cvv:string;
  savecard:string;
  package:string;
  mobileNumber:string;
  
  constructor(data?: ITenantDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
        this.id = _data["id"];
        this.tenancyName = _data["tenancyName"];
        this.name = _data["name"];
        this.isActive = _data["isActive"];
        this.company = _data["company"];
        this.username = _data["username"];
        this.passowrd = _data["passowrd"];
        this.purpose = _data["purpose"];
        this.teamsize = _data["teamsize"];
        this.payment_methode = _data["payment_methode"];
        this.name_on_card = _data["name_on_card"];
        this.cardnumber = _data["cardnumber"];
        this.expiry = _data["expiry"];
        this.cvv = _data["cvv"];
        this.savecard = _data["savecard"];
        this.package = _data["package"];
        this.mobileNumber = _data["mobileNumber"];
      }
  }

  static fromJS(data: any): TenantDto {
      data = typeof data === 'object' ? data : {};
      let result = new TenantDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["tenancyName"] = this.tenancyName;
      data["name"] =  this.name;
      data["isActive"] = this.isActive;
      data["company"] = this.company;
      data["username"] = this.username;
      data["passowrd"] = this.passowrd;
      data["purpose"] = this.purpose;
      data["teamsize"] = this.teamsize;
      data["payment_methode"] = this.payment_methode;
      data["name_on_card"] = this.name_on_card;
      data["cardnumber"] = this.cardnumber;
      data["expiry"] = this.expiry;
      data["cvv"] = this.cvv;
      data["savecard"] = this.savecard;
      data["package"] = this.package;
      data["mobileNumber"] = this.mobileNumber;
     return data; 
  }

  clone(): TenantDto {
      const json = this.toJSON();
      let result = new TenantDto();
      result.init(json);
      return result;
  }
}

export interface ITenantDto {
   
  id:number;
  tenancyName:string; 
  name:string;
  isActive:boolean;
  company:string;
  username:string;
  passowrd:string;
  purpose:string;
  teamsize:string;
  payment_methode:string;
  name_on_card:string;
  cardnumber:string;
  expiry:string;
  cvv:string;
  savecard:string;
  package:string;
  mobileNumber:string;
}
