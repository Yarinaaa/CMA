import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;
  user!: User | null;
  user$: BehaviorSubject<any> = new BehaviorSubject(null);

  get isLogged() {
    return !!localStorage.getItem('cma_token');
  }

  get httpHeaders() {
    const newHttpHeaders = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('cma_token')}`
    );
    return newHttpHeaders;
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post('/api/auth', { email, password });
  }

  setAuthData(data: { access_token: string; user: User }) {
    this.token = data.access_token;
    this.user = data.user;
    this.user$.next(this.user);
    localStorage.setItem('cma_token', this.token);
  }

  logout() {
    localStorage.removeItem('cma_token');
    this.user = null;
    this.user$.next(null);
    this.router.navigateByUrl('/auth/login');
  }

  updateToken(token: string) {
    this.token = token;
  }

  getToken(): Observable<any> {
    return this.http.post<any>(
      '/api/auth/token',
      {},
      { headers: this.httpHeaders }
    );
  }
}
