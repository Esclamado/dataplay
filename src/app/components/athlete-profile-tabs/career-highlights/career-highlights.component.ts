import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MainsportsService } from '../../../services/mainsports/mainsports.service';
import { CareerHighlightsService } from '../../../services/career-highlights/career-highlights.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-career-highlights',
  templateUrl: './career-highlights.component.html',
  styleUrls: ['./career-highlights.component.scss']
})
export class CareerHighlightsComponent implements OnInit, OnDestroy {

  limit: any = 10;
  mainSports: any;
  items: any;
  careerHighlights: any;
  @Input() getUserID;
  type_value: any;
  type_values: any;

  routeSub : any;

  constructor(
    private mainsportsService: MainsportsService,
    private careerhighlightsService: CareerHighlightsService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMainsportsListing();
    this.getListing();
    

    this.routeSub = this.route.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.getUserID =  this.activeRoute.snapshot.params.id;
        this.getMainsportsListing();
        this.getListing();
      }
    })
  }

  ngOnDestroy(){
    this.routeSub ? this.routeSub.unsubscribe() : null;
  }

  getMainsportsListing(){
    this.mainsportsService.getMainSportsListing().then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.mainSports = list.datas;
      }
    })
  }

  getListing(){
    this.careerhighlightsService.getCareerHighlightsListing(this.limit, this.getUserID, this.type_value).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        this.careerHighlights = list.datas;
      }else{
        this.items = null;
        this.careerHighlights = null;
      }
    })
  }

  clickedSports(type, id?){
    this.type_values = type;
    this.type_value = id;
    if(type == 0){
      this.type_value = null;
    }
    this.getListing();
  }

}
