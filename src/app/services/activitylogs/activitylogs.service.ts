import { Injectable } from '@angular/core';
import { Url } from '../../../environments/Urls';
import { RequestsService } from '../../services/http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitylogsService {

  constructor(
    private request: RequestsService
  ) { }

  getActivitylogsListing(limit, page, user_id, search, sort?, from?, to?) {
    return new Promise(resolve => {
    let url = Url.webapi_activitylogs_listing + '?limit=' + limit;
    if(user_id){
      url += '&user_id=' + user_id;
    }
    if(page){
      url += '&page=' + page;
    }
    if(search){
      url += '&keyword=' + search;
    }
    if (sort){
      url += '&order_by_column=' + sort['order_by_column'] + '&order_by=' + sort['order_by'];
    }
    if (from && to) {
      url += '&from=' + from + '&to=' + to;
    }
    this.request.get(url).then(result => {
      resolve(result);
    },error => {
      resolve(error);
    });
  });
  }

  getNotifListing(limit, page, last_id) {
    return new Promise(resolve => {
      let url = Url.webapi_activitylogs_listing + '?notif';
      this.request.get(url).then(result => {
        resolve(result);
      },error => {
        resolve(error);
      });
    });
  }
}
