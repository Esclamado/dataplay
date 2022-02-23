import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CmsService } from 'src/app/services/cms/cms.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  user : any;
  email : any;
  data: any;
  requesting : any = true;
  showPass: boolean = false;
  passType: string = 'password';

  public passwordForm: FormGroup;

  constructor(
    private modalService: NgxSmartModalService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private cmsService: CmsService,
    private toast: ToastsService,
    private userservice: UserService
  ) { 
    this.initializeForm();
  }

  ngOnInit() {
  }

  initializeForm() {
    this.passwordForm = this.fb.group({
      password: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ]
    })
  }

  getData() {
    this.data = this.modalService.getModalData('passwordModal');
    this.user = this.storageService.getUserStorage();
    if (this.user){
      this.email = this.user.email;
    }
    this.requesting = false;
  }

  reset() {
    this.modalService.resetModalData('passwordModal');
    this.modalService.close('passwordModal');
    this.passwordForm.markAsUntouched();
    this.passwordForm.reset();
  }

  showPassword(bool) {
    this.showPass = bool;
    if (bool) {
      this.passType = 'text';
    } else {
      this.passType = 'password';
    }
  }

  checkPasword(){
    this.requesting = true;
    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.passwordForm.value.password);
    formData.append('is_admin','');
    formData.append('check_password','');
      this.userservice.login(formData).then( res => {
        let r: any = res;
        if (r.error) {
          this.toast.showError('Error.', r.message);
          this.requesting = false;
        } else {
          this.updateCMSData();
        }
      })
    
  }


  updateCMSData(){
    this.cmsService.updateCMS(this.data.id, this.data.content).then(res =>{
      let result = res;
      if(result['error'] == 0){
        this.toast.showSuccess('Success.', 'CMS has been updated.');
      }
      setTimeout(()=>{
        this.requesting = false;
        this.reset();
      }, 1000);
    })
  }

}
