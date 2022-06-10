import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: LoginFormComponent;

  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login(event: { email: string; password: string }) {
    this.auth
      .login(event.email, event.password)
      .pipe(
        untilDestroyed(this),
        catchError((error) => {
          this._snackBar.open('Invalid Email or Password', 'Ok', {
            duration: 3000,
          });
          return EMPTY;
        })
      )
      .subscribe((data: any) => {
        this.auth.setAuthData(data);
        if (this.auth.user?.role === 'rs') {
          this.router.navigateByUrl('research');
        } else if (this.auth.user?.role === 'wr') {
          this.router.navigateByUrl('writer');
        } else if (this.auth.user?.role === 'ad') {
          this.router.navigateByUrl('admin/core');
        }
      });
  }

  loginFormClick() {
    this.loginForm.submit();
  }
}
