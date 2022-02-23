import { Component, OnDestroy, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ReportedService } from '../../services/reported/reported.service';

@Component({
  selector: 'app-violation-reports',
  templateUrl: './violation-reports.component.html',
  styleUrls: ['./violation-reports.component.scss']
})
export class ViolationReportsComponent implements OnInit, OnDestroy {
  tab: any = 1;
  report_type: any = 2;
  post_type: any = 1;
  comment:any;
  limit: any = 10;
  status: any;
  search: any;
  pagination = {
    no_list: 10,
    selected_page: 1
  }
  type_value: any;
  toggle_badge = false;
  pending: any;
  pending_post: any;
  report_post_sub: any = null;
  report_comment_sub: any = null;
  constructor(
    private report: ReportedService,
  ) { 

  }
  ngOnDestroy(){
    this.report_post_sub.unsubscribe();
    this.report_comment_sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getList();
    this.getListPost();
    this.initializeSub();
  }
  initializeSub(){
      this.report_post_sub = this.report.report_post_badge.subscribe((res:any)=>{
      })
      // setTimeout(()=>{
      //   this.report.updatePostBadge(this.pending_post);
      // },1000);
      this.report_comment_sub = this.report.report_comment_badge.subscribe((res:any)=>{
      })
      // setTimeout(()=>{
      //   this.report.updateCommenBbadge(this.pending);
      // },1000);
  }
  
  chooseTab(num){
    if(num == 1){
      this.tab = 1
      // this.toggle_badge = false;
    }else if(num == 2){
      this.tab = 2
      // this.toggle_badge = true;
    }
  }
  getList(){
    this.report.getViolationList(this.report_type, this.limit, this.status, this.search, this.pagination.selected_page, this.type_value).then(res =>{
      let list: any = res;
      if(list.error == 0){ 
        this.pending = list.count.pending_reports
        this.comment = list;
      }
    })
  }
  getListPost(){
    this.report.getViolationList(this.post_type, this.limit, this.status, this.search, this.pagination.selected_page, this.type_value).then(res =>{
      let list: any = res;
      if(list.error == 0){ 
        this.pending_post = list.count.pending_reports
      }
    })
  }
  
  

}
