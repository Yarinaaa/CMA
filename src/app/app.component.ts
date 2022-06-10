import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CMA-frontend';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.updateToken();
    setInterval(() => {
      this.updateToken();
    }, 7.8 * 3600 * 1000);
  }

  updateToken() {
    if (!this.auth.isLogged) return;
    this.auth
      .getToken()
      .pipe(
        catchError((error) => {
          this.auth.logout();
          return EMPTY;
        })
      )
      .subscribe((data: any) => {
        this.auth.setAuthData(data);
      });
  }

  get showRouter() {
    if (!this.auth.isLogged) return true;
    if (this.auth.user) return true;
    return false;
  }
}
