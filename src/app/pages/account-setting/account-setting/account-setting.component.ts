import { Component, OnInit, SimpleChanges, OnChanges, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from  '@angular/forms';
import { StorageService } from 'src/app/services/storage/storage.service';
import { StaffService } from 'src/app/services/staff/staff.service';
import { UserService } from 'src/app/services/user/user.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastsService } from 'src/app/services/toasts/toasts.service'
import { environment } from 'src/app/lib/environment';
@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit, OnChanges {
  @ViewChild('ccNumber',{static:true}) ccNumberField: ElementRef;

  dpFile : any = [];
  dpFileType : any = [];
  dpFileSize : any = [];
  dpChange : any = false;
  sizeInMb : any;
  sizeLimit : any;
  change : any = false;
 
  isLoading : any;
  filename : any;
  avatar_src : any;
  oldPic : any;
  oldFileName : any;
 
  account_form: FormGroup;
  accountDetails : any=[];
  requestingSave : any;

  user : any;
  user_data :any
  id : any;

  lazyImage = 'assets/images/loader.gif'
  lazyImage_url = `${this.lazyImage}`;

  phoneNum:string = "";
  controlKey : any = null;
  
  constructor(
    protected formBuilder : FormBuilder,
    private storage: StorageService,
    private staffService : StaffService,
    private userService: UserService,
    private modalService: NgxSmartModalService,
    private toast: ToastsService,
    private env: environment) {
    
    this.initializeForm();
  }

  initializeForm(){
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.account_form = this.formBuilder.group({
      avatar: [''],
      name: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      email: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(70),
          Validators.email,
          Validators.pattern(emailRegex)
        ])
      ],
      role: ['',
        Validators.compose([
          Validators.required
        ])
      ],
      number: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(12)
        ])
      ]
    })
  }

  OnChanges(){
  }

  ngOnInit(): void {
    this.user = this.storage.getUserStorage();
    if (this.user){
      this.id = this.user.id;
      this.getUserData();
    } 
  }

  getUserData(){
    if (this.user){
      if(this.user.user_role_id == 2) {
        this.account_form.controls.role.setValue('Staff');
       } else {
        this.account_form.controls.role.setValue('Admin');
      }
      this.phoneNum = this.user.number;
      this.user.number = this.user.number.replace(/(\w{3})(\w{3})(\w{4})/, '$1 $2 $3') 
      this.account_form.controls.name.setValue(this.user.user_profile.first_name);
      this.account_form.controls.number.setValue(this.user.number);
      this.account_form.controls.email.setValue(this.user.email);
      this.avatar_src = this.user.user_profile.profile_pic_path;
      this.filename = this.user.user_profile.profile_pic;

      this.oldPic =  this.user.user_profile.profile_pic_path;
      this.oldFileName = this.user.user_profile.profile_pic;

      console.log('first_name', this.user.user_profile.first_name)
    }
    this.account_form.markAsPristine();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getUserData();
  }

  saveChanges(){
    let formData = new FormData();
    let filename = this.account_form.value.first_name + "_profile_pic.jpg";

    var number = this.account_form.value.number.replace(/\s/g, "");

    formData.append('first_name', this.account_form.value.name);
    formData.append('number', number);
    // formData.append('email', this.account_form.value.email);
    // formData.append('user_role_id', '2');
    if (this.account_form.value.avatar){
      formData.append('profile_pic', this.dataURItoBlob(this.account_form.value.avatar), filename);
    }
    this.submitForm();
  }

  submitForm() {
    this.requestingSave = true;
  
    let formData = new FormData();
    let filename = this.account_form.value.first_name + "_profile_pic.jpg";
    
    var number = this.account_form.value.number.replace(/\s/g, "");

    formData.append('user_id', this.id);

    let domain =  window.location.origin;
    domain = domain.substring(domain.length-1) == "/" ? domain.substring(0, domain.length-1) : domain;
    formData.append('domain', domain);
    
    if (this.account_form.controls.name.dirty){  formData.append('first_name', this.account_form.value.name);  }
    if (this.account_form.controls.number.dirty){ formData.append('mobile', number);  }
    if (this.account_form.controls.email.dirty){  formData.append('email', this.account_form.value.email);  }
    if (this.account_form.value.avatar){
      formData.append('profile_pic', this.dataURItoBlob(this.account_form.value.avatar), filename);
    }
  
    this.staffService.saveStaff(formData).then((res : any) =>{
      let result = res;
      if(!result.error){
       
        this.oldPic =  result.data.user_profile.profile_pic_path;
        this.oldFileName = result.data.user_profile.profile_pic;
        this.filename = result.data.user_profile.profile_pic;
        this.change = true;

        if (this.account_form.controls.name.dirty || this.account_form.controls.number.dirty || this.account_form.value.avatar){ 
          this.toast.showSuccess('Success.', 'Profile has been updated.');
        }

        if (this.account_form.controls.email.dirty){
          this.toast.showSuccess('Success.', 'Verification email has been sent to new contact email. Confirm it to save changes. ');
        }

        this.requestingSave = false;
        this.dpChange = false;
        
        this.updateStorageData(result.data);
        this.env.setCookie('user_profile', JSON.stringify(result.data))
        this.account_form.controls.avatar.reset();
        this.account_form.markAsPristine();
    
      } else{
        this.toast.showError('Error.', result.message);
        this.requestingSave = false;
        this.dpChange = false;
        this.account_form.markAsPristine();
        this.getUserData();
      }
    
    })
  }

  updateStorageData(data){
    this.storage.storageSet('aup_dplph', data, false);
    this.userService.updateUserDetailsSubscription(data);
  }

  /*formatNumb(ev){
    if (ev.key == 'Backspace') {
      let valueNow = this.account_form.controls.number.value;
      if (this.phoneNum.length == 4 || this.phoneNum.length == 7){
        this.account_form.controls.number.setValue(valueNow.slice(0, -1));
      } 
      this.phoneNum = this.phoneNum.slice(0,-1);
      return;
    } 
    else if (/[`~,.<>;':"/[\]|{}()=_+-]/.test(ev.key) || /[a-zA-Z]/.test(ev.key) || this.phoneNum.length >= 10) {
        return false;
    }
    else {
      this.phoneNum += ev.key;
      setTimeout(()=>{
        if( this.phoneNum.length == 3 || this.phoneNum.length == 6 ){
          this.account_form.controls.number.setValue(this.account_form.controls.number.value + ' ');
        }
      })
      return;
    }
  }*/
  
  phoneNumberSpacing(ev) {
    if (ev.code == 'Backspace' || ev.code == 'ArrowLeft' || ev.code == 'ArrowRight' || ev.code == 'ArrowUp' || ev.code == 'ArrowDown'){
      this.controlKey = null;
      return;
    } else if (ev.key == 'Control' ){
      this.controlKey = 1;
    } else if (ev.code == 'KeyA' && this.controlKey){
      this.controlKey = null;
       return;
    } else if (/[`~,.<>;':"/[\]|{}()=_+-]/.test(ev.key) || /[a-zA-Z]/.test(ev.key)) {
      this.controlKey = null;
      return false;
    } else{
      this.controlKey = null;
      const input = this.ccNumberField.nativeElement;
      const { selectionStart } = input;
      const  phoneNumber  = this.account_form.controls.number;
  
      let trimmedPhoneNumber = phoneNumber.value.replace(/\s+/g, '');
  
      if (trimmedPhoneNumber.length > 10) {
        trimmedPhoneNumber = trimmedPhoneNumber.substr(0, 10);
      }
  
      const partitions = [3,3,4];
  
      const numbers = [];
      let position = 0;
      partitions.forEach(partition => {
        const part = trimmedPhoneNumber.substr(position, partition);
        if (part) numbers.push(part);
        position += partition;
      })
  
      phoneNumber.setValue(numbers.join(' '));
  
      /* Handle caret position if user edits the number later */
      if (selectionStart < phoneNumber.value.length - 1) {
        input.setSelectionRange(selectionStart, selectionStart, 'none');
      }
    }
  }

  removeCtrl(){
    this.controlKey = null;
  }

  selectDP(event) {
    this.change = false;
    this.dpChange = false;
    this.avatar_src = this.oldPic;
    this.filename =  this.oldFileName;

    this.dpFile = event.target.files;
    this.dpFileType = event.target.files[0].type;
    this.dpFileSize = event.target.files[0].size;
    this.sizeInMb = this.dpFileSize/1024;
    this.sizeLimit= 1024*1; 

    if (this.dpFile) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.dpFileType !== 'image/jpeg' && this.dpFileType !== 'image/jpg' && this.dpFileType !== 'image/png') {
          this.toast.showError('Error.','Invalid image format! Try .png or .jpg instead.');
        } else if (this.sizeInMb > this.sizeLimit) {
          this.toast.showError('Error.','Sorry the file exceeds the maximum size of 1 MB!');
        } else {
          this.dpChange = true;
          this.avatar_src = e.target.result;
          this.account_form.controls.avatar.setValue(this.avatar_src);
          this.filename = event.target.files[0].name;
        }
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeDP(){
    this.dpChange = false;
    if (!this.change){
      this.avatar_src = this.oldPic;
      this.filename =  this.oldFileName;
    }
  }

  changePass(){
    this.modalService.setModalData( this.id, 'changePassModal');
    this.modalService.open('changePassModal');
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

}
