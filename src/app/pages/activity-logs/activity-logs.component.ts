import { Component, OnInit } from '@angular/core';
import { datatable } from '../../components/datatables/activity-logs';
import { ActivitylogsService } from '../../services/activitylogs/activitylogs.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./activity-logs.component.scss']
})
export class ActivityLogsComponent implements OnInit {

  ths: any = datatable;
  items: any;
  activityLogs: any;
  limit: any = 10;
  search: any;
  created_at: any = [];
  from: any = null;
  to: any = null;
  order: any = {
    order_by_column: 'created_at',
    order_by: 'asc'
  };
  page_array: any = [];
  isLoading: boolean = false;
  today: Date = new Date();

  constructor(
    private activitylogsService: ActivitylogsService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.isLoading = true;
    this.activitylogsService.getActivitylogsListing(this.limit, this.pagination.selected_page, null, this.search, this.order, this.from, this.to).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        this.activityLogs = list.datas;
      }
    }).finally(()=>{
      this.isLoading = false;
    })
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
      this.page_array = this.page_array;
      this.pagination.selected_page = num;
      this.getList();
  }

  searchKeyword(e){
    this.pagination.selected_page = 1;
    this.getList();
  }

  getDates(e){
    this.pagination.selected_page = 1;
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
}
