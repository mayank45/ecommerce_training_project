import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {  SessionStorageService, SessionStorage } from 'angular-web-storage';



import { Customer } from 'src/core/models/customer.model';
import { Order } from 'src/core/models/Order.model';
import { OrderDetails } from 'src/core/models/OrderDetails.model';
import { Product } from 'src/core/models/product.model';
import { CustomerService } from 'src/core/services/customer/customer.service';
import { OrderService } from 'src/core/services/order/order.service';
import { ProductService } from 'src/core/services/product/product.service';
import { Thumbs } from 'swiper';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems:any[]=[];
  customer:Customer;
  cartTotal:number=0;
  billingAddress:string;
  billingMobileNumber:number;
  order:Order=new Order();
  orderDetails:OrderDetails=new OrderDetails();
  product:Product;
 
 
  editFlag:boolean=false;
  constructor(public session:SessionStorageService,public customerService:CustomerService,public orderService:OrderService,public router:Router,public productService:ProductService) { }

  ngOnInit(): void {
    this.getCartTotal();
    this.getCustomerDetails();
    

  }

  getCustomerDetails(){
    let email=this.session.get("email");
    this.customerService.getCustomerDetails(email)
    .subscribe((res:Customer)=>{
      this.customer=res;
 
      this.getBillingDetails();
    })

  }

  getBillingDetails(){
   if(this.customer.deliveryAddress==null || this.customer.deliveryAddress =="" ){
    this.billingAddress=this.customer.address;
      
  }else{
    this.billingAddress=this.customer.deliveryAddress;
    
  }
  this.billingMobileNumber=this.customer.phno;
   
  }

 
  getCartTotal()
  {
    this.cartItems=this.session.get("cartItems");
    if( this.cartItems!=null && this.cartItems.length > 0){
      this.cartItems.forEach(item=>{
        this.cartTotal+=(item.quantity*item.product_price);
      })
    }
  }

  proceedToPayment(){
      this.order.customerid=this.customer.customerId;
       this.order.status="Ordered";
      this.order.total_amount=this.cartTotal;
    //  this.order.dateOfOrder=Date.now();
    //order date created automatically in microservice
      this.createOrderData();
   }


   
   createOrderData(){
     
    this.orderService.createOrder(this.order)
    .subscribe((res:number)=>{
      //get order id
        this.order.orderid=res;
        this.createOrderDetailsData();
        //add data to orderdetails table
      
    });
   }



   createOrderDetailsData(){
      this.orderDetails.orderid=this.order.orderid;
     let productArray=this.session.get("cartItems");
     if( productArray.length > 0){
        productArray.forEach(item=>{
            this.orderDetails.productid=item.product_id;
            this.orderDetails.quantity=item.quantity;
            //update product total quantity in db
            this.updateProductTotalQuantity(item.product_id,item);
          this.orderService.createOrderDetails(this.orderDetails)
          .subscribe((res:any)=>{
          
          })
      })
    }
      this.session.set("cartItems","");
    this.router.navigate(['/cart/success/' + this.order.orderid]);
   }
  
   updateProductTotalQuantity(pid,item){
     let prd:Product=new Product();
     prd.product_id=pid;
     prd.product_name=item.product_name;
     prd.product_price=item.product_price;
     prd.category=item.category;
     prd.description=item.description;
     prd.total_quantity=item.total_quantity-item.quantity;
  
      this.productService.updateProduct(pid,prd)
      .subscribe((res:any)=>{
   
      })
   }
EditableFields(){
  this.editFlag=true;
}

updateCustomerBillingDetails(newAddress){

 this.editFlag=true;

 
  this.customer.deliveryAddress=newAddress;
  let email=this.session.get("email");
 
 
 this.customerService.updateCustomer(email,this.customer)
  .subscribe((res:any)=>{
    
    if(res==true){
    this.billingAddress=this.customer.deliveryAddress;
    }
    this.editFlag=false;
  })
  
  }

  




}

