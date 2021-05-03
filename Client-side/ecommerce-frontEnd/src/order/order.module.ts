import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material/material.module';
import { CartComponent } from './components/cart/cart.component';
import { ShowCartComponent } from './components/show-cart/show-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SuccessOrderComponent } from './components/success-order/success-order.component';
import { OrderReturnsComponent } from './components/orders-returns/order-returns.component';
import { OrderReturnDetailsComponent } from './components/order-return-details/order-return-details.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';




@NgModule({
  declarations: [
   CartComponent,
    ShowCartComponent,
    CheckoutComponent,
    SuccessOrderComponent,
    OrderReturnsComponent,
    OrderReturnDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    OrderRoutingModule,
 
  
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
  exports:[CartComponent,ShowCartComponent,CheckoutComponent,
    SuccessOrderComponent,OrderReturnsComponent,OrderReturnDetailsComponent]
})
export class OrderModule { }
