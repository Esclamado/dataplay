// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxFirebaseClientModule } from '@ngx-firebase/client';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://api-dev.dataplayph.com:2021', options: {} };
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
// Components
import { LoaderComponent } from '../../src/app/components/defaults/loader/loader.component'
import { AppComponent } from './app.component';
import { TemplateComponent } from './layout/template/template.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TailwindUtilitiesComponent } from './components/tailwind-utilities/tailwind-utilities.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/modals/forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonComponentsComponent } from './components/common-components/common-components.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsjsComponent } from './components/chartsjs/chartsjs.component';
import { FontAwesomeComponent } from './components/font-awesome/font-awesome.component';
import { VerificationRequestsComponent } from './pages/verification-requests/verification-requests.component';
import { ViolationReportsComponent } from './pages/violation-reports/violation-reports.component';
import { StaffsComponent } from './pages/staffs/staffs.component';
import { AthletesComponent } from './pages/athletes/athletes.component';
import { SportFansComponent } from './pages/sport-fans/sport-fans.component';
import { ActivityLogsComponent } from './pages/activity-logs/activity-logs.component';
import { ContentManagementComponent } from './pages/content-management/content-management.component';
import { StaffsProfileComponent } from './components/staffs/staffs-profile/staffs-profile.component';
import { ContentListingComponent } from './pages/content-management/content-listing/content-listing/content-listing.component';
import { CmsCardComponent } from './pages/content-management/cms-card/cms-card.component';
import { CmsEditComponent } from './pages/content-management/cms-edit/cms-edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CommentComponent } from './components/violation-reports/comment/comment.component';
import { PostComponent } from './components/violation-reports/post/post.component';
import { VerificationDetailsComponent } from './components/verification-request/verification-details/verification-details/verification-details.component';
import { ConfirmComponent } from './components/modals/confirmation/confirm/confirm.component';
import { DeclinedMessagesComponent } from './components/modals/decline/declined-messages/declined-messages.component';
import { PhotoViewModalComponent } from './components/modals/view/photo-view-modal/photo-view-modal.component';
import { SportfanProfileComponent } from './components/sport-fan/sportfan-profile/sportfan-profile.component';
import { AthleteProfileComponent } from './components/athlete/athlete-profile/athlete-profile.component';
import { AgePipe } from './lib/age/age.pipe';
import { DeactivatedAccountsComponent } from './components/deactivated-accounts/deactivated-accounts/deactivated-accounts.component';
import { AccountManagementComponent } from './components/account-management/account-management.component';
import { ReportViewComponent } from './components/violation-reports/report-view/report-view/report-view.component';
import { DshbComponent } from './pages/dashboard/dshb/dshb.component';
import { DshbCardComponent } from './pages/dashboard/dshb-card/dshb-card.component';
import { DshbMostAthletesComponent } from './pages/dashboard/dshb-most-athletes/dshb-most-athletes.component';
import { AccountSettingComponent } from './pages/account-setting/account-setting/account-setting.component';

import { DeactivateComponent } from './components/modals/deactivate/deactivate.component';
import { ChangePasswordComponent } from './components/modals/change-password/change-password/change-password.component';
import { StaffsAddComponent } from './components/staffs/staffs-add/staffs-add.component';
import { DeactivateModalComponent } from './components/modals/deactivate-modal/deactivate-modal.component';
import { ReportDeleteComponent } from './components/modals/report-delete/report-delete/report-delete.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { CustomSuccessComponent } from './components/custom-toasts/custom-success/custom-success.component';
import { CustomErrorComponent } from './components/custom-toasts/custom-error/custom-error.component';
import { CustomWarningComponent } from './components/custom-toasts/custom-warning/custom-warning.component';
import { ToastrModule } from 'ngx-toastr';
import { CareerHighlightsComponent } from './components/athlete-profile-tabs/career-highlights/career-highlights.component';
import { FollowingComponent } from './components/athlete-profile-tabs/following/following.component';
import { FollowersComponent } from './components/athlete-profile-tabs/followers/followers.component';
import { MonthlyAnalyticsComponent } from './components/athlete-profile-tabs/monthly-analytics/monthly-analytics.component';
import { CustomLoaderComponent } from './components/modals/custom-loader/custom-loader.component';
import { PhotosComponent } from './components/athlete-profile-tabs/photos/photos.component';
import { PostsComponent } from './components/athlete-profile-tabs/posts/posts.component';
import { LinkPreviewComponent } from './components/link-preview/link-preview.component';
import { PostCardComponent } from './components/athlete-profile-tabs/post-card/post-card.component';
import { TransformDatePipe } from './pipes/transform-date/transform-date.pipe';
import { PasswordComponent } from './components/modals/password/password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { EmailPasswordComponent } from './components/modals/email-password/email-password.component';

@NgModule({
  declarations: [
    LoaderComponent,
    AppComponent,
    TemplateComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    TailwindUtilitiesComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CommonComponentsComponent,
    ChartsjsComponent,
    FontAwesomeComponent,
    VerificationRequestsComponent,
    ViolationReportsComponent,
    StaffsComponent,
    AthletesComponent,
    SportFansComponent,
    ActivityLogsComponent,
    ContentManagementComponent,
    StaffsProfileComponent,
    ContentListingComponent,
    CmsCardComponent,
    CmsEditComponent,
    SportfanProfileComponent,
    AthleteProfileComponent,
    AgePipe,
    DeactivatedAccountsComponent,
    AccountManagementComponent,
    CommentComponent,
    PostComponent,
    VerificationDetailsComponent,
    ConfirmComponent,
    DeclinedMessagesComponent,
    PhotoViewModalComponent,
    SportfanProfileComponent,
    ReportViewComponent,
    DshbComponent,
    DshbCardComponent,
    DshbMostAthletesComponent,
    AthleteProfileComponent,
    AgePipe,
    AccountSettingComponent,
    DeactivateComponent,
    ChangePasswordComponent,
    DeactivateComponent,
    StaffsAddComponent,
    DeactivateModalComponent,
    ReportDeleteComponent,
    UpdatePasswordComponent,
    CustomSuccessComponent,
    CustomErrorComponent,
    CustomWarningComponent,
    CareerHighlightsComponent,
    FollowingComponent,
    FollowersComponent,
    MonthlyAnalyticsComponent,
    CustomLoaderComponent,
    PhotosComponent,
    PostsComponent,
    LinkPreviewComponent,
    PostCardComponent,
    TransformDatePipe,
    PasswordComponent,
    VerifyEmailComponent,
    EmailPasswordComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    NgxSmartModalModule.forRoot(),
    NgxChartsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    CKEditorModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
      maxOpened: 5,
      autoDismiss: true,
    }),
    LazyLoadImageModule
    
    
    // NgxFirebaseClientModule.forRoot({
    //   apiKey: "AIzaSyBwviMHvQGCBDWHZ2nHRSKWyhEBfD1S09U",
    //   authDomain: "angular-tailwind-template.firebaseapp.com",
    //   databaseURL: "https://angular-tailwind-template.firebaseio.com",
    //   projectId: "angular-tailwind-template",
    //   storageBucket: "angular-tailwind-template.appspot.com",
    //   messagingSenderId: "158853503193",
    //   appId: "1:158853503193:web:670b2306f595fd29cf86c8",
    //   measurementId: "G-MNFWWH34Q0"
    // })
  ],
  providers: [
    DatePipe,
    // { //For LazyLoad
    //   provide: LAZYLOAD_IMAGE_HOOKS,
    //   useClass: ScrollHooks 
    // }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomWarningComponent,
    CustomSuccessComponent,
    CustomErrorComponent
  ]
})
export class AppModule { }
