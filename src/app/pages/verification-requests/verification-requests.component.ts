import { Component, OnInit } from '@angular/core';
import { AthleteVerificationService } from '../../services/athlete-verification/athlete-verification.service';
import { datatable } from '../../components/datatables/athlete-verification-listing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Url } from 'src/environments/Urls';
import { RequestsService } from '../../services/http/requests.service';
import { MainsportsService } from 'src/app/services/mainsports/mainsports.service';

@Component({
  selector: 'app-verification-requests',
  templateUrl: './verification-requests.component.html',
  styleUrls: ['./verification-requests.component.scss']
})
export class VerificationRequestsComponent implements OnInit {
  sportsForm: FormGroup;

  limit: any = 10;
  staffs: any;
  ths: any = datatable;
  isLoaded: boolean = false;
  isLoading:any = false
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
  verifyListing: any;
  sport_list: any;
  listingArgs = {
    page: 1,
    limit: 10,
  };
  page_array: any = [];


  constructor(
    private verification: AthleteVerificationService,
    private fb: FormBuilder,
    private request: RequestsService,
    private mainsportsService: MainsportsService,



  ) { }

  ngOnInit(): void {
    this.getList();
    this.getMainsportsListing()
  }
  render(text){
    return text;
  }
  getList(){
    this.isLoading = true;
    this.verification.getVerificationListing(this.limit, this.user_type, this.search, this.pagination.selected_page, this.type_value).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.isLoading = false
        this.items = list;
        this.verifyListing = list.datas;
      }else{
        this.isLoading = false
      }
    })
  }

  searchKeyword(e){
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
  clickedStatus(type){
    this.pagination.selected_page = 1;
    this.type_value = type;
    this.getList();
  }
  //pagination

  getMainsportsListing(){
    this.mainsportsService.getMainSportsListing().then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.sport_list = list.datas;
      }
    })
  }
}
