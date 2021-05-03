
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { Product } from 'src/core/models/product.model';
import { CartService } from 'src/core/services/cart/cart.service';
import { MessengerService } from 'src/core/services/messenger/messenger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  flag: boolean = false;
  EmailId: string;



  cartItems: any[] = [];
  cartTotal = 0;
  constructor(private session: SessionStorageService, private router: Router, private msg: MessengerService, private cartService: CartService) {
    this.EmailId = this.session.get("email");

  }

 

  ngOnInit(): void {

    

    if (this.EmailId != null && this.EmailId != "") {
      this.flag = true;
    } else {
      this.flag = false;
    }


    this.msg.getMsg().subscribe((product: Product) => {

      this.cartItems=[];
      if (product) {

       
        var index = 0;
        if (this.session.get("cartItems") != null && this.session.get("cartItems") != "") {

          this.cartItems = this.session.get("cartItems");
          this.cartItems.forEach(items => {
            if (items.product_id == product.product_id) {
              index = 1;
            }
          });
        }


          if (index == 1) {
            alert(product.product_name +" alerady added to the cart");
          } else {
            this.cartItems.push({
              product_id: product.product_id,
              product_name: product.product_name,
              product_price: product.product_price,
              total_quantity: product.total_quantity,
              quantity: 1,
              description: product.description,
              category: product.category,
              product_image: product.product_image
            });
            this.cartTotal = this.cartTotal + 1;


            this.session.set("cartItems", this.cartItems);
          }
        

        this.getCartItems();
      }//product not null

      else {
        this.getCartItems();
      }
    })




  }

  getCartItems() {
    this.cartTotal = 0;
    let Items: Product[] = this.session.get("cartItems");
    if (Items != null && Items.length > 0) {
      Items.forEach(item => {
        this.cartTotal += 1;
      })
    }
    

   // this.cartItems=null;
  }

  logout() {
    this.session.set('email',"");
    window.location.reload();


  }

  goToOrders() {
    if (this.EmailId == null || this.EmailId == "") {
      this.router.navigate(['/../auth/login']);
    } else {
      this.router.navigate(['/../cart/previous']);
    }
  }
  goToProfile() {
    console.log(this.EmailId);

    if (this.EmailId == null || this.EmailId == "") {
      console.log("here");
      this.router.navigate(['/../auth/login']);
    } else {
      this.router.navigate(['/../home/profile']);
    }
  }


}
