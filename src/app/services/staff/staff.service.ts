import { Injectable } from '@angular/core';
import { Url } from '../../../environments/Urls';
import { RequestsService } from '../../services/http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private request: RequestsService
  ) { }

  getStaffListing(limit, user_type, search, page, order, sports_id, location, status, sort?) {
    return new Promise(resolve => {
    let url = Url.webapi_athleteinfo_listing + '?limit=' + limit;
    if(user_type){
      url += '&user_type=' + user_type;
    }
    if(search){
      url += '&keyword=' + search;
    }
    if(page){
      url += '&page=' + page;
    }
    if(order){
      url += '&order=' + order;
    }
    if(sports_id){
      url += '&sports_id=' + sports_id;
    }
    if(location){
      url += '&location=' + location;
    }
    if(status){
      url += '&status=' + status;
    }
    if (sort){
      url += '&order_by_column=' + sort['order_by_column'] + '&order_by=' + sort['order_by'];
    }
    this.request.get(url).then(result => {
      resolve(result);
    },error => {
      resolve(error);
    });
  });
  }

  getStaffView(userId) {
    return new Promise(resolve => {
    let url = Url.webapi_staff_view + '?';
    if(userId){
      url += '&userId=' + userId;
    }
    this.request.get(url).then(result => {
      resolve(result);
    },error => {
      resolve(error);
    });
    });
  }

  getAthleteView(userId) {
    return new Promise(resolve => {
    let url = Url.webapi_athleteinfo_view + '?';
    if(userId){
      url += '&userId=' + userId;
    }
    this.request.get(url).then(result => {
      resolve(result);
    },error => {
      resolve(error);
    });
    });
  }

  saveStaff(formData) {
    return new Promise(resolve => {
    let url = Url.webapi_staff_add;
    this.request.post(url, formData).then(result => {
      resolve(result);
    },error => {
      resolve(error);
    });
    });
  }

}
