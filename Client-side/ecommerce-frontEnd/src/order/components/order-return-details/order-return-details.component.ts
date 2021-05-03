import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { Order } from 'src/core/models/Order.model';
import { OrderDetails } from 'src/core/models/OrderDetails.model';
import { Product } from 'src/core/models/product.model';
import { OrderService } from 'src/core/services/order/order.service';
import { ProductService } from 'src/core/services/product/product.service';

@Component({
  selector: 'app-order-return-details',
  templateUrl: './order-return-details.component.html',
  styleUrls: ['./order-return-details.component.css']
})
export class OrderReturnDetailsComponent implements OnInit {

  orderId:number;
  products:any[]=[];
  totalSum:number;
  orderStatus:string;
  product:Product;
  product_name:string;
  product_price:number;
  product_quantity:number;
  
  constructor(private activatedRoute:ActivatedRoute,private orderService:OrderService,private producService:ProductService) { }

  ngOnInit(): void {
    //get order id form order-return component
    
    this.activatedRoute.params.subscribe((params: any) => {
  
      this.orderId=params.id;
    this.getOrderedProducts();
    this.getOrderStatusandTotal();
  })}

 

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
    
          
        })
    });
  }


  getOrderStatusandTotal(){
    this.orderService.getOrderByOrderId(this.orderId)
    .subscribe((res:Order)=>{
        this.totalSum=res.total_amount;
        this.orderStatus=res.status;
    })
  }

  exportAsPDF()
    {
      
        var data = document.getElementById('invoicePrint');  
        //console.log(data.innerHTML)
        html2canvas(data).then(canvas => {
          var imgWidth = 208;   
          var pageHeight = 295;    
          var imgHeight = canvas.height * imgWidth / canvas.width;  
          var heightLeft = imgHeight;  



        const contentDataURL = canvas.toDataURL('image/png')  
        // let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
        let pdf = new jspdf('l', 'mm', 'a4');
        // Generates PDF in portrait mode
        var position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  ;
        //pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
        pdf.save('Filename.pdf'); 
          
      }); 
    }
}
