import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from  '@angular/forms';
import { StaffService } from '../../../services/staff/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-staffs-add',
  templateUrl: './staffs-add.component.html',
  styleUrls: ['./staffs-add.component.scss']
})
export class StaffsAddComponent implements OnInit {
  @ViewChild('ccNumber',{static:true}) ccNumberField: ElementRef;

  staffForm: FormGroup;
  filename : any;
  dpFileType : any = [];
  dpFile : any = [];
  dpUrl : any;
  isLoading : boolean = false;
  getUserID: any;
  userDetails: any;
  user:any;
  userPic: any;
  controlKey : any = null;
  phoneNum:string = "";
  sizeInMb : any;
  sizeLimit : any;
  dpFileSize : any = [];
  dpChange :any = false;
  change : any = false;
  oldPic: any;
  oldFileName: any;
  roleSelected: any;
  typeValue : any = null;
  roleChange: any = false;
  touchMenu: any = false;

  constructor(
    private _location: Location,
    protected formBuilder : FormBuilder,
    private staffService: StaffService,
    private active_route: ActivatedRoute,
    private modalService: NgxSmartModalService,
    private toast: ToastsService,
    private storage: StorageService
  ) { 
    this.initializeForm();
    this.getUserID = this.active_route.snapshot.params.id;
  }

  initializeForm(){
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.staffForm = this.formBuilder.group({
      avatar: ['',
      Validators.compose([
        Validators.required
      ])],
      name: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(70)
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
      ],
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

  roles = [
    {
      name: 'Admin',
      type: '1'
    },
    {
      name: 'Staff',
      type: '2'
    }
  ];

  ngOnInit(): void {
    this.getView();
    this.user = this.storage.getUserStorage();
    if(this.getUserID){
      this.userPic = this.user.user_profile.profile_pic;
    }else{
      this.userPic = null;
    }
    
  }

  backClicked() {
    this._location.back();
  }

  getView(){
    this.staffService.getStaffView(this.getUserID).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.userDetails = list.data;
        this.roleSelected  = this.userDetails.user_role_id == 1 ? 'Admin' : 'Staff';
        this.staffForm.controls.name.setValue(this.userDetails.first_name);
        this.staffForm.controls.number.setValue(this.userDetails.number);
        this.staffForm.controls.email.setValue(this.userDetails.email);
        this.dpUrl = this.userDetails.profile_pic_path;
        this.oldPic =  this.userDetails.profile_pic_path;
        this.staffForm.markAsPristine();
      }
    })
  }

  selectDP(event) {
    this.dpChange = false;
    this.change = false;
    this.dpFile = event.target.files[0];
    this.dpFileType = event.target.files[0].type;
    this.dpFileSize = event.target.files[0].size;
    this.sizeInMb = this.dpFileSize/1024;
    this.sizeLimit= 1024*1; 

    if (this.dpFile) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
  
        if (this.dpFileType !== 'image/jpeg' && this.dpFileType !== 'image/jpg' && this.dpFileType !== 'image/png') {
          this.toast.showError('Error.','Invalid image format! Try .png or .jpg instead.');
        } else if  (this.sizeInMb > this.sizeLimit) {
          this.toast.showError('Error.','Sorry the file exceeds the maximum size of 1 MB!');
        } else {
          this.dpUrl = e.target.result;
          this.filename = event.target.files[0].name;
          this.dpChange = true;
        }
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeDP(){
    this.dpChange = false;
    this.dpUrl = null;
    this.filename = null;
    this.userPic = null;
    if (!this.change){
      this.dpUrl = this.oldPic;
    }
  }

  submit(){
    this.isLoading = true;
    let formData = new FormData();
    if(this.getUserID){
      formData.append('user_id', this.getUserID);
    }
    if (this.staffForm.controls.name.dirty){  formData.append('first_name', this.staffForm.value.name); }
    if (this.staffForm.controls.number.dirty){  formData.append('mobile', this.staffForm.value.number); }
    if (this.staffForm.controls.email.dirty){  formData.append('email', this.staffForm.value.email); }
    if (this.dpChange){  formData.append('profile_pic', this.dpFile); }
    if (this.roleChange){  formData.append('role', this.typeValue);  }
   
    
    let domain =  window.location.origin;
    domain = domain.substring(domain.length-1) == "/" ? domain.substring(0, domain.length-1) : domain;
    formData.append('domain', domain);

    if(this.dpUrl){
      this.staffService.saveStaff(formData).then(res =>{
        let r: any = res;
        if(r.error == 0){
          if(this.getUserID){
            if (this.staffForm.controls.name.dirty || this.staffForm.controls.number.dirty || this.staffForm.value.avatar){ 
              this.toast.showSuccess('Success', 'Account has been updated.');
            }
            if (this.staffForm.controls.email.dirty){
              this.toast.showSuccess('Success.', 'Please check inbox and spam or junk mail folder of new contact email.');
              this.toast.showSuccess('Success.', 'Verification email has been sent to new email. Confirm it to save changes. ');
            }
            this.staffForm.markAsPristine();
            this.change = true;
            this.isLoading = false;
          } else{
            this.toast.showSuccess('Success.','Please check inbox and spam/junk mail folder.');
            this.toast.showSuccess('Success', 'Account has been registered.');
            this.isLoading = false;
          }
          this._location.back();
        }else{
          this.toast.showError('Error', r.message);
          this.isLoading = false;
        }
      })
    }else{
      this.toast.showError('Error', 'No profile picture selected.');
      this.isLoading = false;
    }
    this.dpChange = false;
  }

  deactivateAccount() {
    let domainData =  window.location.origin;
    domainData = domainData.substring(domainData.length-1) == "/" ? domainData.substring(0, domainData.length-1) : domainData;
  
    let jsonData = {
      user_id: this.getUserID,
      domain:  domainData
    }
    this.modalService.setModalData(jsonData,'deactivateModals');
    this.modalService.open('deactivateModals');
  }

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
      const  phoneNumber  = this.staffForm.controls.number;
  
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

  selectedRole(type, name){
    this.roleChange = true;
    this.roleSelected = name;
    this.typeValue = type;
  }

  menuTouch(){
    this.touchMenu = true;
    // this.roleChange = this.roleSelected ?  true : false;
  }
}
