import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dshb-card',
  templateUrl: './dshb-card.component.html',
  styleUrls: ['./dshb-card.component.scss']
})
export class DshbCardComponent implements OnInit {
  @Input() itemCard;
  @Input() requesting;

  constructor( 
    private router: Router) { }

  ngOnInit(): void {
  }

  route(page){
    page == 'requests' ?  this.router.navigate(['/admin/verification-requests']):
    page == 'reports' ?  this.router.navigate(['/admin/violation-reports']):
    page == 'athletes' ?  this.router.navigate(['/admin/athletes']):
    page == 'sport fans' ?  this.router.navigate(['/admin/sport-fans']):
    "";
  }
}
