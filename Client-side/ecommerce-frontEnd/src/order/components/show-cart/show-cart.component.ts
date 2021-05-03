import { Component, OnInit } from '@angular/core';
import { Product } from 'src/core/models/product.model';
import { CartService } from 'src/core/services/cart/cart.service';
import { SessionStorageService, SessionStorage } from 'angular-web-storage';
import { CustomerService } from 'src/core/services/customer/customer.service';
import { OrderService } from 'src/core/services/order/order.service';
import { Router } from '@angular/router';
import { isTemplateSpan } from 'typescript';
import { ProductService } from 'src/core/services/product/product.service';
import { MessengerService } from 'src/core/services/messenger/messenger.service';
import { ConfirmationDialogModel } from 'src/shared/components/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from 'src/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.css']
})
export class ShowCartComponent implements OnInit {

  cartItems: any[] = [];
  totalSum: number = 0;
  constructor(private dialog:MatDialog,public cartService: CartService, public session: SessionStorageService, private customerService: CustomerService, private orderService: OrderService, private router: Router, private productService: ProductService,private msg:MessengerService) {
  }

  ngOnInit(): void {

    this.getAllCartItems();

  }

  getAllCartItems() {
   this.cartItems = this.session.get("cartItems");
    this.findTotalAmout();
  }

  decreaseQauntity(items) {
    if (items.quantity == 1) {
      //alert("You cannot decrease more");
      const dialogData = new ConfirmationDialogModel('Not Valid operation', ' You cannot decrease more ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })
    } else {
      items.quantity--;
      this.findTotalAmout();
    }
  }

  increaseQauntity(items) {
    if (items.quantity == items.total_quantity) {
     // alert("You cannot increase more");
     const dialogData = new ConfirmationDialogModel('Not Valid operation', ' You cannot increase more ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })
    } else {
      items.quantity++;
      this.findTotalAmout();
    }
  }

  findTotalAmout() {
    this.totalSum = 0;
    if (this.cartItems != null && this.cartItems.length > 0) {
      this.cartItems.forEach(item => {
        this.totalSum += (item.quantity * item.product_price);
      })
    }
  }


  checkout() {
    let email = this.session.get("email");
    if (email == null || email == "") {
      this.router.navigate(['/../../login']);
    }
    else {
      this.session.set("cartItems", this.cartItems);
      this.router.navigate(['cart/checkout']);
    }

  }


  deleteFromCart(item) {
   this.cartItems.forEach((res,index)=>{
     if(item.product_id==res.product_id){
        this.cartItems.splice(index,1);
     }
   })
   this.session.set("cartItems",this.cartItems);
   this.msg.clearMessages();
   this.getAllCartItems();
}

  /*
   for(let i=0;i<this.cartItems.length;i++){
      this.productService.getProductById(this.cartItems[i].product_id)
      .subscribe((res:Product)=>{
        if(2 < this.cartItems[i].quantity){
          alert(res.product_name+" is not available please decrease the quantity");
        }
        if(i==this.cartItems.length-1){
          this.proceedToPaymentPage();
      }
    })
   
    } */





}








