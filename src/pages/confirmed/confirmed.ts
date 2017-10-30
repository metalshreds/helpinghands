import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskObjectProvider} from "../../providers/task-object/task-object";
import {TaskViewPage} from "../task-view/task-view";

/**
 * Generated class for the ConfirmedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmed',
  templateUrl: 'confirmed.html',
})
export class ConfirmedPage {

  tasks : Array<TaskObjectProvider>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tasks = [];
    var req1 = [];
    var req2 = [];

    this.tasks.push(new TaskObjectProvider('Sequencing Ducks', 6, '12:00 pm',
      'We are looking for someone to help with a large amount of DNA ' +
      'sequencing needed for our research project. We will offer ' +
      'substantial payment.', 'Must be know how to work in lab and know how' +
      'to sequence DNA.', req1, false, 'UW Duck Research Team'));
    this.tasks.push(new TaskObjectProvider('The Art of Welding', 4, '9:30 am',
      'I need someone to teach me basic welding so that I may use it in an' +
      ' art piece I am working on.', 'Must be able to teach basic welding ' +
      'techniques.', req2, false, 'Georgia O Keefe'));
    this.tasks.push(new TaskObjectProvider('How Did This Happen?', 2, '7:30 am',
      'I went outside last night and saw that my bike was somehow cut into ' +
      'two parts! I am looking for someone who could help me put it ' +
      'back together.', 'I was looking for someone who would know how to ' +
      'weld a frame together and fix a bike chain.', req2, false,
      'Johnson'));
    this.tasks.push(new TaskObjectProvider('Welders Down', 5.5, '6:30 pm',
      'Our welders are all sick, and we need someone to fill in for them. ' +
      ' It will be few quick frame welds that we need.', 'Must be able to ' +
      'cleanly weld', req2, false, 'UW SAE Hybrid Team'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmedPage');
  }

  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }

}
