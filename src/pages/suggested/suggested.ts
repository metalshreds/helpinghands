import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskObjectProvider} from '../../providers/task-object/task-object';
import {TaskViewPage} from '../task-view/task-view';
import { ProfileProvider } from '../../providers/profile/profile'
import * as firebase from 'firebase';

/**
 * Generated class for the SuggestedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suggested',
  templateUrl: 'suggested.html',
})
export class SuggestedPage {
  AFcurUser = firebase.auth();
  curUserToken = this.AFcurUser.currentUser;
  CURRENT_USER = {} as ProfileProvider;
  db = firebase.firestore();
  querySkill = [];
  suggestedTasks = [];
  elimilateDup = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              )
              {

              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestedPage');
    this.getSuggestTask();
  }
  getSuggestTask()
  {
    console.log(this.curUserToken.uid);
    this.db.collection("users").doc(this.curUserToken.uid).get().then(doc=>{
      console.log('in suggst page user doc is ', doc.data());
      for(const field in doc.data())
      {
        this.CURRENT_USER[field] = doc.data()[field];
      }
      for (const i in this.CURRENT_USER.skills)
      {
        if (this.CURRENT_USER.skills[i] == true)
        {
          this.querySkill.push(i);
          this.db.collection('tasks').where('wantedSkills.'+i, '==', true).get()
          .then(doc=>{
            doc.forEach(task =>{
              var taskObject = {} as TaskObjectProvider;
              var skill = [];
              for(const field in task.data())
              {
                taskObject[field] = task.data()[field];
              }
              //put keys of wantedSkills map in a array for display purpose
              for (const i in taskObject.wantedSkills)
              {
                if (taskObject.wantedSkills[i] == true)
                    skill.push(i);
              }
              taskObject['skillSet'] = skill;
              //push in result array if this task is not completed
              if(!taskObject.completed && this.elimilateDup.indexOf(taskObject.taskId) < 0
                  && (taskObject.ownerUserId != this.curUserToken.uid) )
              {
                this.elimilateDup.push(taskObject.taskId);
                this.suggestedTasks.push(taskObject);
              }
            })
          })
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
