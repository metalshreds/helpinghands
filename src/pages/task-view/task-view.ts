import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, AlertController, App, LoadingController } from 'ionic-angular';
import {TaskEditPage} from "../task-edit/task-edit";
import {ProfilePage} from "../profile/profile";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {ProfileProvider} from "../../providers/profile/profile";
import firebase from 'firebase';
import {TaskObjectProvider} from "../../providers/task-object/task-object";
import { cloudProvider } from "../../providers/cloudbase";
/**
 * Generated class for the TaskViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-view',
  templateUrl: 'task-view.html'
})
export class TaskViewPage {
  elimilateDup = [];
  requestedUsers = {};
  suggestedUsers = [];
  querySkill = [];
  curUserToken = this.AFcurUser.auth.currentUser;
  selectedTask: TaskObjectProvider;
  CURRENT_USER = {} as ProfileProvider;
  TASK_OWNER = {} as ProfileProvider;
  userIsTaskOwner = false;
  showEditButton = false;
  showRequestButton = false;
  db = firebase.firestore();
  owner_user_id = this.curUserToken.uid; //todo change this

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private AFcurUser: AngularFireAuth,
    public app: App,
    public cloud : cloudProvider,
  ) {
    this.selectedTask = navParams.get('task');

    //TODO is this the correct way to check if they are the same user?
    this.userIsTaskOwner = (this.selectedTask.ownerUserId == this.curUserToken.uid)

    //TODO trying to get suggetsed users list
    this.db.collection("users").doc(this.curUserToken.uid).get().then(doc=>{
      console.log('in suggst page user doc is ', doc.data());
      for(const field in doc.data())
      {
        console.log("Current user: " + field + " = " + doc.data()[field]);
        this.CURRENT_USER[field] = doc.data()[field];
      }
      console.log("after first for loop!");
      for(const skill in this.selectedTask.wantedSkills){
        console.log("skill: " + skill);
      }
      for (const i in this.selectedTask.wantedSkills)
      {
        console.log("in second for, const in wantd skills is: " + i);
        if (this.selectedTask.wantedSkills[i] == true)
        {
          console.log("wanted skill was true! in if");
          this.querySkill.push(i);
          this.db.collection('users').where('skills.'+i, '==', true).get()
            .then(doc=>{
              doc.forEach(user =>{
                console.log("@@@@@@@@@@@@@@IN WHERE I NEED TO BE");
                var userObject = {} as ProfileProvider;
                var skill = [];
                for(const field in user.data())
                {
                  userObject[field] = user.data()[field];
                }
                //put keys of wantedSkills map in a array for display purpose
                for (const i in userObject.skills)
                {
                  if (userObject.skills[i] == true)
                    skill.push(i);
                }
                userObject['skillSet'] = skill;
                //push in result array if this task is not completed
                if(this.elimilateDup.indexOf(userObject.userId) < 0
                  && (userObject.userId != this.curUserToken.uid) )
                {
                  this.elimilateDup.push(userObject.userId);
                  this.suggestedUsers.push(userObject);
                }
              })
            })
        }
      }
    });

    var taskOwnerRef = this.db.collection('users').doc(this.selectedTask.ownerUserId.toString());
    taskOwnerRef.get().then(doc=>{
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        for(const field in doc.data())
        {
          //have to be careful that we have to store exactly same property
          //  in userProvider obeject and users node.
          this.TASK_OWNER[field] = doc.data()[field];
          console.log('Task owner:  field =  '+ field + "and value = "  + this.TASK_OWNER[field]);

        }
      }
    }).catch(err => {
      console.log('Error getting document', err);
    });
    this.setButtons();
  }

  setButtons(){
    if(this.selectedTask.completed){
      this.showEditButton = false;
      this.showRequestButton = false;
    }else{
      this.showEditButton = this.userIsTaskOwner;
      this.showRequestButton = !this.userIsTaskOwner;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskViewPage');
  }

  editTaskClicked(event, selectedTaskID){
    this.navCtrl.push(TaskEditPage, {
      taskId: selectedTaskID
    });
  }

  userClicked(event, userid){
    this.navCtrl.push(ProfilePage, {
      userId: userid
    });
  }

  //TODO move task to curr users pending and what for task owner?
  requestTaskClicked(event, selectedTaskId){
    alert("Task Requested");

    //add task id to user's list of pending tasks.
    this.cloud.addTaskToList(this.curUserToken.uid, 'appliedTask', selectedTaskId, this.selectedTask.taskName);

    //add user id to appliedhelper list of the task
    this.cloud.addUserToTaskList(selectedTaskId, 'appliedHelpers', this.curUserToken.uid, this.CURRENT_USER.firstName, this.CURRENT_USER.lastName);
  }

  //TODO what to do if task owner clicks a user?
  suggestedUserClicked(event, user){
    //add task id to user's pending
  }

  appliedHelperClicked(event, helper){
    this.navCtrl.push(ProfilePage, {
      userId: helper
    });
  }
}
