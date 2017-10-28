import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskObjectProvider} from '../../providers/task-object/task-object';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let taskA = new TaskObjectProvider("test1", 10, "today", 'intro', 'req', [false, false], false, "user");
    let taskB = new TaskObjectProvider("test2", 10, "today", 'intro', 'req', [false, false], false, "user");
    this.tasks = [];
    this.tasks.push(taskA, taskB);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestedPage');
  }

}
