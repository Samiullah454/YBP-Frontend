import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BandwidthsettingsService implements Resolve<any> {

  public rows: any;
  public onpackageListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onpackageListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(environment.apiLiveUrl+ '/services/app/Package/GetAll').subscribe((response: any) => {
        
        this.rows = response.result.items;
        this.onpackageListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getBandwidthSettings() {    
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/BandWidth/GetAll`)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );
  }
  
  create(userdto:CreateSettingDto) {
      return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/BandWidth/Create`,userdto)
      .pipe(
        map(response => {
          
          return response.result.items;  
        })
      );    
  }

  delete(userdto:CreateSettingDto) {
    userdto.isDeleted=true;
    return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/BandWidth/Create`,userdto)
      .pipe(
        map(response => {
          
          return response.result.items;  
        })
      );    
  }

  View(Id:number) {
    
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/BandWidth/Get?Id=`+Id)
      .pipe(
        map(response => {
          
          return response;  
        })
      );
  }
  
}
export interface ICreateSettingDto {
  
  Id:number;
  BWUserName: string;
  BWPassword: string;
  BWApplicationId: string;
  BWAccoundId: string;
  AddedBy:string;
  Status:boolean;
  isDeleted: boolean;
  
  
}
export class CreateSettingDto implements ICreateSettingDto {

  Id:number;
  BWUserName: string;
  BWPassword: string;
  BWApplicationId: string;
  BWAccoundId: string;
  AddedBy:string;
  Status:boolean;
  isDeleted: boolean;

  constructor(data?: ICreateSettingDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.Id = _data["Id"];
          this.BWUserName = _data["BWUserName"];
          this.BWPassword = _data["BWPassword"];
          this.BWApplicationId = _data["BWApplicationId"];
          this.BWAccoundId = _data["BWAccoundId"];
          this.AddedBy = _data["AddedBy"];
          this.Status = _data["Status"];
          this.isDeleted = _data["isDeleted"]
      }
  }

  static fromJS(data: any): CreateSettingDto {
      data = typeof data === 'object' ? data : {};
      let result = new CreateSettingDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
    
    
      data = typeof data === 'object' ? data : {};
      data["Id"] = this.Id;
      data["BWUserName"] = this.BWUserName;
     data["BWPassword"] = this.BWPassword;
      data["BWApplicationId"] = this.BWApplicationId;
      data["BWAccoundId"] = this.BWAccoundId;
      data["AddedBy"] = this.AddedBy;
      data["Status"] = this.Status;
      data["isDeleted"] = this.isDeleted
      return data; 
  }

  clone(): CreateSettingDto {
      const json = this.toJSON();
      let result = new CreateSettingDto();
      result.init(json);
      return result;
  }
}