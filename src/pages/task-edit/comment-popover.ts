import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, LoadingController,
  PopoverController, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { CompletedPage } from '../completed/completed'
import { DashboardPage } from '../dashboard/dashboard'
import { ProfilePage } from '../profile/profile'

@Component({
  template: `
  <ion-content>
    <ion-label>Would you like to leave a comment?</ion-label>
    <ion-textarea placeholder="Comment goes here..."></ion-textarea>
    <button ion-button style="background-color: red" (click)="close()">Cancel</button>
    <button ion-button style="background-color: #2ec95c" (click)="save()">Continue</button>  
  </ion-content>
  `
})

export class CommentPopover {
  db = firebase.firestore();
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
  ) {
  }

  save() {
  //   let taskRef = this.db.collection('tasks').doc(taskId);
  //   taskRef.update({
  //     completed : true
  //   });
    this.navCtrl.push(ProfilePage);
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
