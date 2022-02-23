import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/app/lib/environment';
import { ToastsService } from 'src/app/services/toasts/toasts.service'

// import { NgxFirebaseClientService } from '@ngx-firebase/client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  showLoginPass: boolean = false;
  login_password_type: string = 'password';


  public loginForm: FormGroup;
  user: any;
  isLoading:any = false;
  formBuilders(){
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = this.fb.group({
      email: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(70),
          Validators.email,
          Validators.pattern(emailRegex)
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      rememberme:[]
    })
  }

  
  constructor(
    private modal: NgxSmartModalService,
    private fb: FormBuilder,
    private route: Router,
    private userservice: UserService,
    private storage: StorageService,
    private envs: environment,
    private toast: ToastsService


    // private firebase: NgxFirebaseClientService
  ) { 
      this.userservice.getUserDetails().then ( user => {
        let u: any = user;
        if(u){
          console.log('user: ', u)
          this.user = user;
          this.userservice.updateUserDetailsSubscription(this.user);
          this.userservice.getUserDetailsApi().then( user2 => {
            let u2:any = user2;
            
            if (!u2.error) {
              this.userservice.updateUserDetailsSubscription(u2);
              // console.log('user ko',this.user)

            }
          })
        }
      })
    }
  
  ngOnInit(){
    this.formBuilders();
  }

  forgotPassword(){
    let domain =  window.location.origin;
    domain = domain.substring(domain.length-1) == "/" ? domain.substring(0, domain.length-1) : domain;
    
    this.modal.setModalData( domain, 'forgotPassword');
    this.modal.open('forgotPassword');
  }

  showLoginPassword(bool) {
    this.showLoginPass = bool;
    //console.log('boolean', bool);
    if (bool) {
      this.login_password_type = 'text';
    } else {
      this.login_password_type = 'password';
    }
  }

  signIn() {
    //console.log('login');
    
    if(this.loginForm.valid && !this.isLoading){
      this.isLoading = true;
      let formData = new FormData();
      formData.append('email', this.loginForm.value.email);
      formData.append('password', this.loginForm.value.password);
      formData.append('is_admin','');
        this.userservice.login(formData).then( res => {
          let r: any = res;
          if (r.error) {
            this.toast.showError('Error', r.message);
          } else {
            if (this.loginForm.controls.rememberme.value){
              this.envs.setCookie('user_profile', JSON.stringify(r.data) , 60)
              this.envs.setToken(r.token,60);
            } else {
              this.envs.setCookie('user_profile', JSON.stringify(r.data))
              this.envs.setToken(r.token);
            }
            this.userservice.updateUserDetailsSubscription(r.data);
            this.userservice.getUserDetailsApi();
            this.toast.showSuccess('Success', 'Welcome back, '+r.data.user_profile.first_name+'!');
            this.route.navigate(['/admin/dashboard']);
            }
          }).finally( () => {
            this.isLoading = false;
        })
    }else{
      setTimeout(()=>{
        this.isLoading = false;
        this.loginForm.controls.email.markAsTouched();
        this.loginForm.controls.password.markAsTouched();
      },500)
    }
  }
}
