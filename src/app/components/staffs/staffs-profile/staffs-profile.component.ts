import { Component, OnInit, ViewChild } from '@angular/core';
import { datatable } from '../../datatables/activitylog-profile';
import { ActivitylogsService } from '../../../services/activitylogs/activitylogs.service';
import { StaffService } from '../../../services/staff/staff.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { Url } from '../../../../environments/Urls';
import { RequestsService } from '../../../services/http/requests.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { UserService } from 'src/app/services/user/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-staffs-profile',
  templateUrl: './staffs-profile.component.html',
  styleUrls: ['./staffs-profile.component.scss']
})
export class StaffsProfileComponent implements OnInit {

  ths: any = datatable;
  limit: any = 10;
  activityLogs: any;
  items: any;
  userDetails: any;
  getUserID: any;
  public dateForm: FormGroup;
  order: any = {
    order_by_column: 'created_at',
    order_by: 'asc'
  };
  page_array: any = [];
  created_at: any = [];
  from: any = null;
  to: any = null;
  deactivationStatus: any;
  userInfo: any;
  isLoading: boolean = false;
  isActivating: boolean = false;

  lazyImage = 'assets/images/loader.gif'
  lazyImage_url = `${this.lazyImage}`;
  user : any;
  routeSub : any;
  today: Date = new Date();

  constructor(
    private activitylogsService: ActivitylogsService,
    private staffService: StaffService,
    private active_route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private _location: Location,
    private request: RequestsService,
    private toast: ToastsService,
    private userService: UserService,
    private storage: StorageService,
    private route: Router,
    private modalService: NgxSmartModalService
  ) { 
    this.getUserID = this.active_route.snapshot.params.id;
    this.userService.getUserDetailsApi().then( user => {
      let list:any = user;
      if (!list.error) {
        this.userInfo = list.id;
      }
    })
  }
 
  ngOnInit(): void {
    this.routeSub = this.route.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.getUserID = this.active_route.snapshot.paramMap.get('id');
        this.getList();
        this.getView();
        this.formBuilders();
        this.user = this.storage.getUserStorage();
        this.modalService.open('loaderModal');
      } setTimeout(()=>{
        this.modalService.close('loaderModal');
      }, 1000);
    })

    this.getList();
    this.getView();
    this.formBuilders();
    this.user = this.storage.getUserStorage();
  }
  
  ngOnDestroy(){
    this.routeSub ? this.routeSub.unsubscribe() : null;
  }

  backClicked() {
    this._location.back();
  }

  formBuilders(){
    this.dateForm = this.formBuilder.group({
      start: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],end: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  getList(){
    this.isLoading = true;
    this.activitylogsService.getActivitylogsListing(this.limit, this.pagination.selected_page, this.getUserID, null, this.order, this.from, this.to).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        this.activityLogs = list.datas;
      }
    }).finally( () => {
      this.isLoading = false;
  })
  }

  getView(){
    this.staffService.getStaffView(this.getUserID).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.userDetails = list.data;
        this.deactivationStatus = list.data.deactivation_status;
      }
    })
  }

  pagination = {
    no_list: 10,
    selected_page: 1
  }
  nextPage(){
    this.page_array = [];
    if(this.pagination.selected_page < this.items.total_page){
      this.pagination.selected_page++;
      this.getList();
    }
  }
  prevPage(){
    this.page_array = [];
    if(this.pagination.selected_page > 1){
      this.pagination.selected_page--;
      this.getList();
    }
  }
  setPage(num){
      this.page_array = [];
      this.pagination.selected_page = num;
      this.getList();
  }

  getDates(e){    
    this.page_array = [];
    this.from = this.datePipe.transform(new Date(this.created_at.begin), 'yyyy-MM-dd');
    this.to = this.datePipe.transform(new Date(this.created_at.end), 'yyyy-MM-dd');
    this.getList();
  }
  
  orderList(can_sort, order_by_column, order_by){
    if (can_sort) {
      this.order = {
        order_by_column: order_by_column,
        order_by: order_by
      };
      this.getList();
    }
  }

  activateAccount(){
    this.isActivating = true;
    let formData = new FormData();
    formData.append('userId', this.userInfo);
    formData.append('user_id', this.getUserID);
    formData.append('status', '1');
    formData.append('reason', '');
    formData.append('deactivated_from', '');
    formData.append('deactivated_to', '');
    return new Promise(resolve => {
    let url = Url.webapi_staff_deactivate;
    this.request.post(url, formData).then(result => {
      resolve(result);
      this.getView();
      this.toast.showSuccess('Success', 'Account has been activated.');
    },error => {
      resolve(error);
      this.toast.showError('Error', 'Acccount activation failed.');
    }).finally(()=>{
      this.isActivating = false;
    });
  });
  }
}
