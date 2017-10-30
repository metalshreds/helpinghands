import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskViewPage } from '../task-view/task-view';
import { TaskObjectProvider } from '../../providers/task-object/task-object';

/**
 * Generated class for the PendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
})
export class PendingPage {

  tasks: Array<TaskObjectProvider>;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.tasks = [];
    var req1 = [];
    var req2 = [];

    this.tasks.push(new TaskObjectProvider('Coding Help', 3, '5:00 pm',
      'I need help figuring out how to parse files.', 'Must be fluent in Java',
      req1, false, 'Kiko'));
    this.tasks.push(new TaskObjectProvider('Impressive Karate', 5, '8:00 am',
      'I need someone to teach me some awesome karate moves! I want to impress' +
      ' my friend.', 'Must have a sweet karate outfit and know legit karate moves',
      req2, false, 'George'));


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingPage');
  }

  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }
}
