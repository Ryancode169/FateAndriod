import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PopoverController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from '../services/user.model';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { LunarDate } from '../services/data.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userData: any;
  dateType: any;
  monthVal = [];
  dayVal = [];
  // obLunarDate: Observable<LunarDate[]>;
  LunarDates: LunarDate[];
  isLunarCalendar: boolean;
  year: number;
  month: number;
  day: number;
  defaultDate = '1980-01-01';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage
  ) {
    this.dateType = '0'; // 預設國曆
    this.year = new Date(this.defaultDate).getFullYear();
    this.month = new Date(this.defaultDate).getMonth();
    this.day = new Date(this.defaultDate).getDate();
    this.monthVal = Array.from({ length: 12 }, (v, i) => i + 1);
    this.dayVal = Array.from({ length: 31 }, (v, i) => i + 1);
    this.isLunarCalendar = false;
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === '1') {
      this.isLunarCalendar = true;
      // this.obLunarDate = this.dataService.getLunarDate();
      console.log('Segment changed year', this.year);
      this.dataService.getLunarDate(this.year).subscribe((res) => {
        this.LunarDates = res;
      });
      console.log('Segment changed dates', this.LunarDates);
    } else {
      this.isLunarCalendar = false;
    }
  }

  changeYear(ev: any) {
    this.year = new Date(ev.detail.value).getFullYear();
    const m = new Date(this.month).getMonth() + 1;
    const d = new Date(this.day).getDate();
    if (this.isLunarCalendar) {
      this.dataService.getLunarDate(this.year).subscribe((res) => {
        this.LunarDates = res;
      });
      // console.log('change Year', this.year);
      console.log('change Year', this.LunarDates);
    } else {
      const date = new Date(this.year, m, d);
      console.log('Year c', date);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      this.dayVal = Array.from({ length: lastDay }, (v, i) => i + 1);
      this.day = new Date(this.day).getDate() > lastDay ? 1 : this.day; // 超過當月最後一天重設為1
    }
  }

  changeMonth(ev: any) {
    if (this.isLunarCalendar) {

    } else {
      const date = new Date(ev.detail.value);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      this.dayVal = Array.from({ length: lastDay }, (v, i) => i + 1);
      this.day = new Date(this.day).getDate() > lastDay ? 1 : this.day; // 超過當月最後一天重設為1
    }
  }

  onMySubmit(form: NgForm) {

    if (!form.valid) {
      this.authService.inputnotvaild();
      return;
    }

    this.userData = {
      Name: form.value.username,
      Gender: form.value.dateType,
      Cellphone: form.value.cellphone,
      BirthTime: form.value.birthdaytime,
      DateType: form.value.dateType,
      Year: form.value.year,
      Month: form.value.month,
      Day: form.value.day,
      IsLeap: false
    };

    // console.log('test', this.userData.DateType);

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


        this.userService.setUser(this.userData);
        // 儲存
        // this.nativeStorage.setItem('UserData', this.userData)
        //   .then(
        //     (data) => console.log('Stored first item!', data),
        //     error => console.error('Error storing item', error)
        //   );

        // 讀取
        // this.nativeStorage.getItem('UserData')
        //   .then(
        //     data => console.log(data),
        //     error => console.error(error)
        //   );


        // set a key/value
        // this.storage.set('username', form.value.username);
        // this.storage.set('birthday', form.value.birthday);
        // this.storage.set('birthdaytime', form.value.birthdaytime);
        // this.storage.set('cellphone', form.value.cellphone);

        // Or to get a key/value pair
        // this.storage.get('username').then((val) => {
        //   console.log('Your name is', val);
        // });

        this.authService.inputvaild();
        // this.homeService.fetchHalfResult();
        loadingEl.dismiss();
        //this.router.navigate(['/astrology']);


      });
  }

}
