import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskObjectProvider} from "../../providers/task-object/task-object";
import { TaskViewPage} from "../task-view/task-view";
import { AngularFireDatabase } from "angularfire2/database";
import { ProfileProvider} from "../../providers/profile/profile";
import firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import { cloudProvider } from '../../providers/cloudbase';


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

  tasks: Array<TaskObjectProvider> = [];
  skills: Array<boolean>;
  currUserToken = this.AFcurUser.auth.currentUser;
  CURRENT_USER = {} as ProfileProvider;
  db = firebase.firestore();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private AFdatabase: AngularFireDatabase,
              public AFcurUser: AngularFireAuth,
  ) {

    var self = this;

    this.db.collection("tasks").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // console.log(doc.id, " => ", doc.data());
        //Create new task for each doc
        let task = new TaskObjectProvider(
          doc.data()['taskName'],
          doc.data()['timeDuration'],
          doc.data()['timeStart'],
          doc.data()['taskDescription'],
          doc.data()['requirement'],
          doc.data()['wantedSkills'],
          doc.data()['completed'],
          doc.data()['ownerUserId']
        );
        // console.log('task = ', task);

        self.tasks.push(task);
        //this.completedTasks.push(doc);
      });
    });


    // //creates example task
    // let task = new TaskObjectProvider( "Dumb As Dirt", 6.5,
    //   "1:00 pm, April 20th", "I am trying to do an experiment that involves " +
    //   "using dirts with different pH levels. On my first go, I couldn't get" +
    //   " the right pH levels, so I am looking for someone who could get dirt" +
    //   " with the right pH level.", "All you need to know is how to get the" +
    //   " right pH level in dirt.", this.skills, true, 'Franklin');

    // Load tasks into array

    //adds example task to list of tasks
    // this.tasks.push(task);

  }
    // Display Tasks in HTML




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
