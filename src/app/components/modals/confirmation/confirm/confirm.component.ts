import { Component, OnInit } from '@angular/core';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { RequestsService } from 'src/app/services/http/requests.service';
import { Url } from 'src/environments/Urls';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket/socket.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { cookie } from 'src/app/lib/cookie';
import { environment } from 'src/app/lib/environment';




@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  isLoading = false;
  confirmation_detail: any;
  user : any;
  constructor(
    private modalService: NgxSmartModalService,
    private request: RequestsService,
    private route: Router,
    private socketService : SocketService,
    private storage : StorageService,
    private toast: ToastsService,
    private cookie : cookie,
    private env : environment


  ) { }

  ngOnInit(): void {
    this.user = this.storage.getUserStorage();
  }
  getConfirmDetail() {
    this.confirmation_detail = this.modalService.getModalData('confirmationModal');
    // console.log('modal: ',this.confirmation_detail)
    // if(this.confirmation_detail.purpose == 'delete_donation_details'){
    //   this.isDeletingSupportDetail = true
    // }
  }
  reset() {
    if (this.confirmation_detail) {
      // console.log('pumasok')
      this.modalService.resetModalData('confirmationModal');
      this.modalService.close('confirmationModal');
    }
  }
  secondary_action() {
    this.reset()
  }
  main_action() {
    switch (this.confirmation_detail.purpose) {
      case 'approve_id':
        this.approveVerificationId();
        break;
      case 'remain_publish':
        this.Remainpublished();
        break;
    }
  }
  approveVerificationId() {
    this.isLoading = true;
    let formData = new FormData();
    formData.append('request_id', this.confirmation_detail.data.id);
    this.request.post(Url.webapi_verificationrequest_approve, formData).then(res => {
      let r = res
      if (r.error) {
        this.toast.showError('Error', r.message);
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.modalService.close('confirmationModal')
        this.toast.showSuccess('Success', 'Athlete ID verification has been approved.');
        let obj = { user_id : r.notif.user_id, purpose: 'new_verif' }
        this.socketService.sendAtheleteNotif(obj)

        this.cookie.deleteCookie(this.env.subdomain + 'v_r_' + r.notif.user_id, this.env.domain);
        this.route.navigate(['/admin/verification-requests']);
      }
    })
  }
  Remainpublished(){
    this.isLoading = true;
    let formData = new FormData();
    formData.append('reported_id', this.confirmation_detail.report_type == 2 ? this.confirmation_detail.data.original_id : this.confirmation_detail.data.id);
    formData.append('report_type', this.confirmation_detail.data.report_type);
    this.request.post(Url.webapi_report_publish, formData).then(res => {
      let r = res
      if(r.error){
        this.isLoading = false;
        this.toast.showError('Error', r.message);
      }else{
        this.isLoading = false;
        // this.route.navigate(['/admin/violation-reports']);
        if(this.confirmation_detail.report_type == 1){
          this.toast.showSuccess('Success', 'Post has remain published.');
        }else{
          this.toast.showSuccess('Success', 'Comment has remain published.');
        }
        this.reset();
      }
    })
  }

}
