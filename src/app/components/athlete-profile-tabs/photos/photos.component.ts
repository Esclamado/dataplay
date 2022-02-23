import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { PhotosService } from 'src/app/services/photos/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, OnChanges, OnDestroy {

  @Input() profileId;

  photoData:any = null;
  lazyImage = 'assets/images/loader.gif'
  lazyImage_url = `${this.lazyImage}`;

  routeSub : any;

  constructor(
    private photoService: PhotosService,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private modal: NgxSmartModalService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes.hasOwnProperty('profileId') && changes.profileId.currentValue){
      this.photoService.getPhotosByID(this.profileId).then((res: any) => {
        this.photoData = res;
      })
    }
  }
  // ngAfterViewInit(): void {
  //   this.photoService.getPhotosByID(this.profileId).then( (res:any) => {
  //     console.log('photos', res);
  //   })
  // }

  ngOnInit(): void {

    this.routeSub = this.route.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.profileId =  this.activeRoute.snapshot.params.id;
        this.photoService.getPhotosByID(this.profileId).then((res: any) => {
          this.photoData = res;
        })
      }
    })
  }

  ngOnDestroy(){
    this.routeSub ? this.routeSub.unsubscribe() : null;
  }
  viewPhoto(post, index) {
    let data = {
      post: post,
      selectedIndex: index,
      from: 'post_photo'
      
    }
    this.modal.setModalData(data, 'viewPhotoModal', true);
    this.modal.open('viewPhotoModal');
  }



}
