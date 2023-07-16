import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponentComponent } from './components/bar-chart-component/bar-chart-component.component';
import { LineChartComponentComponent } from './components/line-chart-component/line-chart-component.component';
import { PieChartComponentComponent } from './components/pie-chart-component/pie-chart-component.component';


  // Ionic 5 Charts & Graphs using Chart.js Library

//Ankit Maheshwari

@NgModule({
  declarations: [AppComponent],
  //declarations: [AppComponent],
  imports: [ NgChartsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
