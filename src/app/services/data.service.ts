import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { Astrology, LunarDate } from './data.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { User } from './user.model';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'assets/data/data.json';

  dataChanged = new Subject<any>();
  hResultChanged = new Subject<any>();

  birthday: Date;
  postBody: any;
  private data: any;
  userData: User;

  // http://1.34.27.193

  // url = '/api/condition/cndate/';
  // url2 = 'https://jsonplaceholder.typicode.com/posts/1';
  // hResultUrl = '/api/operation/ziwei/culture';

  // lunarCalendarUrl = '/api/condition/cndate/';
  // ziweiUrl = '/api/ziwei';

  lunarCalendarUrl = 'http://1.34.27.193/api/condition/cndate/';
  ziweiUrl = 'http://1.34.27.193/api/ziwei';
  ziweiMobileUrl = 'http://1.34.27.193/api/ziwei/mobile';

  frontUul = 'http://1.34.27.193';

  // lunarCalendarUrl = 'https://fate.opoint.com.tw/Fate/api/condition/cndate/';
  // ziweiUrl = 'https://fate.opoint.com.tw/Fate/api/ziwei';
  // ziweiMobileUrl = 'https://fate.opoint.com.tw/Fate/api/ziwei/mobile';


  year: any;

  constructor(
    private httpClient: HttpClient,
    private http: HTTP,
    private nativeStorage: NativeStorage,
    private userService: UserService
  ) { }

  // 讀取local json file (正式發布需改成API方式)
  // getLocalData(): Observable<Astrology> {
  //   return this.httpClient.get<Astrology>(this.dataUrl);
  // }

  // apiTest() {
  //   const url = 'https://jsonplaceholder.typicode.com/posts/42';
  //   return this.httpClient.get(url).pipe(take(1));
  // }

  // apiHttpTest() {
  //   const url = 'http://datacenter.taichung.gov.tw/Swagger/OpenData/44ff471a-8bda-429d-b5ba-29eace7b05ed?limit=10';
  //   return this.httpClient.get(url).pipe(take(3));
  // }

  getZiweiDataAllTwelve(): Observable<Astrology> {
    // 讀取使用者資訊
    // this.nativeStorage.getItem('UserData')
    //   .then(
    //     data => this.userData = data,
    //     error => console.error(error)
    //   );

    // if (!this.userData) {
    //   this.userData = this.userService.getUser();
    // }

    this.userData = this.userService.getUser();

    const postData = {
      DateType: this.userData.DateType,
      Year: this.userData.Year,
      Month: this.userData.Month,
      Day: this.userData.Day,
      IsLeap: !!this.userData.IsLeap,
      BirthTime: this.userData.BirthTime
    };
    return this.httpClient.post<Astrology>(this.ziweiMobileUrl, postData);
  }

  getZiweiData(): Observable<Astrology> {

    // 讀取使用者資訊
    // this.nativeStorage.getItem('UserData')
    //   .then(
    //     data => this.userData = data,
    //     error => console.error(error)
    //   );

    // if (!this.userData) {
    //   this.userData = this.userService.getUser();
    // }

    this.userData = this.userService.getUser();

    // const headers = new Headers();
    // headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/json');

    const postData = {
      DateType: this.userData.DateType,
      Year: this.userData.Year,
      Month: this.userData.Month,
      Day: this.userData.Day,
      IsLeap: !!this.userData.IsLeap,
      BirthTime: this.userData.BirthTime
    };


    // const requestOptions = new RequestOptions({ headers: headers });


    // this.http.setDataSerializer('json');

    // this.http.post(this.ziweiUrl, postData, headers)
    //   .then(data => {
    //     console.log(data.status);
    //     console.log('httpData', data.data); // data received by server
    //     // console.log(data.headers);
    //   })
    //   .catch(error => {
    //     console.log(error.status);
    //     console.log(error.error); // error message as string
    //     // console.log(error.headers);
    //   });

    return this.httpClient.post<Astrology>(this.ziweiUrl, postData);
  }

  getLunarDate(year: number): Observable<LunarDate[]> {

    //   // return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
    //   //   map(results => results['Search'])
    //   // );

    return this.httpClient.get<LunarDate[]>(this.lunarCalendarUrl + year);
  }


  getLunarDate2(year: number) {
    let lunarData: LunarDate[];
    this.http.get(this.lunarCalendarUrl + year, {}, {})
      .then(res => {
        // console.log(data.status);
        console.log(res.data); // data received by server
        // console.log(data.headers);
        lunarData = res.data;
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        // console.log(error.headers);
      });
    return lunarData;
  }

  // async getLunarDate(year: number) {
  //   try {
  //     const url = 'http://1.34.27.193/api/condition/cndate/' + year;
  //     const params = {};
  //     const headers = {};

  //     const response = await this.http.get(url, params, headers);

  //     // console.log(response.status);
  //     console.log(JSON.parse(response.data)); // JSON data returned by server
  //     // console.log(response.headers);
  //     return JSON.parse(response.data);
  //   } catch (error) {
  //     // console.error(error.status);
  //     console.error(error.error); // Error message as string
  //     // console.error(error.headers);
  //   }
  // }
}
