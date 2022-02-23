import { Component, OnInit } from '@angular/core';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from 'src/app/services/http/requests.service';
import { Url } from 'src/environments/Urls';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { cookie } from 'src/app/lib/cookie';
import { environment } from 'src/app/lib/environment';




@Component({
  selector: 'app-declined-messages',
  templateUrl: './declined-messages.component.html',
  styleUrls: ['./declined-messages.component.scss']
})
export class DeclinedMessagesComponent implements OnInit {
  decline_detail:any;
  decline: FormGroup;
  isLoading = false;


  constructor(
    private modalService: NgxSmartModalService,
    private fb: FormBuilder,
    private request: RequestsService,
    private route: Router,
    private toast: ToastsService,
    private socketService : SocketService,
    private cookie : cookie,
    private env : environment


  ) { 
    this.initializeForm();
  }

  ngOnInit(): void {
  }
  initializeForm() {
    this.decline = this.fb.group({
      message: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(160)
        ])
      ]
    });
  }
  getDeclineDetail(){
    this.decline_detail = this.modalService.getModalData('declineMessage');
    console.log(this.decline_detail)
    // if(this.confirmation_detail.purpose == 'delete_donation_details'){
    //   this.isDeletingSupportDetail = true
    // }
  }
  reset(){
    if(this.decline_detail){
      // console.log('pumasok')
      this.modalService.resetModalData('declineMessage');
      this.modalService.close('declineMessage');
      this.decline.markAsUntouched();
      this.decline.reset();
      this.decline.markAsPristine();
    }
  }
  secondary_action(){
    this.reset()
  }
  main_action(){
    switch(this.decline_detail.purpose){
      case 'decline_id':
        this.declineVerificationId();
        break;

    }
  }
  declineVerificationId(){
    this.isLoading = true;
    let formData= new FormData();
    formData.append('request_id',this.decline_detail.data.id);
    formData.append('reason',this.decline.controls.message.value);
    console.log('hahahha',this.decline.controls.message.value, this.decline_detail.data.id);
    this.request.post(Url.webapi_verificationrequest_decline, formData).then(res => {
      let r = res
      if(r.error){
        // console.log('error')
        this.isLoading = false;
        this.toast.showError('Error', 'Cant decline ID');
      }else{
        // console.log('success')
        this.toast.showSuccess('Success', 'ID has successfully declined.');
        this.modalService.close('declineMessage')
        this.route.navigate(['/admin/verification-requests']);
        this.isLoading = false;
        this.reset();

        let obj = { user_id : r.notif.user_id }
        this.socketService.sendAtheleteNotif(obj)

        this.cookie.deleteCookie(this.env.subdomain + 'v_r_' + r.notif.user_id, this.env.domain);
      }
    })
  }
  

  caretPosition :any;
  findCursor(textarea){
    this.caretPosition = textarea.selectionStart;
    //console.log('selectionStart', this.caretPosition );
  }

}
