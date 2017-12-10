import {Component} from '@angular/core';
import {
  IonicPage, NavController, NavParams,
  Platform, ActionSheetController, AlertController, App, LoadingController
} from 'ionic-angular';
import { TaskEditPage} from "../task-edit/task-edit";
import { ProfilePage} from "../profile/profile";
import { AngularFireAuth} from "angularfire2/auth";
import { AngularFireDatabase} from "angularfire2/database";
import { ProfileProvider} from "../../providers/profile/profile";
import firebase from 'firebase';
import { TaskObjectProvider} from "../../providers/task-object/task-object";
import { cloudProvider} from "../../providers/cloudbase";
import { ToastController} from 'ionic-angular';
import { PendingPage} from "../pending/pending";

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
  taskIsConfirmed = false;
  confirmedTasks:  TaskObjectProvider[] = [];
  showHelpers = false;
  db = firebase.firestore();
  skillsNeeded = [];
  owner_user_id = this.curUserToken.uid; //todo change this
  helpers = [];
  personIsInvitee = false;
  showAcceptDeclineButtons = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private AFcurUser: AngularFireAuth,
              public app: App,
              public cloud: cloudProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

    this.selectedTask = navParams.get('task');
    this.confirmedTasks = navParams.get("confirmedTasks");
    console.log("CONFIRMED TASKS ARE: " + this.confirmedTasks);
    if(typeof this.confirmedTasks != 'undefined'){
      for(const i in this.confirmedTasks){
        console.log("CONFIRMED TASKS AT " + i + " is " + this.confirmedTasks[i].taskName);
        if(this.confirmedTasks[i].taskId == this.selectedTask.taskId){
          this.taskIsConfirmed = true;
        }
      }
    }
    console.log("this is the task", this.selectedTask);
    this.userIsTaskOwner = (this.selectedTask.ownerUserId == this.curUserToken.uid);

    for (const skill in this.selectedTask.wantedSkills) {
      if (this.selectedTask.wantedSkills[skill]) {
        this.skillsNeeded.push(skill);
      }
    }

    /** check if user viewing task is task invitee **/
    console.log('getting invited array from task if any, ', this.selectedTask.taskId);
    this.db.collection('tasks').doc(this.selectedTask.taskId).collection('invitedUser').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('pushed this doc',doc.id, " with data => ", doc.data());
        console.log('curUserToken.uid: ', this.curUserToken.uid, 'doc.id', doc.id);
        if(this.curUserToken.uid == doc.id && !this.taskIsConfirmed){
          this.personIsInvitee = true;
          console.log('HEY EVERYONE!!! THIS GUY IS THE INVITEE FOR THIS TASK, see nobody cares');
          this.setButtons();
        }
        this.helpers.push(doc.id);
      });
    }).catch(function(error) {
      console.log("Error getting helpers of task: ", error);
    });

    //TODO is this the correct way to check if they are the same user?
    console.log('1', this.selectedTask.ownerUserId);
    console.log('2', this.curUserToken.uid);
    this.userIsTaskOwner = (this.selectedTask.ownerUserId == this.curUserToken.uid);
    if (this.userIsTaskOwner && !this.selectedTask.completed && !this.taskIsConfirmed) {
      //TODO trying to get suggetsed users list
      this.db.collection("users").doc(this.curUserToken.uid).get().then(doc=> {
        console.log('in suggst page user doc is ', doc.data());
        for (const field in doc.data()) {
          console.log("Current user: " + field + " = " + doc.data()[field]);
          this.CURRENT_USER[field] = doc.data()[field];
        }
        console.log("after first for loop!");
        console.log('current task is ', this.selectedTask);
        for (const skill in this.selectedTask.wantedSkills) {
          console.log("skill: " + skill);
        }
        for (const i in this.selectedTask.wantedSkills) {
          console.log("in second for, const in wanted skills is: " + i);
          if (this.selectedTask.wantedSkills[i] == true) {
            console.log("wanted skill was true! in if");
            this.querySkill.push(i);
            this.db.collection('users').where('skills.' + i, '==', true).get()
              .then(doc=> {
                doc.forEach(user => {
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
                    user.data()['taskCount'],
                    user.data()['photoUrl'],
                    user.data()['isHelper']
                  );
                  //put keys of wantedSkills map in a array for display purpose
                  for (const i in userObject.skills) {
                    if (userObject.skills[i] == true)
                      skill.push(i);
                  }
                  userObject['skillSet'] = skill;
                  //push in result array if this task is not completed
                  if (this.elimilateDup.indexOf(userObject.userId) < 0
                    && (userObject.userId != this.curUserToken.uid) && this.selectedTask.invitedUser.indexOf(userObject.userId) < 0) {
                    this.elimilateDup.push(userObject.userId);
                    console.log("pushing user: " + userObject.firstName);
                    this.suggestedUsers.push(userObject);
                  }
                });
              })
          }
        }
      });
    }

    console.log("right before getting task owner");

    var taskOwnerRef = this.db.collection('users').doc(this.selectedTask.ownerUserId.toString());
    taskOwnerRef.get().then(doc=> {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        for (const field in doc.data()) {
          //have to be careful that we have to store exactly same property
          //  in userProvider obeject and users node.
          this.TASK_OWNER[field] = doc.data()[field];
          console.log('Task owner:  field =  ' + field + "and value = " + this.TASK_OWNER[field]);

        }
      }
    }).catch(err => {
      console.log('Error getting document', err);
    });


    console.log("RIGHT BEFORE APPLIED HELPERS");
    var docRef = this.db.collection('tasks').doc(this.selectedTask.taskId).collection('appliedHelpers');
    docRef.get().then(doc=> {
      doc.forEach(sdoc=> {
        this.db.collection('users').doc(this.selectedTask.taskId).collection('appliedHelpers').doc(sdoc.id).get().then(doc => {
          console.log("this is (applied helpers) ", this.selectedTask.appliedHelpers);
          //TODO
          var userRef = this.db.collection('users').doc(sdoc.id);
          userRef.get().then(userDoc => {
            console.log('task doc is ', userDoc.data());
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
              userDoc.data()['taskCount'],
              userDoc.data()['photoUrl'],
              userDoc.data()['isHelper']
            );
            for (const field in userDoc.data()) {
              user[field] = userDoc.data()[field];
            }
            this.appliedHelpers.push(user);
          });
        })
      });
    });

    console.log("right before set buttons");
    this.setButtons();
  }

  setButtons() {
    console.log('personIsThisTasksHelper: ', this.personIsInvitee);
    if(this.personIsInvitee){
      this.showRequestButton = false;
      this.showAcceptDeclineButtons=true;
      this.showEditButton = false;
    }else if (this.selectedTask.completed) {
      this.showEditButton = false;
      this.showRequestButton = false;
    }else if(this.taskIsConfirmed){
      this.showEditButton = this.userIsTaskOwner;
      this.showRequestButton = false;
    }
     else {
      this.showEditButton = this.userIsTaskOwner;
      this.showRequestButton = !this.userIsTaskOwner;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskViewPage');
  }

  editTaskClicked(event, selectedTaskID) {
    this.navCtrl.push(TaskEditPage, {
      taskId: selectedTaskID
    });
  }

  userClicked(event, userid) {
    this.navCtrl.push(ProfilePage, {
      userId: userid
    });
  }

  //TODO move task to curr users pending and what for task owner?
  requestTaskClicked(event, selectedTaskId) {
    alert("Task Requested");

    //add task id to user's list of pending tasks.
    this.cloud.addTaskToList(this.curUserToken.uid, 'appliedTask', selectedTaskId, this.selectedTask.taskName);

    //add user id to appliedhelper list of the task
    this.cloud.addUserToTaskList(selectedTaskId, 'appliedHelpers', this.curUserToken.uid, this.CURRENT_USER.firstName, this.CURRENT_USER.lastName);
  }

  requestUserClicked(event, user) {
    console.log("USER IN REQUEST IS: " + user);
    console.log("user id is: " + user.userId);
    this.cloud.addTaskToList(user.userId.toString(), 'invitedTask', this.selectedTask.taskId.toString(), this.selectedTask.taskName);
    this.cloud.addUserToTaskList(this.selectedTask.taskId, 'invitedUser', user.userId, user.firstName, user.lastName);
    //this.cloud.addTaskToList(this.CURRENT_USER.userId.toString(), 'invitedTask', this.selectedTask.taskId.toString(), this.selectedTask.taskName);
    for (const i in this.suggestedUsers) {
      if (user.userId == this.suggestedUsers[i].userId) {
        this.suggestedUsers.splice(Number(i), 1);
      }
    }
    const toast = this.toastCtrl.create({
      message: user.firstName + " " + user.lastName + " has been Requested",
      position: 'middle',
      duration: 1500
    });
    toast.present();
  }

  acceptAppliedHelper(event, helper) {
    this.cloud.removeUserFromTasklist(this.selectedTask.taskId, 'appliedHelpers', helper.userId);
    this.cloud.removeTaskFromUser(helper.userId, 'appliedTask', this.selectedTask.taskId);


    this.cloud.addUserToTaskList(this.selectedTask.taskId, 'helpers', helper.userId, helper.firstName, helper.lastName);
    this.cloud.addTaskToList(helper.userId, 'confirmedTask', this.selectedTask.taskId, this.selectedTask.taskName);
    //we want to add this task to current_user's confirm list?
    this.cloud.addTaskToList(this.CURRENT_USER.userId.toString(), 'confirmedTask', this.selectedTask.taskId.toString(), this.selectedTask.taskName);
    for (const i in this.appliedHelpers) {
      if (helper.userId == this.appliedHelpers[i].userId) {
        this.appliedHelpers.splice(Number(i), 1);
      }
    }
    const toast = this.toastCtrl.create({
      message: helper.firstName + " " + helper.lastName + " has been Accepted",
      position: 'middle',
      duration: 1500
    });
    toast.present();
  }

  rejectAppliedHelper(event, helper) {
    this.cloud.removeUserFromTasklist(this.selectedTask.taskId.toString(), 'appliedHelpers', helper.userId.toString());
    this.cloud.removeTaskFromUser(helper.userId.toString(), 'appliedTask', this.selectedTask.taskId.toString());
    for (const i in this.appliedHelpers) {
      if (helper.userId == this.appliedHelpers[i].userId) {
        this.appliedHelpers.splice(Number(i), 1);
      }
    }
    const toast = this.toastCtrl.create({
      message: helper.firstName + " " + helper.lastName + " has been Rejected",
      position: 'middle',
      duration: 1500
    });
    toast.present();
  }

  doPrompt(event, task) {
    let prompt = this.alertCtrl.create({
      title: 'Send a message',
      message: "Enter the reason for cancelling",
      inputs: [
        {
          name: 'Ex: I don\'t have time..',
          placeholder: 'Ex: I don\'t have time..'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Saved clicked');
            this.cloud.removeUserFromTasklist(task.taskId, 'helpers', this.curUserToken.uid);
            this.cloud.removeTaskFromUser(task.ownerUserId, 'confirmedTask',  task.taskId);
            this.cloud.removeTaskFromUser(this.curUserToken.uid, 'confirmedTask', task.taskId);

          }
        }
      ]
    });

    prompt.present();

  }

  /** ACCEPT DECLINE BUTTONS FROM PENDING PAGE  **/
  taskAccepted(event, task){
    console.log('event:',event, 'task: ', task, 'user: ', this.curUserToken.uid);
    var curUser = this.db.collection('users').doc(this.curUserToken.uid);

    //remove task from invited for invited user
    this.cloud.removeTaskFromUser(this.curUserToken.uid, 'invitedTask', this.selectedTask.taskId);

    //add task to confirmed for both users
    this.cloud.addTaskToList(this.curUserToken.uid, 'confirmedTask', this.selectedTask.taskId, this.selectedTask.taskName);
    this.cloud.addTaskToList(this.selectedTask.ownerUserId, 'confirmedTask', this.selectedTask.taskId, this.selectedTask.taskName);

    //add accepting user to helper list of task
    curUser.get().then(doc => {
      if (doc.exists) {
        this.cloud.addUserToTaskList(this.selectedTask.taskId, 'helpers', this.curUserToken.uid,
          doc.data()['firstName'], doc.data()['lastName']);
        alert("Task Accepted");
      } else {
        console.log("No such document!");
      }
    });
  }

  taskRejected(event, task){
    //remove task from invited for rejecting user
    console.log('curUserToken: ', this.curUserToken.uid, 'task: ', this.selectedTask);
    this.cloud.removeTaskFromUser(this.curUserToken.uid, 'invitedTask', this.selectedTask.taskId);
    alert("Task Rejected");
  }
}
