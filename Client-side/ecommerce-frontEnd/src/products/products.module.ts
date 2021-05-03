import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { MaterialModule } from 'src/material/material.module';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';




@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
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
  exports:[
    ProductItemComponent,
    ProductListComponent
  
  ]
})
export class ProductsModule { }
