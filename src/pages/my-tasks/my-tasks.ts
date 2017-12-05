import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskObjectProvider } from "../../providers/task-object/task-object";
import { TaskViewPage } from "../task-view/task-view";
import firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-my-tasks',
  templateUrl: 'my-tasks.html',
})
export class MyTasksPage {
  myTasks: TaskObjectProvider[] = [];
  curUserToken = this.AFcurUser.auth.currentUser;
  db = firebase.firestore();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public AFcurUser: AngularFireAuth,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTasksPage');
    this.loadMyTasks();
  }

  loadMyTasks(){
    console.log("I'm loading up");
    /** Get list of owned tasks from user  **/
    this.db.collection("users").doc(this.curUserToken.uid).collection('ownedTask').get().then((ownedTasks)=> {
      ownedTasks.forEach((doc) => {
        console.log("owned task doc: ", doc.id);

        /** taskOwner Placeholder **/
        let taskOwner: string = 'Task Owner\'s Name';


        // Task id Retrieved, Find completed tasks
        this.db.collection("tasks").doc(doc.id).get().then((ownedTasks) => {

          /** store only completed tasks**/
          console.log('Complete: ', ownedTasks.data()['completed'] );
          if (ownedTasks.data()['completed'] == false) {
            //TODO Update firebase AND task-object AND user object fields to use camelCase with initial lower case
            let task = new TaskObjectProvider(
              ownedTasks.data()['taskName'],
              ownedTasks.data()['taskId'],
              ownedTasks.data()['duration'],
              ownedTasks.data()['startDate'],
              ownedTasks.data()['endDate'],
              ownedTasks.data()['taskDescription'],
              ownedTasks.data()['completed'],
              ownedTasks.data()['ownerUserId'],
              ownedTasks.data()['ownerName'],
              ownedTasks.data()['location'],
            );

            task.setTaskId(ownedTasks.data()['taskId']);

            // Set owner
            if (typeof ownedTasks.data()['ownerName'] !== 'undefined') {
              task.setOwnerName(ownedTasks.data()['ownerName']);
            }

            this.myTasks.push(task);
            console.log('completed task added: ', task);

          } //End of IF statement ownedTasks.complete
        }).catch(function (error) { // catch error getting tasks
          console.log("Error getting document:", error);
          taskOwner = error;
        });
      }); //END ownedTask.ForEach
    }); //END .then
  } // END of loadMyTasks

  taskClicked(task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });
  }
}
