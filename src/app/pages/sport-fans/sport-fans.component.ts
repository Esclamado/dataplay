import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff/staff.service';
import { datatable } from '../../components/datatables/sport-fan';
@Component({
  selector: 'app-sport-fans',
  templateUrl: './sport-fans.component.html',
  styleUrls: ['./sport-fans.component.scss']
})
export class SportFansComponent implements OnInit {

  limit: any = 10;
  sportfans: any;
  ths: any = datatable;
  isLoaded: boolean = false;
  items: any;
  user_type: any = 4;
  search: any;
  status: any = 1;
  order: any = {
    order_by_column: 'first_name',
    order_by: 'asc'
  };
  page_array: any = [];
  isLoading: boolean = false;
  deact_status: any = 2;
  deactivated: any;

  constructor(
    private staffService: StaffService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.getDeactivatedList();
  }

  getList(){
    this.isLoading = true;
    this.staffService.getStaffListing(this.limit, this.user_type, this.search, this.pagination.selected_page, null, null, null, this.status, this.order).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        this.sportfans = list.datas;
      }else{
        this.items = null;
        this.sportfans = null;
      }
    }).finally(()=>{
      this.isLoading = false;
    })
  }

  getDeactivatedList(){
    this.isLoading = true;
    this.staffService.getStaffListing(this.limit, this.user_type, null, null, null, null, null, this.deact_status, null).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.deactivated = list;
      }else{
        this.deactivated = null;
      }
    })
  }

  searchKeyword(e){
    this.pagination.selected_page=1;
    this.getList();
  }

  pagination = {
    no_list: 10,
    selected_page: 1
  }
  nextPage(){
    if(this.pagination.selected_page < this.items.total_page){
      this.pagination.selected_page++;
      this.getList();
    }
  }
  prevPage(){
    if(this.pagination.selected_page > 1){
      this.pagination.selected_page--;
      this.getList();
    }
  }
  setPage(num){
      this.pagination.selected_page = num;
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
}
