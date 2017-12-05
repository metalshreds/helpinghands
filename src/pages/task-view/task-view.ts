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
  appliedHelpers = [];
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
    if(this.userIsTaskOwner)
    {
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
                var skill = [];
                var userObject = new ProfileProvider(
                  user.data()['lastName'],
                  user.data()['firstName'],
                  user.data()['userId'],
                  user.data()['email'],
                  user.data()['introduction'],
                  user.data()['skills'],
                  user.data()['zipCode'],
                  user.data()['phone'],
                  user.data()['travelRadius'],
                  user.data()['taskCount']
                );
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
                  console.log("pushing user: " + userObject.firstName);
                  this.suggestedUsers.push(userObject);
                }
              })
            })
        }
      }
    });
    }


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


    //TODO change this to observer.
    console.log("RIGHT BEFORE APPLIED HELPERS");
    var docRef = this.db.collection('tasks').doc(this.selectedTask.taskId).collection('appliedHelpers');
    docRef.get().then(doc=>{
      doc.forEach(sdoc=>{
        this.db.collection('users').doc(this.selectedTask.taskId).collection('appliedHelpers').doc(sdoc.id).
        get().then(doc =>{
          console.log("this is (applied helpers) ", this.selectedTask.appliedHelpers);
          //TODO
          var userRef = this.db.collection('users').doc(sdoc.id);
          userRef.get().then(userDoc =>{
            console.log('task doc is ',userDoc.data());
            //create task and push into array
            //TODO change the following hard coding
            var user = new ProfileProvider(
              userDoc.data()['lastName'],
              userDoc.data()['firstName'],
              userDoc.data()['userId'],
              userDoc.data()['email'],
              userDoc.data()['introduction'],
              userDoc.data()['skills'],
              userDoc.data()['zipCode'],
              userDoc.data()['phone'],
              userDoc.data()['travelRadius'],
              userDoc.data()['taskCount']
            );
            for(const field in userDoc.data())
            {
              user[field] = userDoc.data()[field];
            }
            this.appliedHelpers.push(user);
          });
        })
      });
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

  requestUserClicked(event, user){
    console.log("USER IN REQUEST IS: " + user);
    console.log("user id is: " + user.userId);
    this.cloud.addTaskToList(user.userId.toString(), 'invitedTask', this.selectedTask.taskId.toString(), this.selectedTask.taskName);
    //this.cloud.addTaskToList(this.CURRENT_USER.userId.toString(), 'invitedTask', this.selectedTask.taskId.toString(), this.selectedTask.taskName);
    alert(user.firstName + " " + user.lastName + " Requested");
  }

  acceptAppliedHelper(event, helper){
    this.cloud.removeUserFromTasklist(this.selectedTask.taskId.toString(), 'appliedHelpers', helper.userId.toString());
    this.cloud.removeTaskFromUser(helper.userId.toString(), 'appliedTask',this.selectedTask.taskId.toString());


    this.cloud.addUserToTaskList(this.selectedTask.taskId.toString(), 'helpers', helper.userId, helper.firstName, helper.lastName);
    this.cloud.addTaskToList(helper.userId.toString(), 'confirmedTask', this.selectedTask.taskId.toString(), this.selectedTask.taskName);
    //we want to add this task to current_user's confirm list?
    this.cloud.addTaskToList(this.CURRENT_USER.userId.toString(), 'confirmedTask', this.selectedTask.taskId.toString(), this.selectedTask.taskName);
    alert(helper.firstName + " " + helper.lastName +" Accepted");
  }

  rejectAppliedHelper(event, helper){
    this.cloud.removeUserFromTasklist(this.selectedTask.taskId.toString(), 'appliedHelpers', helper.userId.toString());
    this.cloud.removeTaskFromUser(helper.userId.toString(), 'appliedTask',this.selectedTask.taskId.toString());
    alert(helper.firstName + " " + helper.lastName + " Rejected");
  }
}
