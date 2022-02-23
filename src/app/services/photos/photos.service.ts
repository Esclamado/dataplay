import { Injectable } from '@angular/core';
import { Url } from 'src/environments/Urls';
import { RequestsService } from '../http/requests.service';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(
    private request: RequestsService
  ) { }



  getPhotosByID(id) {
    let formData = new FormData();
    formData.append('athlete_id', id);

    return new Promise((resolve, reject) => {
      this.request.post(Url.webapi_photos_listing, formData).then(res => {
        let r: any = res;
        if (r.error) {
          reject(r)
        } else {
          resolve(r);
        }
      }, err => {
        reject(err)
      })
    })

  }
}
