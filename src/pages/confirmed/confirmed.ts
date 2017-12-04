import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskViewPage } from '../task-view/task-view';
import { TaskObjectProvider } from '../../providers/task-object/task-object';
import { ProfileProvider } from '../../providers/profile/profile'
import * as firebase from 'firebase';


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
  AFcurUser = firebase.auth();
  curUserToken = this.AFcurUser.currentUser;
  CURRENT_USER = {} as ProfileProvider;
  db = firebase.firestore();
  noConfirmedTask = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams)
  {
    this.CURRENT_USER.confirmedTask = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmedPage');
    this.getConfirmedList();
  }

  getConfirmedList()
  {
    console.log('in pending page user uid is ', this.curUserToken.uid);
    var docRef = this.db.collection('users').doc(this.curUserToken.uid).collection('confirmedTask');
    docRef.get().then(doc=>{
      if(doc.empty)
      {
        console.log('no comfirmed Task');
        this.noConfirmedTask = true;
      }
      doc.forEach(sdoc=>{
        this.db.collection('users').doc(this.curUserToken.uid).collection('confirmedTask').doc(sdoc.id).
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
              this.CURRENT_USER.confirmedTask.push(task);
            });
        })
      });
    });
  }
  //navigates to taskview page if task clicked
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }

}
