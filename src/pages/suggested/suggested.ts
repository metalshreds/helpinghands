import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskObjectProvider} from '../../providers/task-object/task-object';
import {TaskViewPage} from '../task-view/task-view';

/**
 * Generated class for the SuggestedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suggested',
  templateUrl: 'suggested.html',
})
export class SuggestedPage {
  tasks = Array<TaskObjectProvider>();
  skills: Array<boolean>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.tasks = [];
    this.skills = [];

    //creating some example tasks
    let taskA = new TaskObjectProvider("I Want To Be Lazy", 12, "11:00 am, " +
      "May 9th", "today", 'For my job, I need to take the name, date, and complaint ' +
      'info from emails. I was hoping that someone could make a program ' +
      'that would do that for me.', 'Must be able to code.', this.skills
      , false, "Georgina");
    let taskB = new TaskObjectProvider("The Name Escapes Me", 1, "2:45 pm, " +
      "May 11th", "today", 'There are some art pieces that I have created, but I ' +
      'cannot figure out names for them. I was hoping someone could help' +
      ' me come up with some. I will have pizza as well.', 'You should ' +
      'be creative', this.skills, false, "Art");
    let taskC = new TaskObjectProvider("I Need Freedom", 3, "8:35 am, May " +
      "12th", "today", "I have some handcuffs stuck on my hands. They are not there" +
      " because I was arrested. I am totally not a criminal. Totally. What" +
      " I need help with is getting them off.", "Must know how to remove" +
      " handcuffs", this.skills, false, "TotallyNotACriminal");

    //adding example tasks to task list
    this.tasks.push(taskA, taskB, taskC);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestedPage');
  }

  //navigates to taskview page if task clicked
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }

}
