import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginPageGuard implements CanActivate {

constructor(private sessionStorage:SessionStorageService,private router:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      let email=this.sessionStorage.get("email");

      if(email!=null && email!=""){
        //means user is logged in
        this.router.navigate(['/../home']);
      }else{

        return true;
      }

  }
  
}
