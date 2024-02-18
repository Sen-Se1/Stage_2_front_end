import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor(private auth: AuthService) {
  }
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) { return }
  }
}
