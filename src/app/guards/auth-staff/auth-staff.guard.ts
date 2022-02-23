import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStaffGuard implements CanActivate {

  constructor(
    private storage: StorageService,
    private router: Router
  ){

  }

  canActivate(){
    let user : any =  this.storage.getUserStorage();
    if (user && user.user_role_id == 1){
      return true;
    } else {
      this.router.navigate(['/admin/dashboard'])
    }
  }

  
}
