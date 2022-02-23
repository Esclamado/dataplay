import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { environment } from 'src/app/lib/environment';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private http: HttpClient,
    private envs: environment
  ) { }
  post(url, data) : any {
    return new Promise((resolve) => {
      this.http.post(env.api_url + url, data, this.envs.getHttpOptions()).subscribe(
        result => {
          resolve(result);
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  get(url) :any {
    return new Promise((resolve) => {
      this.http.get(env.api_url + url, this.envs.getHttpOptions()).subscribe(
        result => {
          resolve(result);
        },
        error => {
          resolve(error);
        }
      );
    })
  }

  debounce(func, wait){
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };


  





}
