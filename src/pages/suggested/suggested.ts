import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Task } from '../../models/task';
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
  tasks = Array<Task>();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var userA = {email:'email', password:'pw', userId:'1337', lastName:'last', firstName:'first', introduction:'intro', blackListTask:[], confirmTask:[], pendingTask:[], skills:[], ownedTask:[]} as User;
    var taskA = {user:userA, timeDuration:10, timeStart:10, introduction:'intro', requirement:'req', wantedSkill:} as Task;
    var userB = {email:'asdf', password:'pw', userId:'1337', lastName:'last', firstName:'first', introduction:'intro', blackListTask:[], confirmTask:[], pendingTask:[], skills:[], ownedTask:[]} as User;
    var taskB = {user:userB} as Task;
    this.tasks = [];
    this.tasks.push(taskA, taskB);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestedPage');
  }

}
