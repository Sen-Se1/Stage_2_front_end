import { ShowGrpComponent } from './show-grp/show-grp.component';
import { CreateEtudComponent } from './create-etud/create-etud.component';
import { CreateAffctComponent } from './create-affct/create-affct.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowDepComponent } from './show-dep/show-dep.component';
import { CreateDepComponent } from './create-dep/create-dep.component';
import { CreateGrpComponent } from './create-grp/create-grp.component';
import { CreateStgComponent } from './create-stg/create-stg.component';
import { ShowEtudComponent } from './show-etud/show-etud.component';
import { ShowStgComponent } from './show-stg/show-stg.component';
import { ShowAffctComponent } from './show-affct/show-affct.component';
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
import { CreateStudByFileComponent } from './create-stud-by-file/create-stud-by-file.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
const routes: Routes = [
  // Home Page route
  { path: '', component: HomeComponent, title: 'Dashboard' },

  // user routes
  // { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'profile/:id', component: ProfileComponent, title: 'Profile' },
  { path: 'update/profile/:id', component: UpdateProfileComponent, title: 'Update Profile' },
  { path: 'update/profile/password/:id', component: UpdatePwdComponent, title: 'Update Password' },
  { path: 'forgot-password', component: ForgotPassComponent, title: 'Forgot Password' },
  { path: 'reset-password/:token', component: ResetPassComponent, title: 'Reset Password' },

  // admin routes
  { path: 'add-admin-and-mod', component: AddModComponent, title: 'Add Moderator' },
  { path: 'admins-and-mods', component: ShowModComponent, title: 'Moderators' },
  { path: 'update/admins-and-mods/:id', component: UpdateModComponent, title: 'Update Moderator' },
  { path: 'update/admins-and-mods/password/:id', component: ChangePwdModComponent, title: 'Change Password Moderator' },

  // department routes
  { path: 'departments', component: ShowDepComponent, title: 'Departments' },
  { path: 'create/department', component: CreateDepComponent, title: 'Create Department' },
  { path: 'update/department/:id', component: UpdateDepComponent, title: 'Update Department' },

  // group routes
  { path: 'groups', component: ShowGrpComponent, title: 'Groups' },
  { path: 'create/group', component: CreateGrpComponent, title: 'Create Group' },
  { path: 'update/group/:id', component: UpdateGrpComponent, title: 'Update Group' },

  // student routes
  { path: 'students', component: ShowEtudComponent, title: 'Students' },
  { path: 'create/student', component: CreateEtudComponent, title: 'Create Student' },
  { path: 'create/students/file', component: CreateStudByFileComponent, title: 'Create Student By File' },
  { path: 'update/student/:id', component: UpdateEtudComponent, title: 'Update Student' },

  // stage routes
  { path: 'stages', component: ShowStgComponent, title: 'Stages' },
  { path: 'create/stage', component: CreateStgComponent, title: 'Create Stage' },
  { path: 'update/stage/:id', component: UpdateStgComponent, title: 'Update Stage' },

  // assignment routes
  { path: 'assignments', component: ShowAffctComponent, title: 'Assignments' },
  { path: 'create/assignment', component: CreateAffctComponent, title: 'Create Assignments' },
  { path: 'update/assignment/:id', component: UpdateAffctComponent, title: 'Update Assignments' },

  // Page Not Found route
  { path: '**', component: NotFoundComponent, title: 'Not Found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }