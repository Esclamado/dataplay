import { Injectable } from '@angular/core';
import { RequestsService } from '../http/requests.service';
import { Url } from 'src/environments/Urls';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportedService {
  report_type = new BehaviorSubject(1);
  
  report_post_badge_subj = new BehaviorSubject(0);
  report_comment_badge_subj = new BehaviorSubject(0);
  report_post_badge = this.report_post_badge_subj.asObservable();
  report_comment_badge = this.report_comment_badge_subj.asObservable();


  constructor(
    private request: RequestsService
  ) { }
  getViolationList(type, limit, status?, search?, page?, order?) {
    return new Promise(resolve => {
    let url = Url.webapi_report_listing + '?report_type=' + type + '&limit=' + limit;
    if(status){
      url += '&status=' + status;
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
    this.request.get(url).then(result => {
      resolve(result);        
    },error => {
      resolve(error);
    });
  });
  }
  getViolationDetailList(id , type, limit, page?) {
    return new Promise(resolve => {
    let url = Url.webapi_report_detailedlisting + '?reported_id=' + id + '&report_type=' + type;
    if(limit){
      url += '&limit=' + limit;
    }
    if(page){
      url += '&page=' + page;
    }
    this.request.get(url).then((result:any) => {
      // console.log('result: ', result)
      resolve(result);        
    },error => {
      resolve(error);
    });
  });
  }

  viewViolation(id) {
    return new Promise(resolve => {
      let url = Url.webapi_report_view +'?id=' + id + '&is_admin';
      this.request.get(url).then((result:any) => {
      resolve(result);        
    },error => {
      resolve(error);
    });
  });
  }
  updateCommenBbadge(data){
    this.report_comment_badge_subj.next(data)
  }
  updatePostBadge(data){
    this.report_post_badge_subj.next(data)
  }
  setType(type){
    this.report_type.next(type)
    // this.report_type = type;
    // console.log('report type: ', this.report_type);
  }
  getType() :Observable <number>{
    return this.report_type.asObservable();
  }
  getInfComment(id, type, limit, page?) {
    return new Promise(resolve => {
    let url = Url.webapi_report_view + '?id=' + id + '&comment_report_type=' + type;
    if(limit){
      url += '&comment_limit=' + limit;
    }
    if(page){
      url += '&comment_page=' + page;
    }
    
    this.request.get(url).then((result:any) => {
      console.log('result: ', result)
      resolve(result);        
    },error => {
      resolve(error);
    });
  });
  }
  getReportedComment(id) {
    return new Promise(resolve => {
    let url = Url.webapi_comment_view + '?id=' + id ;
    this.request.get(url).then(result => {
      resolve(result);        
    },error => {
      resolve(error);
    });
  });
  }
}
