import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor() { }

  inputvaild() {
    this.isAuthenticated = true;
  }

  inputnotvaild() {
    this.isAuthenticated = false;
  }

  get userIsAuthenticated() {
    return this.isAuthenticated;
  }

}
