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
  noTasks = true;

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
    this.db.collection("users").doc(this.curUserToken.uid).collection('completedTask').get().then((completedTask)=> {
      completedTask.forEach((doc) => {
        console.log("owned task doc: ", doc.id);

        /** taskOwner Placeholder **/
        let taskOwner: string = 'Task Owner\'s Name';


        // Task id Retrieved, Find completed tasks
        this.db.collection("tasks").doc(doc.id).get().then((ownedTasks) => {

          /** store only completed tasks**/
          console.log('Complete: ', ownedTasks.data()['completed'] );
          if (ownedTasks.data()['completed'] == true) {
            //TODO Update firebase AND task-object AND user object fields to use camelCase with initial lower case
            var task = new TaskObjectProvider(
              ownedTasks.data()['taskName'],
              ownedTasks.data()['taskId'],
              ownedTasks.data()['duration'],
              ownedTasks.data()['startDate'],
              ownedTasks.data()['endDate'],
              ownedTasks.data()['taskDescription'],
              ownedTasks.data()['completed'],
              ownedTasks.data()['ownerName'],
              ownedTasks.data()['ownerUserId'],
              ownedTasks.data()['location']
            );
            this.noTasks = false;
            task.setCompensation(ownedTasks.data()['compensation']);
            task.setWantedSkill(ownedTasks.data()['wantedSkills']);
            task.setAppliedHelperList(ownedTasks.data()['appliedHelpers']);
            task.setAppliedHelpers(ownedTasks.data()['helpers']);
            task.setOwnerComment(ownedTasks.data()['ownerComment']);


            // Set owner
            if (typeof ownedTasks.data()['ownerName'] !== 'undefined') {
              task.setOwnerName(ownedTasks.data()['ownerName']);
            }

            //Set compensation
            if (typeof ownedTasks.data()['compensation'] !== 'undefined') {
              task.setCompensation(ownedTasks.data()['compensation']);
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
    this.navCtrl.push(TaskViewPage, {task: task});
    console.log('this is the task passed to the task-view controller', task);
  }

}
