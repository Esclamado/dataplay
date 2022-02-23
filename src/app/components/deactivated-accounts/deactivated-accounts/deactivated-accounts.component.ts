import { Component, OnInit } from '@angular/core';
import { datatable } from '../../../components/datatables/athleteaccount-deactivated';
import { datatables } from '../../../components/datatables/sportfanaccount-deactivated';
import { StaffService } from '../../../services/staff/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deactivated-accounts',
  templateUrl: './deactivated-accounts.component.html',
  styleUrls: ['./deactivated-accounts.component.scss']
})
export class DeactivatedAccountsComponent implements OnInit {

  ths: any = datatable;
  thss: any = datatables;
  items: any;
  athletes: any;
  limit: any = 10;
  user_type: any;
  search: any;
  status: any = 2;
  page_array: any = [];
  order: any = {
    order_by_column: 'first_name',
    order_by: 'asc'
  };
  path: any;
  isLoading: boolean = false;

  constructor(
    private staffService: StaffService,
    private active_route: ActivatedRoute,
    private _location: Location
  ) { 
    this.user_type = this.active_route.snapshot.params.id;
    if(this.user_type == '2'){
      this.path = '/admin/staffs/staffs-profile/';
    }else if(this.user_type == '3'){
      this.path = '/admin/athletes/';
    }else if(this.user_type == '4'){
      this.path = '/admin/sport-fans/sportfan-profile/';
    }
  }

  ngOnInit(): void {
    this.getList();
  }

  backClicked() {
    this._location.back();
  }

  getList(){
    this.isLoading = true;
    this.staffService.getStaffListing(this.limit, this.user_type, this.search, this.pagination.selected_page, null, null, null, this.status, this.order).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        this.athletes = list.datas;
      }else{
        this.items = null;
        this.athletes = null;
      }
    }).finally(()=>{
      this.isLoading = false;
    })
  }

  searchKeyword(e){
    this.getList();
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

  orderList(can_sort, order_by_column, order_by){
    if (can_sort) {
      this.order = {
        order_by_column: order_by_column,
        order_by: order_by
      };
    }
    this.getList();
  }
}
