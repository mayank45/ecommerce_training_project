import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';





//http://localhost:4200
const routes: Routes = [
 // http://localhost:4200/
   {path: '',component: LayoutComponent,
   children: [
            {path: 'home',loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            { path: 'info', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
            { path: 'cart', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
            {path: '',redirectTo: '/home',pathMatch: 'full'}
             ]
    },

  {path: 'admin',loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];
 
 

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
