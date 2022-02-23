import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../../../services/cms/cms.service';

@Component({
  selector: 'app-content-listing',
  templateUrl: './content-listing.component.html',
  styleUrls: ['./content-listing.component.scss']
})
export class ContentListingComponent implements OnInit {
  cmsList : any;
  requesting : any = true;

  constructor(
    private cms: CmsService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.cms.getCMSListing().then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.cmsList = list.data;
      } 
    }).finally(() => {this.requesting = false;})
  }

}
