import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private storage: StorageService,
    private router: Router
  ){

  }
  canActivate() {

    let user : any =  this.storage.getUserStorage();

    if( user && user.hasOwnProperty('user_role_id') && user.user_role_id <= 2){
      return true;
    } else {
      // console.log('not log in')
      this.router.navigate(['/login'])
    }

}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
