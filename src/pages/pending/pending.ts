import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskViewPage } from '../task-view/task-view';
import { TaskObjectProvider } from '../../providers/task-object/task-object';
import { ProfileProvider } from '../../providers/profile/profile'
import * as firebase from 'firebase';


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

  AFcurUser = firebase.auth();
  curUserToken = this.AFcurUser.currentUser;
  CURRENT_USER = {} as ProfileProvider;
  db = firebase.firestore();
  noPendingTask = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams)
  {
    this.CURRENT_USER.pendingTask = [];
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingPage');
    this.getPendingList();
  }

  getPendingList()
  {
    console.log('in pending page user uid is ', this.curUserToken.uid);
    var docRef = this.db.collection('users').doc(this.curUserToken.uid).collection('pendingTask');
    docRef.get().then(doc=>{
      if(doc.empty)
      {
        console.log('no pending task');
        this.noPendingTask = true;
      }
      doc.forEach(sdoc=>{
        this.db.collection('users').doc(this.curUserToken.uid).collection('pendingTask').doc(sdoc.id).
          get().then(doc =>{  
            var taskRef = this.db.collection('tasks').doc(sdoc.id);
            taskRef.get().then(taskDoc =>{
                console.log('task doc is ',taskDoc.data());
                //create task and push into array
                //TODO change the following hard coding
                var task = new TaskObjectProvider(
                  taskDoc.data()['taskName'],
                  sdoc.id,
                  taskDoc.data()['duration'],
                  taskDoc.data()['startTime'],
                  taskDoc.data()['endTime'],
                  taskDoc.data()['taskDescription'],
                  taskDoc.data()['wantedSkill'],
                  taskDoc.data()['complete'],
                  taskDoc.data()['owner'],
                  taskDoc.data()['ownerUserId'],
                  taskDoc.data()['location']
                );
              this.CURRENT_USER.pendingTask.push(task);
            });
        })
      });
    });

    docRef = this.db.collection('users').doc(this.curUserToken.uid).collection('appliedTask');
    docRef.get().then(doc=>{
      if(doc.empty)
      {
        console.log('no pending task');
        this.noPendingTask = true;
      }
      doc.forEach(sdoc=>{
        this.db.collection('users').doc(this.curUserToken.uid).collection('appliedTask').doc(sdoc.id).
          get().then(doc =>{  
            var taskRef = this.db.collection('tasks').doc(sdoc.id);
            taskRef.get().then(taskDoc =>{
                console.log('task doc is ',taskDoc.data());
                //create task and push into array
                //TODO change the following hard coding
                var task = new TaskObjectProvider(
                  taskDoc.data()['taskName'],
                  sdoc.id,
                  taskDoc.data()['duration'],
                  taskDoc.data()['startTime'],
                  taskDoc.data()['endTime'],
                  taskDoc.data()['taskDescription'],
                  taskDoc.data()['wantedSkill'],
                  taskDoc.data()['complete'],
                  taskDoc.data()['owner'],
                  taskDoc.data()['ownerUserId'],
                  taskDoc.data()['location']
                );
              this.CURRENT_USER.pendingTask.push(task);
            });
        })
      });
    });

  }
  //navigates to the taskview page if task clicked
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }
}
