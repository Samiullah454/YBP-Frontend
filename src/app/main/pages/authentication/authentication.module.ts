import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { AuthForgotPasswordV2Component } from 'app/main/pages/authentication/auth-forgot-password-v2/auth-forgot-password-v2.component';

import { AuthLoginV2Component } from 'app/main/pages/authentication/auth-login-v2/auth-login-v2.component';

import { AuthRegisterV2Component } from 'app/main/pages/authentication/auth-register-v2/auth-register-v2.component';

import { AuthResetPasswordV2Component } from 'app/main/pages/authentication/auth-reset-password-v2/auth-reset-password-v2.component';
import { AuthRegisterS2Component } from './auth-register-s2/auth-register-s2.component';
import { OnboradingS1Component } from './onborading-s1/onborading-s1.component';
import { CoreTouchspinModule } from "../../../../@core/components/core-touchspin/core-touchspin.module";
import { ServiceProxyModule } from './onborading-s1/service-proxy.module';
import { SignupinvitedComponent } from './signupinvited/signupinvited.component';
import { TenantsService } from 'app/main/apps/tenants/tenants.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';



// routing
const routes: Routes = [
  
  {
    path: 'authentication/login-v2',
    component: AuthLoginV2Component
  },
  {
    path: 'authentication/register-v2',
    component: AuthRegisterV2Component
  },
  {
    path: 'authentication/register-s2',
    component: AuthRegisterS2Component
  },
  {
    path: 'authentication/reset-password-v2',
    component: AuthResetPasswordV2Component
  },
  {
    path: 'authentication/forgot-password-v2',
    component: AuthForgotPasswordV2Component
  },
  {
    path: 'authentication/onboarding-s1',
    component: OnboradingS1Component
  },
  {
    path: 'authentication/signupinvited/:encryptedString',
    component: SignupinvitedComponent
  }
];

@NgModule({
    declarations: [
        AuthLoginV2Component,
        AuthRegisterV2Component,
        AuthForgotPasswordV2Component,
        AuthResetPasswordV2Component,
        AuthRegisterS2Component,
        OnboradingS1Component,
        SignupinvitedComponent
    ],
    imports: [
      CommonModule, 
      RouterModule.forChild(routes), 
      NgbModule, 
      FormsModule, 
      NgSelectModule,
      ReactiveFormsModule, 
      CoreCommonModule, 
      CoreTouchspinModule,
      ServiceProxyModule,
      FileUploadModule,

    ],
    providers: [TenantsService]
})
export class AuthenticationModule {}
