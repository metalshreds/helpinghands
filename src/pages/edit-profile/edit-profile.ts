import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { Task} from "../../models/task";
import { userProfile} from "../../models/userProfile";
import { ProfileProvider } from "../../providers/profile/profile";  //provider
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
    public navCtrl: NavController,
    public  userP : ProfileProvider  //for provider
  ) { }

  update = function(firstName, lastName)
  {
   // var user = {} as userProfile;               //use userProfile in models folder
    var result = this.AFcurUser.auth.currentUser;
    if(result)
    {
      console.log(result);
      //this block of code works with provider;
      this.userP.lastName = lastName;
      this.userP.firstName = firstName;
      this.userP.userId = result.uid;
      this.userP.email = result.uid;
      this.userP.createTask();
      /*
      user.lastName = lastName;
      user.firstName = firstName;
      user.userId = result.uid;
      user.email = result.email;
      user.createTask();*/
      /*
      this.AFcurUser.authState.take(1).subscribe(auth=>{
        this.AFdatabase.list(`user/${result.uid}`).push(this.user)
          //.then(()=>this.navCtrl.push('UserProfilePage'))
      })*/
     // var ref = firebase.database();


      console.log( "user is ",this.userP);
      firebase.database().ref('user/'+ result.uid).set({
        lastName : lastName,
        firsName : firstName,
        userId : result.uid,
        email : result.email,
        //task : user.ownedTask
        task :  this.userP.ownedTask   //works with provider
      });







    }
  }


}
