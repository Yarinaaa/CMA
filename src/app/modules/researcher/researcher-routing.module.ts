import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCoreComponent } from './pages/edit-core/edit-core.component';
import { ResearchComponent } from './pages/research/research.component';
import { StatisticComponent } from './pages/statistic/statistic.component';

const routes: Routes = [
  {
    path: '',
    component: ResearchComponent,
  },
  {
    path: 'core',
    component: EditCoreComponent,
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
export class ResearcherRoutingModule {}
