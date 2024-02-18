import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  loggedId = this.auth.idFormToken();
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.loadSidebarToggleState();
    }
  }

  toggleSidebar(): void {
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled').toString());
  }

  loadSidebarToggleState(): void {
    const sidebarToggleState = localStorage.getItem('sb|sidebar-toggle');
    if (sidebarToggleState === 'true') {
      document.body.classList.add('sb-sidenav-toggled');
    }
  }
  logout() {
    this.alertService.success(' ', `See you again.......`)
    this.auth.logout();
  }
}