import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from 'src/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import {SharedRoutingModule} from './share.routing';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component'
import { CoreModule } from 'src/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  
    ReactiveFormsModule,
    RouterModule,
    SharedRoutingModule

    
  ],
  providers: [
    MaterialModule,
    SharedModule,
    FormsModule,
    CoreModule,
    NgbModule,
    HttpClientModule,
    Router,
    HttpClient,
    MatDialog
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
