import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RequestsService } from '../http/requests.service';
import { Url } from '../../../environments/Urls';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/app/lib/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private request: RequestsService,
    private storage: StorageService,
    private env: environment

  ) { this.getUserDetails()}

  user:any;
  token:any;
  userSubject = new BehaviorSubject<any>(null);
  userSubscription = this.userSubject.asObservable();
  data : any = [];

  updateUserDetailsSubscription(data){
    this.userSubject.next(data);
  }

  getUserDetailsApi(){
    return new Promise( (resolve, rejected) => {
      this.request.get(Url.webapi_userprofile_view).then( user => {
        let u: any = user;
        if(!u.error){
          this.user = u.data;
          this.updateUserDetailsSubscription(u.data);
          resolve(u.data);
        }
      }, err => {
          rejected(err);
      }
      )
    })
  }
  login(obj) {
    return new Promise((resolve) => {
      this.request.post(Url.webapi_auth_login, obj).then(data => {
        resolve(data);
      }, error => {
        resolve(error);
      })
    })
  }



  getUserDetails() {
    return new Promise((resolve) => {
      let user = this.env.getCookie('user_profile');
      if (user) {
        // //console.log('user', user);
        this.user = JSON.parse(user);
        resolve(user);
      } else {
        resolve(false);
      }
    })
  }

  
  logout(){
    return new Promise((resolve) => {
      this.request.get(Url.webapi_auth_logout).then(data => {
        resolve(data);
      }, error => {
        resolve(error);
      })
    })
  }




}
