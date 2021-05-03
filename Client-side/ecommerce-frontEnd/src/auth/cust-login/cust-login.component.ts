import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, EmailValidator} from '@angular/forms';
import { CustomerService } from 'src/core/services/customer/customer.service';
import { Router } from '@angular/router';
import {  SessionStorageService, SessionStorage } from 'angular-web-storage';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { ConfirmationDialogModel } from 'src/shared/components/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from 'src/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

//import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-cust-login',
  templateUrl: './cust-login.component.html',
  styleUrls: ['./cust-login.component.css']
})
export class CustLoginComponent implements OnInit {
  Email:string;
  hide=true;
  loginForm: FormGroup;
  customersList:any=[];
  flag:boolean;
  invalid:boolean=false;

  

  
  //@SessionStorage() sessionValue: string = `Email`;
 
  constructor(private dialog:MatDialog,private customerService:CustomerService ,private formBuilder: FormBuilder,private router: Router ,private session: SessionStorageService) {
      this.buildForm();
      this.customersList=customerService.getCustomers();
      console.log(this.customersList);
    }

    






  ngOnInit(): void {
    

  }
  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      // password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],


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


  login(){
    console.log(this.loginForm.value);
    //this.customerService.login(this.loginForm.value.email ,this.loginForm.value.password  )
    const user = this.loginForm.value;
    this.Email=user.email;
    this.customerService.login(user.email, user.password)

    .subscribe(data => {
        console.log(data);
        if(data==false){
          //this.invalid=true;
          const dialogData = new ConfirmationDialogModel('Username and Password not matched', ' please enter valid credentials ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })
          //alert("Username and password not matched");
          //this.router.navigate(['/auth/login']);
        }
       if(data==true){
        this.session.set("email",this.Email);
        this.session.get("email");
        console.log(this.session.get("email"));
        // this.router.navigateByUrl('RefreshComponent',{skipLocationChange:true })
        // .then(()=>{
          this.router.navigate(['/../home']).then(()=>{
            window.location.reload();
          });
        // });
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
      this.router.navigate(['/home']);
    }
    redirectToRegister(){
      this.router.navigate(['/auth/register']);
    }
    redirectToHome(){
      this.router.navigate(['/home']);
    }
    redirectToAdminLogin(){
      this.router.navigate(['/auth/logByAdmin']);
    }
    goToForgotPassword(){
      this.router.navigate(['/auth/forgotpassword']);
    }


   
    

  }
  


