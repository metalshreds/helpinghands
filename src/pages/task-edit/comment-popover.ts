import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, LoadingController,
  PopoverController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import firebase from 'firebase';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { App } from 'ionic-angular';
import {cloudProvider} from "../../providers/cloudbase";
import { CompletedPage } from '../completed/completed';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  template: `
  <ion-label>Would you like to leave a comment?</ion-label>
  <ion-input type="text" [(ngModel)] = 'comment' placeholder='Comment' value={{comment.value}}> </ion-input>
  <button ion-button style="background-color: red" (click)="close()">Cancel</button>
  <button ion-button style="background-color: #2ec95c" (click)="updateComment()">Complete This Task</button>
  `
})

export class CommentPopover {
  db = firebase.firestore();
  taskId: string = '';
  taskName: string = '';
  comment: string = '';
  curUserToken = this.AFcurUser.auth.currentUser;
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public App : App,
    public cloud : cloudProvider,
    private AFcurUser : AngularFireAuth,
  ) {
  }

  updateComment(){
    this.taskId = this.navParams.get('taskId');
    this.taskName = this.navParams.get('taskName');
    let taskRef = this.db.collection('tasks').doc(this.taskId);
    let d = new Date();
    let today = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    taskRef.update({
      endDate: today,
      completed: true,
      ownerComment: this.comment
    });
    taskRef.collection('helpers').get().then((taskDoc) => {
      taskDoc.forEach(doc=>{
        console.log("k sup ", doc.id);
        this.cloud.removeTaskFromUser(doc.id, 'confirmedTask', this.taskId);
        this.cloud.addTaskToList(doc.id, 'completedTask', this.taskId, this.taskName);
      });
      this.cloud.removeTaskFromUser(this.curUserToken.uid, 'confirmedTask', this.taskId);
    });
    this.viewCtrl.dismiss().then(()=> {
      this.App.getRootNav().setRoot(DashboardPage);
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
