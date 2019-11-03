import { Component, OnInit, Input } from '@angular/core';
import { AstrologyChartEntity } from 'src/app/services/data.model';

interface AstrologyChartEntityDisplay {
  astrologyt: AstrologyChartEntity;
  allStars: StarDisplay[];
}

interface StarDisplay {
  star: string;
  status: string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @Input() chart: AstrologyChartEntityDisplay;
  constructor() { }

  ngOnInit() {
    
  }

}
