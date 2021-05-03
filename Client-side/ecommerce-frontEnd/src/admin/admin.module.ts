import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminRoutingModule } from './admin-routing';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from 'src/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AddProductComponent,
    AdminHomeComponent,
    ProductCardComponent,
    EditProductComponent,
    AddCategoryComponent,
    AdminHeaderComponent,
    ProductDetailComponent,
    OrderListComponent,
    OrderDetailsComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule
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
  exports:[AddProductComponent,AdminHomeComponent,ProductCardComponent,
    EditProductComponent,
    AddCategoryComponent]
})
export class AdminModule { }
