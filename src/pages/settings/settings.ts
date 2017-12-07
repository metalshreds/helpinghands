import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth} from "angularfire2/auth";
import { LoginPage} from "../login/login";
import { IntroductionPage} from "../introduction/introduction";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  signOut(){
    firebase.auth().signOut();
    // this.navCtrl.push(LoginPage);
  }

  introPage(){
    this.navCtrl.push(IntroductionPage);
    // this.navCtrl.push(LoginPage);
  }
}
