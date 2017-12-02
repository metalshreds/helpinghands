import { Component } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile'
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { EditProfilePage } from '../edit-profile/edit-profile';
import firebase from 'firebase';
import { NgZone, OnInit } from "@angular/core";
import {TaskViewPage} from "../task-view/task-view";
import {TaskObjectProvider} from "../../providers/task-object/task-object";
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
  csSkills = [];
  hasCS = false;
  mechSkills = [];
  hasMech = false;
  artSkills = [];
  hasArt = false;
  sciSkills = [];
  hasSci = false;
  econSkills = [];
  hasEcon = false;
  langSkills = [];
  hasLang = false;
  db = firebase.firestore();
  profileOwner;
  CURRENT_USER = {} as ProfileProvider;
  currTask : TaskObjectProvider;
  //db = firebase.firestore();
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
          for (const i in this.CURRENT_USER.skills)
          {
            if (this.CURRENT_USER.skills[i] == true)
              if (i == "Programming" || i == "Excel" || i == "Hardware") {
                this.csSkills.push(i);
              }
              else if (i == "Welding" || i == "Mechanic" || i == "Soldering" || i == "Drafting") {
                this.mechSkills.push(i);
              }
              else if (i == "GraphicDesign" || i == "Photography" || i == "DrawingandPainting") {
                this.artSkills.push(i);
              }
              else if (i == "Bio" || i == "Physics" || i == "Chem" || i == "Agriculture") {
                this.sciSkills.push(i);
              }
              else if (i == "Management" || i == "Accounting" || i == "Economics") {
                this.econSkills.push(i);
              }
              else if (i == "Spanish" || i == "Japanese" || i == "German" || i == "Mandarin" ||
                i == "Cantonese" || i == "Portuguese" || i == "Russian" || i == "English" ||
                i == "OtherLang") {
                this.langSkills.push(i);
              }
          }
          this.hasCS = this.csSkills.length > 0;
          this.hasMech = this.mechSkills.length > 0;
          this.hasArt = this.artSkills.length > 0;
          this.hasSci = this.sciSkills.length > 0;
          this.hasEcon = this.econSkills.length > 0;
          this.hasLang = this.langSkills.length > 0;
          console.log(this.csSkills);
          console.log(this.hasCS);

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
                //TODO
                var taskRef = this.db.collection('tasks').doc(sdoc.id);
                taskRef.get().then(taskDoc =>{
                    console.log('task doc is ',taskDoc.data());
                    //create task and push into array
                    //TODO change the following hard coding
                    var task = new TaskObjectProvider(
                      taskDoc.data()['taskName'],
                      sdoc.id,
                      0,
                      '10',
                      '0',
                      taskDoc.data()['taskDescription'],
                      taskDoc.data()['wantedSkill'],
                      taskDoc.data()['complete'],
                      taskDoc.data()['owner'],
                      taskDoc.data()['ownerUserId'],
                      taskDoc.data()['location']
                    );
                  this.CURRENT_USER.ownedTask.push(task);


                });
              //this.CURRENT_USER.ownedTask.push(doc.data().taskName);

          })
        });
      });
      // for (const field in this.displaySkill) {
      //   console.log(field);
      //   if (field == "Programming" || field == "Excel" || field == "Hardware") {
      //     this.csSkills.push(field);
      //   }
      //   else if (field == "Welding" || field == "Mechanic" || field == "Soldering" || field == "Drafting") {
      //     this.mechSkills.push(field);
      //   }
      //   else if (field == "GraphicDesign" || field == "Photography" || field == "DrawingandPainting") {
      //     this.artSkills.push(field);
      //   }
      //   else if (field == "Bio" || field == "Physics" || field == "Chem" || field == "Agriculture") {
      //     this.sciSkills.push(field);
      //   }
      //   else if (field == "Management" || field == "Accounting" || field == "Economics") {
      //     this.econSkills.push(field);
      //   }
      //   else if (field == "Spanish" || field == "Japanese" || field == "German" || field == "Mandarin" ||
      //     field == "Cantonese" || field == "Portuguese" || field == "Russian" || field == "English" ||
      //     field == "OtherLang") {
      //     this.langSkills.push(field);
      //   }
      // }
      console.log(this.csSkills);
      console.log(this.displaySkill);
      console.log(this.hasCS);
  }


  expandPic(){
    this.photoviewer.show(this.userPhotoUrl, this.curUserToken.displayName ,{share : false});
    console.log(this.userPhotoUrl);
  }

  goToEditProfile(event){
    this.navCtrl.push(EditProfilePage);
  }

  taskClicked(event, task){
    console.log("TASK TO PUSH IS: " + task);
    //var currTask: TaskObjectProvider;
    // var taskRef = this.db.collection('tasks').doc(task);
    // taskRef.get()
    //   .then(doc => {
    //     if (!doc.exists) {
    //       console.log('No such document!');
    //     } else {
    //       console.log('Document data:', doc.data());
    //       for(const field in doc.data())
    //       {
    //         //have to be careful that we have to store exactly same property
    //         //  in userProvider obeject and users node.
    //         this.currTask[field] = doc.data()[field];
    //         console.log('TAsk in prfile: ' + this.currTask[field]);
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     console.log('Error getting document', err);
    //   });
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }


}
