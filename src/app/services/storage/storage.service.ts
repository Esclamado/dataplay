import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { RequestsService } from '../http/requests.service';
import { environment } from 'src/app/lib/environment';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  rememberme: boolean;
  constructor(
    public localSt: LocalStorageService,
    public sessionSt: SessionStorageService,
    private request: RequestsService,
    private env: environment,

  ) { }

  storageSet(key, value, session = false) {
    let newKey = this.env.subdomain + key;
    if (session) {
      this.sessionSt.store(newKey, value);
    } else {
      this.localSt.store(newKey, value);
    }
  }

  storageGet(key, session = false) {
    let newKey = this.env.subdomain + key;
    var data;
    if (session) {
      data = this.sessionSt.retrieve(newKey);
    } else {
      data = this.localSt.retrieve(newKey);
    }
    return data;
  }

  storageClear() {
    // this.localSt.clear();
    // this.sessionSt.clear();
    // this.env.deleteCookie();

    this.localSt.clear(this.env.subdomain + 'aup_dplph');
    this.sessionSt.clear(this.env.subdomain + 'aup_dplph');

    this.localSt.clear(this.env.subdomain + 'aup_dplph_token');
    this.sessionSt.clear(this.env.subdomain + 'aup_dplph_token');
    this.env.deleteCookie();

  }

  // getUserStorage() {
  //   let user:any = false;

  //   let user_profile = this.localSt.retrieve('user_profile');

  //   if (!user_profile) {
  //     user_profile = this.sessionSt.retrieve('user_profile');
  //     // this.request.token = access_token;

  //   } else {
  //     this.rememberme = true;
  //     // this.request.token = access_token;
  //   }

  //   user = user_profile;

  //   return user;
  // }


    getUserStorage(){

        let user_profile = this.env.getCookie('user_profile');
        if(user_profile){
          return JSON.parse(user_profile);
        }else{
          return false;
        }

    }

  checkStoredData(key) {

    let data = this.sessionSt.retrieve(key)

    let stored = data ? data : false;

    return stored;

  }

  /**
   * get data from storage using the given name
   * @param name  
   */
  get(name) {
    return new Promise(resolve => {
      let data: any = this.localSt.retrieve(name);
      if (!data) {
        data = this.localSt.retrieve(name);
      }
      if (data) {
        resolve(data);
      } else {
        resolve(null);
      }
    });
  }

  updateUserProfile(data){
    this.storageSet('aup_dplph',data);
  }

}