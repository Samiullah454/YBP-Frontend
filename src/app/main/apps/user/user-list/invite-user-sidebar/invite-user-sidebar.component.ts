import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { AuthenticationService, UserService } from 'app/auth/service';
import { RoleDto } from 'app/main/pages/authentication/onborading-s1/boilerservice';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserDto } from '@shared/service-proxies/service-proxies';
import { UserListService } from '../user-list.service';
import { TenantDto, TenantsService } from 'app/main/apps/tenants/tenants.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-invite-user-sidebar',
  templateUrl: './invite-user-sidebar.component.html'
})
export class InviteUserSidebarComponent implements OnInit {

  @Input() inputObj:any;
  @Output() dataEvent = new EventEmitter<string>();

  user = new CreateUserDto();
  tenant: TenantDto = new TenantDto();
  roles: RoleDto[] = [];
  selectedRow: any = null;
  isPlanSelected = false;
  loading: boolean = false;
  public selectMultiSelected;
  public packageUsers;
  public tenantUsers;
  public isAdmin = false;
  public rows;
  public currentPackage;

  spaceError: boolean;
  spaceErrorMessage: string;

  public cardNameValue = "";
  public cardNumberValue = "";
  public cardCvvValue = "";
  public cardExpValue = "";
  NameonCardErrorMessage:string;
  CardNumberErrorMessage:string;
  cardexpiryMessage:string;
  cardcvvMessage:string;
  PaymentError:boolean;
  
  constructor(
    private _coreSidebarService: CoreSidebarService, 
    public _userService: UserService,
    public _userProxyService: UserListService,
    private _toastrService: ToastrService,
    private _tenantService: TenantsService,
    private _authenticationService: AuthenticationService,
    private modalService: NgbModal) {}


  sendData() {
    const dataToSend = 'Data from child component';
    this.dataEvent.emit(dataToSend);
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  submit(form) {
    if (form.valid) {   
      const roles:string[]=[];
      roles.push(this.selectMultiSelected.normalizedName);
      // this.user.roleNames=this.selectMultiSelected.normalizedName;
      this.user.roleNames=roles;
      this.user.isActive=false;
      this.user.name=this.user.userName;
      this.user.surname="invited";
      this.user.password="123qwe";
      var UserSignupUrl=window.location.host+"/#/pages/authentication/signupinvited/"+this._authenticationService.encryptString(this.user.emailAddress,"cht");
      this._userProxyService.create(this.user).subscribe(
        data => {
          var msg="";
          if(this.user.id>0)
          {
             msg="User Updated"
          }
          else 
          {
            msg="User Saved";
          }
          this._toastrService.success(msg+" Succesfully!", msg, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.sendData();          
        },
        error => {
          this._toastrService.error(error.message, 'User Error', {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );      
    }
  }

  close() {
    this.modalService.dismissAll();    
  }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.currentUser);
    if (currentUser.tenantId === "0" || currentUser.tenantId === null || currentUser.tenantId === "") 
    {
     this.isAdmin = true;
     this.loading = false;
    }
    else
    {
      this.getTenant(currentUser.tenantId);
    }
   
    this.user.isActive=true;
    this._userService.getRoles().subscribe((result) => {
      this.roles = result.result.items;
    });
    
    if(this.inputObj!=null)
    {
      this.user.id=this.inputObj.id;
      this.user.name=this.inputObj.name;
      this.user.userName=this.inputObj.userName;
      this.user.surname=this.inputObj.surname;
      this.user.emailAddress=this.inputObj.emailAddress;
      this.user.isActive=this.inputObj.isActive;
    }     
  }

  getTenant(tenantId){
    this._tenantService.getTenant(tenantId).pipe()
    .subscribe(
        data => {
            this.tenant = data;
            this.GetPackagesListFromHost();
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

  GetPackagesListFromHost()
  {
    this._tenantService.getPackagesListfromhost().pipe().subscribe(
        data => {

          const filteredPackageData = data.filter(item => item.isPublish === true);            
          filteredPackageData.forEach(item => {
            if (item.templates === -1) {
              item.templates = "Unlimited";
            }
            if (item.contacts === -1) {
              item.contacts = "Unlimited";
            }
          });
            this.rows = filteredPackageData.sort((a, b) => a.packagePrice - b.packagePrice);
            //this.rows = data;
            const filteredData = data.filter(item => String(item.id) === this.tenant.package);
            this.packageUsers = filteredData[0].teamMembers;
            this.currentPackage = filteredData[0];
            this.GetData();
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
    this._userProxyService.getAllusers().pipe()
    .subscribe(
        data => {            
            this.tenantUsers = data.length;
            if(this.tenantUsers < this.packageUsers)
            {
              this.isAdmin = true;
              this.loading = false;
            }
            this.loading = false;
          },
      error => {        
        this._toastrService.error(error.message, 'Login Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });        
      });
  }

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

  upgradePackageModal(modalPrimary) 
  {
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'xl',
      windowClass: 'modal modal-primary',
    });
  } 
  
  priceModal(modalPrimary){
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'xl',
      windowClass: 'modal modal-primary',
    });
  }

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
    debugger
    if (priceForm.valid) { 
      debugger  
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
      if (cardExpiry.length > 5) {
        cardExpiry = cardExpiry.slice(0, 5);
      }
      
    }  
    const cardExpiryInput = document.getElementById('exp-date') as HTMLInputElement;
    cardExpiryInput.value = cardExpiry;
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
