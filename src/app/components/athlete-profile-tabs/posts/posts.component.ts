import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts/posts.service'
import { ScrollService } from'src/app/services/scroll/scroll.service'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() userId:any;
  scrollSub: any;
  scrollRequesting: any = false;
  limit: any = 10;
  isLoading: boolean = false;
  routeSub : any;

  constructor(
    private postService: PostsService,
    private scroll: ScrollService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) { }
  postSub:any = null;
  posts:any = null;
  ngOnInit(): void {

    this.routeSub = this.route.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.userId =  this.activeRoute.snapshot.params.id;
        this.postService.getPost(this.userId).then( post => {
        })
      }
    })

    this.initializeSub();
    this.postService.getPost(this.userId).then( post => {
      // console.log('posts', post);
    })


  }

  initializeSub(){
    this.postSub = this.postService.posts.subscribe( posts => {
      this.posts = posts;
    })
  }
  onScroll(ev: any){ 
    this.isLoading = true;
    let scrollHeight = ev.target.scrollHeight;
    let combined = ev.target.scrollTop + ev.target.clientHeight;
    if (!this.scrollRequesting && scrollHeight == combined && this.posts.next_page){
      // this.getNotificationListing(10, this.notifData.next_page, false); && 
      this.postService.getPost(this.userId,this.limit ,this.posts.next_page).then( post => {
        let r = post
      })
        this.scrollRequesting = true;
    } else {
      if(!this.posts.next_page){
        this.isLoading = false;
      }
      return false;
    }
    
  }

}
