import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/lib/environment';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-email-password',
  templateUrl: './email-password.component.html',
  styleUrls: ['./email-password.component.scss']
})
export class EmailPasswordComponent implements OnInit {
  public passwordForm: FormGroup;

  requesting : any = false;
  showPass: boolean = false;
  passType: string = 'password';
  url: any;
  data: any;

  constructor(
    private modalService: NgxSmartModalService,
    private fb: FormBuilder,
    private userservice: UserService,
    private toast: ToastsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private env: environment,
    private storage: StorageService
  ) {
    this.initializeForm();
    this.data = this.storage.getUserStorage();
   }

  ngOnInit(): void {
  }

  getData(){
    this.url = this.modalService.getModalData('emailPasswordModal');
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
    formData.append('check_password','');
    formData.append('verify_email','');
    formData.append('token', this.url);
    formData.append('password', this.passwordForm.value.password);
    this.userservice.login(formData).then( res => {
      let r: any = res;
      if (r.error) {
        this.toast.showError('Error.', r.message);
        this.requesting = false;
      } else {
        this.modalService.close('emailPasswordModal');
        this.modalService.open('loaderModal');
        this.requesting = false;
        this.toast.showSuccess('Success.', 'Sucess. New Contact Email has been set.');
       
        if (this.data && (this.data.id == r.data.id)){
          this.env.setCookie('user_profile', JSON.stringify(r.data))
        }

        setTimeout(()=>{
          this.modalService.open('loaderModal');
          window.close();
        }, 2000);
      }
    
    })
  }

}
