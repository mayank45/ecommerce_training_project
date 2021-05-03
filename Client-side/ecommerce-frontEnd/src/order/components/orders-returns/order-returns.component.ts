import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { Customer } from 'src/core/models/customer.model';
import { Order } from 'src/core/models/Order.model';
import { CustomerService } from 'src/core/services/customer/customer.service';
import { OrderService } from 'src/core/services/order/order.service';


@Component({
  selector: 'app-order-returns',
  templateUrl: './order-returns.component.html',
  styleUrls: ['./order-returns.component.css']
})
export class OrderReturnsComponent implements OnInit {

  /*orders:any[]=[
    {order_id:1,order_date:Date.now(),status:"Shipped"},
    {order_id:2,order_date:Date.now(),status:"Pending"},
    {order_id:3,order_date:Date.now(),status:"Approved"},
    {order_id:4,order_date:Date.now(),status:"Shipped"},
    {order_id:5,order_date:Date.now(),status:"Shipped"},
    
  ];
  */
 orders:Order;
 flag:boolean=false;
 
  
  constructor(private orderService:OrderService,private customerService:CustomerService,private router:Router,private session:SessionStorageService) { }

  
  
  ngOnInit(): void {
   
    this.getCustomerId();
  }


  getCustomerId(){
    let email=this.session.get("email");
    if(email == null || email == ""){
      //show no orders
    }else{
      this.customerService.displayCustomerByEmail(email)
      .subscribe((res:Customer)=>{
        this.fetchAllOrders(res.customerId);
      })
    }
  }
  

  fetchAllOrders(cid){
    this.orderService.getAllOrdersByCustomerId(cid)
    .subscribe((res:any)=>{
      if(res==null || res==""){
        this.flag=false;

      }else{
        this.flag=true;
      this.orders=res;
      }
    })
  }
  
 
 
 
  viewOrderDetails(orderId){
  
    
    this.router.navigate(['/../cart/previousdetails',orderId]);
    //by routing pass data to order-returns-detail page
  }
  

}
