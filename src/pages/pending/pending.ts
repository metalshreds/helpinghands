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
  noPendingTask = true;
  eliminateDup = [];   //acts like a map

  //TODO handle cases that eliminates
  //when click into a task that I applied, the request button shouldn't be there.
  constructor(public navCtrl: NavController,
              public navParams: NavParams)
  {
    this.CURRENT_USER.invitedTask = [];
    this.CURRENT_USER.appliedTask = [];
    var query = this.db.collection('users').doc(this.curUserToken.uid).collection('appliedTask')
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
                console.log('in pending.ts/reading doc from appliedTask failed');
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
              this.CURRENT_USER.appliedTask.push(task);
              this.eliminateDup.push(task.taskId);
              if(this.eliminateDup.length != 0)
              {
                this.noPendingTask = false;
              }
              else{
                this.noPendingTask = true;
              }
              }
          });
        }
      }
    });

    var invitedQuery = this.db.collection('users').doc(this.curUserToken.uid).collection('invitedTask')
    var invObserver = invitedQuery.onSnapshot(querySnapshot=>
    {
      for(const i in querySnapshot.docs)
      {
        if(this.eliminateDup.indexOf(querySnapshot.docs[i].id) < 0)
        {
          var taskRef = this.db.collection('tasks').doc(querySnapshot.docs[i].id);
          taskRef.get().then(taskDoc =>{
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
            this.CURRENT_USER.invitedTask.push(task);
            this.eliminateDup.push(task.taskId);
            if(this.eliminateDup.length != 0)
            {
              this.noPendingTask = false;
            }
            else{
              this.noPendingTask = true;
            }
          });
        }
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingPage');
  }

  //navigates to the taskview page if task clicked
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }
}
