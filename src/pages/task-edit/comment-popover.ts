import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, LoadingController,
  PopoverController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import firebase from 'firebase';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { App } from 'ionic-angular';

@Component({
  template: `
  <ion-label>Would you like to leave a comment?</ion-label>
  <ion-input type="text" [(ngModel)] = 'comment' placeholder='Comment' value={{comment.value}}> </ion-input>
  <button ion-button style="background-color: red" (click)="close()">Cancel</button>
  <button ion-button style="background-color: #2ec95c" (click)="updateComment()">Continue</button>
  `
})

export class CommentPopover {
  db = firebase.firestore();
  taskId: string = '';
  comment: string = '';
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public App : App
    ) {


  }

  updateComment(){
    this.taskId = this.navParams.get('taskId');
    let taskRef = this.db.collection('tasks').doc(this.taskId);
    taskRef.update({
      completed: true,
      ownerComment: this.comment
    });
    this.viewCtrl.dismiss().then(()=> {
      this.App.getRootNav().setRoot(DashboardPage);
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
