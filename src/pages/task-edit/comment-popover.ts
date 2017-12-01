import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, LoadingController,
  PopoverController, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { CompletedPage } from '../completed/completed';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  template: `
  <ion-content>
    <form [formGroup] = "commentForm" novalidate>
    <ion-label>Would you like to leave a comment?</ion-label>
    <ion-textarea formControlName = "comment" placeholder="Comment goes here..." value=""></ion-textarea>
    </form>
    <button ion-button style="background-color: red" (click)="close()">Cancel</button>
    <button ion-button style="background-color: #2ec95c" (click)="save()">Continue</button>  
  </ion-content>
  `
})

export class CommentPopover {
  commentForm : FormGroup;
  db = firebase.firestore();
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder : FormBuilder,
  ) {
    this.commentForm = formBuilder.group({
      comment : ['']
    });
  }

  save() {
    let taskId = this.navParams.get('taskId');
    let taskRef = this.db.collection('tasks').doc(taskId);
    console.log(this.commentForm.value.comment);
    taskRef.update({
      completed : true,
      // comment : comment,
    });
    this.navCtrl.push(ProfilePage);
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
