import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/core/models/Category.model';
import { Product } from 'src/core/models/product.model';
import { CategoryService } from 'src/core/services/category/category.service';
import { ProductService } from 'src/core/services/product/product.service';
import { isTemplateExpression } from 'typescript';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  products: Product[] = [];
  allProducts: Product[] = [];
  categories: Category[] = [];

  selCategory: any = "All";
  constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();

  }

  getAllCategories() {

    this.categoryService.getCategory()
      .subscribe((res: any) => {
        this.categories = res;
      })
  }


  getAllProducts() {

    this.productService.getProducts()
      .subscribe((res: any) => {
        this.allProducts = res;
        this.products = this.allProducts;
      });


  }

  getSelectedCategory(event: any) {
    this.selCategory = event.target.value;
    console.log(this.selCategory);
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
    console.log(this.products);

  }


  goToAddProduct() {
    this.router.navigate(['/../admin/addproduct']);

  }


}
