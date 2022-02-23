import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportedService } from 'src/app/services/reported/reported.service';
import { datatable } from '../../../components/datatables/violation-report-post';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  limit: any = 10;
  staffs: any;
  ths: any = datatable;
  isLoaded: boolean = false;
  isLoading: any = false;
  items: any;
  user_type: any = 2;
  search: any;
  report_type: any = 1;
  sortTypes = [
    {
      name: 'Pending',
      type: '0'
    },
    {
      name: 'Checked',
      type: '1'
    },
    {
      name: 'Deleted',
      type: '2'
    }
  ];
  type_value: any;
  reported_list: any;
  status: any;
  status_name: any;
  page_array:any =[];
  constructor(
    private report: ReportedService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.getList();
  }
  render(text){
    return text;
  }
  getList(){
    this.isLoading = true;
    this.report.getViolationList(this.report_type, this.limit, this.status, this.search, this.pagination.selected_page, this.type_value).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        // console.log('violation', this.items);
        this.reported_list = list.data;
        this.isLoading = false;
      }else{
        this.isLoading = false;
      }
    })
  }

  searchKeyword(e){
    this.pagination.selected_page = 1;
    this.getList();
  }

  clickedStatus(type){
    this.pagination.selected_page = 1;
    this.type_value = type;
    this.status = type.type ? type.type : null;
    this.status_name = type.name;
    this.getList();
  }
  //pagination
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
  //pagination
  viewReport(report){
    this.report.setType(4);
    this.route.navigate(['/admin/violation-reports/' + report.id]);
  }

}
