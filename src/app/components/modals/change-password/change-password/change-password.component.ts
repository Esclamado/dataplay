import { Component, OnInit } from '@angular/core';
import {NgxSmartModalService } from 'ngx-smart-modal';
import { RequestsService } from 'src/app/services/http/requests.service';
import { StaffService } from 'src/app/services/staff/staff.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirm-validator';
import { ToastsService } from 'src/app/services/toasts/toasts.service'
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  isLoading : any;
  id : any;

  public passwordForm: FormGroup;

  showPass: boolean = false;
  passType: string = 'password';

  newShowPass: boolean = false;
  newpassType: string = 'password';
  
  confirmShowPass: boolean = false;
  confirmpassType: string = 'password';

  constructor(
    private modalService: NgxSmartModalService,
    private request: RequestsService,
    private staffService : StaffService,
    private fb: FormBuilder,
    private toast: ToastsService) 
    { }

  ngOnInit(): void {
  }

  initializeForm() {
    this.passwordForm = this.fb.group({
      old_password: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      new_password: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ],
      confirm_password: ['',
        Validators.compose([
          Validators.required
        ])
      ],
    },{
        validator: ConfirmedValidator('new_password', 'confirm_password')
    })
  }

  getPassComp() {
    this.initializeForm();
    this.id = this.modalService.getModalData('changePassModal');
  }

  reset() {
    if (this.id) {
      this.modalService.resetModalData('changePassModal');
      this.modalService.close('changePassModal');
    }
  }

  same:any = false;
  checkIfSame(){
    let x = this.passwordForm.value.new_password;
    let y = this.passwordForm.value.confirm_password;

    this.same = x === y ? true : false;
  }

  savePassword() {
    this.isLoading = true;
    let formData = new FormData();

    formData.append('user_id', this.id);
    formData.append('old_password', this.passwordForm.value.old_password);
    formData.append('new_password', this.passwordForm.value.confirm_password);

    this.staffService.saveStaff(formData).then(res =>{
      let result = res;
      if(result['error'] == 0){
        this.toast.showSuccess('Success.', 'Password changed successfully!');
        this.modalService.close('changePassModal');
      } else{
        this.toast.showError('Error.', 'Old Password is Incorrect!');
      }
      this.isLoading = false;
    })
  }

  showPassword(bool) {
    this.showPass = bool;
    if (bool) {
      this.passType = 'text';
    } else {
      this.passType = 'password';
    }
  }

  newShowPassword(bool) {
    this.newShowPass = bool;
    if (bool) {
      this.newpassType = 'text';
    } else {
      this.newpassType = 'password';
    }
  }

  confirmShowPassword(bool) {
    this.confirmShowPass = bool;
    if (bool) {
      this.confirmpassType = 'text';
    } else {
      this.confirmpassType = 'password';
    }
  }

}
