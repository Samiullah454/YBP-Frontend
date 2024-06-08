import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { SignUpOnbaording } from '../models/SignUpOnbaording';
import { SignalRService } from './signal-r.service';
import { RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import * as CryptoJS from 'crypto-js';
import { ChargeCustomerProfileDto, CustomerProfileDto } from 'app/main/pages/authentication/onborading-s1/boilerservice';

@Injectable({ providedIn: 'root' })
export class AuthenticationService 
{
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  
  constructor(
    private _http: HttpClient, 
    private _toastrService: ToastrService,
    public _roleProxyService: RoleServiceProxy) 
    {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }

  public get currentUserValue(): User 
  {
    return this.currentUserSubject.value;
  }

  get isAdmin() 
  {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  get isClient() 
  {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  login(Email: string, Password: string,isremeber:boolean=true) 
  {  
    const currentHost = window.location.host;
    const parts=currentHost.split('.');
    const tenant=parts.length>1?parts[0].trim():"Jhang";
    let finaltenant=tenant=="www" || tenant=="ezjobmanager"?"":tenant;
    console.log(finaltenant);
    if (finaltenant.toLowerCase() === "superadmin" || finaltenant === "" || finaltenant === null) 
    {
      finaltenant = null;
    }
    return this._http
        .post<any>(`${environment.apiLiveUrl}/TokenAuth/Authenticate`, {UserNameOrEmailAddress: Email, Password,isremeber,Tenant:finaltenant})
      .pipe(
        map(response => {
          if (response.result && response.result.accessToken) 
          {
            localStorage.setItem('currentUser', JSON.stringify(response.result));
            if(response.result.TenantId!=0)
            {
              abp.multiTenancy.setTenantIdCookie(response.result.tenantId);  
            }
            else 
            {
              abp.multiTenancy.setTenantIdCookie(undefined);
            }
            this.currentUserSubject.next(response.result);
          }
          return response.result;
        })
      );
  }


  createCustomerProfile(customerProfileDto: CustomerProfileDto){
    return this._http
    .post<any>(`${environment.apiLiveUrl}/services/app/Account/CreateCustomerProfile`, customerProfileDto)
  .pipe(
    map(response => {      
      return response.result;
    }));
  }
  createLead(leaddata: any){
    return this._http
    .post<any>(`${environment.apiLiveUrl}/services/app/Lead/Create`, leaddata)
  .pipe(
    map(response => {      
      return response.result;
    }));
  }
  chargeCustomerProfile(chargeCustomerProfileDto: ChargeCustomerProfileDto){
    return this._http
    .post<any>(`${environment.apiLiveUrl}/services/app/Account/ChargeCustomerProfile`, chargeCustomerProfileDto)
  .pipe(
    map(response => {      
      return response.result;
    }));
  }


  validateCardForPayment(cardNumber, expDate, amount, cvv){
    return this._http
    .post<any>(`${environment.apiLiveUrl}/services/app/Account/ValidateCard`, {cardnumber: cardNumber, expiry:expDate, amount:amount, cvv:cvv})
  .pipe(
    map(response => {      
      return response.result;
    }));
  }

  forgetPassword(email: string) 
  {
    return this._http
      .post<any>(`${environment.apiLiveUrl}/forget-password`, { email })
      .pipe(
        map(response => {        
          return response;  
        })
      );
  }

  ResetPassword(password: string,confirm_password:string,token:string) 
  {
    return this._http
      .post<any>(`${environment.apiLiveUrl}/reset-password`, { password,confirm_password,token })
      .pipe(
        map(response => {        
          return response;  
        })
      );
  }

  SignUpOnboarding(signupOnboarding:SignUpOnbaording) 
  {
    return this._http
      .post<any>(`${environment.apiLiveUrl}/tenant/signup`,signupOnboarding )
      .pipe(
        map(response => {        
          return response;  
        })
      );
  }

  validateEmail(email: string) 
  {
    return this._http
      .get<any>(`${environment.apiLiveUrl}/tenant/signup/validate?email=${email}`)
      .pipe(
        map(response => {        
          return response;  
        })
      );
  }

  validateDomain(domain: string) 
  {
    return this._http
    .post<any>(`${environment.apiLiveUrl}/services/app/Account/IsTenantAvailable`, {tenancyName: domain})
      .pipe(
        map(response => {
          return response;  
        })
      );
  }

  validateCompany(company: string) 
  {
    return this._http
      .get<any>(`${environment.apiLiveUrl}/tenant/signup/validate?company_name=${company}`)
      .pipe(
        map(response => {        
          return response;  
        })
      );
  }
  
  validateSubDomainUrl() 
  {
    const currentHost = window.location.host;
    const parts=currentHost.split('.');
    const tenant=parts.length>1?parts[0].trim():"landlord";
    return this._http
      .get<any>(`${environment.apiLiveUrl}/tenant/signup/validate?sudomain=${tenant}`)
      .pipe(
        map(response => {        
          return response;  
        })
      );
  }
 
  encryptString(text: string, secretKey: string): string 
  {
    const cipherText = CryptoJS.AES.encrypt(text, secretKey).toString();
    return cipherText;
  }

  getStates() {
    return this._http
      .get<any>(`${environment.apiLiveUrl}/services/app/State/GetAllStates`)
      .pipe(
        map(response => {          
          return response;  
        })
      );
  }

  getCitiesByState(id){
    return this._http
    .get<any>(`${environment.apiLiveUrl}/services/app/City/GetAllCitiesofState?stateId=${id}`)
    .pipe(
      map(response => {          
        return response;  
      })
    );
  }

  decryptString(encryptedText: string, secretKey: string): string 
  {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }

  logout() 
  {
    localStorage.removeItem('currentUser');
    abp.multiTenancy.setTenantIdCookie(undefined);
    this.currentUserSubject.next(null); 
  }
  checktenant(Tenantobject:any){
    return this._http
      .post<any>(`${environment.apiLiveUrl}/services/app/Account/IsTenantAvailable`,Tenantobject )
      .pipe(
        map(response => {        
          return response;  
        })
      );
  }
}
