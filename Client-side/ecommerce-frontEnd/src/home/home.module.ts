import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/material/material.module';
import{ SwiperConfigInterface, SwiperModule, SWIPER_CONFIG} from 'ngx-swiper-wrapper';
import { ProductsModule } from 'src/products/products.module';

import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from 'src/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface={
  direction: 'horizontal',
  slidesPerView:'auto'
}

@NgModule({
  declarations: [
    BannerComponent,
    HomeComponent,
    ProfileComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SwiperModule,
    ProductsModule,
    FormsModule,
    ReactiveFormsModule,
  
  
  ],
  providers:[{
    provide: SWIPER_CONFIG,
    useValue:DEFAULT_SWIPER_CONFIG},
      MaterialModule,
      SharedModule,
      FormsModule,
      CoreModule,
      NgbModule,
      HttpClientModule,
      Router,
      HttpClient,
      MatDialog
     
]
})
export class HomeModule { }
