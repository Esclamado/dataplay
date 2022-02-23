import { Injectable } from '@angular/core';
import { Url } from '../../../environments/Urls';
import { RequestsService } from '../../services/http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class CareerHighlightsService {

  constructor(
    private request: RequestsService
  ) { }

  getCareerHighlightsListing(limit, userId, sport) {
    return new Promise(resolve => {
    let url = Url.webapi_careerhighlights_listing + '?limit=' + limit;
    if(userId){
      url += '&athlete_id=' + userId;
    }
    if(sport){
      url += '&sports_id=' + sport;
    }
    /* if(search){
      url += '&keyword=' + search;
    }
    if (sort){
      url += '&order_by_column=' + sort['order_by_column'] + '&order_by=' + sort['order_by'];
    }
    if (from && to) {
      url += '&from=' + from + '&to=' + to;
    } */
    this.request.get(url).then(result => {
      resolve(result);
    },error => {
      resolve(error);
    });
  });
  }
}
