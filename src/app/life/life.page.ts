import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../services/user.model';
import { Observable, Subscription } from 'rxjs';
import { Astrology, AstrologyChartEntity } from '../services/data.model';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-life',
  templateUrl: './life.page.html',
  styleUrls: ['./life.page.scss'],
})
export class LifePage implements OnInit, OnDestroy {

  userDate: User;
  localData: Observable<Astrology>;
  astrologyChart: AstrologyChartEntity[];
  private dataSubs: Subscription;

  constructor(
    private userService: UserService,
    private dataService: DataService
  ) { }

  ionViewWillEnter() {
    this.userDate = this.userService.getUser();
    // console.log(this.userDate);
    this.localData = this.dataService.getLocalData();
    this.dataSubs = this.localData.subscribe((res) => {
      this.astrologyChart = res.AstrologyChart;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dataSubs.unsubscribe();
  }

}
