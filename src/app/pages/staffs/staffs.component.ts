import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff/staff.service';
import { datatable } from '../../components/datatables/staff-listing';
import { StorageService } from 'src/app/services/storage/storage.service';
@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss']
})
export class StaffsComponent implements OnInit {

  limit: any = 10;
  staffs: any;
  ths: any = datatable;
  isLoaded: boolean = false;
  items: any;
  user_type: any = 2;
  search: any;
  sortTypes = [
    {
      name: 'Latest added',
      type: '1'
    },
    {
      name: 'Old added',
      type: '0'
    }
  ];
  type_value: any;
  status: any = 1;
  page_array: any = [];
  isLoading: boolean = false;
  deact_status: any = 2;
  deactivated: any;
  type_name: any;
  user : any;

  constructor(
    private staffService: StaffService,
    private storage : StorageService
  ) { 
  
  }

  ngOnInit(): void {
    this.getList();
    this.getDeactivatedList();

    this.user = this.storage.getUserStorage();
  }

  getList(){
    this.isLoading = true;
    this.staffService.getStaffListing(this.limit, this.user_type, this.search, this.pagination.selected_page, this.type_value, null, null, this.status, null).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        this.staffs = list.datas;
      }else{
        this.items = null;
        this.staffs = null;
      }
    }).finally( () => {
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
    this.pagination.selected_page = 1;
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

  clickedStatus(type, name?){
    this.pagination.selected_page = 1;
    this.type_value = type;
    this.type_name = name;
    this.getList();
  }
}
