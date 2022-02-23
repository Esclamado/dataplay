import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { LayoutService } from '../../services/layout/layout.service';
import { environment } from 'src/app/lib/environment';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { SocketService } from 'src/app/services/socket/socket.service';
import { ActivitylogsService } from 'src/app/services/activitylogs/activitylogs.service';
import * as moment from 'moment/moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NotifService } from 'src/app/services/notif/notif.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  expanded = true;
  user : any = null;
  userSubscription : any;

  notifSocket : any;
  notifSubscription : any;
  notifData: any;
  notification: any = [];
  typeRes : any;
  notifBadge : any;

  lazyImage = 'assets/images/loader.gif'
  lazyImage_url = `${this.lazyImage}`;

  scrollSub: any;
  unreadMessageSub: any;
  scrollRequesting: any = false;
  notifDataSub:any;
  
  constructor(
    private layout: LayoutService,
    private storage: StorageService,
    private userService: UserService,
    private socketService: SocketService,
    private activityService : ActivitylogsService,
    private env: environment,
    private route: Router,
    private modal: NgxSmartModalService,
    private notifService: NotifService

  ) { 
      this.layout.expanded.subscribe( res => {
        this.expanded = res;
      });
      this.userSubscription = this.userService.userSubscription.subscribe( res => {
        if (res){
          this.user = res;
        }
      });
    }

  ngOnDestroy() {
    this.userSubscription ? this.userSubscription.unsubscribe(): null;
    this.notifSubscription ? this.notifSubscription.unsubscribe(): null;
    this.notifDataSub ? this.notifDataSub.unsubscribe(): null;
  }

  ngOnInit(): void {
    this.userService.getUserDetails().then((res : any) => {
      if (res){
        this.userService.updateUserDetailsSubscription(res);
        this.notifSubscription = this.socketService.getNotif().subscribe( (res : any) => {
       
          this.notifService.getNotif(res.data.data.admin_notif.id).then(( notifData : any) =>{
            if (!notifData.error){
              let returnData = this.notifService.addNotif(notifData.data);
              this.notifData['unread_notif'] = this.notifData && this.notifData['unread_notif'] ? parseInt(this.notifData['unread_notif']) + 1 : 1;
              returnData && returnData.hasOwnProperty('datas') ? this.readby(returnData.datas) : null;
            }
          });
          
        });
        this.initializeSub();
        this.getNotificationListing();
      }
    })
  }
  
  initializeSub(){
    this.notifDataSub = this.notifService.notifData.subscribe(data => {
      this.notifData = data;
      this.notifData && this.notifData.hasOwnProperty('datas') ? this.readby(this.notifData.datas) : null;
    })
    this.notifSubscription = this.notifService.notifications.subscribe(data=>{
      this.notification = data
      this.notification ? this.readby(this.notification) : null;
    })
  }

  toggleSidenav(){
    this.layout.toggleSideNav(!this.expanded);
    this.layout.toggleEnableHover(!this.layout.enableMouseHover);
  }

  logout(){
    this.modal.open('loaderModal');
    this.userService.logout()
    .then(res => {
        let r: any = res;
        if (!r.error) {
            this.notification = [];
            this.storage.storageClear();
            this.env.deleteCookie();
            this.env.deleteUserCookie();
            //console.log('no error');
            setTimeout(() => {
                // this.modal.close('loaderModal');
                this.env.exchangeToken();
                this.userService.updateUserDetailsSubscription(null);
                this.userService.user = null;
                this.route.navigate(['/login']);
              this.modal.closeAll();
                // console.log('service: ',this.userservice.user)
            }, 3000);
        } else {
            // this.modal.close('loaderModal');
            //console.log('error', r);
        }

    }, err => {
        //console.log('error logout', err)
    }).finally(() => { })
  }

  getNotificationListing(limit = null, page = null, lastId = false) {
    this.notifService.getNotifListing(limit, page,this.user.id ,lastId).then(res => {
      this.notifBadge = res['unread_notif'];
    }).finally(() => {
      this.scrollRequesting = false;
    })
  }
  onScroll(ev: any) {
    let scrollHeight = ev.target.scrollHeight;
    let combined = ev.target.scrollTop + ev.target.clientHeight;
    if (!this.scrollRequesting && scrollHeight == combined && this.notifData.next_page){
      this.getNotificationListing(10, this.notifData.next_page, false);
        this.scrollRequesting = true;
    } else {
        return false;
    }
  }

  readNotification(notif_id, read){
    if (!read){
      this.notifService.readNotif(notif_id, false).then(res => {
        let r: any = res;
        if (!r.error) {
          this.notifData['unread_notif'] = this.notifData['unread_notif']  > 0 ? this.notifData['unread_notif'] - 1 : null;
          this.getNotificationListing();
          this.initializeSub();
        } 
      })
    }
   
  }

  readAllNotification(){
    this.notifService.readNotif(null, true).then(res => {
      let r: any = res;
      if (!r.error) {
        this.notifData['unread_notif'] = 0;
        this.getNotificationListing();
        this.initializeSub();
      }
    })
  }

  readby(notifications){
      for (let data of notifications){ 
        if (data.read_by){
          var split_str = data.read_by.split(",");
          if (split_str.indexOf(this.user.id) !== -1) {
            data.read_by = this.user.id;
          }else{
            data.read_by = null;
          }
        }else{
          data.read_by = null;
        }
      }
  }
  convertToAgo(date) {
    return moment(date, "YYYY-MM-DD H:mm:ss a").fromNow();
}
}
