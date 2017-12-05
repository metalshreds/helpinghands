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
  eliminateDup = [];
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
    this.CURRENT_USER.pendingTask = [];
    var query = this.db.collection('users').doc(this.curUserToken.uid).collection('confirmedTask')
    var observer = query.onSnapshot(querySnapshot=>
    {
      console.log('on pending observer1 ', querySnapshot);
      for(const i in querySnapshot.docs)
      {
        console.log('on pending observer2 ', querySnapshot.docs[i].id);
        console.log('on pending observer2 ', querySnapshot.docs[i].data());
        if(this.eliminateDup.indexOf(querySnapshot.docs[i].id) < 0)
        {
          var taskRef = this.db.collection('tasks').doc(querySnapshot.docs[i].id);
          taskRef.get().then(taskDoc =>{
              if(!taskDoc.exists)
              {
                console.log('in confirm.ts/reading doc from confirmedTask failed');
              }
              else
              {
                console.log('task doc is ',taskDoc.data());
                //create task and push into array
                //TODO change the following hard coding
                var task = new TaskObjectProvider(
                  taskDoc.data()['taskName'],
                  taskDoc.data()['taskId'],
                  taskDoc.data()['duration'],
                  taskDoc.data()['startTime'],
                  taskDoc.data()['endTime'],
                  taskDoc.data()['taskDescription'],
                  taskDoc.data()['complete'],
                  taskDoc.data()['ownerName'],
                  taskDoc.data()['ownerUserId'],
                  taskDoc.data()['location']
                );      
                task.setWantedSkill(taskDoc.data()['wantedSkills']);
                task.setAppliedHelperList(taskDoc.data()['appliedHelpers']);
                task.setAppliedHelpers(taskDoc.data()['helpers']);
                task.setOwnerComment(taskDoc.data()['owerComment']);
              this.CURRENT_USER.confirmedTask.push(task);
              this.eliminateDup.push(task.taskId);
              if(this.eliminateDup.length != 0)
              {
                this.noConfirmedTask = false;
              }
              else{
                this.noConfirmedTask = true;
              }
            }
          });
        }
      }
    });

  }
  //navigates to taskview page if task clicked
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }

}
