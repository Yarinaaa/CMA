import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // if (this.auth.isLogged && state.url === '/auth/login') {
    //   this.router.navigateByUrl('/research');
    //   return false;
    // }

    if (!this.auth.isLogged) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }
}
