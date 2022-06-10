import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockerComponent } from './pages/blocker/blocker.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { CoreComponent } from './pages/core/core.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: 'core',
    component: CoreComponent,
  },
  {
    path: 'blockers',
    component: BlockerComponent,
  },
  {
    path: 'comments',
    component: CommentsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'statistic',
    component: StatisticComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
