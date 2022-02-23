import { Component, OnInit } from '@angular/core';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { RequestsService } from '../../../services/http/requests.service';
import { Url } from '../../../../environments/Urls';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.scss']
})
export class DeactivateComponent implements OnInit {

  deactivateDetails: any;
  isSelected: boolean = false;
  public dateForm: FormGroup;
  userDetails: any;
  todayDate:Date = new Date();
  isLoading: any = false;

  constructor(
    private request: RequestsService,
    private modalService: NgxSmartModalService,
    private router: Router,
    private datePipe: DatePipe,
    public formBuilder: FormBuilder,
    private userService: UserService,
    private toast: ToastsService,
    private socketService: SocketService
  ) { 
    /* this.userService.getUserDetailsApi().then( user => {
      let list:any = user;
      if (list && !list.error) {
        this.userDetails = list.id;
      }
    }) */
  }

  ngOnInit(): void {
    this.formBuilders();
  }

  formBuilders(){
    let dateregex = '/^\d{1,2}\/\d{1,2}\/\d{4}$/';
    this.dateForm = this.formBuilder.group({
      start: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(dateregex)
        ])
      ],end: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(dateregex)
        ])
      ],reason: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  getDeactivate(){
    this.deactivateDetails = this.modalService.getModalData('deactivateModal');
  }

  reset(){
    if(this.deactivateDetails){
      this.modalService.resetModalData('deactivateModal');
      this.dateForm.reset()
      this.modalService.close('deactivateModal');
    }
  }

  onItemChange(e){
    if(e.value == 0){
      this.isSelected = false;
    }else{
      this.isSelected = true;
    } 
 }

  submit(){
    this.isLoading = true;
    let start = this.datePipe.transform(this.dateForm.controls.start.value, 'yyyy-MM-dd');
    let end = this.datePipe.transform(this.dateForm.controls.end.value, 'yyyy-MM-dd');
    let formData = new FormData();
    /* formData.append('userId', this.userDetails); */
    formData.append('user_id', this.deactivateDetails.user_id);
    formData.append('status', '2');
    formData.append('reason', this.dateForm.controls.reason.value);
    formData.append('deactivated_from', start ? start : '');
    formData.append('deactivated_to', end ? end : '');
    formData.append('domain', this.deactivateDetails.domain);
    return new Promise(resolve => {
    let url = Url.webapi_staff_deactivate;
    this.request.post(url, formData).then(result => {
      resolve(result);
      if(this.deactivateDetails.type == '3'){
        this.reset();
        this.toast.showSuccess('Success', 'Account has been deactivated.');
        this.router.navigate(['/admin/athletes/' + this.deactivateDetails.user_id]);
        this.dateForm.reset();
      
        let obj = { user_id : result.user_id,  deact: 'deact' }
        this.socketService.sendAtheleteNotif(obj)
      }else if(this.deactivateDetails.type == '4'){
        this.reset();
        this.toast.showSuccess('Success', 'Account has been deactivated.');
        this.router.navigate(['/admin/sport-fans/sportfan-profile/' + this.deactivateDetails.user_id]);
        this.dateForm.reset();
        
        let obj = { user_id : result.user_id,  deact: 'deact' }
        this.socketService.sendAtheleteNotif(obj)
      }
    },error => {
      resolve(error);
      this.toast.showError('Error', 'Account deactivation failed.');
    });
  }).finally(()=>{
    this.isLoading = false;
  });
  }
}
