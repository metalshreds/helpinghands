import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";

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
    }
  }
}
