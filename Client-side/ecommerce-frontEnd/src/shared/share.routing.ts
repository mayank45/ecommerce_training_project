import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';

const routes: Routes = [
    {path: 'about',component: AboutUsComponent},
    {path: 'contact',component: ContactUsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }