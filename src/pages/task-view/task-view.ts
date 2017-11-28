import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, AlertController, App, LoadingController } from 'ionic-angular';
import {TaskEditPage} from "../task-edit/task-edit";
import {ProfilePage} from "../profile/profile";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {ProfileProvider} from "../../providers/profile/profile";
import firebase from 'firebase';
import {TaskObjectProvider} from "../../providers/task-object/task-object";

/**
 * Generated class for the TaskViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-view',
  templateUrl: 'task-view.html'
})
export class TaskViewPage {
  requestedUsers = {};
  suggestedUsers = {};
  curUserToken = this.AFcurUser.auth.currentUser;
  selectedTask: TaskObjectProvider;
  CURRENT_USER = {} as ProfileProvider;
  TASK_OWNER = {} as ProfileProvider;
  isTaskCompleted = false;
  userIsTaskOwner = false;
  showEditButton = false;
  showRequestButton = false;
  db = firebase.firestore();
  owner_user_id = this.curUserToken.uid; //todo change this

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private AFcurUser: AngularFireAuth,
    public app: App,
  ) {
    this.selectedTask = navParams.get('task');

    console.log("Selected task" + this.selectedTask);
    //TODO is this the correct way to check if they are the same user?
    this.userIsTaskOwner = (this.selectedTask.ownerUserId == this.curUserToken.uid)

    var userRef = this.db.collection('users').doc(this.curUserToken.uid);
    userRef.get()
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
            console.log('Current user: ' + this.CURRENT_USER[field]);
          }
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    var taskOwnerRef = this.db.collection('users').doc(this.selectedTask.ownerUserId.toString());
    taskOwnerRef.get().then(doc=>{
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        for(const field in doc.data())
        {
          //have to be careful that we have to store exactly same property
          //  in userProvider obeject and users node.
          this.TASK_OWNER[field] = doc.data()[field];
          console.log('Task owner:  field =  '+ field + "and value = "  + this.TASK_OWNER[field]);

        }
      }
    }).catch(err => {
      console.log('Error getting document', err);
    });


    if(this.isTaskCompleted){
      this.showEditButton = false;
      this.showRequestButton = false;
    }else{
      this.showEditButton = this.userIsTaskOwner;
      this.showRequestButton = !this.userIsTaskOwner;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskViewPage');
  }

  editTaskClicked(event, selectedTaskID){
    this.navCtrl.push(TaskEditPage, {
      taskId: selectedTaskID
      //taskID: "yP7n3Tv1WPNXL6T27GiAeWjPupu23"
    });
  }

  userClicked(event, userid){
    this.navCtrl.push(ProfilePage, {
      userId: userid
    });
  }

  //TODO move task to curr users pending and what for task owner?
  requestTaskClicked(event, selectedTaskId, selectedTask_owner){
    alert("Task Requested");

    //add task id to user's list of pending tasks

    //add user id to list of people who have requested to do a task
  }

  //TODO what to do if task owner clicks a user?
  suggestedUserClicked(event, user, selectedTask_owner, selectedTask){
    //add task id to user's pending
  }
}
