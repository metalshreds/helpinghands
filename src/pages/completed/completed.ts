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
  skills: Array<boolean>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tasks =[];
    this.skills = [];

    //creates example task
    let task = new TaskObjectProvider( "Dumb As Dirt", 6.5,
      "1:00 pm, April 20th", "I am trying to do an experiment that involves " +
      "using dirts with different pH levels. On my first go, I couldn't get" +
      " the right pH levels, so I am looking for someone who could get dirt" +
      " with the right pH level.", "All you need to know is how to get the" +
      " right pH level in dirt.", this.skills, true, 'Franklin');

    //adds example task to list of tasks
    this.tasks.push(task);

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
