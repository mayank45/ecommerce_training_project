import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/core/models/product.model';
import { ProductService } from 'src/core/services/product/product.service';
import { RepositoriesService } from 'src/core/services/repositories.service';
import {MessengerService} from "../../core/services/messenger/messenger.service";
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input('product')
  product:Product;
  
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  productId:number;
  profile:string='assets/images/profilepic.jpg';

  constructor(private msg:MessengerService,private productService:ProductService) { }

  ngOnInit(): void {
    this.productId=this.product.product_id;
    this.getImage();
  
  }

  addCart(){
   
      this.msg.sendMsg(this.product);  
    }

    getImage() {
      //Make a call to Spring Boot to get the Image Bytes.
             this.productService.getProductsImage(this.productId)
              .subscribe((res:any)  => {
              this.retrieveResonse = res;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
             });
            }

}
