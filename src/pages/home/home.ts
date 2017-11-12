import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import {ProfilePage} from "../profile/profile";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //firstName = {} as string;
  //lastName = {} as string;
  constructor(
    private AFcurUser: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController
  ) {
    firebase.auth().onAuthStateChanged(user=> {
      if(user.uid)
        this.navCtrl.push(ProfilePage);
      else
        this.navCtrl.push(LoginPage);
    })

  }


}
