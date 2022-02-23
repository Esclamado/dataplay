import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RequestsService } from 'src/app/services/http/requests.service';
import { Url } from '../../../../environments/Urls';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-cms-card',
  templateUrl: './cms-card.component.html',
  styleUrls: ['./cms-card.component.scss']
})
export class CmsCardComponent implements OnInit {
  @Input() item;

  constructor(
    private request: RequestsService
  ) { }

  ngOnInit(): void {
    this.innerHtml();
  }

  convertToAgo(date) {
    return moment(date, "YYYY-MM-DD H:mm: ss a").fromNow(); 
  }

  innerHtml(){
    if (this.item && this.item.content){
      this.item.content.length > 110 ? this.item.content = this.item.content.substring(0, 200) + " ...": "";
    } 
  }

}
