import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskObjectProvider } from '../../providers/task-object/task-object';

/**
 * Generated class for the TaskEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-edit',
  templateUrl: 'task-edit.html',
})
export class TaskEditPage {
  task: TaskObjectProvider;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var skills = [true, false, true];
    this.task = new TaskObjectProvider( "taskname1", 10, "startdate", "introduction", "requirement", skills, false, 'user1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskEditPage');
  }

}
