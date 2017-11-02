

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
import { ProfilePage } from '../profile/profile';
import {AngularFireAuth} from "angularfire2/auth";
import {EditProfilePage} from "../edit-profile/edit-profile";
import {DashboardPage} from "../dashboard/dashboard";
//@IonicPage()
@Component({

  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;    //initialize an object as user.

  public loginForm: any;  //need this later when implement input invalidation

  //
  constructor(
    private authp: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController
  ) { }


  /*
  / This function takes user input and create an account
  / using that inputs in firebase. It will navigate user
  / to profile page on success, or display an error message
  / on failure.
   */
  login = async function(user: User) {
    var _this = this;
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: '',
      buttons: ['OK']
    });

    const result = this.authp.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(function(){
        _this.navCtrl.push(ProfilePage);
      })
      .catch(function(error)
      {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert.setTitle(errorCode);
          alert.setMessage(errorMessage);
          alert.present();
      });

  }

  /*
  / This function navigate user to the sign up page
   */
  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  /*
  / This function navigate user to the edit profile page
  / solely for testing.
   */
  goToHome() {
    this.navCtrl.push(HomePage);
  }

  /*
  /function that let user reset password by sending an
  /email to user's register email using firebase's built-in
  /function.  **this piece of code is from firebase document.
   */
  goToResetPassword(user : User) {
    this.authp.auth.sendPasswordResetEmail(user.email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
  }
}
