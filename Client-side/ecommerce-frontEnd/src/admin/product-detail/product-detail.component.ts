import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { ProductService } from 'src/core/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
product_id:number;
product_name:string;
total_quantity:number;
description:string;
category:string;
product_price:number;
pid:number;
retrievedImage: any;
base64Data: any;
retrieveResonse: any;
message: string;
imageName: any;
profile:string='assets/images/profilepic.jpg';
  //productId:number;
//Product_Image:string='assets/images/profilepic.jpg';








  constructor(private productService:ProductService,private router:Router,private session: SessionStorageService,private activatedRoute: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      console.log(params.product_id);
      this.pid=params.get('product_id');
      this.getProductInformation();
 //this._Activatedroute.paramMap.subscribe(params => { 
      //  this.orderId = params.get('id'); 
    //});
    })

  }
  getProductInformation(){
  
    this.productService.getProductById(this.pid)
     .subscribe((data:any)=>{
      console.log(data);
     this.product_id=data.product_id;
     this.product_name=data.product_name;
     this.total_quantity=data.total_quantity;
     this.description=data.description;
     this.category=data.category;
     this.product_price=data.product_price;
     this.getImage();


     
     
    }); 
    
  }
  
  editProduct(product_id){
    console.log(product_id);
    this.router.navigate(['/../admin/editproduct/'+ product_id]);
    
  }

  getImage() {
    //Make a call to Spring Boot to get the Image Bytes.
           //this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
           this.productService.getProductsImage(this.product_id)
            .subscribe((res:any)  => {
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
           });
          }

}
