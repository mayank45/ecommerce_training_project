import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/core/services/customer/customer.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  Email:string;
  hide=true;
  forgotPassForm: FormGroup;
  customersList:any=[];
  //flag:boolean;
  constructor(private customerService:CustomerService ,private formBuilder: FormBuilder,private router: Router ) { 
    this.buildForm();
      this.customersList=customerService.getCustomers();
      console.log(this.customersList);
  }

  ngOnInit(): void {
  }
  private buildForm() {
    this.forgotPassForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]] ,
     // password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      

      getErrorMessage() {
        if (this.email.hasError('required')) {
          return 'You must enter a value';
        } 
        return this.email.hasError('email') ? 'Not a valid email' : '';
        
      }
    });
  }


  generatePass(){
    console.log(this.forgotPassForm.value);
    //this.customerService.login(this.loginForm.value.email ,this.loginForm.value.password  )
    const user = this.forgotPassForm.value;
    this.Email=user.email;
    this.customerService.forgotPass(user.email)

    .subscribe(data => {
        console.log(data);
        if(data==false){
          alert("User not registered with our system");
          this.router.navigate(['/auth/login']);
        }
       if(data==true){
        alert("New Password generated sent to your mail id kindly change this pasword after login");

        //this.session.set("email",this.Email);
        //this.session.get("email");
       // console.log(this.session.get("email"));
        this.router.navigate(['/auth/login']);
      }

        
      });

}

    
    

    cancel() {
      this.router.navigate(['/home']);
    }
  
    redirectToLogin(){
      this.router.navigate(['/auth/login']);
    }


}
