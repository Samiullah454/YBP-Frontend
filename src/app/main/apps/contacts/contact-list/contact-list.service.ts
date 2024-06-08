import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactListService implements Resolve<any> {
  
  public rows: any;
  public oncontactListChanged: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) 
  {
    this.oncontactListChanged = new BehaviorSubject({});
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
        this.oncontactListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getContactsList() {    
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Contact/GetAll`)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );
  }
  
  create(contactdto:CreateContactDto) 
  {  
    return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Contact/Create`,contactdto)
      .pipe(
        map(response => {         
          return response.result.items;  
        })
      );
    
   
  }

  delete(contactdto:CreateContactDto) 
  { 
    contactdto.isDeleted=true;
    return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Contact/Create`,contactdto)
      .pipe(
        map(response => {         
          return response.result.items;  
        })
      );
  }
  
  getGroupList() 
  {  
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Group/GetAllGroups`)
      .pipe(
        map(response => {       
          return response.result.items;  
        })
      );
  }
  
  createGroup(groupName:string,contactslist:CreateContactDto[]) {
    
    const group = new CreateGroupDto();
    group.name = groupName;
    // group.contactsList=contactslist;
    return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Group/CreateGroup`,group)
      .pipe(
        map(response => {
          
          return response.result.items;  
        })
      );
  }
  updateGroupContacts(id:number,groupName:string,contactslist:CreateContactDto[]) {
    
    const group = new CreateGroupDto();
    group.id = id;
    group.name = groupName;
    
    group.contactsList=contactslist;
    return this._httpClient
      .post<any>(`${environment.apiLiveUrl}/services/app/Group/Update`,group)
      .pipe(
        map(response => {
          
          return response.result.items;  
        })
      );
  }
  deleteGroup(Id:number) {
    
    return this._httpClient
      .delete<any>(`${environment.apiLiveUrl}/services/app/Group/Delete?Id=`+Id)
      .pipe(
        map(response => {
          
          return response;  
        })
      );
  }
  



}
export interface IContactDto {
  id:number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  source: number;
  fullName:string;


  email: string;
  title: string;
  middleName: string;
  suffix: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingAddressCity: string;
  billingAddressState: string;
  billingAddressPostalCode: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string;
  shippingAddressCity: string;
  shippingAddressState: string;
  shippingAddressPostalCode: string;
  company: string;
  website: string;
  companyEmail: string;
  createdAt: string;




  role:string;
  about:string;
  avatar:string;
  status:string;
  isDeleted:boolean
  
  
}
export interface IGroupDto {
  name: string;
  description: string;
  contactsList:CreateContactDto[];

}
export class CreateContactDto implements IContactDto {
  id:number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  source: number;
  fullName:string;



  email: string;
  title: string;
  middleName: string;
  suffix: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingAddressCity: string;
  billingAddressState: string;
  billingAddressPostalCode: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string;
  shippingAddressCity: string;
  shippingAddressState: string;
  shippingAddressPostalCode: string;
  company: string;
  website: string;
  companyEmail: string;
  createdAt: string;


  role:string;
  about:string;
  avatar:string;
  status:string;
  isDeleted:boolean
 
  constructor(data?: IContactDto) {
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
        this.firstName = _data["firstName"];
        this.lastName = _data["lastName"];
        this.mobileNumber = _data["mobileNumber"];
        this.source = _data["source"];
        this.fullName = _data["fullName"];


        this.email = _data["email"];
        this.title = _data["title"];
        this.middleName = _data["middleName"];
        this.suffix = _data["suffix"];
        this.billingAddressLine1 = _data["billingAddressLine1"];
        this.billingAddressLine2 = _data["billingAddressLine2"];
        this.billingAddressCity = _data["billingAddressCity"];
        this.billingAddressState = _data["billingAddressState"];
        this.billingAddressPostalCode = _data["billingAddressPostalCode"];
        this.shippingAddressLine1 = _data["shippingAddressLine1"];
        this.shippingAddressLine2 = _data["shippingAddressLine2"];
        this.shippingAddressCity = _data["shippingAddressCity"];
        this.shippingAddressState = _data["shippingAddressState"];
        this.shippingAddressPostalCode = _data["shippingAddressPostalCode"];
        this.company = _data["company"];
        this.website = _data["website"];
        this.companyEmail = _data["companyEmail"];
        this.createdAt = _data["createdAt"];



        this.role = _data["role"];
        this.about = _data["about"];
        this.avatar = _data["avatar"];
        this.status = _data["status"];
        this.isDeleted = _data["isDeleted"];
      }
  }

  static fromJS(data: any): CreateContactDto {
      data = typeof data === 'object' ? data : {};
      let result = new CreateContactDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
    
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["firstName"] = this.firstName;
      data["lastName"] = this.lastName;
      data["mobileNumber"] = this.mobileNumber;
      data["source"] = this.source;
      data['fullName'] =  this.fullName ;

      data["email"] = this.email;
      data["title"] = this.title;
      data["middleName"] = this.middleName;
      data["suffix"] = this.suffix;
      data['billingAddressLine1'] =  this.billingAddressLine1 ;
      data["billingAddressLine2"] = this.billingAddressLine2;
      data["billingAddressCity"] = this.billingAddressCity;
      data["billingAddressState"] = this.billingAddressState;
      data["billingAddressPostalCode"] = this.billingAddressPostalCode;
      data['shippingAddressLine1'] =  this.shippingAddressLine1 ;
      data["shippingAddressLine2"] = this.shippingAddressLine2;
      data["shippingAddressCity"] = this.shippingAddressCity;
      data["shippingAddressState"] = this.shippingAddressState;
      data["shippingAddressPostalCode"] = this.shippingAddressPostalCode;
      data['company'] =  this.company ;
      data["website"] = this.website;
      data['companyEmail'] =  this.companyEmail;
      data['createdAt'] = this.createdAt;

      data['role']=   this.role ;
      data["about"] = this.about;
      data['avatar'] =  this.avatar ;
      data['status']=   this.status ;
      data['isDeleted'] = this.isDeleted;
      return data; 
  }

  clone(): CreateContactDto {
      const json = this.toJSON();
      let result = new CreateContactDto();
      result.init(json);
      return result;
  }
}
export class CreateGroupDto implements IGroupDto {
  
  id:number;
  name: string;
  description: string;
  contactsList:CreateContactDto[];
  constructor(data?: IGroupDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.name = _data["name"];
          this.description = _data["description"];
          if (Array.isArray(_data["contactsList"])) {
            this.contactsList = [] as any;
            for (let item of _data["contactsList"])
                this.contactsList.push(item);
        }
      }
  }

  static fromJS(data: any): CreateGroupDto {
      data = typeof data === 'object' ? data : {};
      let result = new CreateGroupDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
    
    
      data = typeof data === 'object' ? data : {};
      data["name"] = this.name;
     data["description"] = this.description;
     if (Array.isArray(this.contactsList)) {
      data["contactsList"] = [];
      for (let item of this.contactsList)
          data["contactsList"].push(item);
  }
      return data; 
  }

  clone(): CreateGroupDto {
      const json = this.toJSON();
      let result = new CreateGroupDto();
      result.init(json);
      return result;
  }
}