import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {Task} from "../../models/task";
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

  tasks: Array<Task>;
  skills: Array<boolean>;
  helpers: Array<User>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tasks =[];
    this.skills = [];
    this.helpers = [];
    var task1 = new Task(1, 1, 'intro', 'req', this.skills, true, 1, 's1', this.helpers, this.helpers);
    this.tasks.push(task1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }
}
