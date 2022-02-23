import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RequestsService } from '../../../services/http/requests.service';
import { Url } from 'src/environments/Urls';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { environment } from 'src/app/lib/environment';
import { ToastsService } from 'src/app/services/toasts/toasts.service';




@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  public forgotForm: FormGroup;
  emailExisting: any = false
  isLoading: boolean = false;
  domain : any;
  constructor(
    private fb: FormBuilder,
    private request: RequestsService,
    private modalService: NgxSmartModalService,
    private env: environment,
    private toastr: ToastsService,
  ) {
      let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.forgotForm = this.fb.group({
        email: ['',
          Validators.compose([
            Validators.required,
            Validators.maxLength(70),
            Validators.email,
            Validators.pattern(emailRegex)
          ])
        ]
      })
    }

  showModal:any = false;
  

  ngOnInit(): void {
  }

  getData(){
    this.domain = this.modalService.getModalData('forgotPassword');
  }

  // sendEmail(){
  //     console.log('email', this.forgotForm.controls.email.value)
  // }
  checkEmail(){
    this.request.get(Url.webapi_email_validation + '?email='+  this.forgotForm.controls.email.value).then( data => {
        let result:any = data;
        // console.log('result', result);
        if (result.error) {
            this.forgotForm.controls.email.markAsTouched();
            this.emailExisting = true;
            // this.toast.showError('Error', result.message );
        } else { 
          this.emailExisting = false;
          this.forgotForm.controls.email.markAsUntouched();

        }
    });
  }
  sendEmail(){
    this.isLoading = true
    if(this.forgotForm.valid){
      this.isLoading = true;
      let url = Url.webapi_forgotpassword_index;
      let formData = new FormData();
      formData.append('type', '1');
      formData.append('email', this.forgotForm.value.email);
      formData.append('domain', this.domain);
      this.request.post(url, formData).then(res => {
        let r: any = res;
        if(r.error){
          this.toastr.showError('Error.', r.message);
        }else{
          this.toastr.showSuccess('Success.','Please check your inbox and spam/junk mail folder.');
          this.toastr.showSuccess('Success.','Password reset link has been sent to your email.');
          this.forgotForm.controls.email.setValue(this.forgotForm.value.email);
          this.forgotForm.controls.email.markAllAsTouched();
          this.modalService.close('forgotPassword');
        }
      }).finally(() => { 
        this.isLoading = false; 
        this.forgotForm.reset();
      })
    }
  }
  reset(){
    this.modalService.close('forgotPassword');
    this.forgotForm.controls.email.markAsUntouched();
    this.forgotForm.reset()
  }

}
