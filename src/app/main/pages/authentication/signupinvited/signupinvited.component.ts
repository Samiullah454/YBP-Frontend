import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'app/auth/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signupinvited',
  templateUrl: './signupinvited.component.html',
  styleUrls: ['./signupinvited.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupinvitedComponent implements OnInit {

  public coreConfig: any;
  public passwordTextType: boolean;
  public confPasswordTextType: boolean;
  public resetPasswordForm: UntypedFormGroup;
  public submitted = false;
  public url = this.router.url;
  public lastValue;
  private password:string;
  private confirm_password:string;
  private passcode:string;  
  private _unsubscribeAll: Subject<any>;
  loading: boolean;
 

  constructor(
    private _coreConfigService: CoreConfigService, 
    private _formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService,
    private router: Router) 
    {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
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

  get f() {
    return this.resetPasswordForm.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  toggleConfPasswordTextType() {
    this.confPasswordTextType = !this.confPasswordTextType;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.f.newPassword.value
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this._authenticationService.validateEmail(this.f.email.value).pipe(first())
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
  

  ngOnInit(): void {
    var email=this._authenticationService.decryptString(this.lastValue,"cht");
    this.route.queryParams.subscribe(params => {
       this.passcode = params['passcode'];
    });
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
