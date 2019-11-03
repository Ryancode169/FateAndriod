import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { LoadingController } from '@ionic/angular';
import { VideosEntity } from '../services/data.model';
import { User } from '../services/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-year',
  templateUrl: './year.page.html',
  styleUrls: ['./year.page.scss'],
})
export class YearPage implements OnInit, OnDestroy {

  private ziwiDataSubs: Subscription;

  userData: User;

  videos: VideosEntity[] = [{
    url: '',
    description: '',
  }];

  // videos: VideosEntity[] = [{
  //   url: 'http://1.34.27.193/Videos/桃花-12月.mp4',
  //   description: '桃花指數大公開',
  // },
  // {
  //   url: 'http://1.34.27.193/Videos/尾數0.mp4',
  //   description: '財神爺你在那裡',
  // },
  // {
  //   url: 'http://1.34.27.193/Videos/血光12月.mp4',
  //   description: '血光之災預先知',
  // },
  // {
  //   url: 'http://1.34.27.193/Videos/人脈8_12月.mp4',
  //   description: '貴人貴人在哪兒',
  // },
  // ];

  frontUul: string;

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private loadingCtrl: LoadingController
  ) {
    this.frontUul = this.dataService.frontUul;
  }

  ngOnInit() {
    this.loadingCtrl.create({ keyboardClose: true, message: '加載中...' })
      .then(loadingEl => {
        loadingEl.present();

        this.userData = this.userService.getUser();

        this.ziwiDataSubs = this.dataService.getZiweiData().subscribe((res) => {
          this.videos = res.Videos;
        });

        loadingEl.dismiss();
      });
  }

  openVideo(ev: any, url: string) {

  }

  ngOnDestroy() {
    this.ziwiDataSubs.unsubscribe();
  }

}
