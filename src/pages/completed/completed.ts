import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskObjectProvider} from "../../providers/task-object/task-object";
import { TaskViewPage} from "../task-view/task-view";
import { AngularFireDatabase } from "angularfire2/database";
import { ProfileProvider} from "../../providers/profile/profile";
import firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import { cloudProvider } from '../../providers/cloudbase';
import {isDefined, noUndefined} from "@angular/compiler/src/util";
import {isNullOrUndefined} from "util";


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

  // ownedTasks: Array<string> = [];
  completedTasks: Array<TaskObjectProvider> = [];
  skills: Array<boolean>;
  curUserToken = this.AFcurUser.auth.currentUser;
  CURRENT_USER = {} as ProfileProvider;
  db = firebase.firestore();

  taskOwnerDict = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private AFdatabase: AngularFireDatabase,
              public AFcurUser: AngularFireAuth,
  ) {
      // Wait for view to load to generate list of tasks
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
    this.loadCompletedTasks();
  }

  loadCompletedTasks(){

    /** Get list of owned tasks from user  **/
    this.db.collection("users").doc(this.curUserToken.uid).collection('ownedTask').get().then((ownedTasks)=> {
      ownedTasks.forEach((doc) => {
        console.log("owned task doc: ", doc.id);

        /** taskOwner Placeholder **/
        let taskOwner: string = 'Task Owner\'s Name';


        // Task id Retrieved, Find completed tasks
        this.db.collection("tasks").doc(doc.id).get().then((ownedTasks) => {

          /** store only completed tasks**/
          console.log('Complete: ', ownedTasks.data()['Complete'] );
          if (ownedTasks.data()['Complete'] == true) {
            //TODO Update firebase AND task-object AND user object fields to use camelCase with initial lower case
            let task = new TaskObjectProvider(
              ownedTasks.data()['taskName'],
              ownedTasks.data()['taskId'],
              ownedTasks.data()['timeDuration'],
              ownedTasks.data()['timeStart'],
              ownedTasks.data()['timeEnd'],
              ownedTasks.data()['taskDescription'],
              ownedTasks.data()['wantedSkills'],
              ownedTasks.data()['completed'],
              ownedTasks.data()['owner'],
              ownedTasks.data()['ownerUserId'],
              ownedTasks.data()['location']
            );

            task.setTaskId(ownedTasks.data()['taskId']);

            // Set owner
            if (typeof ownedTasks.data()['ownerName'] !== 'undefined') {
              task.setOwnerName(ownedTasks.data()['ownerName']);
            }

            this.completedTasks.push(task);
            console.log('completed task added: ', task);

          } //End of IF statement ownedTasks.complete
        }).catch(function (error) { // catch error getting tasks
          console.log("Error getting document:", error);
          taskOwner = error;
        });
      }); //END ownedTask.ForEach
    }); //END .then
  } // END of loadCompletedTasks


  //navigates to taskview page if task clicked
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }

}
