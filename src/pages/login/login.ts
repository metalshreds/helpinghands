

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController, Platform, MenuController } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import {AngularFireAuth} from "angularfire2/auth";
import {EditProfilePage} from "../edit-profile/edit-profile";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  //for validation
import { emailValidator} from '../../validators/emailValidator';
import { passwordValidator } from '../../validators/passwordValidator';
import {DashboardPage} from "../dashboard/dashboard";

//@IonicPage()
@Component({

  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public emailInput;
  public passwrodInput;
  constructor(
    private authp: AngularFireAuth,
    //public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    //public app: App,
    public navCtrl: NavController,
    public formBuilder : FormBuilder,
    private plt : Platform,
    public menu : MenuController
  ) {
    this.loginForm = formBuilder.group({
      email : ['', Validators.compose([emailValidator.isValid])],
      password : ['',Validators.compose([Validators.required, passwordValidator.isValid])]
    });
    this.plt.ready();
    this.menu = menu;
    this.menu.enable(false);
  }



  /*
  / This function takes user input and create an account
  / using that inputs in firebase. It will navigate user
  / to profile page on success, or display an error message
  / on failure.
   */
  login = async function(email, passwrod) : Promise<any> {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: '',
      buttons: ['OK']
    });

    console.log(email);
    if(!this.loginForm.valid)
    {
      console.log("invalid input here");
    }
    var loginResult = this.authp.auth.signInWithEmailAndPassword(email, passwrod)
      .then(result=>{
        return new Promise((resolve)=>{
            this.loginForm.reset();
            console.log(result);
            //TODO sent user verification email, add verification checking at login page
            //https://firebase.google.com/docs/auth/web/manage-users
            resolve('login success');
            console.log("in loging page, Cemail/Cpw", resolve);
            this.menu.enable(true);
            this.navCtrl.push(DashboardPage);
        })


      })
      .catch(function(error)
      {
        return new Promise((reject)=>{
          if(error)
          {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert.setTitle(errorCode);
            alert.setMessage(errorMessage);
            alert.present();
            console.log("in loging page's catch, Wemail/Wpw", errorCode);
            reject(errorCode);
          }

        })
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
    this.menu.enable(true);
    this.navCtrl.push(HomePage);
  }

  /*
  /function that let user reset password by sending an
  /email to user's register email using firebase's built-in
  /function.  **this piece of code is from firebase document.
   */
  goToResetPassword() {
    this.authp.auth.sendPasswordResetEmail(this.loginForm.value.email).then(function() {
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
