import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, AlertController, App, LoadingController } from 'ionic-angular';
import {TaskEditPage} from "../task-edit/task-edit";
import {ProfilePage} from "../profile/profile";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

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
    curUserToken = this.AFcurUser.auth.currentUser;
    selectedTask: any;
    //curUserToken = this.AFcurUser.auth.currentUser;
    userIsTaskOwner = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private AFcurUser: AngularFireAuth,
    private AFdatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public app: App,
  ) {
    this.selectedTask = navParams.get('task');
    //TODO is this the correct way to check if they are the same user?
    this.userIsTaskOwner = (this.selectedTask.owner == this.curUserToken.uid)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskViewPage');
  }

   editTaskClicked(event, selectedTask){
     this.navCtrl.push(TaskEditPage, {
       task: selectedTask
     });
  }

  userClicked(event, userid){
    this.navCtrl.push(ProfilePage)
  }

  //TODO move task to curr users pending and what for task owner?
  requestTaskClicked(event, selectedTask, selectedTask_owner, curUserToken){
    alert("Task Requested");
  }

  //TODO what to do if task owner clicks a user?
  suggestedUserClicked(event, user, selectedTask_owner, selectedTask){

  }
}
