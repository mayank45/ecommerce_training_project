import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { Order } from 'src/core/models/Order.model';
import { CustomerService } from 'src/core/services/customer/customer.service';
import { OrderService } from 'src/core/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders:Order;
  flag:boolean=true;
  
  constructor(private orderService:OrderService,private customerService:CustomerService,private router:Router,private session:SessionStorageService) { }

  ngOnInit(): void {
    this.fetchAllOrders();
  }



  fetchAllOrders(){
    this.orderService.getAllOrders()
    .subscribe((res:any)=>{
      if(res==null || res==""){
        this.flag=false;
    //  console.log(res);
      }else{
        this.flag=true;
      this.orders=res;
      }
    })
  }

  viewOrderDetails(orderId){
    console.log(orderId);
    
    this.router.navigate(['/../admin/orderdetails',orderId]);
    //by routing pass data to order-returns-detail page
  }
}
