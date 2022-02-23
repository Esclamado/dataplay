import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff/staff.service';
import { datatable } from '../../components/datatables/athlete-listing';
import { MainsportsService } from '../../services/mainsports/mainsports.service';
import { ProvincesService } from 'src/app/services/locations/provinces.service';

@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss']
})
export class AthletesComponent implements OnInit {

  limit: any = 10;
  athletes: any;
  ths: any = datatable;
  isLoaded: boolean = false;
  items: any;
  user_type: any = 3;
  search: any;

  mainSports: any;
  type_value: any;
  provinceList: any;
  province_filtered_list: any;
  type_name: any;
  location: any;
  status: any = 1;
  order: any = {
    order_by_column: 'first_name',
    order_by: 'asc'
  };
  page_array: any = [];
  isLoading: boolean = false;
  deact_status: any = 2;
  deactivated: any;
  type_values: any;

  constructor(
    private staffService: StaffService,
    private mainsportsService: MainsportsService,
    private province: ProvincesService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.getMainsportsListing();
    this.getProvinceList();
    this.getDeactivatedList();
  }

  getList(){
    this.isLoading = true;
    this.staffService.getStaffListing(this.limit, this.user_type, this.search, this.pagination.selected_page, null, this.type_value, this.location, this.status, this.order).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        this.athletes = list.datas;
      }else{
        this.items = list;
        this.athletes = null;
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

/*   clickedSports(type){
    this.pagination.selected_page=1;
    this.type_value = type;
    if(type == 0){
      this.type_value = null;
    }
    this.getList();
  } */
  clickedSports(type, id?){
    this.type_values = type;
    this.type_value = id;
    if(type == 0){
      this.type_value = null;
    }
    this.getList();
  }

  getMainsportsListing(){
    this.mainsportsService.getMainSportsListing().then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.mainSports = list.datas;
      }
    })
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
