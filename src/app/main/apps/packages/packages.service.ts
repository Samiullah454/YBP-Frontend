import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PackagesService implements Resolve<any> {
  public rows: any;
  public onpackageListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onpackageListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getpackages()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getpackages() {    
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Package/GetAll`)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );
  }

  getPackageById(id:number) {    
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Package/Get?id=`+id)
      .pipe(
        map(response => {          
          return response;  
        })
      );
  }
  update(packagedto: CreatePackagetDto): Observable<any> {
    return this._httpClient.put<any>(`${environment.apiLiveUrl}/services/app/Package/Update`, packagedto);
  }
  create(packagedto:CreatePackagetDto) {
    
      return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Package/Create`,packagedto)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );   
  }
  delete(industryId: number): Observable<any> {
    const deleteUrl = `${environment.apiLiveUrl}/services/app/Package/Delete?Id=${industryId}`; // Construct the delete URL
    return this._httpClient.delete(deleteUrl);
  }
  // delete(packagedto:CreatePackagetDto) 
  // {  
  //   packagedto.isDeleted=true;
  //   return this._httpClient
  //     .post<any>(`${environment.apiLiveUrl}/services/app/Package/Delete`,packagedto)
  //     .pipe(
  //       map(response => {          
  //         return response.result.items;  
  //       })
  //     );   
  // }
  
}
export interface IPackageDto {
  id:number;
  isActive: boolean;
  packageName: string;
  industryId: string;
 
  fee: number;
  otsetupFee: number;
  includedSystemUsers: number;
  includedTechnicians: number;
  pricePerTech:number;
  isDeleted: boolean;
  
}
export class CreatePackagetDto implements IPackageDto {
  id:number;
  isActive: boolean;
  packageName: string;
  industryId: string;

  
  fee: number;
  otsetupFee: number;
  includedSystemUsers: number;
  includedTechnicians: number;
  pricePerTech:number;
  pricePerSysUser: number;
   isDeleted: boolean;

  constructor(data?: IPackageDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) 
      {
        this.id = _data["id"];
       this.isActive = _data["isActive"];
        this.packageName = _data["packageName"];
        this.fee = _data["fee"];
        this.otsetupFee = _data["otsetupFee"];
        this.includedSystemUsers = _data["includedSystemUsers"];
        this.includedTechnicians = _data["includedTechnicians"];
        this.pricePerTech = _data["pricePerTech"];
        this.pricePerSysUser = _data["pricePerSysUser"];
        this.industryId = _data["industryId"]
         this.isDeleted = _data["isDeleted"];
      }
  }

  static fromJS(data: any): CreatePackagetDto {
      data = typeof data === 'object' ? data : {};
      let result = new CreatePackagetDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
    
    
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["isActive"] = this.isActive;
      data["packageName"] = this.packageName;
      data["fee"] = this.fee;
      data["otsetupFee"] = this.otsetupFee;
      data["includedSystemUsers"] = this.includedSystemUsers;
      data["includedTechnicians"] = this.includedTechnicians;
      data["pricePerTech"] = this.pricePerTech;
      data["pricePerSysUser"] = this.pricePerSysUser;
      data["industryId"] =this.industryId
       data["isDeleted"] = this.isDeleted;
      return data; 
  }

  clone(): CreatePackagetDto {
      const json = this.toJSON();
      let result = new CreatePackagetDto();
      result.init(json);
      return result;
  }
}