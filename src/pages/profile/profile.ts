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
  shownGroup = "";
  profile;
  skills : Array<boolean>;
  AFcurUser = firebase.auth();
  curUserToken = this.AFcurUser.currentUser;
  userPhotoUrl;
  csSkillInterface = ['Programming', 'Excel', 'Hardware'];
  mechSkillInterface = ["Welding", "Mechanic", "Soldering", "Drafting",];
  artSkillInterface = ["GraphicDesign","Photography","DrawingAndPainting"];
  sciSkillInterface = ["Biology", "Physics","Chemistry","Agriculture"];
  econSkillInterface = ["Management", "Accounting", "Economics"];
  langSkillInterface = ["Spanish", "Japanese", "German", "Mandarin", "Cantonese","Portuguese",
                        "Russian", "English", "OtherLanguage"];
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
    this.CURRENT_USER.completedTask = [];
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
          console.log(this.CURRENT_USER.skills);
          for (const i in this.CURRENT_USER.skills)
          {
            console.log(i);
            if(this.CURRENT_USER.skills[i] == true) {
              if (this.csSkillInterface.indexOf(i) >= 0)
                this.csSkills.push(i);
              else if (this.mechSkillInterface.indexOf(i) >= 0)
                this.mechSkills.push(i);
              else if (this.artSkillInterface.indexOf(i) >= 0)
                this.artSkills.push(i);
              else if (this.sciSkillInterface.indexOf(i) >= 0)
                this.sciSkills.push(i);
              else if (this.econSkillInterface.indexOf(i) >= 0)
                this.econSkills.push(i);
              else if (this.langSkillInterface.indexOf(i) >= 0)
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
      var docRef = this.db.collection('users').doc(this.CURRENT_USER.userId).collection('completedTask');
      docRef.get().then(doc=>{
        doc.forEach(sdoc=>{
          this.db.collection('users').doc(this.CURRENT_USER.userId).collection('completedTask').doc(sdoc.id).
            get().then(doc =>{
              console.log("this is ", this.CURRENT_USER.completedTask);
                //TODO
                var taskRef = this.db.collection('tasks').doc(sdoc.id);
                taskRef.get().then(taskDoc =>{
                    console.log('task doc is ',taskDoc.data());
                    //create task and push into array
                    //TODO change the following hard coding
                    var task = new TaskObjectProvider(
                      taskDoc.data()['taskName'],
                      taskDoc.data()['taskId'],
                      taskDoc.data()['duration'],
                      taskDoc.data()['startTime'],
                      taskDoc.data()['endTime'],
                      taskDoc.data()['taskDescription'],
                      taskDoc.data()['wantedSkills'],
                      taskDoc.data()['complete'],
                      taskDoc.data()['owner'],
                      taskDoc.data()['ownerUserId'],
                      taskDoc.data()['location']
                    );
                  for(const field in taskDoc.data())
                  {
                    task[field] = taskDoc.data()[field];
                  }

                  this.CURRENT_USER.completedTask.push(task);

                });

          })
        });
      });
  }

  toggleGroup(group) {
    console.log("This is the group"+group)
    if (this.isGroupShown(group)) {
      this.shownGroup = "";
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup == group;
  };

  expandPic(){
    this.photoviewer.show(this.userPhotoUrl, this.curUserToken.displayName ,{share : false});
    console.log(this.userPhotoUrl);
  }

  goToEditProfile(event){
    this.navCtrl.push(EditProfilePage);
  }

  taskClicked(event, task){
    console.log("TASK TO PUSH IS: " + task.taskId);
    console.log("about to push said task!!!");
    this.navCtrl.push(TaskViewPage, {
      task: task
    });
  }

}
