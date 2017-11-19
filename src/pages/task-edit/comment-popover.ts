import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, LoadingController,
  PopoverController, ViewController } from 'ionic-angular';

@Component({
  template: `
  <ion-label>Would you like to leave a comment?</ion-label>
  <ion-textarea placeholder="Comment goes here..."></ion-textarea>
  <button ion-button style="background-color: red" (click)="close()">Cancel</button>
  <button ion-button style="background-color: #2ec95c" (click)="close()">Continue</button>
  `
})
export class CommentPopover {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
