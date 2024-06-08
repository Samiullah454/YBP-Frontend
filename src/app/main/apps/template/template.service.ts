import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TemplateService implements Resolve<any> {
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

  getTemplateList() 
  {  
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Template/GetAll`)
      .pipe(
        map(response => {
          return response.result.items;  
        })
      );
  }

  create(templatedto:CreateTemplateDto) 
  {
      return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Template/Create`,templatedto)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );   
  }


  delete(templatedto:CreateTemplateDto) 
  {  
    templatedto.isDeleted=true;
    return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Template/Create`,templatedto)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );   
  }  
}


export class CreateTemplateDto implements ICreateTemplateDto {
  Id:number;
  name: string;
  description: string;
  isDeleted: boolean;
  
  constructor(data?: ICreateTemplateDto) {
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
        this.name = _data["name"];
        this.description = _data["description"];
        this.isDeleted = _data["isDeleted"];
      }
  }

  static fromJS(data: any): CreateTemplateDto {
      data = typeof data === 'object' ? data : {};
      let result = new CreateTemplateDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["description"] = this.description;
      data["name"] = this.name;
      data["Id"] = this.Id;
      data["isDeleted"] = this.isDeleted;
      
      return data; 
  }

  clone(): CreateTemplateDto {
      const json = this.toJSON();
      let result = new CreateTemplateDto();
      result.init(json);
      return result;
  }
}

export interface ICreateTemplateDto {
  Id:number;
  name: string;
  description: string;
  isDeleted: boolean;
  
}