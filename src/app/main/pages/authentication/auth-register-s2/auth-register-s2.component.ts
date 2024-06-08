import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoreConfigService } from '@core/services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { CityDto, StateDto } from '../onborading-s1/boilerservice';
import { ToastrService } from 'ngx-toastr';
import { IndustryService } from 'app/main/apps/industry/industry.service';
import { error } from 'console';

@Component({
  selector: 'app-auth-register-s2',
  templateUrl: './auth-register-s2.component.html',
  styleUrls: ['./auth-register-s2.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AuthRegisterS2Component implements OnInit {
  submitted = false;
  public coreConfig: any;
  public passwordTextType: boolean;
  public registerForm: FormGroup;
  public isCompanyExists=false;


  firstNameErrorMessage:string;
  cnicErrorMessage:string;
  phoneNumberErrorMessage:string;
  companyErrorMessage:string;
  addressErrorMessage:string;
  zipCodeErrorMessage:string;
  stateErrorMessage:string;
  cityErrorMessage:string;
  passwordErrorMessage:string;
  confirmPasswordErrorMessage:string;
  privacyErrorMessage:string;
  industryErrorMessage:string;
  ageErrorMessage:string;
  dateOfBirthErrorMessage:string;
  whatsappNumberErrorMessage:string;
  emailErrorMessage:string;
  genderErrorMessage:string;

  industries:any;
  states: StateDto[] = [];
  genders = [
    {id:1, genderName: 'Male' },
    { id:2,genderName: 'Female' },
    { id:3,genderName: 'Other' }
  ];
  cities = [
    { id:1,cityName: 'Karachi' },
    { id:2,cityName: 'Lahore' },
    { id:3,cityName: 'Faisalabad' },
    { id:4,cityName: 'Rawalpindi' },
    { id:5,cityName: 'Multan' },
    { id:6,cityName: 'Hyderabad' },
    { id:7,cityName: 'Gujranwala' },
    { id:8,cityName: 'Peshawar' },
    { id:9,cityName: 'Quetta' },
    { id:10,cityName: 'Sargodha' },
    { id:11,cityName: 'Sialkot' },
    { id:12,cityName: 'Bahawalpur' },
    { id:13,cityName: 'Sukkur' },
    { id:14,cityName: 'Larkana' },
    { id:15,cityName: 'Sheikhupura' },
    { id:16,cityName: 'Gujrat' },
    { id:17,cityName: 'Jhang' },
    { id:18,cityName: 'Sahiwal' }
    // Add more cities as needed
  ];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _coreConfigService: CoreConfigService, 
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _toastrService: ToastrService,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _industryService : IndustryService
    ) {
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

  get form() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    
    this._authenticationService.createLead(this.registerForm.value).subscribe(
      (data)=>{
        console.log("Lead Data",data)
      },
      (error)=>{
        console.log("Lead Error",error)
      }
    )
    // Store form data in local storage
    localStorage.setItem('registerFormData', JSON.stringify(this.registerForm.value));
    this._router.navigateByUrl("/pages/authentication/onboarding-s1");

    // You can add further actions after storing the data
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

 
 
  ngOnInit(): void {

    this.registerForm = this._formBuilder.group({
      name: ['', Validators.required],
      whatsappnumber: ['', Validators.required],
      cnic:['',Validators.required],
      address: ['', Validators.required],
      email: [null, [Validators.required,Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      age: [null, Validators.required],
      city: [null, Validators.required],
      dateofbirth: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      referredby:['',Validators.required],
      privacy: [false, Validators.required],      
    });

    
    
   

    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  validateFirstName() {
    
    const firstNameControl = this.registerForm.get('name');
    let firstName = firstNameControl.value as string;
    firstName = firstName.replace(/[^a-zA-Z]/g, '');
    if (firstName.length < 3) {
      this.firstNameErrorMessage = 'First Name must be at least 3 alphabets.';
    } else {
      this.firstNameErrorMessage = '';
    }  
    if (firstName.length > 20) {
      firstName = firstName.slice(0, 20);
      this.firstNameErrorMessage = 'First Name cannot exceed 20 alphabets.';
    }
    firstNameControl.setValue(firstName);
  }
  
  // validateLastName() {
  //   const lastNameControl = this.registerForm.get('lastname');
  //   let lastName = lastNameControl.value as string;
  //   lastName = lastName.replace(/[^a-zA-Z]/g, '');
  //   if (lastName.length < 3) {
  //     this.lastNameErrorMessage = 'Last Name must be at least 3 alphabets.';
  //   } else {
  //     this.lastNameErrorMessage = '';
  //   }  
  //   if (lastName.length > 20) {
  //     lastName = lastName.slice(0, 20);
  //     this.lastNameErrorMessage = 'Last Name cannot exceed 20 alphabets.';
  //   }
  //   lastNameControl.setValue(lastName);
  // }

  validatePhoneNumber() {
    const phoneNumberControl = this.registerForm.get('phoneNumber');
    let phoneNumber = phoneNumberControl.value as string;
    phoneNumber = phoneNumber.replace(/\D/g, '');
    if (phoneNumber.length > 10){
      phoneNumber = phoneNumber.slice(0, 10);     
    }
    if (phoneNumber.length <= 3) {
      phoneNumber = phoneNumber.replace(/^(\d{0,3})/, '($1)');      
    }
    else if (phoneNumber.length <= 6) {
      phoneNumber = phoneNumber.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    }
    else if (phoneNumber.length <= 10) {
      phoneNumber = phoneNumber.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }
    phoneNumberControl.setValue(phoneNumber);
  }

  validateCompany() {

    const companyControl = this.registerForm.get('company');
    let company = companyControl.value as string;
    if (company.length > 30) {
        company = company.slice(0, 30);
    }
    companyControl.setValue(company);
  }

  onStateChange() {
    
    const selectedStateId = this.registerForm.get('state').value.id;
    this._authenticationService.getCitiesByState(selectedStateId).subscribe((result) => {
      this.cities = result.result;
    });
  }

  private resetErrorMessages() {
    this.firstNameErrorMessage = '';
    //this.lastNameErrorMessage = '';
    this.phoneNumberErrorMessage = '';
    this.companyErrorMessage = '';
    this.addressErrorMessage = '';  
    this.stateErrorMessage = '';
    this.cityErrorMessage = '';
    this.zipCodeErrorMessage = '';
    this.passwordErrorMessage = '';
    this.confirmPasswordErrorMessage = '';
    this.privacyErrorMessage = '';
    this.industryErrorMessage = '';
  }

  private displayFormErrors() {
    const formControls = this.registerForm.controls;
    Object.keys(formControls).forEach(controlName => {
      const control = formControls[controlName];
      if (control.invalid) {
        switch (controlName) {
          case 'firstname':
            this.firstNameErrorMessage = 'First Name is required.';
            break;

            case 'lastname':
            //this.lastNameErrorMessage = 'Last Name is required.';
            break;

            case 'phoneNumber':
            this.phoneNumberErrorMessage = 'Phone Number is required.';
            break;

            case 'company':
            this.companyErrorMessage = 'Company Name is required.';
            break;

            case 'address':
            this.addressErrorMessage = 'Address is required.';
            break;
            
            case 'state':
            this.stateErrorMessage = 'State is required.';
            break;

            case 'industry':
            this.industryErrorMessage = 'Industry selection is required.';
            break;

            case 'city':
            this.cityErrorMessage = 'City is required.';
            break;

            case 'zipCode':
            this.zipCodeErrorMessage = 'Zip Code is required.';
            break;

            case 'password':
            this.passwordErrorMessage = 'Password is required.';
            break;

            case 'confirmPassword':
            this.confirmPasswordErrorMessage = 'Confirm Password is required.';
            break;

            case 'privacy':
            this.privacyErrorMessage = 'Privacy is required.';
            break;
        }
      }
    });
  } 

}
function noSpacesValidator(control: FormControl): { [key: string]: boolean } | null {
  const hasSpaces = /\s/.test(control.value);
  return hasSpaces ? { 'hasSpaces': true } : null;
}

