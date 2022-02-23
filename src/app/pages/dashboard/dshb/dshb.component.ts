import { Component,OnInit } from '@angular/core';
import { Url } from '../../../../environments/Urls';
import { RequestsService } from '../../../services/http/requests.service';
import { MostAthletesService } from '../../../services/dashboard/most-athletes.service';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {Moment} from 'moment';
import { DatePipe } from '@angular/common';


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

const moment =  _moment;;
@Component({
  selector: 'app-dshb',
  templateUrl: './dshb.component.html',
  styleUrls: ['./dshb.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
  ],
})



export class DshbComponent implements OnInit {
  cardList : any;
  top10List : any;
  provinceList: any;
  sportsList: any;
  dateMY: any;
  requesting : any = false;
  requestingTop10 : any = false;
  requestingSports : any = false;
  requestingProvince : any = false;
  numbView : any;
  today: Date = new Date();

  lazyImage = 'assets/images/loader.gif'
  lazyImage_url = `${this.lazyImage}`;

  cards = [
    {
      "content" :  "Pending verification requests",
      "title"   :  "requests",
      "count"   :  0,
      "svg"     :  "/assets/images/icon/request.svg"
    },
    {
      "content" :  "Pending reported posts",
      "title"   :  "reports",
      "count"   :  0,
      "svg"     :  "/assets/images/icon/post.svg"
    },
    {
      "content" :  "No. of athlete accounts",
      "title"   :  "athletes",
      "count"   :  0,
      "svg"     :  "/assets/images/icon/athlete.svg"
    },
    {
      "content" :  "No. of sport fan accounts",
      "title"   :  "sport fans",
      "count"   :  0,
      "svg"     :  "/assets/images/icon/fan.svg"
    }
  ]
  
  constructor(
    private request: RequestsService,
    private mostService: MostAthletesService,
    public datepipe:DatePipe) { }

  ngOnInit(): void {
    this.getList();
    this.getTop10List();
    this.getProvinceList();
    this.getSportsList();
  }

  getCardsListing() {
    return new Promise(resolve => {
      let url = Url.webapi_dshb_cards;

      this.request.get(url).then(result => {
        resolve(result);
      },error => {
        resolve(error);
      });
    });
  }

  getList(){
    this.requesting = true;
    this.getCardsListing().then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.cardList = list.data;
        this.cardList.pending_verif_request ? this.cards[0].count = this.cardList.pending_verif_request : "";
        this.cardList.pending_report_post ? this.cards[1].count = this.cardList.pending_report_post : "";
        this.cardList.number_of_athletes ? this.cards[2].count = this.cardList.number_of_athletes: ";"
        this.cardList.number_of_fans ? this.cards[3].count = this.cardList.number_of_fans: "";
        this.requesting = false;
      } else {
        this.requesting = false;
      }
    })
  }

  getTop10List(date = null){
    this.requestingTop10 = true;

    const formatYmd = date => date.toISOString().slice(0, 7);
    const current = formatYmd(new Date());      

    if (date){
      this.mostService.getTop10Listing(date).then(res =>{
        let list: any = res;
        if(list.error == 0){
          this.top10List = list.datas;
          this.requestingTop10 = false;
        } else {
          this.requestingTop10 = false;
        }
      })
    } else {
      this.mostService.getTop10Listing(current).then(res =>{
        let list: any = res;
        if(list.error == 0){
          this.top10List = list.datas;
          this.requestingTop10 = false;
        } else {
          this.requestingTop10 = false;
        }
      })
    }
  }

  getProvinceList(){
    this.requestingProvince = true;
    this.mostService.getProvinceMostAthletes().then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.provinceList = list.data;
        this.requestingProvince = false;
      } else {
        this.requestingProvince = false;
      }
    })
  }

  getSportsList(){
    this.requestingSports = true;
    this.mostService.getSportsMostAthletes().then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.sportsList = list.data;
        this.requestingSports = false;
      } else {
        this.requestingSports = false;
      }
    })
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
    this.dateMY = this.datepipe.transform(this.date.value,'yyyy-MM');
    this.getTop10List(this.dateMY);
  }

  convert(view){
    if (view == 1){
      this.numbView = view + ' view';
    } else if (view >=2 && view < 1000){
      this.numbView = view + ' views';
    } else if (view > 999){
      this.numbView = this.convertToK(view) + ' views';
    } else{
      this.numbView = this.convertToHundreds(view) + ' views';
    }
    return this.numbView;
  }

  convertToK(str){
    return (str % 1000 == 0 ? str / 1000 : (str / 1000).toString().substring(0, 3)  )  + 'k'; 
  }

  convertToHundreds(str){
    return str > 100 ? ( str%100 == 0 ? str : Math.floor(parseInt(str)/100) * 100 + '+') : str; 
  }

}
