import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PopoverController, LoadingController, AlertController } from '@ionic/angular';
import { NgForm, FormBuilder, FormControl, Validators, FormGroup, FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from '../services/user.model';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { LunarDate } from '../services/data.model';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  private LunarDateSubs: Subscription;

  userData: User;
  dateType: number;
  monthVal = [];
  dayVal = [];
  // obLunarDate: Observable<LunarDate[]>;
  LunarDates: LunarDate[] = [];
  // LunarDates: any;
  isLunarCalendar: boolean;
  isRunyue: boolean; // 是否為閏月
  year: number;
  month: number;
  day: number;
  userName: string;
  cellPhone: string;
  birthTime: number;


  public validationsForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
    public formBuilder: FormBuilder,
  ) {

    this.monthVal = Array.from({ length: 12 }, (v, i) => i + 1);
    this.dayVal = Array.from({ length: 31 }, (v, i) => i + 1);
    this.isLunarCalendar = this.userService.userData.DateType === 0 ? false : true;

  }

  ngOnInit() {
    // 讀取使用者資訊
    this.userData = this.userService.getUser();

    if (this.userData) {
      this.year = this.userData.Year;
      this.month = this.userData.Month;
      this.day = this.userData.Day;
      this.dateType = this.userData.DateType;
      this.birthTime = this.userData.BirthTime;
      this.userName = this.userData.Name;
      this.cellPhone = this.userData.Cellphone;
    }

    // this.validationsForm = this.formBuilder.group({
    //   username: new FormControl('', Validators.required),
    //   year: new FormControl('', Validators.required),
    //   month: new FormControl('', Validators.required),
    //   day: new FormControl('', Validators.required),
    //   birthdaytime: new FormControl('', Validators.required),
    //   cellphone: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^\d{1,10}$')
    //   ])),
    // });
  }

  // 陰陽曆轉換
  segmentChanged(ev: any) {
    let yearVal: number;
    let lastDay: number;

    this.userService.userData.Month = 1;
    this.userService.userData.Day = 1;

    if (this.year.toString().length > 4) {
      yearVal = new Date(this.year).getFullYear();
    } else {
      yearVal = this.year;
    }

    if (ev.detail.value === '1') {
      this.isLunarCalendar = true;
      this.month = 1;
      this.day = 1;
      // 調用API取得陰曆月份及天數
      // this.LunarDates = this.dataService.getLunarDate2(yearVal);

      // this.setLunarMonth(); // 設置陰曆月份
      // lastDay = this.getLunarMonthLastDay(this.month); // 取得陰曆當月最後一天
      // this.dayVal = Array.from({ length: lastDay }, (v, i) => i + 1); // 設置天數
      // this.day = this.day > lastDay ? 1 : this.day; // 超過當月最後一天重設為1

      this.LunarDateSubs = this.dataService.getLunarDate(yearVal).subscribe((res) => {
        this.LunarDates = res;
        this.setLunarMonth(); // 設置陰曆月份
        lastDay = this.getLunarMonthLastDay(this.month); // 取得陰曆當月最後一天
        this.dayVal = Array.from({ length: lastDay }, (v, i) => i + 1); // 設置天數
        this.day = this.day > lastDay ? 1 : this.day; // 超過當月最後一天重設為1
      });

      // this.LunarDates = this.dataService.getLunarDate(this.year);
    } else {
      this.month = 1;
      this.day = 1;

      this.isLunarCalendar = false;
      this.monthVal = Array.from({ length: 12 }, (v, i) => i + 1); // 設置月份

      // 如果為閏月則設為1月
      if (this.isRunyue) {
        this.month = 1;
      }
      this.isRunyue = false; // 是否為閏月設定為否
      lastDay = this.getADMonthLastDay(yearVal, this.month); // 取得陽曆當月最後一天

      this.dayVal = Array.from({ length: lastDay }, (v, i) => i + 1); // 設置天數
      this.day = this.day > lastDay ? 1 : this.day; // 超過當月最後一天重設為1
    }
  }

  // 年份轉換
  changeYear(ev: any) {
    const yearVal = new Date(ev.detail.value).getFullYear();
    let lastDay: number;

    if (this.isLunarCalendar) {
      // 調用API取得陰曆月份及天數
      this.LunarDateSubs = this.dataService.getLunarDate(yearVal).subscribe((res) => {
        this.LunarDates = res;
        this.setLunarMonth(); // 設置陰曆月份
        lastDay = this.getLunarMonthLastDay(this.month); // 取得陰曆當月最後一天

        this.dayVal = Array.from({ length: lastDay }, (v, i) => i + 1); // 設置天數
        this.day = this.day > lastDay ? 1 : this.day; // 超過當月最後一天重設為1
      });
    } else {
      this.monthVal = Array.from({ length: 12 }, (v, i) => i + 1); // 設置月份
      // this.isRunyue = false; // 是否為閏月設定為否
      lastDay = this.getADMonthLastDay(yearVal, this.userService.userData.Month); // 取得陽曆當月最後一天
      // console.log('y m d', yearVal + ',' + this.userService.userData.Month + ',' + lastDay);
      this.dayVal = Array.from({ length: lastDay }, (v, i) => i + 1); // 設置天數
      this.day = this.day > lastDay ? 1 : this.day; // 超過當月最後一天重設為1
    }
    this.userService.userData.Year = new Date(ev.target.value).getFullYear();
  }

  // 月份轉換
  changeMonth(ev: any) {
    let lastDay: number;
    if (this.isLunarCalendar) {
      lastDay = this.getLunarMonthLastDay(ev.detail.value); // 取得陰曆當月最後一天
      this.dayVal = Array.from({ length: lastDay }, (v, i) => i + 1); // 設置天數

    } else {
      // this.isRunyue = false; // 是否為閏月設定為否
      lastDay = this.getADMonthLastDay(this.userService.userData.Year, ev.detail.value); // 取得陽曆當月最後一天
      this.dayVal = Array.from({ length: lastDay }, (v, i) => i + 1);
    }
    this.day = this.day > lastDay ? 1 : this.day; // 超過當月最後一天重設為1
  }

  // 出生時辰轉換
  changeBirthTime(ev: any) {
    this.userService.userData.SelectedBirthTimeText = this.userService.birthTimeSelect.find(
      (item) => item.id === this.userData.BirthTime).text;
  }

  // 取得西元年月份最後一天
  getADMonthLastDay(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  // 取得陰曆月份最後一天，並設定是否為閏月
  getLunarMonthLastDay(month: any) {
    // this.userService.userData.SelectedMonthText = month;
    let lunarMonth: LunarDate;
    if (month.length > 1) {
      month = Number(month.replace('閏', ''));
      this.isRunyue = true;
    } else {
      this.isRunyue = false;
    }
    // console.log(month, this.isRunyue);
    // console.log('LunarDates', this.LunarDates);
    lunarMonth = this.LunarDates.find((mon) => {
      return mon.Month === month && mon.IsLeap === this.isRunyue;
    });
    // console.log(lunarMonth);
    // this.month = month; // 把閏月設回數值
    return lunarMonth.LastDay;
  }

  // 設置陰曆月份
  setLunarMonth() {
    const monthArry = [];
    this.LunarDates.forEach((item) => {
      monthArry.push(item.Month);
    });
    this.monthVal = monthArry;
  }

  onMySubmit(form: NgForm) {

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

        // 儲存使用者資訊
        this.userService.setUser(this.userData);

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

        // this.homeService.fetchHalfResult();
        loadingEl.dismiss();
        this.router.navigate(['/astrology']);
      });
  }

  async notYet() {
    const alert = await this.alertController.create({
      header: '訊息',
      subHeader: '',
      message: '本功能尚未開放。',
      buttons: ['確定']
    });

    await alert.present();
    // const result = await alert.onDidDismiss();
    // console.log(result);
  }

  ngOnDestroy() {
    // this.dataSubs.unsubscribe();
    this.LunarDateSubs.unsubscribe();
  }


}
