import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";  //provider
import { TaskObjectProvider } from '../../providers/task-object/task-object'; //provider
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import {ProfilePage} from '../profile/profile';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  //for validation
import { emailValidator} from '../../validators/emailValidator';
import { nameValidator} from '../../validators/nameValidator';

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

   curUserToken = this.AFcurUser.auth.currentUser;
   CURRENT_USER = {} as ProfileProvider;
   editProfileForm : FormGroup;
  //constructor of the page.
  constructor(
    private AFcurUser: AngularFireAuth,
    private AFdatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public firebaseModule : FirebaseProvider,
    public formBuilder : FormBuilder,
    //public currUser : ProfileProvider
  ) {

    this.editProfileForm = formBuilder.group({
      email : [''],
      lastName : [''],
      firstName :  [''],
      phone : [''],
      Introduction : [''],
      travelRadius : [''],
    });

    AFdatabase.list<ProfileProvider>('user').valueChanges().subscribe();

    AFdatabase.object<ProfileProvider>('user/' + this.curUserToken.uid).snapshotChanges().map(action=>{
      const $key = action.payload.key;
      this.CURRENT_USER = { $key, ...action.payload.val()}


    }).subscribe(item =>(console.log("key is ", this.CURRENT_USER)));
  };

   //
   // writeUp = function(message : any)
   // {
   //   //document.getElementById("FN").textContent = message.firstName;
   // }

  /*
  / This funtion will take all the user inputs and update it to corresponding node.
  */
  update = function()
  {

    console.log("asd" , this.editProfileForm.value.firstName);
    if(!this.editProfileForm.controls.firstName.valid)
    {
      console.log("invalid input here");
    }
    if(this.curUserToken)
    {
      //initialize new User object using input lastname, firstname and current author's uid and email.
      console.log("here", this.editProfileForm.value.firstName);
      var newUser = new ProfileProvider(this.editProfileForm.value.lastName, this.editProfileForm.value.firstName, this.curUserToken.uid, this.curUserToken.email, "intro", [true]);

      //this.firebaseModule.singleStringUpdate('lastName', newUser.lastName, this.curUserToken.uid);    //update user's last name to the server.
      this.singleStringUpdate('firstName', newUser.firstName);
      //this.firebaseModule.singleStringUpdate('phone', this.editProfileForm.value.phone, this.curUserToken.uid);
      //console.log("1", newUser);

      //TODO: find a way to display data in input box
     // var tmpUser;
     // this.getUserProfile(this.curUserToken.uid, function(userp){ tmpUser = userp});


      //console.log("2", this.user1);
      //TODO: modularize following code
      var userRef = firebase.database().ref('user/'+ this.curUserToken.uid + '/' + 'owenedTask'); //get node reference.
      for( let ownedTask of newUser.oTask) {
        var ownedTaskRef = userRef.push().key;    //get new key value for a new entry of current path
        var updates = {};                         // declare update var to hold update data.
        updates['user/' + this.curUserToken.uid + '/' + 'owenedTask' + '/' + ownedTaskRef] = ownedTask; //set path for current task
        firebase.database().ref().update(updates);                                      // update to specified path
      }                                                                                  // in database.
    }
    this.editProfileForm.reset();
  }

  /*
  / This function is to add updateMessage to the specified sub path of the user node
  / that represents current user.
   */
  singleStringUpdate = function(subPath : string, updateMessage : string)
  {
    var updateMsg = {}
    console.log("this is ", updateMessage);                                                      //declare and initialize updateMsg variable
    updateMsg['user/' + this.curUserToken.uid + '/' + subPath] = updateMessage;     //set correct path using subPath and assign update value
    firebase.database().ref().update(updateMsg);                              // updating to firebase using firebase API

  }

   /*
   /  this function will find user node using userId and return value
   /  of the node
    */
  getUserProfile = function(userId : string, profile) : any
  {
    var user;
    var userRef = firebase.database().ref('user/' + userId);            //get a node reference with path specified by userId
    userRef.once('value', function(snapshot)         // read node value once use firebase API
    {
      user = snapshot.val()                                               //return node value.
      profile(user);
      return user;
    })
  }




}

