import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    tasks: Array<{title: string, time: string, location: string, description: string}>;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.tasks =[];
    this.tasks.push({title: 'Coding Help',
                     time: '5:00 pm',
                     location: 'Union South',
                     description:  'I need help figuring out how to parse files' +
                     ' for my programming assignment' });

    this.tasks.push({title: 'Impressive Karate',
                  time: '8:00 am',
                  location: '123 Some Street',
                  description:  'I need someone to teach me basic karate ' +
                  ' moves so I can impress my friend!' });

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingPage');
  }

}
