import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from 'src/app/shared/models/comment.model';
import { Core } from 'src/app/shared/models/core.model';

@Injectable({
  providedIn: 'root',
})
export class WriterService {
  get httpHeaders() {
    const newHttpHeaders = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('cma_token')}`
    );
    return newHttpHeaders;
  }
  api = '/api/core-api';
  constructor(private http: HttpClient) {}

  getNotWarmed() {
    return this.http.get<Core[]>(this.api + '/not-warmed', {
      headers: this.httpHeaders,
    });
  }

  makeWarmed(id: number) {
    return this.http.patch<any>(
      this.api + '/warmed/' + id,
      {},
      {
        headers: this.httpHeaders,
      }
    );
  }

  addComment(comment: any) {
    return this.http.post<any>(this.api + '/add-comment', comment, {
      headers: this.httpHeaders,
    });
  }

  getAll() {
    return this.http.get<Core[]>(this.api + '/all', {
      headers: this.httpHeaders,
    });
  }

  getAllBlockers() {
    return this.http.get<any[]>(this.api + '/blockers', {
      headers: this.httpHeaders,
    });
  }

  getAllComments() {
    return this.http.get<any[]>(this.api + '/comments', {
      headers: this.httpHeaders,
    });
  }

  getAllWarmed() {
    return this.http.get<Core[]>(this.api + '/warmed', {
      headers: this.httpHeaders,
    });
  }

  getCommentsByID(id: number) {
    return this.http.get<Comment[]>(this.api + '/comment/' + id, {
      headers: this.httpHeaders,
    });
  }

  updateCoreById(id: number, core: Partial<Core>) {
    return this.http.patch<any>(this.api + '/core/' + id, core, {
      headers: this.httpHeaders,
    });
  }
}
