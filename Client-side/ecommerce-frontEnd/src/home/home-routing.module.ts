import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileGuard } from './guard/profile.guard';
import { UpdateProfileGuard } from './guard/update-profile.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';


const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'profile',component: ProfileComponent,canActivate:[ProfileGuard]},
  {path: 'update',component: UpdateProfileComponent,canActivate:[UpdateProfileGuard]},
  {path: '**',component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }