

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
import {ProfilePage} from '../profile/profile';
import {AngularFireAuth} from "angularfire2/auth";
import {EditProfilePage} from "../edit-profile/edit-profile";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  //for validation
import { emailValidator} from '../../validators/emailValidator';
import { passwordValidator } from '../../validators/passwordValidator';
//@IonicPage()
@Component({

  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 // user = {} as User;    //initialize an object as user.

  public loginForm: FormGroup;


  constructor(
    private authp: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public formBuilder : FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email : ['', Validators.compose([emailValidator.isValid])],
      password : ['']
    });
  }

  login = async function() {
    this.loginAttempt = true;
    var _this = this;
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: '',
      buttons: ['OK']
    });
    if(!this.loginForm.valid)
    {
      console.log("invalid input here");
    }
    this.authp.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then(function(){
        this.loginForm.reset();
        _this.navCtrl.push(EditProfilePage);
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

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  goToHome() {
    this.navCtrl.push(EditProfilePage);
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
