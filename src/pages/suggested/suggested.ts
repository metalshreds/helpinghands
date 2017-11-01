import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskObjectProvider} from '../../providers/task-object/task-object';
import { User } from '../../models/user';


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
  helpers: Array<User>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tasks =[];
    this.skills = [];
    this.helpers = [];
    let taskA = new TaskObjectProvider( "taskname1", 10, "startdate", "introduction", "requirment", this.skills, false, 'user1');
    let taskB = new TaskObjectProvider( "taskname2", 10, "startdate", "introduction", "requirment", this.skills, false, 'user1');
    let taskC = new TaskObjectProvider( "taskname3", 10, "startdate", "introduction", "requirment", this.skills, false, 'user1');
    this.tasks = [];
    this.tasks.push(taskA, taskB, taskC);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestedPage');
  }

}
