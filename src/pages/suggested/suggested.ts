import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskObjectProvider} from '../../providers/task-object/task-object';
import {TaskViewPage} from '../task-view/task-view';
import * as algoliasearch from 'algoliasearch';
import { ProfileProvider } from '../../providers/profile/profile'
import * as firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
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
  suggestTasks = [];
  elimilateDup;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              ) 
              {
                console.log(this.curUserToken.uid);
                this.db.collection("users").doc(this.curUserToken.uid).get().then(doc=>{
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
                          if(!taskObject.completed)
                            this.suggestTasks.push(taskObject);
                        })
                      })
                    }
                  }
                });
                console.log("query skill is ", this.querySkill);
                for (const skill in this.querySkill)
                {
                  console.log('in suggest page, current skill is ', skill);

                }



              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestedPage');
    
  }

  //navigates to taskview page if task clicked
  taskClicked(event, task) {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });

  }

}
