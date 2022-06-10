import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  get isLogged() {
    return this.auth.isLogged;
  }

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }

  get isWriter() {
    return this.auth.user?.role === 'wr';
  }

  get isResearcher() {
    return this.auth.user?.role === 'rs';
  }

  get isAdmin() {
    return this.auth.user?.role === 'ad';
  }
}
