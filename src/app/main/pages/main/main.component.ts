import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    if (!this.auth.isLogged) {
      this.router.navigateByUrl('/auth/login');
    } else {
      this.auth.user$.subscribe((user: User | null) => {
        if (user) {
          switch (user.role) {
            case 'wr':
              this.router.navigateByUrl('/writer');
              break;
            case 'rs':
              this.router.navigateByUrl('/research');
              break;
            case 'ad':
              this.router.navigateByUrl('/admin/core');
              break;
          }
        }
      });
    }
  }
}
