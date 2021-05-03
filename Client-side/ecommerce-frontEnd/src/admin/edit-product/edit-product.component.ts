import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/core/models/Category.model';
import { Product } from 'src/core/models/product.model';
import { CategoryService } from 'src/core/services/category/category.service';
import { ProductService } from 'src/core/services/product/product.service';
import { ConfirmationDialogModel } from 'src/shared/components/confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from 'src/shared/components/confirmation-dialog/confirmation-dialog.component';

/*interface Category {
  value: string;
  viewValue: string;
}
*/

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productForm:FormGroup;
  product:Product;
  productId:number;

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  imageData:any;
  
  categories:Category[]=[];
 /* categories:Category[]=[{value:'Electronics',viewValue:'Electronics'},
  {value:'Clothing',viewValue:'Clothing'},{value:'Books',viewValue:'Books'},
  {value:'Accesories',viewValue:'Accesories'},{value:'Bags and Luggage',viewValue:'Bags and Luggage'},
  {value:'Footwear',viewValue:'Footwear'},{value:'Make-up',viewValue:'Make-up'}];
*/
  constructor(private dialog: MatDialog,private router:Router,private productService:ProductService,private activatedRoute:ActivatedRoute,private categoryService:CategoryService) { 

    this.activatedRoute.paramMap.subscribe((params:any) => {
      console.log(params.product_id);
      this.productId=params.get('product_id');
   })

    this.productForm=new FormGroup({
      product_id:new FormControl({value:'',disabled:true}),
      product_name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      product_price: new FormControl('', [Validators.required,Validators.min(1)]),
      total_quantity:new FormControl('',[Validators.required,Validators.min(1)]),
      category:new FormControl('',Validators.required)
    });
  }

  ngOnInit(): void { 
    
    this.getAllCategories();
    this.getProductDetails();
  }

  getAllCategories(){
    this.categoryService.getCategory()
    .subscribe((res:any)=>{
      this.categories=res;
    })
  }

  getProductDetails(){
    this.productService.getProductById(this.productId)
    .subscribe((res:any)=>{
      this.product=res;
      //this.getImage();
      this.initializeForm();
    })
  }


  initializeForm(){
    this.productForm=new FormGroup({
      product_id:new FormControl({value:this.product.product_id,disabled:true}),
      product_name: new FormControl(this.product.product_name, Validators.required),
      description: new FormControl(this.product.description, Validators.required),
      product_price: new FormControl(this.product.product_price, Validators.required),
      total_quantity:new FormControl(this.product.total_quantity,Validators.required),
      category:new FormControl(this.product.category,Validators.required)
    });
  }


  editProduct(){
    console.log(this.productForm.value);
    this.productService.updateProduct(this.product.product_id,this.productForm.value)
    .subscribe((res:any)=>{
      if(res){
       // alert("Product details are updated");
       const dialogData = new ConfirmationDialogModel('Product details are updated', ' ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })
     this.router.navigate(['/../admin/productdetail/'+ this.product.product_id]);
      }else{
        this.router.navigate(['/../admin/productdetail/'+ this.product.product_id]);
    
        //alert ("Some error occured in updating the product details");
        const dialogData = new ConfirmationDialogModel('Some error occured in updating the product details', ' ');
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '500px',
            minWidth:'500px',
            closeOnNavigation: true,
            data: dialogData
        })
      }
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
   this.productService.editProductImage(this.productId,this.imageData) 
   .subscribe((response) => {
     console.log(response);
   });
   //retriving from database
   this.getImage();
 
}
 

  addCategory(){
    this.router.navigate(['/../admin/addcategory/'+this.productId])
  }
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
           this.productService.getProductsImage(this.productId)
            .subscribe((res:any)  => {
            this.retrieveResonse = res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
           });
          }

  }

