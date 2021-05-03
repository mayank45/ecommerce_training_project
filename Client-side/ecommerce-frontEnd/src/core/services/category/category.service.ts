import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private host:string = "http://localhost:5555";
  constructor(private http:HttpClient) { }

  getCategory(){
    return this.http.get(`${this.host}/products/category`);
  }


   saveCategory(category){
    return this.http.post(`${this.host}/products/save`, category);
  }
}
