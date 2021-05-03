import { BaseCdkCell } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Category } from 'src/core/models/Category.model';
import { CategoryService } from 'src/core/services/category/category.service';
import { ConfirmationDialogModel } from 'src/shared/components/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from 'src/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  category: Category = new Category();
  allCategory: Category[] = [];
  pid: number;


  constructor(private dialog: MatDialog,private categoryService: CategoryService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.pid = params.get('product_id');
    });

  }

  getAllCategory() {
    this.categoryService.getCategory()
      .subscribe((res: any) => {
       
        this.allCategory = res;
       
      })
  }

  addCategory() {
    var index = 0;
    //  this.category=this.categoryForm.value;
    this.category.categoryId = this.categoryForm.get("categoryName").value;
    this.category.categoryName = this.categoryForm.get("categoryName").value;
  

    this.allCategory.forEach((item: Category) => {
      if (item.categoryName.toLowerCase() == this.category.categoryName.toLowerCase()) {
        index = 1;
      }
    });

    if (index == 1) {
      //alert("Category alerady present");
      const dialogData = new ConfirmationDialogModel('Category already Present', ' ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })
    } else {

      this.categoryService.saveCategory(this.category)
        .subscribe((res: any) => {
         
          //alert("New Category Added");
          const dialogData = new ConfirmationDialogModel('Category Added Succesfully', '  ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })
          this.getAllCategory();
        })
    }
  }

  back() {
    if(this.pid == 0){
      this.router.navigate(['/../admin/addproduct']);
    }else{
    this.router.navigate(['/../admin/editproduct/' + this.pid]);
    }
  }

}
