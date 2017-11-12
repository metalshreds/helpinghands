import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile'
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import firebase from 'firebase';
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
  curUserToken = this.AFcurUser.auth.currentUser;
  CURRENT_USER = {} as ProfileProvider;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private AFcurUser: AngularFireAuth,
              private AFdatabase: AngularFireDatabase,
              ) {


    AFdatabase.object<ProfileProvider>('user/' + this.curUserToken.uid).snapshotChanges().map(action=>{
      const $key = action.payload.key;
      this.CURRENT_USER = { $key, ...action.payload.val()}
      return this.CURRENT_USER;
    }).subscribe();

  }







  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
