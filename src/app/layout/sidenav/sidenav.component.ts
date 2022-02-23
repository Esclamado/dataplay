import { Component, OnInit, ComponentFactoryResolver, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/services/layout/layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() drawer: MatDrawer;
  expanded = true;
  showText = true;
  showTextTimeOut:any;
  sidenav_items = [
    { route: 'admin/dashboard', icon:'dashboard', title: 'Dashboard' },
    { route: 'admin/verification-requests', icon:'assignment', title: 'Verification Requests' },
    { route: 'admin/violation-reports', icon:'assignment_late', title: 'Violation Reports' },
    { route: 'admin/staffs', icon:'person_add', title: 'Staffs' },
    { route: 'admin/athletes', icon:'sports_baseball', title: 'Athletes' },
    { route: 'admin/sport-fans', icon:'emoji_emotions', title: 'Sport Fans' },
    { route: 'admin/activity-logs', icon:'watch_later', title: 'Activity Logs' },
    { route: 'admin/content-management', icon:'desktop_windows', title: 'Content Management' }
]

  constructor(
    private layout: LayoutService,
    public router: Router
  ) { 
    this.layout.expanded.subscribe( res => {
      // console.log('res:',res);
      this.expanded = res;
      if(res){
        this.showTextTimeOut = setTimeout(()=>{
          this.showText = true;
        },200);
      } else {
        clearTimeout(this.showTextTimeOut);
        this.showText = false;
      }
    })
   }

  ngOnInit(): void {
  }

  showImage(e,bool){

    if( this.layout.enableMouseHover ){
      this.layout.toggleSideNav(bool);
    }
  }
  checkIfActiveRoute(curr_route, menu_route){
    let curr = curr_route.split('/');
    let menu = menu_route.split('/');
    return curr[2] == menu[2] ? true : false;
  }
  checkIfAdminRoute(curr_route){
    let curr = curr_route.split('/');
    return curr[1] == 'admin' ? true : false;
  }

  checkifActive(url){
    return this.router.isActive(url,false);
  }
  

}
