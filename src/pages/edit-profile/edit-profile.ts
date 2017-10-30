import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { ProfileProvider } from "../../providers/profile/profile";  //provider
import { TaskObjectProvider } from '../../providers/task-object/task-object'; //provider
import {AngularFireAuth} from "angularfire2/auth";
import { AngularFireDatabase} from "angularfire2/database";
import {ProfilePage} from '../profile/profile';
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

  constructor(
    private AFcurUser: AngularFireAuth,
    //private AFdatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    //public  userP : ProfileProvider  //for provider
  ) { }

  update = function(firstName, lastName)
  {

    var result = this.AFcurUser.auth.currentUser;   //get current logged in user
    if(result)
    {

      var newUser = new ProfileProvider(lastName, firstName, result.uid, result.email);
      //newUser.userId = result.uid;
      newUser.createTask();
      //newUser.email = result.email;

      //console.log( "user is ", newUser);
      var userRef = firebase.database().ref('user/'+ result.uid);
      //console.log('user/'+ result.uid);
      //console.log(userRef, "is old userRef")
      userRef.set({                                                 //write user object to database
        lastName : lastName,                                      // as an user node.
        firsName : firstName,
        userId : result.uid,
        email : result.email,
      });
      //TODO modularize following code
      userRef = firebase.database().ref('user/'+ result.uid + '/' + 'owenedTask');
      //console.log(userRef, "is new userRef")
      for( let ownedTask of newUser.oTask)
      {

        var ownedTaskRef = userRef.push().key;
        //console.log("owntask is ", ownedTask);
        //console.log('user/'+ result.uid + '/'+'owenedTask' +'/'+ ownedTaskRef);
        //console.log(ownedTaskRef);
        var updates = {};
        updates['user/'+ result.uid + '/'+'owenedTask' +'/'+ ownedTaskRef] = ownedTask;
        firebase.database().ref().update(updates);
      }
      //https://firebase.google.com/docs/database/web/read-and-write








    }
  }


}
