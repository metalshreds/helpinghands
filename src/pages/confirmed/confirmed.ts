import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskObjectProvider} from "../../providers/task-object/task-object";
import {TaskViewPage} from "../task-view/task-view";

/**
 * Generated class for the ConfirmedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmed',
  templateUrl: 'confirmed.html',
})
export class ConfirmedPage {

  tasks : Array<TaskObjectProvider>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.tasks = [];
    var skills1 = [];
    var skills2 = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmedPage');
  }
  //navigates to taskview page if task clicked
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }

}
