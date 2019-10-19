import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { User } from '../services/user.model';
import { Observable, Subscription } from 'rxjs';
import { Astrology, AstrologyChartEntity } from '../services/data.model';

@Component({
  selector: 'app-astrology',
  templateUrl: './astrology.page.html',
  styleUrls: ['./astrology.page.scss'],
})
export class AstrologyPage implements OnInit, OnDestroy {

  userDate: User;
  localData: Observable<Astrology>;
  astrologyChart: AstrologyChartEntity[];
  private dataSubs: Subscription;

  chartArray: AstrologyChartEntity[];

  constructor(
    private userService: UserService,
    private dataService: DataService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    // this.storage.get('username').then((val) => {
    //   console.log('Your name is', val);
    // });

    this.userDate = this.userService.getUser();
    // console.log(this.userDate);

    this.localData = this.dataService.getLocalData();

    this.dataSubs = this.localData.subscribe((res) => {
      this.astrologyChart = res.AstrologyChart;
      // this.chart3 = res.AstrologyChart[2];
      // this.chart4 = res.AstrologyChart[3];
      // this.chart5 = res.AstrologyChart[4];
      // this.chart6 = res.AstrologyChart[5];
      // this.chart7 = res.AstrologyChart[6];
      // this.chart8 = res.AstrologyChart[7];
      // this.chart9 = res.AstrologyChart[8];
      // this.chart10 = res.AstrologyChart[9];
      // this.chart11 = res.AstrologyChart[10];
      // this.chart12 = res.AstrologyChart[11];

    });
  }

  ngOnDestroy() {
    this.dataSubs.unsubscribe();
  }

}
