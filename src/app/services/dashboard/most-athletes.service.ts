import { Injectable } from '@angular/core';
import { Url } from '../../../environments/Urls';
import { RequestsService } from '../../services/http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class MostAthletesService {

  constructor(
    private request: RequestsService) { }


  getProvinceMostAthletes() {
    return new Promise(resolve => {
      let url = Url.webapi_dshb_province;

      this.request.get(url).then(result => {
        resolve(result);
      },error => {
        resolve(error);
      });
    });
  }

  getSportsMostAthletes() {
    return new Promise(resolve => {
      let url = Url.webapi_dshb_sports;

      this.request.get(url).then(result => {
        resolve(result);
      },error => {
        resolve(error);
      });
    });
  }

  getTop10Listing(date) {
    return new Promise(resolve => {
      let url = Url.webapi_dshb_top10;
      if(date){
        url += '?date=' + date;
      }
      this.request.get(url).then(result => {
        resolve(result);
      },error => {
        resolve(error);
      });
    });
  }

}
