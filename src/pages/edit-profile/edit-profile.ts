import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { ProfileProvider } from "../../providers/profile/profile";  //provider
import { TaskObjectProvider } from '../../providers/task-object/task-object'; //provider
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

  constructor(
    private AFcurUser: AngularFireAuth,
    //private AFdatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public  userP : ProfileProvider  //for provider
  ) { }

  update = function(firstName, lastName)
  {

    var result = this.AFcurUser.auth.currentUser;   //get current logged in user
    if(result)
    {
      /*this is how we construct new object instead using userP from constructor.
      var newUser = new ProfileProvider();
      newUser.createTask();
      console.log( "user111 is ", newUser);
      console.log(result);*/
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
      var userRef = firebase.database().ref('user/'+ result.uid);
      userRef.set({                                                 //write user object to database
        lastName : lastName,                                      // as an user node.
        firsName : firstName,
        userId : result.uid,
        email : result.email,
      });
      //TODO modularize following code
      userRef = firebase.database().ref('user/'+ result.uid + 'owenedTask');
      for( let ownedTask of this.userP.oTask)
      {

        var ownedTaskRef = userRef.push().key;
        console.log("owntask is ", ownedTask);

        var updates = {};
        updates['user/'+ result.uid + '/'+'owenedTask' +'/'+ ownedTaskRef] = ownedTask;
        firebase.database().ref().update(updates);
      }
      //https://firebase.google.com/docs/database/web/read-and-write








    }
  }


}
