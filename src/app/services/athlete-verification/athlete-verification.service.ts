import { Injectable } from '@angular/core';
import { Url } from 'src/environments/Urls';
import { RequestsService } from '../http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class AthleteVerificationService {

  constructor(
    private request: RequestsService

  ) { }
  getVerificationListing(limit, user_type, search, page, filter?) {
    return new Promise(resolve => {
    let url = Url.webapi_verificationrequest_listing + '?limit=' + limit;
    if(user_type){
      url += '&user_type=' + user_type;
    }
    if(search){
      url += '&keyword=' + search;
    }
    if(page){
      url += '&page=' + page;
    }
    if(filter){
      url += '&sport=' + filter;
    }
    this.request.get(url).then(result => {
      resolve(result);        
    },error => {
      resolve(error);
    });
  });
  }

}
