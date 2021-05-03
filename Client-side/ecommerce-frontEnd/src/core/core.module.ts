import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from './services/customer/customer.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/material/material.module';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
 
   
  providers: [
    CustomerService,
    MaterialModule,
    SharedModule,
    FormsModule,
    CoreModule,
    NgbModule,
    HttpClientModule,
    Router,
    HttpClient,
    MatDialog
     ]
})

export class CoreModule { }
