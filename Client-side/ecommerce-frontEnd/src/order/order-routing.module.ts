import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustLoginComponent } from 'src/auth/cust-login/cust-login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderReturnDetailsComponent } from './components/order-return-details/order-return-details.component';
import { OrderReturnsComponent } from './components/orders-returns/order-returns.component';
import { ShowCartComponent } from './components/show-cart/show-cart.component';
import { SuccessOrderComponent } from './components/success-order/success-order.component';



const routes: Routes = [
  {
    path: 'show',
    component: ShowCartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'success/:id',
    component: SuccessOrderComponent
  },
  {path:'login',
  component:CustLoginComponent
},
{path:'previous',
  component:OrderReturnsComponent
},
{path:'previousdetails/:id',
  component:OrderReturnDetailsComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
