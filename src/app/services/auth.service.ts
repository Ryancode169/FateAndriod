import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }

  // 檢查表單是否有填
  get  userIsAuthenticated(): boolean {

    if (this.userService.userData.Name.toString().length === 0) {
      return false;
    }

    if (this.userService.userData.Year.toString().length === 0) {
      return false;
    }

    if (this.userService.userData.Month.toString().length === 0) {
      return false;
    }

    if (this.userService.userData.Day.toString().length === 0) {
      return false;
    }

    if (this.userService.userData.BirthTime.toString().length === 0) {
      return false;
    }

    if (this.userService.userData.Cellphone.toString().length === 0) {
      return false;
    }
    return true;
  }


}
