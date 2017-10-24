import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";
import { AngularFireDatabase} from "angularfire2/database";
import {UserProfilePage} from '../user-profile/user-profile';
import firebase from 'firebase';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  //firstName = {} as string;
  //lastName = {} as string;
  constructor(
    private AFcurUser: AngularFireAuth,
    private AFdatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController
  ) { }

  update = function(firstName, lastName)
  {
    var user = {} as User;
    var result = this.AFcurUser.auth.currentUser;
    if(result)
    {
      console.log(result);
      user.lastName = lastName;
      user.firstName = firstName;
      user.userId = result.uid;
      console.log(user);
      /*
      this.AFcurUser.authState.take(1).subscribe(auth=>{
        this.AFdatabase.list(`user/${result.uid}`).push(this.user)
          //.then(()=>this.navCtrl.push('UserProfilePage'))
      })*/
     // var ref = firebase.database();
      firebase.database().ref('user/'+ result.uid).set({
        lastName : lastName,
        firsName : firstName,
        userId : result.uid
      });



    }
  }


}
