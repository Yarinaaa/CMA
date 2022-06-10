import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Core } from 'src/app/shared/models/core.model';
import { ResearchFilter } from 'src/app/shared/models/research-filter.model';

@Injectable({
  providedIn: 'root',
})
export class ResearchService {
  get httpHeaders() {
    const newHttpHeaders = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('cma_token')}`
    );
    return newHttpHeaders;
  }

  api = '/api/core-api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  findGoodLink(links: string[]) {
    return this.http.post<ResearchFilter>(
      this.api + '/valid-links',
      { links },
      { headers: this.httpHeaders }
    );
  }

  blockLink(link: string) {
    return this.http.post<any>(
      this.api + '/add-block',
      { baseURL: link, addedBy: this.auth.user?.id },
      { headers: this.httpHeaders }
    );
  }

  coreLink(core: any) {
    return this.http.post<any>(
      this.api + '/add-core',
      { ...core, addedBy: this.auth.user?.id, updated: new Date() },
      { headers: this.httpHeaders }
    );
  }

  getCoreByID(id: number, count?: number) {
    const countString = count ? `?count=${count}` : '';
    return this.http.get<Core[]>(this.api + '/core/' + id + countString, {
      headers: this.httpHeaders,
    });
  }
}
