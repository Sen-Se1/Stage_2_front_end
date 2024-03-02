import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { alert } from '../utils/alert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
    this.alertService = new alert();
  }
  private alertService: alert;
  private url = 'http://127.0.0.1/';
  tokenExists(): any {
    let token = localStorage.getItem('token');
    if (token) return token;
  }
  userRole!: string;
  roleExists(id: any): any {
    this.profile(id).subscribe((res: any) => {
      this.userRole = res.data.role;
    }, err => {
      if (err.status === 0) {
        return this.alertService.danger("Problème système", "Nous avons un bug au niveau du serveur qui sera corrigé prochainement.");
      }
      if (err.error.message) {
        return this.alertService.danger(err.error.status, err.error.message);
      }
      if (err.error.errors[0].msg) {
        return this.alertService.danger(err.statusText, err.error.errors[0].msg);
      }
    })
    if (this.userRole) {
      return this.userRole;
    }
    else { return false; }
  }

  protected headers = new HttpHeaders().set('authorization', this.tokenExists());
  protected options = { headers: this.headers };

  // userCRUD
  login(admin: any) {
    return this.http.post(this.url + 'user/login', admin)
  }
  forgotPass(data: any){
    return this.http.post(this.url + 'user/forgotPassword', data)
  }
  resetPass(token: any, data: any) {
    return this.http.put(this.url + 'user/resetPassword/' + token, data)
  }
  profile(id: any) {
    return this.http.get(this.url + 'user/' + id, this.options)
  }
  updateProfile(id: any, data: any) {
    return this.http.put(this.url + 'user/' + id, data, this.options)
  }
  updateUserPassword(id: any, data: any) {
    return this.http.put(this.url + 'user/password/' + id, data, this.options)
  }
  loginProcess(res: any) {
    localStorage.setItem('token', res.token);
    this.roleExists(this.idFormToken())
    this.router.navigate(['/']);
  }
  idFormToken() {
    if (this.tokenExists()) return JSON.parse(atob(this.tokenExists().split('.')[1])).userId;
  }
  isLoggedIn() {
    if (this.tokenExists()) {
      this.tokentExpired()
      // Redirect to '/' if token exists and user visits '/login' or '/register'
      if (this.router.url === '/login' || this.router.url === '/register') {
        this.router.navigate(['/']);
      }
      this.roleExists(this.idFormToken())
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  isLoggedInForgot() {
    if (this.tokenExists()) {
      this.router.navigate(['/']);
      return true;
    } else {
      return false;
    }
  }
  isAdminMod() {
    if (this.isLoggedIn()) {
      if (this.userRole === 'ADMIN') {
        // User is an admin, allow access
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  // adminCRUD
  createModAdmin(data: any) {
    return this.http.post(this.url + 'admin', data, this.options);
  }
  getAllModAdmin() {
    return this.http.get(this.url + 'admin', this.options)
  }
  getByIdModAdmin(id: any) {
    return this.http.get(this.url + 'admin/' + id, this.options)
  }
  updateModAdmin(id: any, data: any) {
    return this.http.put(this.url + 'admin/' + id, data, this.options);
  }
  updatePwdModAdmin(id: any, data: any) {
    return this.http.put(this.url + 'admin/password/' + id, data, this.options);
  }
  deleteModAdmin(id: any) {
    return this.http.delete(this.url + 'admin/' + id, this.options)
  }
  // departmentCRUD
  createDep(data: any) {
    return this.http.post(this.url + 'department', data, this.options);
  }
  getAllDep() {
    return this.http.get(this.url + 'department', this.options)
  }
  getByIdDep(id: any) {
    return this.http.get(this.url + 'department/' + id, this.options)
  }
  updateDep(id: any, data: any) {
    return this.http.put(this.url + 'department/' + id, data, this.options);
  }
  deleteDep(id: any) {
    return this.http.delete(this.url + 'department/' + id, this.options)
  }
  // groupCRUD
  createGrp(data: any) {
    return this.http.post(this.url + 'groupe', data, this.options);
  }
  getAllGrp() {
    return this.http.get(this.url + 'groupe', this.options)
  }
  getByIdGrp(id: any) {
    return this.http.get(this.url + 'groupe/' + id, this.options)
  }
  updateGrp(id: any, data: any) {
    return this.http.put(this.url + 'groupe/' + id, data, this.options);
  }
  deleteGrp(id: any) {
    return this.http.delete(this.url + 'groupe/' + id, this.options)
  }
  // studentCRUD
  createStu(data: any) {
    return this.http.post(this.url + 'etudiant', data, this.options);
  }
  createStuByFile(data: any) {
    return this.http.post(this.url + 'etudiant/file', data, this.options);
  }
  getAllStu() {
    return this.http.get(this.url + 'etudiant', this.options)
  }
  getByIdStu(id: any) {
    return this.http.get(this.url + 'etudiant/' + id, this.options)
  }
  updateStu(id: any, data: any) {
    return this.http.put(this.url + 'etudiant/' + id, data, this.options);
  }
  deleteStu(id: any) {
    return this.http.delete(this.url + 'etudiant/' + id, this.options)
  }
  // stageCRUD
  createStage(data: any) {
    return this.http.post(this.url + 'stage', data, this.options);
  }
  getAllStage() {
    return this.http.get(this.url + 'stage', this.options)
  }
  getByIdStage(id: any) {
    return this.http.get(this.url + 'stage/' + id, this.options)
  }
  updateStage(id: any, data: any) {
    return this.http.put(this.url + 'stage/' + id, data, this.options);
  }
  deleteStage(id: any) {
    return this.http.delete(this.url + 'stage/' + id, this.options)
  }
  // AssignmentCRUD
  createAss(data: any) {
    return this.http.post(this.url + 'affectation', data, this.options);
  }
  getAllAss() {
    return this.http.get(this.url + 'affectation', this.options)
  }
  getByIdAss(id: any) {
    return this.http.get(this.url + 'affectation/' + id, this.options)
  }
  updateAss(id: any, data: any) {
    return this.http.put(this.url + 'affectation/' + id, data, this.options);
  }
  deleteAss(id: any) {
    return this.http.delete(this.url + 'affectation/' + id, this.options)
  }
  ////////////////////////////////////////////////////////////////
  updateBtn(url: string, id: any) {
    this.router.navigate([url + '/' + id]);
  }
  tokentExpired() {
    if (this.tokenExists()) {
      const payload = JSON.parse(atob(this.tokenExists().split('.')[1]));
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (!(payload.exp > currentTime)) {
        return this.logout();
      }
      // this.profile(this.idFormToken()).subscribe((res: any) => {}, err => {
      //   if (err.error.message === "User recently changed his password. please login again..") {
      //     this.alertService.danger(err.error.status, err.error.message);
      //     return this.logout();
      //   }
      // })
    }
  }
  convertToTitleCase(str: string) {
    const words = str.toLowerCase().split(" ");
    const titleCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return titleCaseWords.join(" ");
  }
  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
