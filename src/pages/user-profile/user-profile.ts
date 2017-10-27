import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";  //provider
import {AngularFireAuth} from "angularfire2/auth";
import firebase from 'firebase';
/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  constructor(
    private AFcurUser: AngularFireAuth,
    //private AFdatabase: AngularFireDatabase,
    public app: App,
    public navCtrl: NavController,
    public userP : ProfileProvider  //for provider
  ) { }

  ionViewDidLoad() {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/user/' + userId).once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      document.getElementById("userName").innerHTML = username;
    });

  }
}
