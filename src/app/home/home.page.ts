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
  lunarDate: Observable<any>;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage
  ) {
    this.dateType = '0'; // 預設國曆
    this.monthVal = [1, 2, 3];
    this.dayVal = [1, 2, 3];
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === '1') {
      this.lunarDate = this.dataService.getLunarDate();
    }
    console.log('Segment changed', ev.detail.value);
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
        this.nativeStorage.setItem('UserData', this.userData)
          .then(
            (data) => console.log('Stored first item!', data),
            error => console.error('Error storing item', error)
          );

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
