import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {TaskObjectProvider} from "../../providers/task-object/task-object";
import {TaskViewPage} from "../task-view/task-view";

/**
 * Generated class for the CompletedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})
export class CompletedPage {


  tasks: Array<TaskObjectProvider>;
  skills: Array<boolean>;
  helpers: Array<User>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tasks =[];
    this.skills = [];
    this.helpers = [];
    let task = new TaskObjectProvider( "taskname", 10, "startdate", "introduction", "requirment", this.skills, true, 'user1');
    this.tasks.push(task);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }

}
