import { NgModule } from '@angular/core';
import { WriterComponent } from './pages/writer/writer.component';
import { WriterPlaceComponent } from './pages/writer-place/writer-place.component';
import { RouterModule, Routes } from '@angular/router';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { CoreComponent } from './pages/core/core.component';

const routes: Routes = [
  {
    path: '',
    component: WriterComponent,
  },
  {
    path: 'place',
    component: WriterPlaceComponent,
  },
  {
    path: 'statistic',
    component: StatisticComponent,
  },
  {
    path: 'core',
    component: CoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriterRoutingModule {}
