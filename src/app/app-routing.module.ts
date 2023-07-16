import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }, 
  {
    path: 'bar-chart',
    loadChildren: () => import('./components/bar-chart-component/bar-chart.module').then(m => m.BarChartModule)
  },
  {
    path: 'line-chart',
    loadChildren: () => import('./components/line-chart-component/line-chart.module').then (m => m.LineChartModule)
  },
  {
    path: 'pie-chart',
    loadChildren: () => import('./components/pie-chart-component/pie-chart.module').then (m => m.PieChartModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
