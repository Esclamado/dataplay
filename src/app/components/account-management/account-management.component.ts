import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {

  getUserID: any;
  type: any;

  constructor(
    private active_route: ActivatedRoute,
    private _location: Location,
    private modalService: NgxSmartModalService
  ) { 
    this.getUserID = this.active_route.snapshot.params.id;
    this.type = this.active_route.snapshot.params.type;
  }

  ngOnInit(): void {

  }

  backClicked() {
    this._location.back();
  }

  deactivateAccount() {
    //Please remove userId 4 parameter after testing
    let jsonData = {
      userId: '4',
      user_id: this.getUserID,
      type: this.type,
    }
    this.modalService.setModalData(jsonData,'deactivateModal');
    this.modalService.open('deactivateModal');
  }

}
