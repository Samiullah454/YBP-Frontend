import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'app/auth/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-reset-password-v2',
  templateUrl: './auth-reset-password-v2.component.html',
  styleUrls: ['./auth-reset-password-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthResetPasswordV2Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public confPasswordTextType: boolean;
  public resetPasswordForm: UntypedFormGroup;
  public submitted = false;
  private password:string;
  private confirm_password:string;
  private passcode:string;
  
  // Private
  private _unsubscribeAll: Subject<any>;
  loading: boolean;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(private _coreConfigService: CoreConfigService, private _formBuilder: UntypedFormBuilder,private route: ActivatedRoute,private _authenticationService: AuthenticationService,
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
    return this.resetPasswordForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * Toggle confirm password
   */
  toggleConfPasswordTextType() {
    this.confPasswordTextType = !this.confPasswordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.f.newPassword.value
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this._authenticationService
    .validateEmail(this.f.email.value)
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
        this._toastrService.error(error, 'Reset Password', {
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
    this.route.queryParams.subscribe(params => {
       this.passcode = params['passcode'];
      
    });
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
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
