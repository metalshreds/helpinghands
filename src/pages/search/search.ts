import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as algoliasearch from 'algoliasearch';
import { ProfileProvider } from '../../providers/profile/profile'
import * as firebase from 'firebase';
import { TaskObjectProvider } from '../../providers/task-object/task-object';
import { ProfilePage } from '../profile/profile';
import { TaskViewPage } from '../task-view/task-view';
import { cloudProvider} from "../../providers/cloudbase";
import { ToastController} from 'ionic-angular';
import { AngularFireAuth} from "angularfire2/auth";


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  SearchResult = 'User';
  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6');
  userIndex = this.client.initIndex('users');
  userDup = [];
  taskDup = [];
  items;
  resultTasks;
  curUserToken = this.AFcurUser.auth.currentUser;
  /*
  / Search page:
  / normal search : search whole word:
  / advance search : (use a load/activesheet)
  /           1. search user only(toggle maybe)
  /           2. search task only
  /
  / ranking method:
  /           1. by time
  /           2. by rating
  /           3. by relavence (need figure out how to calculate it)
  /           4. by location (use google map api)
  */

  db = firebase.firestore();
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cloud: cloudProvider,
              private AFcurUser: AngularFireAuth,
              private toastCtrl: ToastController,) {
    this.initializeItems();
  }


    initializeItems() {
      this.items = [];
      this.resultTasks = [];
      this.userDup = [];
      this.taskDup = [];
    }


  getItems(ev) {
    //https://firebase.google.com/docs/firestore/solutions/search?authuser=2
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //     var query = val.trim();
    //     var index = this.client.initIndex('users');
    //     userIndex.search({query}).then(responses=>{
    //       console.log(responses.hits);
    //         for(const hit in responses.hits){
    //               this.items.push(responses.hits[hit]);
    //               console.log(responses.hits[hit]);
    //         }
    //     })
    // }

    if (val && val.trim() != '')
    {
      var query = val.trim();
      //use cloudbase query
      query = query.charAt(0).toUpperCase()+query.slice(1); //capitalize first letter to match the key in database
      this.db.collection('users').where('skills.'+query, '==', true ).get()
        .then((doc)=>{
          doc.forEach(sdoc=>{
            if(this.userDup.indexOf(sdoc.id) < 0)
            {
              console.log("search is ", sdoc.data());
              var CURRENT_USER = {} as ProfileProvider;
              var displaySkill  = [];
              for(const field in sdoc.data())
              {
                CURRENT_USER[field] = sdoc.data()[field];
              }
              CURRENT_USER['skillset'] = "";
              for (const i in CURRENT_USER.skills)
              {
                if (CURRENT_USER.skills[i] == true)
                {
                  CURRENT_USER['skillset'] += " ";
                  CURRENT_USER['skillset'] += i;
                  CURRENT_USER['skillset'] += ",";
                }
              }
              CURRENT_USER['skillset'].replace(/.$/,".");
              //CURRENT_USER['skillset'] = displaySkill;  //tmp fix
              CURRENT_USER['userId'] = sdoc.id;  //tmp fix
              console.log("skillset is ", CURRENT_USER['skillset']);
              this.items.push(CURRENT_USER);     
            }
          })  
        })
      //use algolia query do whole word search on user
      //TODO: need to parse skill map to skill array
      var index = this.client.initIndex('users');
      index.search({query}).then(responses=>{
        console.log("algolia", responses.hits);
          for(const hit in responses.hits){
            if(this.userDup.indexOf(responses.hits[hit].userId) < 0)
            {
              var CURRENT_USER = {} as ProfileProvider;
              CURRENT_USER = responses.hits[hit];
              CURRENT_USER['skillset'] = "";
              for (const i in CURRENT_USER.skills)
              {
                if (CURRENT_USER.skills[i] == true)
                {
                  CURRENT_USER['skillset'] += " ";
                  CURRENT_USER['skillset'] += i;
                  CURRENT_USER['skillset'] += ",";
                }
              }
              CURRENT_USER['skillset'].replace(/.$/,".");
              this.items.push(CURRENT_USER);
              console.log("this", CURRENT_USER);
            }
          }
      })

      //do task search query with skill
      this.db.collection('tasks').where('wantedSkills.'+query, '==', true ).get()
      .then(doc=>{
        doc.forEach(sdoc=>{
          if(this.taskDup.indexOf(sdoc.id) < 0)
          {  
            var skill = [];
            let taskObject = new TaskObjectProvider(
              sdoc.data()['taskName'],
              sdoc.data()['taskId'],
              sdoc.data()['duration'],
              sdoc.data()['startDate'],
              sdoc.data()['endDate'],
              sdoc.data()['taskDescription'],
              sdoc.data()['completed'],
              sdoc.data()['ownerName'],
              sdoc.data()['ownerUserId'],
              sdoc.data()['location'],
            );
            taskObject.invitedUser = [];
            taskObject.setCompensation(sdoc.data()['compensation']);
            taskObject.setWantedSkill(sdoc.data()['wantedSkills']);
            //put keys of wantedSkills map in a array for display purpose
            taskObject['skillset'] = '';
            for (const i in taskObject.wantedSkills)
            {
              if (taskObject.wantedSkills[i] == true)
              {
                taskObject['skillset'] += " ";
                taskObject['skillset'] += i;
                taskObject['skillset'] += ",";
              }
            }
            //taskObject.setWantedSkill(sdoc.data()['wantedSkills']);
            taskObject['skillset'].replace(/.$/,".");
            this.db.collection("tasks").doc(taskObject.taskId).collection('invitedUser').onSnapshot(snapDoc=>{
              if(!snapDoc.empty)
              {
                snapDoc.docs.forEach(user=>
                {
                  taskObject.invitedUser.push(user.id);
                })
              }
            });
            //push in result array if this task is not completed
            if(!taskObject.completed)
              this.resultTasks.push(taskObject);
            console.log("firebase -> ", taskObject);
          }
         
        })
      })
      //do whole word search on task
      var index = this.client.initIndex('tasks');
      index.search({query}).then(responses=>{
        console.log("algolia", responses.hits);
          for(const hit in responses.hits){
            if(this.taskDup.indexOf(responses.hits[hit].taskId) < 0)
            {
                if(!responses.hits[hit].completed)
                {    
                  let taskObject = new TaskObjectProvider(
                    responses.hits[hit]['taskName'],
                    responses.hits[hit]['taskId'],
                    responses.hits[hit]['duration'],
                    responses.hits[hit]['startDate'],
                    responses.hits[hit]['endDate'],
                    responses.hits[hit]['taskDescription'],
                    responses.hits[hit]['completed'],
                    responses.hits[hit]['ownerName'],
                    responses.hits[hit]['ownerUserId'],
                    responses.hits[hit]['location'],
                  );
                  taskObject.invitedUser = [];
                  taskObject.setCompensation(responses.hits[hit]['compensation']);
                  taskObject.setWantedSkill(responses.hits[hit]['wantedSkills']);
                  
                  //put keys of wantedSkills map in a array for display purpose
                  taskObject['skillset'] = '';
                  for (const i in taskObject.wantedSkills)
                  {
                    if (taskObject.wantedSkills[i] == true)
                    {
                      taskObject['skillset'] += " ";
                      taskObject['skillset'] += i;
                      taskObject['skillset'] += ",";
                    }
                  }
                  //taskObject.setWantedSkill(sdoc.data()['wantedSkills']);
                  taskObject['skillset'].replace(/.$/,".");
                  this.db.collection("tasks").doc(taskObject.taskId).collection('invitedUser').onSnapshot(snapDoc=>{
                    if(!snapDoc.empty)
                    {
                      snapDoc.docs.forEach(user=>
                      {
                        taskObject.invitedUser.push(user.id);
                      })
                    }
                  });
                 // taskObject.setWantedSkill(responses.hits[hit]['wantedSkills']);
                  taskObject['skillset'].replace(/.$/,".");
                     this.resultTasks.push(taskObject);
                  console.log("algori -> ", taskObject);
                }
                
            }
          }
      })
    }

  }

  userClicked(userId)
  {
    this.navCtrl.push(ProfilePage, {
      userId: userId
    });
  }

  
  taskClicked(task)
  {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });
  }
  messegeUser(userId)
  {

  }
  viewProfile(userId)
  {
    this.navCtrl.push(ProfilePage, {
      userId: userId
    });
  }
  requestTask(task)
  {
        //add task id to user's list of pending tasks.
        //this.cloud.addTaskToList(this.curUserToken.uid, 'appliedTask', task.taskId, task.taskName);
        let name = this.curUserToken.displayName.split(" ");
        console.log("name is ", name);
            //add user id to appliedhelper list of the task
        //this.cloud.addUserToTaskList(task.taskId, 'appliedHelpers', this.curUserToken.uid, firstName, CURRENT_USER.lastName);
  }
  viewDtail(task)
  {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
