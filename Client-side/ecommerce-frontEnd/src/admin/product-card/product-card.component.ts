import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/core/models/product.model';
import { ProductService } from 'src/core/services/product/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product')
  product:Product;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  productId:number;
  profile:string='assets/images/profilepic.jpg';

 
  constructor(private route:Router,private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productId=this.product.product_id;
    this.getImage();
  }
  
  editProduct(product_id){
    console.log(product_id);
    this.router.navigate(['/../admin/editproduct/'+ product_id]);
    
  }
  
  removeProduct(pid){
    console.log(pid);
    this.productService.deleteProduct(pid)
    .subscribe((res:any)=>{
      console.log(res);
      if(res==true)
     window.location.reload();
      
        
    }); 
  }
  
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
           //this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
           this.productService.getProductsImage(this.productId)
            .subscribe((res:any)  => {
             
              
              console.log(res);
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
           },error=>{
             console.log(error);
           }
           
           );
          }

}
