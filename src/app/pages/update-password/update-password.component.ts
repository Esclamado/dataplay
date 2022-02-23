import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../../components/validator/confirmed.validator';
import { RequestsService } from 'src/app/services/http/requests.service';
import { Url } from 'src/environments/Urls';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  getCode: any;

  constructor(
    private fb: FormBuilder,
    private request: RequestsService,
    private active_route: ActivatedRoute,
    private router: Router,
    private toast: ToastsService,
    private modalService: NgxSmartModalService
  ) { 
    this.initializeForm();
    this.getCode = this.active_route.snapshot.params.key;
  }

  ngOnInit(): void {
  }

  public changePassForm: FormGroup;

  showPass: boolean = false;
  passType: string = 'password';

  newShowPass: boolean = false;
  newpassType: string = 'password';
  
  confirmShowPass: boolean = false;
  confirmpassType: string = 'password';

  initializeForm() {
    this.changePassForm = this.fb.group({
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
  same:any = true;
  checkIfSame(){
    let x = this.changePassForm.value.new_password;
    let y = this.changePassForm.value.confirm_password;
    if(this.changePassForm.controls.confirm_password.dirty){
      this.same = x === y ? true : false; 
    }
  }
  requesting = false;
  submitForm() {
    this.requesting = true;
    let formData = new FormData();

    let x = this.changePassForm.value.new_password;
    let y = this.changePassForm.value.confirm_password;

    if(x === y){
      formData.append('code', this.getCode);
      formData.append('type', '2');
      formData.append('password', this.changePassForm.value.new_password);
      // formData.append('domain', window.location.origin);
  
      this.request.post(Url.webapi_forgotpassword_index, formData).then(res => {
        let r: any = res;
        if (r.error) {
          this.toast.showError('Error', 'Failed.');
          this.requesting = false;
          return false;
        }
        this.requesting = false;
        this.toast.showSuccess('Success', 'Password has been updated.');
        this.changePassForm.reset();
        this.changePassForm.markAsPristine();
        this.modalService.open('loaderModal');
        // this.router.navigate(['/login']);
        this.getCode = null;

        setTimeout(()=>{
          this.modalService.open('loaderModal');
          window.close();
        }, 2000);
      })
    }else{
      this.toast.showError('Error', 'Password do not match.');
      this.requesting = false;
    }

 
  }

}
