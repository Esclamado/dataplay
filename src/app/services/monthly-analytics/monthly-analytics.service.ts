import { Injectable } from '@angular/core';
import { Url } from '../../../environments/Urls';
import { RequestsService } from '../../services/http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class MonthlyAnalyticsService {

  constructor(
    private request: RequestsService
  ) { }

  getMonthlyAnalyticsListing(limit, userId, page, date){
    return new Promise(resolve => {
    let url = Url.webapi_monthlyanalytics_listing + '?limit=' + limit;
    if(userId){
      url += '&user_id=' + userId;
    }
    if(page){
      url += '&page=' + page;
    }
    if(date){
      url += '&date=' + date;
    }
    /* if(search){
      url += '&keyword=' + search;
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
    } */
    this.request.get(url).then(result => {
      resolve(result);
    },error => {
      resolve(error);
    });
  });
  }
}
