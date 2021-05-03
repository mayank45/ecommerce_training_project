import { Injectable } from '@angular/core';
import { CartService } from './cart/cart.service';
import { CustomerService } from './customer/customer.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  constructor(  public cartService: CartService,public customerService: CustomerService) { }
}


