import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './layout/template/template.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TailwindUtilitiesComponent } from './components/tailwind-utilities/tailwind-utilities.component';
import { LoginComponent } from './components/login/login.component';
import { ChartsjsComponent } from './components/chartsjs/chartsjs.component';
import { FontAwesomeComponent } from './components/font-awesome/font-awesome.component';
import { VerificationRequestsComponent } from './pages/verification-requests/verification-requests.component';
import { ViolationReportsComponent } from './pages/violation-reports/violation-reports.component';
import { StaffsComponent } from './pages/staffs/staffs.component';
import { AthletesComponent } from './pages/athletes/athletes.component';
import { SportFansComponent } from './pages/sport-fans/sport-fans.component';
import { ContentManagementComponent } from './pages/content-management/content-management.component';
import { ActivityLogsComponent } from './pages/activity-logs/activity-logs.component';
import { StaffsProfileComponent } from '../../src/app/components/staffs/staffs-profile/staffs-profile.component';
import { CmsEditComponent } from './pages/content-management/cms-edit/cms-edit.component';
import { VerificationDetailsComponent } from './components/verification-request/verification-details/verification-details/verification-details.component';
import { SportfanProfileComponent } from '../../src/app/components/sport-fan/sportfan-profile/sportfan-profile.component';
import { ReportViewComponent } from './components/violation-reports/report-view/report-view/report-view.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { AuthLoginGuard } from 'src/app/guards/auth-login/auth-login.guard';
import { DshbComponent } from './pages/dashboard/dshb/dshb.component'
import { AthleteProfileComponent } from '../../src/app/components/athlete/athlete-profile/athlete-profile.component';
import { auth } from 'firebase';
import { DeactivatedAccountsComponent } from '../../src/app/components/deactivated-accounts/deactivated-accounts/deactivated-accounts.component';
import { AccountManagementComponent } from '../../src/app/components/account-management/account-management.component';
import { AccountSettingComponent } from './pages/account-setting/account-setting/account-setting.component';
import { StaffsAddComponent } from '../../src/app/components/staffs/staffs-add/staffs-add.component';
import { UpdatePasswordComponent } from '../../src/app/pages/update-password/update-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AuthStaffGuard } from 'src/app/guards/auth-staff/auth-staff.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard]},
  { path: '', component: TemplateComponent, canActivate: [AuthGuard] ,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'admin'},
      { path: 'admin',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
          { path: 'dashboard', component: DshbComponent },
          { path: 'verification-requests', component: VerificationRequestsComponent },
          { path: 'violation-reports', component: ViolationReportsComponent },
          { path: 'staffs', component: StaffsComponent },
          { path: 'staffs/staffs-profile/:id', component: StaffsProfileComponent },
          { path: 'sport-fans/sportfan-profile/:id', component: SportfanProfileComponent },
          { path: 'athletes', component: AthletesComponent },
          { path: 'sport-fans', component: SportFansComponent },
          { path: 'activity-logs', component: ActivityLogsComponent },
          { path: 'content-management', component: ContentManagementComponent },
          { path: 'content-management/:id', component: CmsEditComponent },
          { path: 'athletes/:id', component: AthleteProfileComponent },
          { path: 'deactivated-accounts/:id', component: DeactivatedAccountsComponent },
          { path: 'account-management/:id/:type', component: AccountManagementComponent },
          { path: 'account-setting', component: AccountSettingComponent },
          { path: 'staff-add', component: StaffsAddComponent, canActivate: [AuthStaffGuard] },
          { path: 'staff-update/:id', component: StaffsAddComponent, canActivate: [AuthStaffGuard] },
        ]
      },
      { path: 'admin/violation-reports/:id', component: ReportViewComponent },
      { path: 'verification-detail/:id', component: VerificationDetailsComponent },
      { path: 'tailwind-utilities', component: TailwindUtilitiesComponent },
      { path: 'chartjs', component: ChartsjsComponent},
      { path: 'icons', component: FontAwesomeComponent},
    ] 
  },
  { path: 'change-password/:key', component: UpdatePasswordComponent },
  { path: 'forgot-password/:key', component: UpdatePasswordComponent },
  { path: 'verify-email/:key', component: VerifyEmailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
