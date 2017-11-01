import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile;
  skills : Array<boolean>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.skills = [true, false, true, false, false, true];
    this.profile = new ProfileProvider("ABCDEFGHIJK", "LMNOPQRSTUVWXYZ", "uid", "test@mail.com",
      "This is the intro to this person and will probably be somewhere along the lines of a 1 or 2 sentences, " +
      "this max may be enforced but who knows I'm just trying to make this somewhat long for the sake of testing.",
      this.skills);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
