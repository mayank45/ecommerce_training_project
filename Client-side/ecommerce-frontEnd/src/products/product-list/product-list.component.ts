import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from 'src/core/models/Category.model';
import { Product } from 'src/core/models/product.model';
import { CategoryService } from 'src/core/services/category/category.service';
import { ProductService } from 'src/core/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[];
  allProducts: Product[] = [];
  categories: Category[] = [];
  selCategory: any = "All";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  
  //private url:string = "http://localhost:3000/Products";
  constructor(private productService:ProductService,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
    

    //this.dataSource.paginator = this.paginator;

  }

  getAllCategories() {

    this.categoryService.getCategory()
      .subscribe((res: any) => {
        this.categories = res;
      })
  }

  getAllProducts(){
    this.productService.getProducts()
    .subscribe((res:any)=>{
      this.allProducts = res;
      this.products = this.allProducts;
    })
  }
 

  getSelectedCategory(event: any) {
    this.selCategory = event.target.value;
    this.filterProducts();

  }


  filterProducts() {
    if (this.selCategory == "All") {
      this.products=this.allProducts;
    }
    else{
      this.products = [];
      this.allProducts.forEach((item) => {
        if (item.category == this.selCategory) {
          this.products.push(item);
        }
      })

    }
 

  }

 


  }


