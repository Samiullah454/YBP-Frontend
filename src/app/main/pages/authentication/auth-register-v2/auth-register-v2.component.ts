import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-register-v2',
  templateUrl: './auth-register-v2.component.html',
  styleUrls: ['./auth-register-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterV2Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public registerForm: UntypedFormGroup;
  public submitted = false;
  public loading = false;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(private _coreConfigService: CoreConfigService, private _formBuilder: UntypedFormBuilder,private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService,
    private _router: Router) {
    this._unsubscribeAll = new Subject();
    
    // Configure the layout
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

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;
    this.loading = true;
     
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.loading = false;
      return;

    }
    this.loading = false;
    localStorage.setItem("signUpEmail",this.f.email.value);
    this._router.navigateByUrl("/pages/authentication/register-s2");
    // this._authenticationService
    // .validateEmail(this.f.email.value)
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     localStorage.setItem("signUpEmail",this.f.email.value);
    //     this._router.navigateByUrl("/pages/authentication/register-s2");
    //   },
    //   error => {
        
    //     this._toastrService.error(error.message, 'Email Validation', {
    //       positionClass: 'toast-top-right',
    //       toastClass: 'toast ngx-toastr',
    //       closeButton: true
    //     });
    //     this.loading = false;
    //   }
    // );
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      email: [localStorage.getItem("signUpEmail"), [Validators.required, Validators.email,CustomEmailValidator]],
    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
function CustomEmailValidator(control: AbstractControl): ValidationErrors | null {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (control.value && !emailPattern.test(control.value)) {
    return { invalidEmail: true };
  }

  return null;
}

