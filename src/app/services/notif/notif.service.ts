import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Url } from '../../../environments/Urls';
import { RequestsService } from '../../services/http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(
    private request: RequestsService
  ) { }
  notifications = new BehaviorSubject<any>(null);
  notifData = new BehaviorSubject<any>(null);
  notifLastID:any;
  temporaryArray:any;

  getNotifListing(limit = null, page = null, user_id ,last_id = false) {
      var temporyArray:any = null;
    return new Promise(resolve => {
      let url = Url.webapi_notification_listing;
      let params = '?userId=' + user_id;
      limit ? params += '&limit=' + limit : params += '&limit=10';
      page ? params += '&page=' + page : "";
      last_id ? params += '&last_id=' + this.notifLastID : "";
      this.request.get(url+params).then(result => {
        // resolve(result);
        let res = result;
        if (res.datas) {
          if (!limit && !page) {
            // console.log('may limit at page');
            this.notifications.next(res.datas);
          } else {
            // console.log('walang limit at page');
            temporyArray = this.notifications.getValue();
            res.datas.forEach(element => {
              temporyArray.push(element)
            });
          }
        }
        this.notifData.next(res);
      }).finally(()=>{
        limit && page ? this.notifications.next(temporyArray): null;
        temporyArray = null;
        resolve(true)
      })
    });
  }

  getNotif(notif_id){
    let url = Url.webapi_notification_listing + '?notif_id=' + notif_id;
    return new Promise(resolve => {
      this.request.get(url).then(result => {
        resolve(result);
      },error => {
        resolve(error);
      });
    });
  }

  readNotif(notif_id, read_all) {
    let formData= new FormData();

    if (notif_id){
      formData.append('notif_id', notif_id);
    }
    if (read_all){
      formData.append('read_all', read_all);
    }

    return new Promise(resolve => {
      let url = Url.webapi_notification_read;
      this.request.post(url,formData).then(result => {
        resolve(result);
      },error => {
        resolve(error);
      });
    });
  }

  setLastId(){
    let notifs = this.notifications.getValue();
    if(notifs && notifs.length > 0 ){
      this.notifLastID = notifs[parseInt(notifs.length) - 1].id;
    }
  }

  addNotif(data){
    let temp = this.notifData.getValue();

    if (!temp.datas){
      temp.datas = [data];
    } else {
      temp.datas.unshift(data)
    }
    this.notifData.next(temp);
    return temp;
  }
}
