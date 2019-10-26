import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { User } from '../services/user.model';
import { Observable, Subscription } from 'rxjs';
import { Astrology, AstrologyChartEntity } from '../services/data.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-astrology',
  templateUrl: './astrology.page.html',
  styleUrls: ['./astrology.page.scss'],
})
export class AstrologyPage implements OnInit, OnDestroy {

  userData: User;
  localData: Observable<Astrology>;
  astrologyChart: AstrologyChartEntity[];
  private dataSubs: Subscription;

  chartArray: AstrologyChartEntity[];

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private nativeStorage: NativeStorage,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // console.log('ngOnInit!');

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

        this.dataService.getZiweiData().subscribe((res) => {
          this.astrologyChart = res.AstrologyChart;
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
    this.dataSubs.unsubscribe();
  }

}
