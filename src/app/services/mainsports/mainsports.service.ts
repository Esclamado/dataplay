import { Injectable } from '@angular/core';
import { Url } from '../../../environments/Urls';
import { RequestsService } from '../../services/http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class MainsportsService {

  constructor(
    private request: RequestsService
  ) { }

  getMainSportsListing() {
    return new Promise(resolve => {
    let url = Url.webapi_mainsports_listing + '?limit=' + '500';
    this.request.get(url).then(result => {
      resolve(result);
    },error => {
      resolve(error);
    });
  });
  }
}
