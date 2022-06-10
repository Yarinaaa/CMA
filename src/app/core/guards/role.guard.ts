import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let role = route.data['role'] as string;
    if (role === this.auth?.user?.role) {
      return true;
    }
    if(!this.auth.user) {
      return false;
    }
    switch (this.auth.user.role) {
      case 'wr':
        this.router.navigateByUrl('/writer');
        break;
      case 'rs':
        this.router.navigateByUrl('/research');
        break;
    }
    return false;
  }
}
