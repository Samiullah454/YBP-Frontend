import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserListService } from '../../user/user-list/user-list.service';
import { UserDto, ChangePasswordDto } from '@shared/service-proxies/service-proxies';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { RoleDto } from 'app/main/pages/authentication/onborading-s1/boilerservice';
import { first, map } from 'rxjs/operators';
import { NotificationsService } from 'app/layout/components/navbar/navbar-notification/notifications.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { RoleService } from '../../role/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService, UserService } from 'app/auth/service';
import { TenantDto, TenantsService } from 'app/main/apps/tenants/tenants.service';
import { UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ListComponent implements OnInit {

  
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;
  public isTenant = true;
  public row;
  public packages;
  public notifcationrows;
  public UserLabel:string;
  public ColumnMode = ColumnMode;
  public invitedUserName;
  public invitedUserEmail; 
  public packageUsers;
  public tenantUsers;
  loading: boolean = false;
  selectedRow: any = null;
  isPlanSelected = false;
  selectedPermissionnames:string[] = [];
  roles: RoleDto[] = [];
  password : ChangePasswordDto = new ChangePasswordDto();
  user: UserDto = new UserDto();
  tenant: TenantDto = new TenantDto();
  groupedPermissions: { [key: string]: string[] } = {};


 
  spaceError: boolean;
  spaceErrorMessage: string;

  public cardNameValue = "";
  public cardNumberValue = "";
  public cardCvvValue = "";
  // public cardExpValue = "";
  cardExpValue: string = '';
  NameonCardErrorMessage:string;
  CardNumberErrorMessage:string;
  cardexpiryMessage:string;
  cardcvvMessage:string;
  PaymentError:boolean;

  constructor(
    public _userListService: UserListService,
    public _roleService: RoleService,
    private _toastrService: ToastrService,
    private _httpClient: HttpClient,
    public _userService: UserService,
    private _tenantService: TenantsService,
    private modalService: NgbModal,
    private _authenticationService: AuthenticationService,
    private _notificationsService: NotificationsService,
  ) { }
  
 
  
  
  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.currentUser);
    this._roleService.getAllPermissions().subscribe((result) => 
    {
      result.result.items.forEach(permission => 
        {
          const parts = permission.name.split('.');
          if (parts.length > 1) 
          {
            const moduleName = parts[1]; 
            if (!this.groupedPermissions[moduleName]) 
            {
              this.groupedPermissions[moduleName] = [];
            }
            this.groupedPermissions[moduleName].push(permission.name);
          }
        });      
    });

    this.getUser(currentUser.userId);
    this.selectedPermissionnames = currentUser.permissions;
    const currentHost = window.location.host;
    const parts=currentHost.split('.');
    const tenant=parts.length>1?parts[0].trim():"hamzatech";
    let finaltenant=tenant=="www" || tenant=="chatroster"?"":tenant;

    if (finaltenant.toLowerCase() === "superadmin" || finaltenant === null || finaltenant === "") 
    {
      this.isTenant = false;
    }
    else
    {
      this.getTenant(currentUser.tenantId);
    }

    this._notificationsService.onApiDataChange.subscribe(res => {
      this.notifcationrows = res;
    });  
  }

  groupedPermissionKeys() {
    return Object.keys(this.groupedPermissions);
  }
  
  getUser(id) {
    this._userListService.get(id).pipe()
    .subscribe(
        data => {           
          this.user = data; 
          },
      error => {        
        this._toastrService.error(error.message, 'Login Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });        
      });
  }

  updateUser(form) {
    if (form.valid) 
    {    
      this._userListService.update(this.user).subscribe(
        data => {
          this._toastrService.success("Profile Updated Successfully", 'Success', {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });      
        },
        error => {
          this._toastrService.error(error.message, 'Template Error', {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );      
    }  
  } 

  togglePasswordTextTypeOld() {
    this.passwordTextTypeOld = !this.passwordTextTypeOld;
  }

  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  togglePasswordTextTypeRetype() {
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
  }

  updatePassword(form) {
    if (form.valid) 
    {   
      this._userListService.changePassword(this.password).subscribe(
        data => {
          this._toastrService.success("Password Updated Successfully", 'Success', {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });      
        },
        error => {
          this._toastrService.error(error.message, 'Template Error', {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );      
    }  
  }

  getTenant(tenantId){
    this.getTenantId(tenantId).pipe()
    .subscribe(
        data => {
            this.tenant = data;
            this.getPackage();
          },
      error => {        
        this._toastrService.error(error.message, 'Packages Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }
    );    
  }

  getTenantId(id : number){
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Tenant/Get?Id=`+id)
      .pipe(
        map(response => {          
          return response.result;  
        })
      );  
  }

  getPackage(){
    this.getPackagesList().pipe()
    .subscribe(
        data => {
          data.forEach(item => {
            if (item.templates === -1) {
              item.templates = "Unlimited";
            }
            if (item.contacts === -1) {
              item.contacts = "Unlimited";
            }
          });
          this.packages  = data.sort((a, b) => a.packagePrice - b.packagePrice);
          const pkg = data.filter(item => String(item.id) === this.tenant.package);
          this.row = pkg[0];          
          },
      error => {        
        this._toastrService.error(error.message, 'Packages Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }
    );    
  }

  getPackagesList(){
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Package/GetPackagesfromHost`)
      .pipe(
        map(response => {          
          return response.result;  
        })
      );   
  }

  modalAddUser(modalPrimary) 
  {
    this.CheckUserLimit();
    this.UserLabel="Invite Team Member";
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
  }

  GetPackagesListFromHost()
  {
    this._tenantService.getPackagesListfromhost().pipe().subscribe(
        data => {
            const filteredData = data.filter(item => String(item.id) === this.tenant.package);
            this.packageUsers = filteredData[0].teamMembers;
          },
      error => {
        
        this._toastrService.error(error.message, 'Get Package List Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        
      }
    );
  }

  GetData()
  {
    this._userListService.getAllusers().pipe()
    .subscribe(
        data => {            
            this.tenantUsers = data.length;
          },
      error => {        
        this._toastrService.error(error.message, 'Login Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });        
      });
  }

  CheckUserLimit(){
    const currentUser = JSON.parse(localStorage.currentUser);
    if (currentUser.tenantId === "0" || currentUser.tenantId === null || currentUser.tenantId === "") 
    {
     
    }
    else
    {
      this.getTenant(currentUser.tenantId);
      this.GetPackagesListFromHost();
      this.GetData();
    }
    this._userService.getRoles().subscribe((result) => {
      this.roles = result.result.items;
    });
  }

  isChecked(permission: string): boolean {
    
    if(this.selectedPermissionnames)
    {
      return this.selectedPermissionnames.includes(permission);
    }
    else 
    {
      return false;
    }
    
  }

  // upgradePackageModal(modalPrimary){
  //   this.modalService.open(modalPrimary, {
  //     centered: true,
  //     size: 'xl',
  //     windowClass: 'modal modal-primary',
      
  //   });
  // }

  // selectCard(row: any): void 
  // {  
  //   if (this.selectedRow) 
  //   {
  //     this.selectedRow.isSelected = false;
  //   }
  //   this.selectedRow = row;
  //   row.isSelected = true;
  //   this.isPlanSelected = true;
  // }


  // priceModal(modalPrimary){
  //   this.modalService.open(modalPrimary, {
  //     centered: true,
  //     size: 'xl',
  //     windowClass: 'modal modal-primary',
  //   });
  // }

  // get f() 
  // {
  //   return this.packageForm.controls;
  // }

  // ValidatePaymentMethod()
  // {      
  //   this.loading=true;
  //   if(this.f.nameoncard.value=="")
  //   {
  //     this.NameonCardErrorMessage="Name is required";
  //     this.loading=false;
  //     this.PaymentError=true;
  //   }
  //   else
  //   {
  //     this.NameonCardErrorMessage="";
  //     this.loading=false;
  //     this.PaymentError=false;
  //   }
  //   if(this.f.cardnumber.value=="")
  //   {
  //     this.CardNumberErrorMessage="Card No. is required";
  //     this.loading=false;
  //     this.PaymentError=true;
  //   }
  //   else
  //   {
  //     this.CardNumberErrorMessage="";
  //     this.loading=false;
  //     this.PaymentError=false;
  //   }
  //   if(this.f.cardexpiry.value=="")
  //   {
  //     this.cardexpiryMessage="Expiry is required";
  //     this.loading=false;
  //     this.PaymentError=true;
  //   }
  //   else
  //   {
  //     this.cardexpiryMessage="";
  //     this.loading=false;
  //     this.PaymentError=false;
  //   }
  //   if(this.f.cardcvv.value=="")
  //   {
  //     this.cardcvvMessage="Card CVV is required";
  //     this.loading=false;
  //     this.PaymentError=true;
  //   }
  //   else
  //   {
  //     this.cardcvvMessage="";
  //     this.loading=false;
  //     this.PaymentError=false;
  //   }
  //   if(this.PaymentError==false)
  //   {

  //     this._authenticationService.validateCardForPayment(this.f.cardnumber.value, this.f.cardexpiry.value, this.selectedRow.packagePrice)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         if(data.transactionResponse.responseCode == 1)
  //         {
  //           this._toastrService.success("Card Validated Succesfully!", "Transaction Id "+data.transactionResponse.transId, {
  //             positionClass: 'toast-top-left',
  //             toastClass: 'toast ngx-toastr',
  //             closeButton: true
  //           });
  //           this.proceedWithPayment();
  //           this.modalService.dismissAll();          
  //         }              
  //         else 
  //         {
  //           this._toastrService.error("Card Validation Error!", "Invalid Card Details", {
  //             positionClass: 'toast-top-left',
  //             toastClass: 'toast ngx-toastr',
  //             closeButton: true
  //           });             
  //         }
  //       },
  //       error => {
  //         this.spaceError = true;
  //         this.spaceErrorMessage="Error";
  //         this.loading=false;
  //       });
  //   }
  // }

  // proceedWithPayment(){
  //   this.tenant.package = this.selectedRow.id;
  //   this._tenantService.update(this.tenant).subscribe(
  //     data => {
  //       this._toastrService.success("Package Updated Succesfully!", "Package Updating...", {
  //         positionClass: 'toast-top-left',
  //         toastClass: 'toast ngx-toastr',
  //         closeButton: true
  //       });
  //       this.modalService.dismissAll();    
  //     },
  //     error => {
  //       this._toastrService.error(error.message, 'Package Error', {
  //         positionClass: 'toast-top-left',
  //         toastClass: 'toast ngx-toastr',
  //         closeButton: true
  //       });
  //     }
  //   );   
  // }



  selectCard(row: any): void 
  {  
    if (this.selectedRow) 
    {
      this.selectedRow.isSelected = false;
    }
    this.selectedRow = row;
    row.isSelected = true;
    if(this.selectedRow.id == this.tenant.package)
    {
      this.isPlanSelected = false;
    }
    else{
      this.isPlanSelected = true;
    }

  }

  openModal(modalPrimary) 
  {
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'xl',
      windowClass: 'modal modal-primary',
    });
  } 
  
  // priceModal(modalPrimary){
  //   this.modalService.open(modalPrimary, {
  //     backdrop: 'static',
  //     centered: true,
  //     size: 'xl',
  //     windowClass: 'modal modal-primary',
  //   });
  // }

  proceedWithPayment(){
    this.tenant.package = this.selectedRow.id;
    this._tenantService.update(this.tenant).subscribe(
      data => {
        this._toastrService.success("Package Updated Succesfully!", "Package Updating...", {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        this.modalService.dismissAll();    
      },
      error => {
        this._toastrService.error(error.message, 'Package Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }
    );   
  }


  submitForm(priceForm){
    if (priceForm.valid) {   
      this.proceedWithPayment();
      this.modalService.dismissAll();
    }
  }


  ValidatePaymentMethod()
  {      
    debugger
    this.loading=true;
    if(this.cardNameValue=="")
    {
      this.NameonCardErrorMessage="Name is required";
      this.loading=false;
      this.PaymentError=true;
    }
    else
    {
      this.NameonCardErrorMessage="";
      this.loading=false;
      this.PaymentError=false;
    }
    if(this.cardNumberValue=="")
    {
      this.CardNumberErrorMessage="Card No. is required";
      this.loading=false;
      this.PaymentError=true;
    }
    else
    {
      this.CardNumberErrorMessage="";
      this.loading=false;
      this.PaymentError=false;
    }
    if(this.cardExpValue=="")
    {
      this.cardexpiryMessage="Expiry is required";
      this.loading=false;
      this.PaymentError=true;
    }
    else
    {
      this.cardexpiryMessage="";
      this.loading=false;
      this.PaymentError=false;
    }
    if(this.cardCvvValue=="")
    {
      this.cardcvvMessage="Card CVV is required";
      this.loading=false;
      this.PaymentError=true;
    }
    else
    {
      this.cardcvvMessage="";
      this.loading=false;
      this.PaymentError=false;
    }
    if(this.PaymentError==false)
    {
      debugger

      this._authenticationService.validateCardForPayment(this.cardNumberValue, this.cardExpValue, this.selectedRow.packagePrice, this.cardCvvValue)
      .pipe(first())
      .subscribe(
        data => {
          if(data.transactionResponse.responseCode == 1)
          {
            this._toastrService.success("Card Validated Succesfully!", "Transaction Id "+data.transactionResponse.transId, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            this.proceedWithPayment();
            this.modalService.dismissAll();          
          }              
          else 
          {
            this._toastrService.error("Card Validation Error!", "Invalid Card Details", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });             
          }
        },
        error => {
          this.spaceError = true;
          this.spaceErrorMessage="Error";
          this.loading=false;
        });
    }
  }


  validateCardExpiry(cardExpiry: string) {
    debugger
    cardExpiry = cardExpiry.replace(/\D/g, ''); 
    
    if (cardExpiry.length > 2) {
      cardExpiry = cardExpiry.slice(0, 2) + '/' + cardExpiry.slice(2);
    }
  
    if (cardExpiry.length === 5) 
    {
      const parts = cardExpiry.split('/');
      const month = parseInt(parts[0], 10);
      const year = parseInt(parts[1], 10);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
  
      if (
        parts[0].length === 2 &&
        parts[1].length === 2 &&
        !isNaN(month) &&
        !isNaN(year) &&
        month >= 1 &&
        month <= 12 &&
        year >= currentYear &&
        year <= currentYear + 5
      ) {
        if (year === currentYear && month <= currentMonth || year < currentYear) {
          this.cardexpiryMessage = 'Expiration date must be in the future.';
          
        } else {
          this.cardexpiryMessage = '';  
        }
      } else {
        this.cardexpiryMessage = 'Invalid MM/YY format or date.';
        
      }
    } else {
      this.cardexpiryMessage = '';
    }  
    if (cardExpiry.length > 5) {
        cardExpiry = cardExpiry.slice(0, 5);
      }
    this.cardExpValue = cardExpiry;
 
  }

  validateCVV(cvv: string) {
    debugger
    cvv = cvv.replace(/\D/g, '');
  
    if (cvv.length > 4) {
      cvv = cvv.slice(0, 4);
    }
    if (cvv.length === 3 || cvv.length === 4) {
      this.cardcvvMessage = ''; 
    } else {
      this.cardcvvMessage = 'CVV must be exactly 3 or 4 digits.';
    }   
   this.cardCvvValue = cvv;
  }

  checkMaxLength(cardnumber: string) 
  {
    //cardnumber = cardnumber.replace(/\D/g, '');
    debugger   
    if (cardnumber.length < 27) 
    {
      debugger
      cardnumber = cardnumber.replace(/\D/g, '');
      const formattedNumber = cardnumber.replace(/(\d{4})(?=\d)/g, '$1 ');
      this.cardNumberValue = formattedNumber;
    }
    else 
    {
      debugger
      const formattedNumber =  cardnumber.slice(0, 27);
      this.cardNumberValue = formattedNumber;
    }
  }
}


