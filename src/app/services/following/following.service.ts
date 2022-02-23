import { Injectable } from '@angular/core';
import { Url } from '../../../environments/Urls';
import { RequestsService } from '../../services/http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  constructor(
    private request: RequestsService
  ) { }

  getFollowingListing(limit, user_id, page, search, sports, location, sort?) {
    return new Promise(resolve => {
    let url = Url.webapi_following_listing + '?limit=' + limit;
    if(user_id){
      url += '&user_id=' + user_id;
    }
    if(page){
      url += '&page=' + page;
    }
    if(search){
      url += '&keyword=' + search;
    }
    if(sports){
      url += '&sports_id=' + sports;
    }
    if(location){
      url += '&location=' + location;
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

  getFollowerListing(limit, user_id, page) {
    return new Promise(resolve => {
    let url = Url.webapi_follower_listing + '?limit=' + limit;
    if(user_id){
      url += '&user_id=' + user_id;
    }
    if(page){
      url += '&page=' + page;
    }
    this.request.get(url).then(result => {
      resolve(result);
    },error => {
      resolve(error);
    });
  });
  }
}
