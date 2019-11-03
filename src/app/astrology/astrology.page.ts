import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { User } from '../services/user.model';
import { Observable, Subscription } from 'rxjs';
import { Astrology, AstrologyChartEntity } from '../services/data.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';

interface AstrologyChartEntityDisplay {
  astrologyt: AstrologyChartEntity;
  allStars: StarDisplay[];
}

interface StarDisplay {
  star: string;
  status: string;
}

@Component({
  selector: 'app-astrology',
  templateUrl: './astrology.page.html',
  styleUrls: ['./astrology.page.scss'],
})
export class AstrologyPage implements OnInit, OnDestroy {

  private ziweiSubs: Subscription;

  userData: User;
  localData: Observable<Astrology>;

  public astrology: Astrology;
  display: AstrologyChartEntityDisplay[];
  private dataSubs: Subscription;

  chartArray: AstrologyChartEntity[];

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private nativeStorage: NativeStorage,
    private loadingCtrl: LoadingController) {

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
  }

  ngOnInit() {
    this.loadingCtrl.create({ keyboardClose: true, message: '加載中...' })
      .then(loadingEl => {
        loadingEl.present();

        // 測試 Loading 效果
        // setTimeout(() => {
        //   this.homeService.setUserData(form.value.username, form.value.birthday, form.value.birthdaytime, form.value.cellphone);
        //   this.authService.inputvaild();
        //   loadingEl.dismiss();
        //   this.router.navigate(['/home/tabs/astrology']);
        // }, 1500);

        this.ziweiSubs = this.dataService.getZiweiData().subscribe((res) => {
          this.astrology = res;
          this.display = res.AstrologyChart.map(a => {
            return {
              astrologyt: a,
              allStars:
                (a.major.concat(a.minor).concat(a.righteous).concat(a.secondary)).map(s => {
                  return {
                    star: s.Star,
                    status: s.Status
                  } as StarDisplay;
                }
                )
            } as AstrologyChartEntityDisplay;
          });
        });

        loadingEl.dismiss();
      });
  }

  // ionViewWillEnter() {
  //   this.userData = this.userService.getUser();
  //   this.localData = this.dataService.getLocalData();
  //   this.dataSubs = this.localData.subscribe((res) => {
  //     this.astrologyChart = res.AstrologyChart;
  //   });
  // }

  ngOnDestroy() {
    this.ziweiSubs.unsubscribe();
  }

}
