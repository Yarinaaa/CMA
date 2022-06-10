import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SureDialogComponent } from 'src/app/core/components/sure-dialog/sure-dialog.component';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'login', 'password', 'role', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllCore();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCore() {
    this.usersService
      .getAllUsers()
      .pipe(untilDestroyed(this))
      .subscribe((data: any[]) => {
        this.dataSource.data = data;
      });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe((user: User) => {
      if (user) {
        this.usersService
          .addUser(user)
          .pipe(untilDestroyed(this))
          .subscribe((data: any) => {
            user.id = data.raw[0].id;
            this.dataSource.data = [...this.dataSource.data, user];
          });
      }
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe((result: Partial<User>) => {
      if (result) {
        this.usersService
          .updateUser(user.id, result)
          .pipe(untilDestroyed(this))
          .subscribe((data: any) => {
            const index = this.dataSource.data.findIndex(
              (u) => u.id === user.id
            );
            this.dataSource.data[index] = { ...user, ...result };
            this.dataSource.data = [...this.dataSource.data];
          });
      }
    });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(SureDialogComponent, {
      data: `Are you sure want to delete ${user.login}?`,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService
          .delete(user.id)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u) => u.id != user.id
            );
          });
      }
    });
  }
}
