import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AstrologyPage } from './astrology.page';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: AstrologyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AstrologyPage, ChartComponent]
})
export class AstrologyPageModule { }
