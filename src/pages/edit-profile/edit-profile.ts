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

  //constructor of the page.
  constructor(
    private AFcurUser: AngularFireAuth,
    //private AFdatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
  ) { }

  update = function(firstName, lastName)
  {

    var result = this.AFcurUser.auth.currentUser;   //get current logged in user
    if(result)
    {
      //initialize new User object using input lastname, firstname and current author's uid and email.
      var newUser = new ProfileProvider(lastName, firstName, result.uid, result.email);
      newUser.createTask();                                         //create test task list
      var userRef = firebase.database().ref('user/'+ result.uid);
      userRef.set({                                                 //write user object to database
        lastName : lastName,                                        // as an user node.
        firsName : firstName,
        userId : result.uid,
        email : result.email,
      });
      //TODO modularize following code
      userRef = firebase.database().ref('user/'+ result.uid + '/' + 'owenedTask');
      for( let ownedTask of newUser.oTask)
      {
        var ownedTaskRef = userRef.push().key;    //get new key value for a new entry of current path
        var updates = {};                         // declare update var to hold update data.
        updates['user/'+ result.uid + '/'+'owenedTask' +'/'+ ownedTaskRef] = ownedTask; //set path for current task
        firebase.database().ref().update(updates);                                      // update to specified path
                                                                                        // in database.
      }









    }
  }


}
