import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  get httpHeaders() {
    const newHttpHeaders = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('cma_token')}`
    );
    return newHttpHeaders;
  }

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<any[]>('/api/auth/users', {
      headers: this.httpHeaders,
    });
  }

  addUser(user: User) {
    return this.http.post<any>('/api/auth/users', user, {
      headers: this.httpHeaders,
    });
  }

  updateUser(id: number, user: Partial<User>) {
    return this.http.patch<any>('/api/auth/users/' + id, user, {
      headers: this.httpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete<any>('/api/auth/users/' + id, {
      headers: this.httpHeaders,
    });
  }
}
