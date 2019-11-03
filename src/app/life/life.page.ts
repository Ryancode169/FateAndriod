import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../services/user.model';
import { Observable, Subscription } from 'rxjs';
import { Astrology, AstrologyChartEntity } from '../services/data.model';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-life',
  templateUrl: './life.page.html',
  styleUrls: ['./life.page.scss'],
})
export class LifePage implements OnInit, OnDestroy {

  private ziwiDataSubs: Subscription;

  public userData: User;
  localData: Observable<Astrology>;
  public astrology: Astrology;
  public astrologyChart: AstrologyChartEntity[];
  private dataSubs: Subscription;

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private loadingCtrl: LoadingController
  ) {
    this.initData();
  }

  initData() {

    this.userData = this.userService.getUser();

    this.astrology = {
      Heavenly: '',
      Branch: '',
      BirthDay: '',
      BirthTime: '',
      Month: '',
      Day: '',
      AstrologyChart: [],
      FiveElements: '',
      LifeMajorStar: '',
      BodyMajorStar: '',
      HuaLu: '',
      HuaChiuan: '',
      HuaKe: '',
      HuaJi: '',
      Videos: [],
    };

    this.astrologyChart = [{
      palace: '',
      isBodyPalace: null,
      heavenly: '',
      branch: '',
      major: [],
      minor: [],
      secondary: [],
      righteous: [],
      score: null,
      majorDescription: '',
      minorDescription: '',
      secondaryDescription: '',
      righteousDescription: '',
    }];

  }

  ionViewWillEnter() {
    // console.log(this.userDate);
    // this.localData = this.dataService.getLocalData();

    // this.dataSubs = this.localData.subscribe((res) => {
    //   this.astrologyChart = res.AstrologyChart;
    // });

  }

  ngOnInit() {
    this.loadingCtrl.create({ keyboardClose: true, message: '加載中...' })
      .then(loadingEl => {
        loadingEl.present();

        this.userData = this.userService.getUser();

        this.ziwiDataSubs = this.dataService.getZiweiData().subscribe((res) => {
          this.astrology = res;
          this.astrologyChart = res.AstrologyChart;
        });

        loadingEl.dismiss();
      });
  }

  ngOnDestroy() {
    // this.dataSubs.unsubscribe();
    this.ziwiDataSubs.unsubscribe();
  }

}
