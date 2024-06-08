import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import Stepper from 'bs-stepper';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { ChargeCustomerProfileDto, CityDto, CustomerProfileDto, StateDto, SubscriptionDto, SubscriptionServiceProxy, TransactionDto, TransactionServiceProxy } from '../onborading-s1/boilerservice';

import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService, UserService } from 'app/auth/service';
import { ToastrService } from 'ngx-toastr';
import { SignUpOnbaording } from 'app/auth/models/SignUpOnbaording';
import { CreateTenantDto, TenantServiceProxy } from './boilerservice';
import { TenantsService } from 'app/main/apps/tenants/tenants.service';
import { CreatePackagetDto } from 'app/main/apps/packages/packages.service';
import { FileUploader } from 'ng2-file-upload';
import { data } from 'autoprefixer';
import { Console, error } from 'console';
const URL = `${environment.apiLiveUrl}/services/app/Slider/UploadImage`;
@Component({
  selector: 'app-form-wizard',
  templateUrl: './onborading-s1.component.html',
  styleUrls: ['./onborading-s1.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class OnboradingS1Component implements OnInit {
  
  transaction: TransactionDto = new TransactionDto();
  subscription: SubscriptionDto = new SubscriptionDto();
  tenant: CreateTenantDto = new CreateTenantDto();
  userPackage: CreatePackagetDto = new CreatePackagetDto();
  customerProfileDto = new CustomerProfileDto();
  chargeCustomerProfileDto = new ChargeCustomerProfileDto();
  public coreConfig: any;
  public passwordTextType: boolean;
  public onboardingForm: UntypedFormGroup;
  public submitted = false;
  public loading = false;
  public Onboard:SignUpOnbaording;
  public vehicleSpinValue:number;
  public TenantUrl:string;
  public rows;
  public contentHeader: object;
  public billingAddressForm: FormGroup;
  url?: string;
  private _unsubscribeAll: Subject<any>;
  private horizontalWizardStepper: Stepper;
  private bsStepper;
  accountnumber='03280798147'
  selectedPaymentMethod:any;
  isDifferentBillingAddress: boolean = false;

  selectedRow: any = null;
  isPlanSelected = false;
  spaceError: boolean;
  spaceErrorMessage: string;
  VehcileErorr: boolean;
  VehcileErorrMessage: string;
  NameonCardErrorMessage:string;
  CardNumberErrorMessage:string;
  cardexpiryMessage:string;
  cardcvvMessage:string;
  paymentError:boolean;
  proRatedAmount:number;
  transactionId:string;
  authCode: string;

  
  b_firstNameErrorMessage:string;
  b_lastNameErrorMessage:string;
  b_addressErrorMessage:string;
  b_zipCodeErrorMessage:string;
  b_stateErrorMessage:string;
  b_cityErrorMessage:string;

  states: StateDto[] = [];
  cities: CityDto[] = [];
  paymentmethods: { name: string }[] = [
    { name: 'EasyPaisa' },
    {name:'JazzCash'},
    {name:'Bank Account'}
    // Add more cities as needed
  ];
  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  imageUrl: any;
  transectionid:any;
  constructor(
    private _coreConfigService: CoreConfigService, 
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute, 
    private _httpClient: HttpClient,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService,
    private _tenantService: TenantServiceProxy,
    private _tenantListService: TenantsService,
    private _transactionService: TransactionServiceProxy,
    private _subscriptionService: SubscriptionServiceProxy,
    private _userService:UserService,
    private _router: Router) 
    {
      this._unsubscribeAll = new Subject();
      this._coreConfigService.config = {
        layout: {
          navbar: {
            hidden: true
          },
          menu: {
            hidden: true
          },
          footer: {
            hidden: true
          },
          customizer: false,
          enableLocalStorage: false
        }
      };
    }
   billingsubmit(){
    debugger
    if(this.selectedPaymentMethod!==null&&this.selectedPaymentMethod!==undefined){
      this.horizontalWizardStepper.next();
    }
    else 
    {
      alert('Please select a Payment Methed before proceeding.');
    } 
   }
  horizontalWizardStepperNext() 
  {
    debugger
    if (this.selectedRow ) 
    {
      this.horizontalWizardStepper.next();
      this.calculateProRatedAmount();
    } 
    else 
    {
      alert('Please select a plan before proceeding.');
    }    
    
  }

  horizontalWizardStepperPrevious() 
  {
    this.horizontalWizardStepper.previous();
  }
  
  countChange(value)
  {
    if(value<5)
    {
      this.VehcileErorr=true;
      this.VehcileErorrMessage="Number of Vehicles is required and cannot be less than 5";
    }
    else 
    {
      this.VehcileErorr=false;
      this.Onboard.vehicle_cap=value;
    }    
  }
 
  SignUp() 
  {
    this._router.navigateByUrl("pages/authentication/register-s2");
  }

  get f() 
  {
    return this.onboardingForm.controls;
  }
onregister(){
  
this.checkTenant()
 
}
checkTenant(){
  // Retrieve the JSON string from local storage
  const userString = localStorage.getItem('registerFormData');

  if (userString) {
    // Parse the JSON string to an object
    const userDetails = JSON.parse(userString);

    // Extract the city name
    const cityName = userDetails.city ;

    // Construct the request body
    const requestBody = {
      tenancyName: cityName
    };

    // Call the service method and pass the request body
    this._authenticationService.checktenant(requestBody).subscribe(
      data => {
        console.log("Response", data);
        if(data.result.tenantId==null){
          this.createtenant();
        }else{
          this.createuser(data.result.tenantId)
        }
      },
      error => {
        console.log("Error", error);
      }
    );
  } else {
    console.log("Error: No user details found in local storage");
  }
}
createuser(tenantid:number){
  const userString = localStorage.getItem('registerFormData');

  if (userString) {
    // Parse the JSON string to an object
    const userDetails = JSON.parse(userString);

    // Map the user details to the API request body
    const requestBody = {
      name: userDetails.name,
      phoneNumber: userDetails.phoneNumber,
      whatsappNumber: userDetails.whatsappnumber,
      email: userDetails.email,
      gender: userDetails.gender,
      age: userDetails.age,
      dateOfBirth: userDetails.dateofbirth,
      profession: "", // Assuming profession is not provided in userDetails
      exactLocation: "", // Assuming exactLocation is not provided in userDetails
      address: userDetails.address,
      cnic: userDetails.cnic,
      referralCode: "", // Assuming referralCode is not provided in userDetails
      referredBy: "", // Assuming referredBy is not provided in userDetails
      status: "", // Assuming status is not provided in userDetails
      level: "", // Assuming level is not provided in userDetails
      balance: 0, // Assuming balance is 0
      roleNames: ["admin"], // Assuming roleNames is ["string"]
      tenantId: tenantid, // Assuming tenantId is 0
      password: userDetails.password
    };
    this._userService.createUser(requestBody).subscribe(
      data => {
        this._toastrService.success('Welcome ', 'Successful', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        //this.horizontalWizardStepper.next();
      },
      error => {
        this._toastrService.error(error, 'On Borading Process', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        this.loading = false;
      }
    );  
  } else {
    console.log("Error: No user details found in local storage");
  }

}
createtenant(){
  const userString = localStorage.getItem('registerFormData');

  if (userString) {
    // Parse the JSON string to an object
    const userDetails = JSON.parse(userString);

    // Extract the city name
    const cityName = userDetails.city?.cityName ;
  const requestBody = {
    
      tenancyName: cityName,
      name:cityName,
      adminEmailAddress: "fawadsami142@gmail.com",
      connectionString: "Server=DESKTOP-3KVE0B6;Database=YBP_"+cityName+";Trusted_Connection=True;TrustServerCertificate=True",
      isActive: true,    

      username: "string",
      passowrd: "password",
      mobileNumber: "03400798142"
    }
    this._tenantService.create(requestBody).subscribe(
      data => {
        this._toastrService.success('Welcome OnBoard', 'Successful', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        //this.horizontalWizardStepper.next();
      },
      error => {
        this._toastrService.error(error, 'On Borading Process', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        this.loading = false;
      }
    );  
  };

}

  onSubmit() 
  {   
    this.loading=true;
    this.BindTenant();
    localStorage.clear();
    
  }

  transactionData(){

    this.transaction.tenantId = 0;
    this.transaction.paymentProfileId = this.chargeCustomerProfileDto.paymentProfileId; 
    this.transaction.paymentTransactionId = this.transactionId;
    this.transaction.invoiceNumber = this.chargeCustomerProfileDto.invoiceNumber;
    this.transaction.paymentType = "SignUp";
    this.transaction.authCode = this.authCode;
    this.transaction.paidAmount = this.chargeCustomerProfileDto.amount;
    this.transaction.currentPackageId = this.selectedRow.id; 
    this.transaction.paymentDate = new Date();
    this._transactionService.create(this.transaction).subscribe(
      data => {    
        this.loading = false;
        this.horizontalWizardStepper.next();
      },
      error => {
        this._toastrService.error(error, 'On Borading Process', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        this.loading = false;
      }
    );
  }

  subscriptionAbc(){
    
    this._subscriptionService.create(this.subscription).subscribe(
      data => {    
        localStorage.clear();
        this.loading = false;
        this.horizontalWizardStepper.next();
      },
      error => {
        this._toastrService.error(error, 'On Borading subscription', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        this.loading = false;
      }
    );
  }

  subscriptionData(data: any){
    
    this.subscription.tenantId = data.id;
    this.subscription.packageId = parseInt(data.package, 10); 
    this.subscription.startDate = new Date();
    this.subscription.endDate = new Date();
    this.subscription.endDate.setMonth(this.subscription.endDate.getMonth() + 1);
    this.subscription.status = true;
    this.subscription.paymentStatus = true;
    this.subscription.lastPaymentDate = new Date();
    this.subscription.nextPaymentDate = new Date();
    this.subscription.nextPaymentDate.setMonth(this.subscription.nextPaymentDate.getMonth() + 1);
    this.subscription.paymentgatewayTransactionId = "123";
    this.subscription.autoRenew = true;
    this.subscription.creationTime = new Date();
    this.subscription.packageName = this.selectedRow.packageName;
    this.subscription.teamMembers = this.selectedRow.teamMembers;
    this.subscription.sMSCredits = this.selectedRow.smsCredits;
    this.subscription.sMSSender = this.selectedRow.smsSender;
    this.subscription.minTeamMembers = this.selectedRow.minTeamMembers; 
    if (this.selectedRow.contacts === 'Unlimited') {
      this.subscription.contacts = -1;
    } else {
      this.subscription.contacts = this.selectedRow.contacts;
    }
    //this.subscription.contacts = this.selectedRow.contacts;
    if (this.selectedRow.templates === 'Unlimited') {
      this.subscription.templates = -1;
    } else {
      this.subscription.templates = this.selectedRow.templates;
    }
    //this.subscription.templates = this.selectedRow.templates;
    this.subscription.broadcasts = this.selectedRow.broadcasts;
    this.subscription.packagePrice = this.selectedRow.packagePrice;
    this.subscription.addTeamMemberPrice = this.selectedRow.addTeamMemberPrice;
    this.subscription.addNumberPrice = this.selectedRow.addNumberPrice; 
    this.subscription.addCreditPrice = this.selectedRow.addCreditPrice;
    
    this.subscriptionAbc();
  }

  gotodashboard()
  {     
    const url = "https://"+this.tenant.tenancyName+".ezjobmanager.com";
    window.open(url);
  }

  ngOnInit() 
  {   
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // Check if response is parsed correctly
      try {
        response = JSON.parse(response);
      } catch (error) {
        console.error('Error parsing response JSON:', error);
        return;
      }

      // Verify if response.result contains the image URL
      this.imageUrl = response.result;
    }; 
    this.Onboard=new SignUpOnbaording();
    // this.onboardingForm = this._formBuilder.group({
    //   space: ["teamcom",Validators.required],
    //   OnSysUsers: ["5",Validators.required],
    //   onPaymentMethod: ["mastercard",Validators.required],
    //   nameoncard: ["",Validators.required],
    //   cardnumber: ["",Validators.required],
    //   cardexpiry: ["",Validators.required],
    //   cardcvv: ["",Validators.required],
    //   SaveCard: [true],
    //   workspace: ["",Validators.required],
    //   b_firstName: [{ value: localStorage.getItem('firstName') || '', disabled: true }, Validators.required],
    //   b_lastName: [{ value: localStorage.getItem('lastName') || '', disabled: true }, Validators.required],
    //   b_address: [{ value: localStorage.getItem('address') || '', disabled: true }, Validators.required],
    //   b_state: [{ value: localStorage.getItem('state') || '', disabled: true }, Validators.required],
    //   b_city: [{ value: localStorage.getItem('city') || '', disabled: true }, Validators.required],
    //   b_zipCode: [{ value: localStorage.getItem('zipCode') || '', disabled: true }, Validators.required],
    // });
    this.Onboard.vehicle_cap="5";
    this.paymentError==false
    this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {});
    this.bsStepper = document.querySelectorAll('.bs-stepper');
    this._authenticationService.getStates().subscribe((result) => {
      this.states = result.result;
    });
    this.LoadData();
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
    this.isDifferentBillingAddress = false;
    this.updateAddressControls();
  }

  LoadData()
  {
    var industryId = '7B23D50D-458D-4D56-ED65-08DC7F94BDAB';
    this.getPackagesList(industryId).pipe()
    .subscribe(
        data => {
          // const filteredData = data.filter(item => item.isPublish === true);            
          // filteredData.forEach(item => {
          //   if (item.templates === -1) {
          //     item.templates = "Unlimited";
          //   }
          //   if (item.contacts === -1) {
          //     item.contacts = "Unlimited";
          //   }
          // });
            this.rows = data
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

  getPackagesList(industryId) 
  {    
    return this._httpClient
      .get<any>(`${environment.apiLiveUrl}/services/app/Package/GetPackagesByIndustryId?Id=${industryId}`)
      .pipe(
        map(response => {          
          return response.result.items;  
        })
      );
  }

  ngOnDestroy(): void 
  {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  
  BindTenant()
  {    
    this.tenant.tenancyName=this.f.workspace.value.toLowerCase();
    this.tenant.name=this.f.workspace.value.toLowerCase();
    this.tenant.connectionString= "Server=207.38.71.94,50991\\DOTNET;Database=EZ_"+this.tenant.name+";User Id=sa;Password=dotnet+123?;TrustServerCertificate=True";   
    this.tenant.adminEmailAddress=localStorage.getItem("signUpEmail").toLowerCase();
    this.tenant.isActive=true;
    this.tenant.company= localStorage.getItem("company");
    this.tenant.username =localStorage.getItem("firstName")+localStorage.getItem("lastName");
    this.tenant.passowrd = localStorage.getItem("password");
    this.tenant.purpose = null;
    this.tenant.teamsize = null;
    this.tenant.payment_methode = null;
    this.tenant.name_on_card = this.f.nameoncard.value;
    this.tenant.cardnumber = this.f.cardnumber.value;
    this.tenant.expiry = this.f.cardexpiry.value;
    this.tenant.cvv = this.f.cardcvv.value;
    this.tenant.savecard = false;
    this.tenant.package = this.selectedRow.id; 
    this.tenant.MobileNumber="+14802407200";
    this.tenant.industryId =localStorage.getItem("industryId");
  }

  BindObj()
  {
    this.tenant.name=localStorage.getItem("signUpEmail").toLowerCase();
    this.Onboard.name=localStorage.getItem("signUpUserName");
    this.Onboard.username=localStorage.getItem("signUpUserName");
    this.Onboard.company_name=localStorage.getItem("signUpCompany");
    this.Onboard.password=localStorage.getItem("signUpPassword");
    this.Onboard.purpose=this.f.space.value;
    this.Onboard.user_cap=this.f.OnSysUsers.value;
    this.Onboard.payment_method=this.f.onPaymentMethod.value;
    this.Onboard.card_name=this.f.nameoncard.value;
    this.Onboard.card_number=this.f.cardnumber.value;
    this.Onboard.card_expiry=this.f.cardexpiry.value;
    this.Onboard.card_cvv_no=this.f.cardcvv.value;
    this.Onboard.subdomain=this.f.workspace.value.toLowerCase();
    this.Onboard.package_id=1;
    this.tenant.industryId =localStorage.getItem("industryId");

  }

  updateAddressControls() {  
    this._authenticationService.getCitiesByState(localStorage.getItem('stateId')).subscribe((result) => {
      this.cities = result.result;
    });  
    const addressControls = ['b_firstName', 'b_lastName', 'b_address', 'b_state', 'b_city', 'b_zipCode'];
    const method = this.isDifferentBillingAddress ? 'enable' : 'disable';
    addressControls.forEach(controlName => {
      this.onboardingForm.get(controlName)[method]();
    });    
  }

  onCheckboxChange() {
    this.isDifferentBillingAddress = !this.isDifferentBillingAddress;
    this.updateAddressControls();
    if (this.isDifferentBillingAddress) {
      this.onboardingForm.get('b_firstName').setValue('');
      this.onboardingForm.get('b_lastName').setValue('');
      this.onboardingForm.get('b_address').setValue('');
      this.onboardingForm.get('b_state').setValue(null);
      this.onboardingForm.get('b_city').setValue(null);
      this.onboardingForm.get('b_zipCode').setValue('');
    }
    else {      
      this.onboardingForm.get('b_firstName').setValue(localStorage.getItem('firstName'));
      this.onboardingForm.get('b_lastName').setValue(localStorage.getItem('lastName'));
      this.onboardingForm.get('b_address').setValue(localStorage.getItem('address'));
      this.onboardingForm.get('b_state').setValue(localStorage.getItem('state'));
      this.onboardingForm.get('b_city').setValue(localStorage.getItem('city'));
      this.onboardingForm.get('b_zipCode').setValue(localStorage.getItem('zipCode'));
    }
    localStorage.setItem('isDifferentBillingAddress', this.isDifferentBillingAddress.toString());
  }
    
  preventSpace(event: KeyboardEvent) 
  { 
    if (event.key === ' ') 
    { 
      event.preventDefault(); 
      this.spaceError = true;
      this.spaceErrorMessage="Space is not allowed!";
    } 
    else 
    {
      this.spaceError = false;
    }
  }

  hideError() 
  { 
    setTimeout(() => { this.spaceError = false; }, 0); 
  }

  ValidateWorkSpaceNext()
  {   
    this.loading=true;
    if(this.f.workspace.value=="")
    {          
      this.spaceError = true;
      this.spaceErrorMessage="workspace is required";
      this.loading=false;
    }
    else 
    {
      this._authenticationService
      .validateDomain(this.f.workspace.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.result.state == 3)
          {
            this.onSubmit();            
          }              
          else 
          {
            this.spaceError = true;
            this.spaceErrorMessage="workspace already exists!";
            this.loading=false;               
          }
        },
        error => {
          this.spaceError = true;
          this.spaceErrorMessage="workspace Checking Error";
          this.loading=false;
        });          
    }    
  }


  validateCardExpiry(cardExpiry: string) {
    cardExpiry = cardExpiry.replace(/\D/g, ''); 
    
    if (cardExpiry.length > 2) {
      cardExpiry = cardExpiry.slice(0, 2) + '/' + cardExpiry.slice(2);
    }
  
    if (cardExpiry.length === 5) {
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
        if (year === currentYear && month <= currentMonth) {
          this.cardexpiryMessage = 'Expiration date must be in the future.';
        } else {
          this.cardexpiryMessage = '';  
        }
      } else {
        this.cardexpiryMessage = 'Invalid MM/YY format or date.';
      }
    } else {
      this.cardexpiryMessage = 'Invalid MM/YY format.';
    }
  
    const cardExpiryInput = document.getElementById('cardexpiry') as HTMLInputElement;
    cardExpiryInput.value = cardExpiry;
  }
  
  
  validateCVV(cvv: string) {
    cvv = cvv.replace(/\D/g, '');
  
    if (cvv.length === 3 || cvv.length === 4) {
      this.cardcvvMessage = ''; 
    } else {
      this.cardcvvMessage = 'CVV must be exactly 3 or 4 digits.';
    }

    if (cvv.length > 4) {
      cvv = cvv.slice(0, 4);
    }
  
    const cvvInput = document.getElementById('cardcvv') as HTMLInputElement;
    cvvInput.value = cvv;
  }

  ValidatePaymentMethod()
  {      
    this.loading=true;
    if(this.f.nameoncard.value=="")
    {
      this.NameonCardErrorMessage="Name is required";
      this.loading=false;
      this.paymentError=true;
    }
    else
    {
      this.NameonCardErrorMessage="";
      this.loading=false;
      this.paymentError=false;
    }
    if(this.f.cardnumber.value=="")
    {
      this.CardNumberErrorMessage="Card No. is required";
      this.loading=false;
      this.paymentError=true;
    }
    else
    {
      this.CardNumberErrorMessage="";
      this.loading=false;
      this.paymentError=false;
    }
    if(this.f.cardexpiry.value=="")
    {
      this.cardexpiryMessage="Expiry is required";
      this.loading=false;
      this.paymentError=true;
    }
    else
    {
      this.cardexpiryMessage="";
      this.loading=false;
      this.paymentError=false;
    }
    if(this.f.cardcvv.value=="")
    {
      this.cardcvvMessage="Card CVV is required";
      this.loading=false;
      this.paymentError=true;
    }
    else
    {
      this.cardcvvMessage="";
      this.loading=false;
      this.paymentError=false;
    }
    if(this.f.b_firstName.value=="")
    {
      this.b_firstNameErrorMessage="First Name is required";
      this.loading=false;
      this.paymentError=true;
    }
    else
    {
      this.b_firstNameErrorMessage="";
      this.loading=false;
      this.paymentError=false;
    }
    if(this.f.b_lastName.value=="")
    {
      this.b_lastNameErrorMessage="Last Name is required";
      this.loading=false;
      this.paymentError=true;
    }
    else
    {
      this.b_lastNameErrorMessage="";
      this.loading=false;
      this.paymentError=false;
    }
    if(this.f.b_address.value=="")
    {
      this.b_addressErrorMessage="Address is required";
      this.loading=false;
      this.paymentError=true;
    }
    else
    {
      this.b_addressErrorMessage="";
      this.loading=false;
      this.paymentError=false;
    }
    if(this.f.b_state.value=="")
    {
      this.b_stateErrorMessage="State is required";
      this.loading=false;
      this.paymentError=true;
    }
    else
    {
      this.b_stateErrorMessage="";
      this.loading=false;
      this.paymentError=false;
    }
    if(this.f.b_city.value=="")
    {
      this.b_cityErrorMessage="City is required";
      this.loading=false;
      this.paymentError=true;
    }
    else
    {
      this.b_cityErrorMessage="";
      this.loading=false;
      this.paymentError=false;
    }
    if(this.f.b_zipCode.value=="")
    {
      this.b_zipCodeErrorMessage="ZipCode is required";
      this.loading=false;
      this.paymentError=true;
    }
    else
    {
      this.b_zipCodeErrorMessage="";
      this.loading=false;
      this.paymentError=false;
    }
    if(this.paymentError==false)
    {
      this.customerProfileDto.cardNumber = this.f.cardnumber.value;
      this.customerProfileDto.expiry = this.f.cardexpiry.value;
      this.customerProfileDto.cvv = this.f.cardcvv.value;
      this.customerProfileDto.email = localStorage.getItem("signUpEmail").toLowerCase();
      this.customerProfileDto.firstName = localStorage.getItem("firstName");
      this.customerProfileDto.lastName = localStorage.getItem("lastName");
      this.customerProfileDto.phoneNumber = localStorage.getItem("phoneNumber");
      this.customerProfileDto.company = localStorage.getItem("company");
      this.customerProfileDto.address = localStorage.getItem("address");
      this.customerProfileDto.state = localStorage.getItem("state");
      this.customerProfileDto.city = localStorage.getItem("city");
      this.customerProfileDto.zipCode = localStorage.getItem("zipCode");
      this.customerProfileDto.b_firstName = this.f.b_firstName.value;
      this.customerProfileDto.b_lastName = this.f.b_lastName.value;
      this.customerProfileDto.b_address = this.f.b_address.value;
      this.customerProfileDto.b_state = this.f.b_state.value;
      this.customerProfileDto.b_city = this.f.b_city.value;
      this.customerProfileDto.b_zipCode = this.f.b_zipCode.value;      
    
      this._authenticationService.createCustomerProfile(this.customerProfileDto)
      .pipe().subscribe(
        data => {
          if (data != null && data.messages.message[0].text === 'Successful.')
          {
            if (data != null && data.messages.message != null)
            {              
              this.chargeCustomerProfileDto.customerProfileId = data.customerProfileId;
              this.chargeCustomerProfileDto.paymentProfileId = data.customerPaymentProfileIdList[0];
              this.chargeCustomerProfileDto.invoiceNumber = new Date().toISOString().slice(8, 10) + new Date().toISOString().slice(5, 7) + new Date().toISOString().slice(11, 16).replace(/[-:]/g, '');
              this.chargeCustomerProfileDto.amount = this.selectedRow.fee + this.selectedRow.otsetupFee;
              this._authenticationService.chargeCustomerProfile(this.chargeCustomerProfileDto)
              .pipe().subscribe(
                data => 
                {
                  this._toastrService.success("Transaction Completed Succesfully!", "Successful.", {
                    positionClass: 'toast-top-left',
                    toastClass: 'toast ngx-toastr',
                    closeButton: true
                  });
                  this.transactionId = data.transactionResponse.transId;
                  this.authCode = data.transactionResponse.authCode;
                  this.transactionData();
                },
                error => {
                  this.spaceError = true;
                  this.spaceErrorMessage="Error";
                  this.loading=false;
                });
              }
          }
          else if (data != null)
          {
            this._toastrService.error(data.messages.message[0].text, "Failed", {
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

  checkMaxLength() 
  {
    const currentValue = this.onboardingForm.get('cardnumber').value;
    let cardNumber = currentValue;
    cardNumber = cardNumber.replace(/\D/g, '');
    const formattedNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.onboardingForm.get('cardnumber').patchValue(formattedNumber);    
    if (currentValue.length < 20) 
    {
      let cardNumber = currentValue;
      cardNumber = cardNumber.replace(/\D/g, '');
      const formattedNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
      this.onboardingForm.get('cardnumber').patchValue(formattedNumber);
    }
    else 
    {
      const slicedValue = (currentValue).slice(0, 19);
      let cardNumber = slicedValue;
      cardNumber = cardNumber.replace(/\D/g, '');
      const formattedNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
      this.onboardingForm.get('cardnumber').patchValue(formattedNumber);
    }
  }
  
  selectCard(row: any): void 
  {  
    if (this.selectedRow) 
    {
      this.selectedRow.isSelected = false;
    }
    this.selectedRow = row;
    row.isSelected = true;
    this.isPlanSelected = true;
  }

  validateFirstName() {
    const firstNameControl = this.billingAddressForm.get('firstname');
    let firstName = firstNameControl.value as string;
    firstName = firstName.replace(/[^a-zA-Z]/g, '');
    if (firstName.length < 3) {
      this.b_firstNameErrorMessage = 'First Name must be at least 3 alphabets.';
    } else {
      this.b_firstNameErrorMessage = '';
    }  
    if (firstName.length > 20) {
      firstName = firstName.slice(0, 20);
      this.b_firstNameErrorMessage = 'First Name cannot exceed 20 alphabets.';
    }
    firstNameControl.setValue(firstName);
  }
  
  validateLastName() {
    const lastNameControl = this.billingAddressForm.get('lastname');
    let lastName = lastNameControl.value as string;
    lastName = lastName.replace(/[^a-zA-Z]/g, '');
    if (lastName.length < 3) {
      this.b_lastNameErrorMessage = 'Last Name must be at least 3 alphabets.';
    } else {
      this.b_lastNameErrorMessage = '';
    }  
    if (lastName.length > 20) {
      lastName = lastName.slice(0, 20);
      this.b_lastNameErrorMessage = 'Last Name cannot exceed 20 alphabets.';
    }
    lastNameControl.setValue(lastName);
  }

  onStateChange() {
    const selectedStateId = this.onboardingForm.get('b_state').value.id;
    this._authenticationService.getCitiesByState(selectedStateId).subscribe((result) => {
      this.cities = result.result;
    });
  }

  calculateProRatedAmount() {
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const today = currentDate.getDate();
    const remainingDays = daysInMonth - today;
    const perDayPrice = this.selectedRow.packagePrice / daysInMonth;
    this.proRatedAmount = Number((perDayPrice * remainingDays).toFixed(2));
  }

    
}
