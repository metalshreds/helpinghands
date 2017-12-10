import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditProfilePage} from "../edit-profile/edit-profile";
import {DashboardPage} from "../dashboard/dashboard";

/**
 * Generated class for the IntroductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroductionPage');
    // this.navCtrl.setRoot(DashboardPage);
  }

  editProfile(){
    this.navCtrl.push(EditProfilePage)
  }

}
