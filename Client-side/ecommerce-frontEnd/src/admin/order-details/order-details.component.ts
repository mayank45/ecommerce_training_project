import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { MatDialog, _closeDialogVia } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/core/models/Order.model';
import { Product } from 'src/core/models/product.model';
import { OrderService } from 'src/core/services/order/order.service';
import { ProductService } from 'src/core/services/product/product.service';
import { ConfirmationDialogModel } from 'src/shared/components/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from 'src/shared/components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
 // flag:boolean=false;
  order:Order;
  orderId:number;
  customerId:number;
  products:any[]=[];
  totalSum:number;
  orderStatus:string="Ordered";
  product:Product;
  product_name:string;
  product_price:number;
  product_quantity:number;

  

  constructor(private activatedRoute:ActivatedRoute,private orderService:OrderService,private producService:ProductService,public dialog: MatDialog,private router:Router) { }

  openDialog() {
   this.order.status="Approved";
    this.orderService.updateOrder(this.orderId,this.order)
    .subscribe((res:boolean)=>{
     console.log(res);
     window.location.reload();
      
   })

   
    //alert("Order Approved");
    const dialogData = new ConfirmationDialogModel('Order Approved', '  ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })
  }


  ngOnInit(): void {
    //get order id form order-return component
    this.activatedRoute.params.subscribe((params: any) => {
      console.log(params.id);
      this.orderId=params.id;
    this.getOrderedProducts();
    this.getOrderStatusandTotal();
    
  })
  }

  getOrderedProducts(){
    this.orderService.getAllOrderDetailsByCustomerId(this.orderId)
    .subscribe((res:any)=>{

      this.getProductDetails(res);

     // this.products=res;
     
    })
    
  }
  
  getProductDetails(res){
    res.forEach(item => {
        this.producService.getProductById(item.productid)
        .subscribe((prd:Product)=>{
          this.product_name=prd.product_name;
          this.product_price=prd.product_price;
          this.product_quantity=item.quantity;
          this.products.push({name:this.product_name,price:this.product_price,qty:this.product_quantity});
          //console.log(prd);
          
        })
    });
  }


  getOrderStatusandTotal(){
    this.orderService.getOrderByOrderId(this.orderId)
    .subscribe((res:Order)=>{
       this.order=res; 
       this.totalSum=res.total_amount;
        this.customerId=res.customerid;
        this.orderStatus=res.status;
    })
  }
 



}

// @Component({
//   selector: 'app-approve-order',
//   templateUrl:'approve-order.component.html',
// })
// export class DialogElementsExampleDialog {
//   // orderId:number;
//   // customerId:number;
//    orderStatus:string;
//   constructor(private router:Router,private orderService:OrderService){}
//   okay(){
   
//   }
  

  // getOrderStatusandOrderId(){
  //   this.orderService.getOrderByOrderId(this.orderId)
  //   .subscribe((res:Order)=>{
  //       this.customerId=res.customerid;
  //       this.orderStatus=res.status;
  //   })
  // }


// }
