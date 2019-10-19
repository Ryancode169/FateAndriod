import { Component, OnInit, Input } from '@angular/core';
import { AstrologyChartEntity } from 'src/app/services/data.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @Input() chart: AstrologyChartEntity;
  constructor() { }

  ngOnInit() { }

}
