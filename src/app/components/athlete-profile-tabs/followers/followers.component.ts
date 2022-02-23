import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { analytics } from 'firebase';
import { datatable } from '../../../components/datatables/following-listing';
import { FollowingService } from '../../../services/following/following.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit, OnDestroy {

  @Input() getUserID;
  ths: any = datatable;
  limit: any = 5;
  items: any;
  followers: any;
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
    this.followingService.getFollowerListing(this.limit, this.getUserID, this.pagination.selected_page).then(res =>{
      let list: any = res;
      if(list.error == 0){
        this.items = list;
        this.followers = list.datas;
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
