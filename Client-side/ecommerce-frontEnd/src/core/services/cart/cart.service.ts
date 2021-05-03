import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

private cartData:any[]=[];

public setCartData(cartItems){
  this.cartData=cartItems;
   console.log(this.cartData);
}

public getCartData(){

  return this.cartData;
}

 constructor(){
   
 }
}
