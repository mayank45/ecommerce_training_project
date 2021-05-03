import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { AdminService } from 'src/core/services/admin/admin.service';
import { ConfirmationDialogModel } from 'src/shared/components/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from 'src/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  Email:string;
  hide=true;
  adminloginForm: FormGroup;
  constructor(private dialog:MatDialog,private adminService:AdminService ,private formBuilder: FormBuilder,private router: Router ,private session: SessionStorageService) { 
    this.buildForm();
      //this.adminList=adminService.getadmins();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.adminloginForm = this.formBuilder.group({
      email: ['admin@gmail.com', [Validators.required,Validators.email]],
      password: ['admin', [Validators.required]],
      getErrorMessage() {
        if (this.email.hasError('required')) {
          return 'You must enter a value';
        }
      
        return this.email.hasError('email') ? 'Not a valid email' : '';
        // if (this.password.hasError('required')) {
        //   return 'You must enter a value';
        // }
      
        // return this.email.hasError('password') ? 'Not a valid password' : '';
      }
    });
  }


  adminlogin(){
    console.log(this.adminloginForm.value);
    //this.customerService.login(this.loginForm.value.email ,this.loginForm.value.password  )
    const admin = this.adminloginForm.value;
    this.Email=admin.email;
    this.adminService.login(this.adminloginForm.value)

    .subscribe(data => {
        console.log(data);
        if(data==false){
          //alert("Username and password not matched");
          const dialogData = new ConfirmationDialogModel('Admin Email and pasword not matched', ' please enter valid credentials ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })
          this.router.navigate(['/auth/login']);
        }
       if(data==true){
        this.session.set("email",this.Email);
        this.session.get("email");
        console.log(this.session.get("email"));
        this.router.navigate(['/../admin/home'])
      }

        // if (this.session.get("customersList") != null) {
        //   this.customersList = this.session.get("customersList");
        // }
        // if(data==true){
        // this.customersList.push({
          
        //   email :user.email
        // })
        // }
        // this.session.set("customersList", this.customersList);
      });

}

    
    

    cancel() {
      this.router.navigate(['/../auth/login']);
    }
    redirectToLogin(){
      this.router.navigate(['/auth/login']);
    }
    redirectToHome(){
      this.router.navigate(['/../home']);
    }






}
