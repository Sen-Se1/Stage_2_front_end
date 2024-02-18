import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateDepComponent } from './create-dep/create-dep.component';
import { ShowDepComponent } from './show-dep/show-dep.component';
import { CreateGrpComponent } from './create-grp/create-grp.component';
import { CreateEtudComponent } from './create-etud/create-etud.component';
import { CreateStgComponent } from './create-stg/create-stg.component';
import { CreateAffctComponent } from './create-affct/create-affct.component';
import { ShowGrpComponent } from './show-grp/show-grp.component';
import { ShowEtudComponent } from './show-etud/show-etud.component';
import { ShowStgComponent } from './show-stg/show-stg.component';
import { ShowAffctComponent } from './show-affct/show-affct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { UpdateDepComponent } from './update-dep/update-dep.component';
import { UpdateGrpComponent } from './update-grp/update-grp.component';
import { UpdateEtudComponent } from './update-etud/update-etud.component';
import { UpdateStgComponent } from './update-stg/update-stg.component';
import { UpdateAffctComponent } from './update-affct/update-affct.component';
import { AddModComponent } from './add-mod/add-mod.component';
import { ShowModComponent } from './show-mod/show-mod.component';
import { UpdateModComponent } from './update-mod/update-mod.component';
import { ChangePwdModComponent } from './change-pwd-mod/change-pwd-mod.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdatePwdComponent } from './update-pwd/update-pwd.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateStudByFileComponent } from './create-stud-by-file/create-stud-by-file.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CreateDepComponent,
    ShowDepComponent,
    CreateGrpComponent,
    CreateEtudComponent,
    CreateStgComponent,
    CreateAffctComponent,
    ShowGrpComponent,
    ShowEtudComponent,
    ShowStgComponent,
    ShowAffctComponent,
    ProfileComponent,
    UpdateDepComponent,
    UpdateGrpComponent,
    UpdateEtudComponent,
    UpdateStgComponent,
    UpdateAffctComponent,
    AddModComponent,
    ShowModComponent,
    UpdateModComponent,
    ChangePwdModComponent,
    UpdateProfileComponent,
    UpdatePwdComponent,
    NotFoundComponent,
    CreateStudByFileComponent,
    ForgotPassComponent,
    ResetPassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxAwesomePopupModule.forRoot({
      colorList: {
        success: '#3caea3', // optional
        info: '#2f8ee5', // optional
        warning: '#ffc107', // optional
        danger: '#e46464', // optional
        customOne: '#3ebb1a', // optional
        customTwo: '#bd47fa', // optional (up to custom five)
      },
    }),
    ToastNotificationConfigModule.forRoot({
      globalSettings: {
        allowedNotificationsAtOnce: 5
      }
    }),

    DialogConfigModule.forRoot(), // optional
    ConfirmBoxConfigModule.forRoot(), // optional
    ReactiveFormsModule,
    MatSortModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
