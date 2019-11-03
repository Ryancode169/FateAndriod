import { Injectable } from '@angular/core';
import { User } from './user.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userData: User;

  public birthTimeSelect = [
    { id: 0, text: '時辰未知' },
    { id: 1, text: '00:00~00:59' },
    { id: 2, text: '01:00~02:59' },
    { id: 3, text: '03:00~04:59' },
    { id: 4, text: '05:00~06:59' },
    { id: 5, text: '07:00~08:59' },
    { id: 6, text: '09:00~10:59' },
    { id: 7, text: '11:00~12:59' },
    { id: 8, text: '13:00~14:59' },
    { id: 9, text: '15:00~16:59' },
    { id: 10, text: '17:00~18:59' },
    { id: 11, text: '19:00~20:59' },
    { id: 12, text: '21:00~22:59' },
    { id: 13, text: '23:00~23:59' }
  ];

  constructor(private http: HttpClient, private nativeStorage: NativeStorage) {
    this.userData = {
      Name: '',
      Gender: '',
      Cellphone: '',
      BirthTime: 0, // 出生時辰
      DateType: 0,  // 國曆:0 陰曆:1
      Year: 1980,
      Month: 1,
      Day: 1,
      IsLeap: false, // 潤月
      SelectedBirthTimeText: '',
    } as User;

    this.userData.SelectedBirthTimeText = this.birthTimeSelect.find((item) => item.id === this.userData.BirthTime).text;

    // this.setUser(this.userData);
  }


  setUser(u: User) {
    // 儲存使用者資訊
    // this.nativeStorage.setItem('UserData', u)
    //   .then(
    //     (data) => console.log('Stored data!', data),
    //     error => console.error('Error storing item', error)
    //   );

    this.userData = u;
  }

  getUser() {
    // 讀取使用者資訊
    // this.nativeStorage.getItem('UserData')
    //   .then(
    //     data => this.userData = data,
    //     error => console.error(error)
    //   );
    return this.userData;
  }
}
