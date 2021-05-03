import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/core/services/category/category.service';
import { Product } from 'src/core/models/product.model';
import { ProductService } from 'src/core/services/product/product.service';
import { ConfirmationDialogModel } from 'src/shared/components/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from 'src/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

selectedFile: File;
retrievedImage: any;
base64Data: any;
retrieveResonse: any;
message: string;
imageName: any;
productId:number;
 imageData:any;


  
  
  
  productForm:FormGroup;
  categories:Category[];

  constructor(private dialog:MatDialog,private productService:ProductService,private router: Router,private categoryService:CategoryService) { 
    this.productForm = new FormGroup({

      product_name: new FormControl('', Validators.required),
      
      description: new FormControl('', Validators.required),

      product_price: new FormControl('', [Validators.required,Validators.min(1)]),
      total_quantity:new FormControl('',[Validators.required,Validators.min(1)]),
      category:new FormControl('',Validators.required)

  
  });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  isValidInput(fieldName): boolean {
    return this.productForm.controls[fieldName].invalid &&
      (this.productForm.controls[fieldName].dirty || this.productForm.controls[fieldName].touched);
  }

  getAllCategories(){
    this.categoryService.getCategory()
    .subscribe((res:any)=>{
      this.categories=res;
    })
  }


  saveProduct(){
  console.log(this.productForm.value);
    const product=this.productForm.value;
      
     this.productService.saveProduct(this.productForm.value)
     .subscribe((res:Product)=>{
      console.log(res);
      this.productId=res.product_id;
      
    });
  
 
    

  
  }


 //Gets called when the user selects an image
  public onFileChanged(event) {
   //Select File
   this.selectedFile = event.target.files[0];
 }

 //Gets called when the user clicks on submit to upload the image

onUpload() {
   console.log(this.selectedFile);
  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.imageData=uploadImageData;
    // saving image in database
    this.productService.saveProductImage(this.productId,this.imageData) 
    .subscribe((response) => {
      console.log(response);
    });
   // this.getImage();
}

ProductAdded(){
  //alert("Product added");
  const dialogData = new ConfirmationDialogModel('Product Added Succesfully', ' yay!! ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })
  this.router.navigate(['/../admin/home']);
  
}



//Gets called when the user clicks on retieve image button to get the image from back end
   getImage() {
 //Make a call to Sprinf Boot to get the Image Bytes.
        //this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
        this.productService.getProductsImage(this.productId)
         .subscribe((res:any)  => {
           
         this.retrieveResonse = res;
         this.base64Data = this.retrieveResonse.picByte;
         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        });
       }








  
  addCategory(){
    this.router.navigate(['/../admin/addcategory/0']);
  }




}
