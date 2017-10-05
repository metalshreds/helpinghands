

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { Component } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import { NavController } from 'ionic-angular';

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {

  public loginForm: any;
  public backgroundImage = 'assets/img/background/background-5.jpg';

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController
  ) { }

  login() {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Logged in!',
        subTitle: 'Thanks for logging in.',
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();

  }

  goToSignup() {
     this.navCtrl.push(SignupPage);
  }

  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }
}
