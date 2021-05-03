import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductComponent } from 'src/admin/add-product/add-product.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private host:string = "http://localhost:5555";

  constructor(private http: HttpClient) {}

  getProductsImage(productId){
    return this.http.get(`${this.host}/products/get/${productId}`);
  }
  saveProductImage(productId, imageFile){
    return this.http.post(`${this.host}/products/upload/${productId}`, imageFile);
  }
  editProductImage(productId, imageFile){
    return this.http.put(`${this.host}/products/editProductImage/${productId}`, imageFile);

  }
  
  
  getProducts(){
    return this.http.get(`${this.host}/products`);
  }

  getProductById(id){
    return this.http.get(`${this.host}/products/${id}`);
  }

   saveProduct(product){
    return this.http.post(`${this.host}/products`, product);
  }

  updateProduct(id,product){
    return this.http.put(`${this.host}/products/${id}`,product);
  }

  deleteProduct(id){
  
    return this.http.delete(`${this.host}/products/${id}`);
  }

}

