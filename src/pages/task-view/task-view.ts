import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskEditPage} from "../task-edit/task-edit";

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
    selectedTask: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedTask = navParams.get('task');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskViewPage');
  }

  editTaskClicked(event, selectedTask){
    this.navCtrl.push(TaskEditPage, selectedTask)
  }
}
