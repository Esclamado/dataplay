import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RequestsService } from 'src/app/services/http/requests.service';
import { Url } from 'src/environments/Urls';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-report-delete',
  templateUrl: './report-delete.component.html',
  styleUrls: ['./report-delete.component.scss']
})
export class ReportDeleteComponent implements OnInit {
  report: any;
  reportType: any;
  type: any = null;
  user: any;
  spinner: boolean = false;
  requesting: any = false;
  others: boolean = false;
  otherReport: any;
  detail: any;
  isLoading: any = false;
  constructor(
    private modalService: NgxSmartModalService,
    private request: RequestsService,
    private userService: UserService,
    private route: Router,
    private toast: ToastsService,
    private socketService : SocketService,
    private postService: PostsService 
  ) { }

  ngOnInit(): void {

  }
  getReportTypeListing(){
    let url = Url.webapi_reporttype_listing;
    this.request.get(url).then( res => {
      let list: any = res;
      this.reportType = list.data;
      // console.log('list: ',  list)
    })
  }
  getdata(){
    this.detail = this.modalService.getModalData('reportsModal');
    this.getReportTypeListing();
    // console.log('modal: ',this.detail);
  }
  reset() {
    this.modalService.resetModalData('reportsModal');
    this.modalService.close('reportsModal');
    this.type = null;
    this.is_picked = false;
  }
  main_action() {
    switch (this.detail.purpose) {
      case 'submitReport':
        if(!this.type){
          return false
        }else{
          this.submitReport();
        }
        break;
      case 'admin_delete_post':
        if(!this.type){
          return false
        }else{
          this.deletePostAdmin()
        }
        break;
      case 'admin_delete_comment':
        if(!this.type){
          return false
        }else{
          this.deleteCommentAdmin()
        }
        break;
    }
  }
  is_picked: boolean = false
  index_global: any;
  selectedReport(type, index){
    this.type = type;
    this.index_global = index;
    this.is_picked = true;
  }
  submitReport(){
    this.spinner = false;
    this.requesting =false;
    this.isLoading = true;
    let formData = new FormData();
    // if(this.detail && this.detail.data.hasOwnProperty('report_type')){
      formData.append('reported_id',this.detail.report_type == 2 ? this.detail.data.original_id : this.detail.data.id);
    // }else{
    //   formData.append('reported_id',this.detail.report_type == 2 ? this.detail.id : this.detail.post_id)
    // }
    formData.append('report_type', this.detail.report_type);
    formData.append('admin_reason', this.type);
    formData.append('delete_type', this.detail.delete_type);
    this.request.post(Url.webapi_report_delete, formData).then(res => {
      let r = res
      console.log('res: ', r)
      if(r.error){
        this.spinner = true;
        this.requesting = true;
        this.isLoading = false;
      }else{
        if(this.detail.report_type == 1){
          this.toast.showSuccess('Success', 'Post has deleted.');
        }else{
          this.toast.showSuccess('Success', 'Comment has deleted.');
        }
        // let obj = { user_id : r.notif.user_id }
        // this.socketService.sendAtheleteNotif(obj)

        // this.route.navigate(['/admin/violation-reports']);
        this.reset();
        this.spinner = true;
        this.requesting =true;
        this.isLoading = false;
      }
    })
  }
  deletePostAdmin(){
    this.spinner = false;
    this.requesting =false;
    this.isLoading = true;

    this.postService.deletePost(this.detail.data, this.type).then((res:any) => {
      if(res.error){
        this.toast.showError('Error.', 'Failed to delete post');
      }else{
        let obj = { user_id : res.notif.user_id }
        this.socketService.sendAtheleteNotif(obj)
      }
    }).finally(() => {
      this.spinner = true;
      this.requesting =true;
      this.isLoading = false;
      this.reset()
    })
  }
  deleteCommentAdmin(){
    this.spinner = false;
    this.requesting =false;
    this.isLoading = true;

    this.postService.deleteComment(this.detail.data, this.type, this.detail.post).then((res:any) => {
      if(res.error){
        this.toast.showError('Error.', 'Failed to delete comment');
      }else{
        let obj = { user_id : res.notif.user_id }
        this.socketService.sendAtheleteNotif(obj)
      }
    }).finally(() => {
      this.spinner = true;
      this.requesting =true;
      this.isLoading = false;
      this.reset()
    })
  }

}
