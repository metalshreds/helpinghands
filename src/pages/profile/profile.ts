import { Component } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile'
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { EditProfilePage } from '../edit-profile/edit-profile';
import firebase from 'firebase';
import { NgZone, OnInit } from "@angular/core";
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
  AFcurUser = firebase.auth();
  curUserToken = this.AFcurUser.currentUser;
  userPhotoUrl;
  displaySkill  = [];
  db = firebase.firestore();
  profileOwner;
  CURRENT_USER = {} as ProfileProvider;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              //private AFcurUser: AngularFireAuth,
              private AFdatabase: AngularFireDatabase,
              private photoviewer : PhotoViewer,
              private _zone : NgZone,
              )
  {
    console.log( "param is", navParams.get('userId'));
    this.CURRENT_USER.userId = (navParams.get('userId'))? navParams.get('userId') : this.curUserToken.uid;
    console.log("cu id is ", this.CURRENT_USER.userId);
    this.CURRENT_USER.ownedTask = [];
    if(this.CURRENT_USER.userId == this.curUserToken.uid)
    {
      this.profileOwner = true;
    }
    else
    {
      this.profileOwner = false;
    }
    //get user node specificed by current userId.
    var userRef = this.db.collection('users').doc(this.CURRENT_USER.userId);
    userRef.get() //read
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
          for(const field in doc.data())
          {
            //have to be careful that we have to store exactly same property
            //  in userProvider obeject and users node.
            this.CURRENT_USER[field] = doc.data()[field];
          }
          for (const i in this.CURRENT_USER.skill)
          {
            if (this.CURRENT_USER.skill[i] == true)
              this.displaySkill.push(i);
          }
          console.log(this.displaySkill);

            this._zone.run(()=>{
              this.userPhotoUrl = this.CURRENT_USER.photoUrl;
              console.log(this.userPhotoUrl);
            });

        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

      //following code block pull the ownedlist from user node specified user ID, and push the name of the each
      //  task into current user's ownedlist.
      var docRef = this.db.collection('users').doc(this.CURRENT_USER.userId).collection('ownedTask');
      docRef.get().then(doc=>{
        doc.forEach(sdoc=>{
          this.db.collection('users').doc(this.CURRENT_USER.userId).collection('ownedTask').doc(sdoc.id).
            get().then(doc =>{
              console.log("this is ", this.CURRENT_USER.ownedTask);
              this.CURRENT_USER.ownedTask.push(doc.data().taskName);
            })
        });
      });

  }


  expandPic(){
    this.photoviewer.show(this.userPhotoUrl, this.curUserToken.displayName ,{share : false});
    console.log(this.userPhotoUrl);
  }

  goToEditProfile(event){
    this.navCtrl.push(EditProfilePage);
  }




}
