import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { datatable } from '../../../components/datatables/following-listing';
import { FollowingService } from '../../../services/following/following.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit, OnDestroy {

  @Input() getUserID;
  ths: any = datatable;
  limit: any = 5;
  items: any;
  followings: any;
  page_array: any = [];
  isLoading: boolean = false;

  routeSub : any;

  constructor(
    private followingService: FollowingService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getListing();

    this.routeSub = this.route.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.getUserID =  this.activeRoute.snapshot.params.id;
        this.getListing();
      }
    })
  }

  ngOnDestroy(){
    this.routeSub ? this.routeSub.unsubscribe() : null;
  }

  getListing(){
    this.isLoading = true;
    this.followingService.getFollowingListing(this.limit, this.getUserID, this.pagination.selected_page, null, null, null, null).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        this.followings = list.datas;
        console.log('this.followings',this.followings);
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
      this.getListing();
    }
  }
  prevPage(){
    if(this.pagination.selected_page > 1){
      this.pagination.selected_page--;
      this.getListing();
    }
  }
  setPage(num){
      this.pagination.selected_page = num;
      this.getListing();
  }

}
