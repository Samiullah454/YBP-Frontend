import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';

import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';
import { ToastrService } from 'ngx-toastr';
import { BeforeOpenEvent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auth-forgot-password-v2',
  templateUrl: './auth-forgot-password-v2.component.html',
  styleUrls: ['./auth-forgot-password-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthForgotPasswordV2Component implements OnInit {
  // Public
  public emailVar;
  public coreConfig: any;
  public forgotPasswordForm: UntypedFormGroup;
  public submitted = false;
  public loading = false;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   *
   */
  constructor(private _coreConfigService: CoreConfigService, private _formBuilder: UntypedFormBuilder,private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService) {
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
    return this.forgotPasswordForm.controls;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;
    this.loading = true;
   
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this._authenticationService
      .forgetPassword(this.f.email.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status==true)
          {
            Swal.fire({
              title: 'Reset Password!',
              text: data.message,
              icon: 'info',
              confirmButtonText: 'OK'
            })
          }
          else {
            this._toastrService.error(data.message, 'Error', {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
          }
         
        },
        error => {
          this._toastrService.error(error, 'Login Error', {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.loading = false;
        }
      );
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, CustomEmailValidator]]
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
