import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  url : any;

  constructor(
    private modalService: NgxSmartModalService,
    private activeRoute: ActivatedRoute
  ) {
    this.url = this.activeRoute.snapshot.params.key;
   }

  ngOnInit(): void {
    this.modalService.setModalData( this.url, 'emailPasswordModal');
    this.modalService.open('emailPasswordModal');
  }

}
