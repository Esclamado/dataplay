import { Injectable } from '@angular/core';
import { Url } from '../../../environments/Urls';
import { RequestsService } from '../../services/http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(
    private request: RequestsService) { }

  getCMSListing() {
    return new Promise(resolve => {
      let url = Url.webapi_cms_listing;

      this.request.get(url).then(result => {
        resolve(result);
      },error => {
        resolve(error);
      });
    });
  }

  getCMS(id) {
    return new Promise(resolve => {
      let url = Url.webapi_cms_listing;
      if(id){
        url += '?id=' + id;
      }
      this.request.get(url).then(result => {
        resolve(result);
      },error => {
        resolve(error);
      });
    });
  }

  updateCMS(id,content) {
    let formData= new FormData();
    formData.append('content', content);
    formData.append('id', id);

    return new Promise(resolve => {
      let url = Url.webapi_cms_save;
      this.request.post(url,formData).then(result => {
        resolve(result);
      },error => {
        resolve(error);
      });
    });
  }
}
