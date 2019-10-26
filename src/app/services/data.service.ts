import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Astrology, LunarDate } from './data.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

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

  url = '/api/condition/cndate/';
  url2 = 'https://jsonplaceholder.typicode.com/posts/1';
  hResultUrl = '/api/operation/ziwei/culture';
  lunarCalendarUrl = '/api/condition/cndate/';

  year: any;

  constructor(private http: HttpClient, private nativeStorage: NativeStorage) { }

  // 讀取local json file (正式發布需改成API方式)
  getLocalData(): Observable<Astrology> {
    return this.http.get<Astrology>(this.dataUrl);
  }

  getLunarDate(year: number): Observable<LunarDate[]> {
    // this.nativeStorage.getItem('UserData')
    //   .then(
    //     data => this.year = data.Year,
    //     error => console.error(error)
    //   );


    // return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
    //   map(results => results['Search'])
    // );

    return this.http.get<LunarDate[]>(this.lunarCalendarUrl + year);
  }
}
