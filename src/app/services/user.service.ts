import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userData: User;
  birthday: any;

  constructor() { }

  setUser(name: string, birthday: string, birthdaytime: string, cellphone: string) {
    this.userData = {
      name, birthday, birthdaytime, cellphone
    };

    this.birthday = new Date(birthday);
  }

  getUser() {
    return this.userData;
  }
}
