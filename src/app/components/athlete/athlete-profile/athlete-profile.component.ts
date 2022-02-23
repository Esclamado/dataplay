import { ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { StaffService } from '../../../services/staff/staff.service';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Url } from '../../../../environments/Urls';
import { RequestsService } from '../../../services/http/requests.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { UserService } from 'src/app/services/user/user.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-athlete-profile',
  templateUrl: './athlete-profile.component.html',
  styleUrls: ['./athlete-profile.component.scss']
})
export class AthleteProfileComponent implements OnInit, OnDestroy {

  getUserID: any;
  userDetails: any;
  subSports: any;
  userProfile: any;
  mainSport: any;
  subSport: any;
  donationDetails: any;
  deactivationStatus: any;
  userInfo: any;
  follower: any;
  following: any;

  bgImageUrl = 'assets/images/bgbluex2.png';
  bg_default_url = `url(${this.bgImageUrl})`;
  isLoading: boolean = false;
  isActivating: boolean = false;

  routeSub : any;

  tabs = [
    "Posts",
    "Career Highlights",
    "Photos",
    "Following",
    "Followers",
    "Monthly Statistics"
  ]

  constructor(
    private staffService: StaffService,
    private active_route: ActivatedRoute,
    private _location: Location,
    private request: RequestsService,
    private toast: ToastsService,
    private userService: UserService,
    private route: Router,
    private modal: NgxSmartModalService,
    public cdref: ChangeDetectorRef
  ) { 
    this.getUserID = this.active_route.snapshot.params.id;
    this.userService.getUserDetailsApi().then( user => {
      let list:any = user;
      if (list && !list.error) {
        this.userInfo = list;
      }
    })
  }

  ngOnInit(): void {
    this.getView();
    this.cdref.detectChanges();
    this.routeSub = this.route.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.getUserID = this.active_route.snapshot.params.id;
        this.getView();
        this.modal.open('loaderModal');
      } setTimeout(()=>{
        this.modal.close('loaderModal');
      }, 1000);
    })
  }

  ngOnDestroy(){
    this.routeSub ? this.routeSub.unsubscribe() : null;
  }

  backClicked() {
    this._location.back();
  }

  getView(){
    this.isLoading = true
    this.staffService.getAthleteView(this.getUserID).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.userDetails = list.data;
        this.donationDetails = list.data.donation_details;
        this.subSports = list.data.sub_sport;
        this.userProfile = list.data.user_profile;
        this.mainSport = list.data.main_sport;
        this.deactivationStatus = list.data.deactivation_status;
        this.follower = list.data.total_followers;
        this.following = list.data.total_following;
      }
    }).finally(()=>{
      this.isLoading = false;
    })
  }

  activateAccount(){
    this.isActivating = true;
    let formData = new FormData();
    formData.append('userId', this.userInfo.id);
    formData.append('user_id', this.getUserID);
    formData.append('status', '1');
    formData.append('reason', '');
    formData.append('deactivated_from', '');
    formData.append('deactivated_to', '');
    return new Promise(resolve => {
    let url = Url.webapi_staff_deactivate;
    this.request.post(url, formData).then(result => {
      resolve(result);
      this.getView();
      this.toast.showSuccess('Success', 'Account has been Activated.');
    },error => {
      resolve(error);
      this.toast.showError('Error', 'Account activation Failed.');
    }).finally(()=>{
      this.isActivating = false
    });
  });
  }
}
