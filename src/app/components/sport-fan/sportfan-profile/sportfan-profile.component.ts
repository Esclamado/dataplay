import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../services/staff/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { datatable } from '../../../components/datatables/sportfan-following';
import { FollowingService } from '../../../services/following/following.service';
import { MainsportsService } from '../../../services/mainsports/mainsports.service';
import { ProvincesService } from 'src/app/services/locations/provinces.service';
import { Location } from '@angular/common';
import { Url } from '../../../../environments/Urls';
import { RequestsService } from '../../../services/http/requests.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sportfan-profile',
  templateUrl: './sportfan-profile.component.html',
  styleUrls: ['./sportfan-profile.component.scss']
})
export class SportfanProfileComponent implements OnInit {

  userDetails: any;
  getUserID: any;
  bgImageUrl = 'assets/images/bgbluex2.png';
  bg_default_url = `url(${this.bgImageUrl})`;
  search: any;
  ths: any = datatable;
  limit: any = 10;
  followings: any;
  items: any;
  mainSports: any;
  type_value: any;
  provinceList: any;
  province_filtered_list: any;
  type_name: any;
  location: any;
  deactivationStatus: any;
  order: any = {
    order_by_column: 'id',
    order_by: 'asc'
  };
  page_array: any = [];
  userInfo: any;
  isLoading: boolean = false;
  isActivating: boolean = false;
  type_values: any;

  constructor(
    private staffService: StaffService,
    private active_route: ActivatedRoute,
    private followingService: FollowingService,
    private mainsportsService: MainsportsService,
    private province: ProvincesService,
    private _location: Location,
    private request: RequestsService,
    private toast: ToastsService,
    private userService: UserService
  ) { 
    this.getUserID = this.active_route.snapshot.params.id;
    this.userService.getUserDetailsApi().then( user => {
      let list:any = user;
      if (!list.error) {
        this.userInfo = list;
      }
    })
  }

  ngOnInit(): void {
    this.getView();
    this.getListing();
    this.getMainsportsListing();
    this.getProvinceList();
  }

  backClicked() {
    this._location.back();
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

  getListing(){
    this.isLoading = true;
    this.followingService.getFollowingListing(this.limit, this.getUserID, this.pagination.selected_page, this.search, this.type_value, this.location, this.order).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        this.followings = list.datas;
      }
    }).finally(()=>{
      this.isLoading = false;
    })
  }

  getMainsportsListing(){
    this.mainsportsService.getMainSportsListing().then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.mainSports = list.datas;
      }
    })
  }

  searchKeyword(e){
    this.getListing();
  }

  pagination = {
    no_list: 10,
    selected_page: 1
  }
  nextPage(){
    if(this.pagination.selected_page < this.items.total_page){
      this.pagination.selected_page++;
      this.getListing();
    }
  }
  prevPage(){
    if(this.pagination.selected_page > 1){
      this.pagination.selected_page--;
      this.getListing();
    }
  }
  setPage(num){
      this.pagination.selected_page = num;
      this.getListing();
  }

  clickedSports(type, id?){
    this.type_values = type;
    this.type_value = id;
    if(type == 0){
      this.type_value = null;
    }
    this.getListing();
  }

  getProvinceList() {
    this.provinceList = this.province.getProvinceList();
    this.provinceList.sort((a, b) => (a.name > b.name) ? 1 : -1);
    this.province_filtered_list = this.provinceList;
  }

  clickedLocation(name){
    this.pagination.selected_page=1;
    this.type_name = name;
    if(name){
      this.location = this.type_name.toLowerCase();
    }else{
      this.location = null;
    }
    this.getListing();
  }

  activateAccount(){
    this.isActivating = true;
    let formData = new FormData();
    formData.append('userId', this.userInfo.id);
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
      this.toast.showError('Error', 'Account activation failed.');
    }).finally(()=>{
      this.isActivating = false;
    });
  });
  }

  orderList(can_sort, order_by_column, order_by){
    if (can_sort) {
      this.order = {
        order_by_column: order_by_column,
        order_by: order_by
      };
    }
    this.getListing();
  }
}
