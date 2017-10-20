

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import { HomePage } from '../home/home'
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";

//@IonicPage()
@Component({

  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;    //initialie an object as user.

  public loginForm: any;
  public backgroundImage = 'assets/img/background/background-5.jpg';

  constructor(
    private authp: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController
  ) { }

  login = async function(user: User) {

    let alert = this.alertCtrl.create({
      title: '',
      subTitle: '',
      buttons: ['OK']
    });
    let pass = 1;

      const result = this.authp.auth.signInWithEmailAndPassword(user.email, user.password).catch(function(error)
      {

            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode != null)
              pass = 0;
            console.log("this is error", error);
            console.log("this is errorcode", errorCode);
           //alert (errorMessage);
            alert.setTitle(errorCode);
            alert.setMessage(errorMessage);
            alert.present();


      });
      console.log("this is result", result);
      if(result.za != null)
      {
        this.navCtrl.push(HomePage);
      }



  }

  goToSignup() {
     this.navCtrl.push(SignupPage);
  }

  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }
}
