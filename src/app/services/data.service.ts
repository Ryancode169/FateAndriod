import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Astrology } from './data.model';

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

  constructor(private http: HttpClient) { }

  // 讀取local json file (正式發布需改成API方式)
  getLocalData(): Observable<Astrology> {
    return this.http.get<Astrology>(this.dataUrl);
  }
}
