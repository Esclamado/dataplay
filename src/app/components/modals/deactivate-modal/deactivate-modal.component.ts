import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Location } from '@angular/common';
import { RequestsService } from '../../../services/http/requests.service';
import { Url } from '../../../../environments/Urls';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';

@Component({
  selector: 'app-deactivate-modal',
  templateUrl: './deactivate-modal.component.html',
  styleUrls: ['./deactivate-modal.component.scss']
})
export class DeactivateModalComponent implements OnInit {

  deactivateDetails: any;
  userDetails: any;
  isLoading: boolean = false;

  constructor(
    private modalService: NgxSmartModalService,
    private _location: Location,
    private request: RequestsService,
    private router: Router,
    private userService: UserService,
    private toast: ToastsService
  ) { 
    this.userService.getUserDetailsApi().then( user => {
      let list:any = user;
      if (list && !list.error) {
        this.userDetails = list.id;
      }
    })
  }

  ngOnInit(): void {
    
  }

  backClicked() {
    this._location.back();
  }

  getDeactivateDetails(){
    this.deactivateDetails = this.modalService.getModalData('deactivateModals');
  }

  reset(){
    if(this.deactivateDetails){
      this.modalService.resetModalData('deactivateModals');
      this.modalService.close('deactivateModals');
    }
  }

  close(){
    this.modalService.close('deactivateModals');
  }

submit(){
    this.isLoading = true;
    let formData = new FormData();
      formData.append('userId', this.userDetails);
      formData.append('user_id', this.deactivateDetails.user_id);
      formData.append('status', '2');
      return new Promise(resolve => {
      let url = Url.webapi_staff_deactivate;
      this.request.post(url, formData).then(result => {
        resolve(result);
        this.isLoading = false;
        this.toast.showSuccess('Success', 'Account has been deactivated.');
        this.reset();
        this.router.navigate(['/admin/staffs/staffs-profile/' + this.deactivateDetails.user_id]);
      },error => {
        resolve(error);
        this.toast.showError('Error', 'Account deactivation failed.');
      });
    });
  }

}
