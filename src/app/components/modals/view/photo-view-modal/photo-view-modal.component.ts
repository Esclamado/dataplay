import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-photo-view-modal',
  templateUrl: './photo-view-modal.component.html',
  styleUrls: ['./photo-view-modal.component.scss']
})
export class PhotoViewModalComponent implements OnInit {
  data: any = null;
  photo: any;
  selectedIndex: any;
  postId: any;
  // lazyImage = 'assets/images/logo/dataplay_logo_lg.png'
  // lazyImage_url = `${this.lazyImage}`;
  post_data: any;
  
  lazyImage = 'assets/images/loader.gif'
  lazyImage_url = `${this.lazyImage}`;

  constructor(
    private modalService: NgxSmartModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  getPhoto(){
    this.data = this.modalService.getModalData('viewPhotoModal');
    // console.log('data: ', this.data)
    this.selectedIndex = this.data.selectedIndex;
    this.photo = this.data;
    this.post_data = this.data
  }
  reset(){
    this.modalService.resetModalData('viewPhotoModal');
    this.modalService.close('viewPhotoModal')
    // this.photo.reset();
  }

  viewPhoto(index){
    this.selectedIndex = index;
  }

  viewPost(index){
    this.postId = this.photo[index].post_id;
    this.router.navigate(['post-details/'+this.postId]);
    this.modalService.close('viewPhotoModal');
  }
  closeModal(){
    this.modalService.close
  }

}
