import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MonthlyAnalyticsService } from '../../../services/monthly-analytics/monthly-analytics.service';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-monthly-analytics',
  templateUrl: './monthly-analytics.component.html',
  styleUrls: ['./monthly-analytics.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
  ]
})
export class MonthlyAnalyticsComponent implements OnInit, OnDestroy {

  @Input() getUserID;
  limit: any = 5;
  items: any;
  monthlyAnalytics: any;
  page_array: any = [];
  month: any;
  dateMY: any;
  MY: any;
  today: Date = new Date();
  routeSub : any;
  todayDate:Date = new Date();

  constructor(
    private monthlyAnalyticsService: MonthlyAnalyticsService,
    public datepipe:DatePipe,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getList();

    this.routeSub = this.route.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.getUserID =  this.activeRoute.snapshot.params.id;
        this.getList();
      }
    })
  }

  ngOnDestroy(){
    this.routeSub ? this.routeSub.unsubscribe() : null;
  }

  getList(){
    this.monthlyAnalyticsService.getMonthlyAnalyticsListing(this.limit, this.getUserID, this.pagination.selected_page, this.dateMY).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
    
        this.monthlyAnalytics = list.datas;

        if(this.pagination.selected_page % 3 === 0){
          this.page_array=[];
          for(let i=this.pagination.selected_page; i<=this.items.total_page; i++){
            this.page_array.push(i);
          };
        }else if(this.pagination.selected_page == 1){
          this.page_array=[];
          for(let i=1; i<=this.items.total_page; i++){
            this.page_array.push(i);
          };
        }else{
          this.page_array=[];
          for(let i=this.pagination.selected_page-1; i<=this.items.total_page; i++){
            this.page_array.push(i);
          };
        }

      }else{
        this.items = null;
        this.monthlyAnalytics = null;
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

  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.dateMY = this.datepipe.transform(this.date.value,'yyyy-MM-01');
    this.MY = this.datepipe.transform(this.date.value,'yyyy-MM');
    this.getList();
  }

}
