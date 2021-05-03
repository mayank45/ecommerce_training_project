import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'confirmation-dialog';
import { Customer } from 'src/core/models/customer.model';
import { CustomerService } from 'src/core/services/customer/customer.service';
import { ConfirmationDialogModel } from 'src/shared/components/confirmation-dialog/confirmation-dialog';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide=true;
  customer:Customer= new Customer();
  email:any;
  invalid:boolean=false;

  
  constructor(private customerService:CustomerService,private formBuilder: FormBuilder, private router:Router,private dialog: MatDialog) {
    this.buildForm();
   }

  ngOnInit(): void {
    
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,Validators.min(1),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      address: new FormControl('', Validators.required),
      phno: new FormControl('', Validators.required),
      customer_name: new FormControl('',Validators.required)
      // getErrorMessage() {
      //   if (this.email.hasError('required')) {
      //     return 'You must enter a value';
      //   }
    
      //   return this.email.hasError('email') ? 'Not a valid email' : '';
      // }
    });
    
  }

  register(){
    console.log(this.registerForm.value);
    this.customerService.saveCustomer(this.registerForm.value)
    .subscribe((res:any)=>{
      console.log(res);
     // this.customer=res;
      if(res==true){
      this.showConfirmation();
      this.router.navigate(['/auth/login']);
      }
      else{
       //alert("User already registered with this email");
       //this.invalid=true;
       const dialogData = new ConfirmationDialogModel('User already exist with this email', ' ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
              minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
       })

      }

      
    })
  }

  redirectToLogin(){
    this.router.navigate(['/auth/login']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }
  showConfirmation(){
    //alert("Your Account is registered");
    const dialogData = new ConfirmationDialogModel('Congratulations!!', 'Account Registered succesfully ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })

  }



  }

 

