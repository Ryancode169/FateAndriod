import { Injectable } from '@angular/core';
import { User } from './user.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  dataUrl = 'http://1.34.27.193/api/condition/cndate/';
  private userData: User;
  birthday: any;
  isLeap: boolean;

  constructor(private http: HttpClient) { }

  getCNData(): Observable<any> {
    return this.http.get<any>(this.dataUrl + this.userData.Year);
  }

  setUser(u: User) {
    this.userData = u;
    // this.birthday = new Date(birthday);
  }

  getUser() {
    return this.userData;
  }
}
