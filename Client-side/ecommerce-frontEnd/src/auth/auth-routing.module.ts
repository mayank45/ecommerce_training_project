import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustLoginComponent } from './cust-login/cust-login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { LoginPageGuard } from './guard/login-page.guard';
import { RegisterGuard } from './guard/register.guard';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: 'login',
    component: CustLoginComponent,canActivate:[LoginPageGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,canActivate:[RegisterGuard]
  },
  {
    path: 'logByAdmin',
    component: AdminLoginComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPassComponent
  }
  // {
  //   path: '',
  //   component: CustLoginComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
