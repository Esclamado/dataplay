import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(
    private storage: StorageService,
    private router: Router
  ){

  }

  canActivate(){
    let user : any =  this.storage.getUserStorage();
    if( !user ){
      return true;
    } else {
      this.router.navigate(['/admin/dashboard'])
    }
  }
  // next: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  // return true;
  
}
