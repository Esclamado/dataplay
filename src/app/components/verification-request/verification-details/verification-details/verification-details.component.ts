import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { of } from 'rxjs';
import { RequestsService } from 'src/app/services/http/requests.service';
import { Url } from '../../../../../environments/Urls';



@Component({
  selector: 'app-verification-details',
  templateUrl: './verification-details.component.html',
  styleUrls: ['./verification-details.component.scss']
})
export class VerificationDetailsComponent implements OnInit, OnDestroy {
  verification_id: any;
  verif_detail:any;
  @Input() userProfile;  
  
  lazyImage = 'assets/images/loader.gif'
  lazyImage_url = `${this.lazyImage}`;

  routeSub : any;
  
  constructor(
    private modalService: NgxSmartModalService,
    private active_route: ActivatedRoute,
    private request: RequestsService,
    private route: Router

  ) { }

  ngOnInit(): void {
    this.verification_id = this.active_route.snapshot.paramMap.get('id');
    this.getVerificationDetail()

    this.routeSub = this.route.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.verification_id = this.active_route.snapshot.paramMap.get('id');
        this.getVerificationDetail()
      }
    })
  }
  
  ngOnDestroy(){
    this.routeSub ? this.routeSub.unsubscribe() : null;
  }

  approve_verification_id:any={
    title:"Approve Verification",
    content:"Are you sure you want to approve this request for verification? This athlete will have a blue verified badge if you approve their request.",
    btn_cancel:"Cancel",
    btn_save:"Approve request",
  }
  approveVerification(){
    let details = {
      // user: this.user,
      edit_details:this.approve_verification_id,
      purpose: 'approve_id',
      data: this.verif_detail,
    }
    this.modalService.setModalData(details,'confirmationModal');
    this.modalService.open('confirmationModal');
  }

  decline_verification_id:any={
    title:"Decline Verification",
    content:"Please add a reason why their request is declined.",
    btn_cancel:"Cancel",
    btn_save:"Decline request",
  }
  declineVerification(){
    let details = {
      // user: this.user,
      edit_details:this.decline_verification_id,
      purpose: 'decline_id',
      data: this.verif_detail,
    }
    
    this.modalService.setModalData(details,'declineMessage');
    this.modalService.open('declineMessage');
  }
  getVerificationDetail(){
    let param = {
      id: this.verification_id
    }
    this.request.get(Url.webapi_verificationrequest_listing+'?id='+this.verification_id).then( res => {
      let r = res
      if(r.error == 0){
        r.datas.forEach(element => {
          if(element.user_id == this.verification_id){
            this.verif_detail = element
          }
        });
      }
      // console.log('succes', this.verif_detail)
    })
  }
  viewPoto(photo){
    this.modalService.setModalData(photo,'viewPhotoModal');
    this.modalService.open('viewPhotoModal')

  }

}
