import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, public alertController: AlertController) { }

  canActivate(): boolean {
    if (!this.authService.userIsAuthenticated) {
      this.presentAlert();
      // this.router.navigateByUrl('/home');
    }
    return this.authService.userIsAuthenticated;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '訊息',
      subHeader: '',
      message: '請先填入您的個人資訊。',
      buttons: ['確定']
    });

    await alert.present();
  }
}
