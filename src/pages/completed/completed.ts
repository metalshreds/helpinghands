import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  skills: Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tasks =[];
    this.skills = [];

 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }
  //navigates to taskview page if task clicked
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }

}
