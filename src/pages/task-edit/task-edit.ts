import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, LoadingController,
  PopoverController} from 'ionic-angular';
import { TaskObjectProvider } from '../../providers/task-object/task-object';
import { ProfileProvider } from '../../providers/profile/profile'
import { CameraProvider } from '../../providers/camera';
import { CommentPopover } from "./comment-popover";
import { AngularFireAuth } from "angularfire2/auth"
import { FormBuilder, FormGroup} from '@angular/forms';
import * as algoliasearch from 'algoliasearch';
import firebase from 'firebase';
import { skill } from '../../interface/skills'
import { TaskViewPage } from "../task-view/task-view"
import { ProfilePage } from "../profile/profile"
import { cloudProvider } from '../../providers/cloudbase';
import { RatingPage } from '../rating/rating';
/**
 * Generated class for the TaskEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-edit',
  templateUrl: 'task-edit.html',
})
export class TaskEditPage {
  nameHolder : string;
  descriptionHolder : string;
  locationHolder : string;
  compensationHolder : string;
  skill = new Object();
  csSkills = [];
  mechSkills = [];
  artSkills = [];
  sciSkills = [];
  econSkills = [];
  langSkills = [];
  skillHolder = [];
  month : string = '';
  day : string = '';
  startDate : string = '';
  endDate: string = '';
  duration: number = 0;
  skillinterface = new skill();
  chosenPicture: any;
  pictureChanged = false;
  curUserToken = this.AFcurUser.auth.currentUser;
  curUID = this.curUserToken.uid;
  taskCreateForm : FormGroup;
  task = {} as TaskObjectProvider;
  user = {} as ProfileProvider;
  db = firebase.firestore();
  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6', {protocol: 'https:'});
  taskId = this.curUID;
  created = true;
  photoUrl = '';
  constructor(
    public formBuilder : FormBuilder,
    private AFcurUser : AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionsheetCtrl: ActionSheetController,
    public cameraProvider: CameraProvider,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public cloudModule : cloudProvider,
  ) {
    this.taskCreateForm = formBuilder.group ({
      taskName : [''],
      taskDescription : [''],
      location : [''],
      compensation : [''],
    });

    let userRef = this.db.collection('users').doc(this.curUserToken.uid);
    if(this.navParams.get('taskId') != undefined) {
      this.created = false;
      this.taskId = this.navParams.get('taskId');
      let taskRef = this.db.collection('tasks').doc(this.taskId);
      taskRef.get().then(doc=>{
        this.nameHolder = doc.data().taskName;
        this.descriptionHolder = doc.data().taskDescription;
        this.locationHolder = doc.data().location;
        this.compensationHolder = doc.data().compensation;
        this.startDate = doc.data().startDate;
        this.endDate = doc.data().endDate;
        for (const i in doc.data().wantedSkills)
        {
          console.log('in task-edit constructor i is', i);
          if (doc.data().wantedSkills[i] == true)
            this.skillHolder.push(i);
        }
        this.csSkills = this.skillHolder;
        this.mechSkills = this.skillHolder;
        this.artSkills = this.skillHolder;
        this.sciSkills = this.skillHolder;
        this.econSkills = this.skillHolder;
        this.langSkills = this.skillHolder;
        //this.startDate = ("2017-"+doc.data().month+"-"+doc.data().day);
        // this.skill = doc.data().wantedSkill;

        // for (const field in this.skill) {
        //   if (this.skill[field]) {
        //     if (field == "Programming" || field == "Excel" || field == "Hardware") {
        //       this.csSkills.push(field);
        //     }d
        //     else if (field == "Welding" || field == "Mechanic" || field == "Soldering" || field == "Drafting") {
        //       this.mechSkills.push(field);
        //     }
        //     else if (field == "GraphicDesign" || field == "Photography" || field == "DrawingandPainting") {
        //       this.artSkills.push(field);
        //     }
        //     else if (field == "Bio" || field == "Physics" || field == "Chem" || field == "Agriculture") {
        //       this.sciSkills.push(field);
        //     }
        //     else if (field == "Management" || field == "Accounting" || field == "Economics") {
        //       this.econSkills.push(field);
        //     }
        //     else if (field == "Spanish" || field == "Japanese" || field == "German" || field == "Mandarin" ||
        //       field == "Cantonese" || field == "Portuguese" || field == "Russian" || field == "English" ||
        //       field == "OtherLang") {
        //       this.langSkills.push(field);
        //     }
        //   }
        // }
      });
    } else {
      userRef.get().then(doc=>{
        this.taskId += doc.data().taskCount.toString();
      })
    }
  }


  updateTask(){
    for (const i in this.skillinterface)
    {
      if (this.csSkills.indexOf(i) > -1 ||
          this.mechSkills.indexOf(i) > -1 ||
          this.artSkills.indexOf(i) > -1 ||
          this.sciSkills.indexOf(i) > -1 ||
          this.econSkills.indexOf(i) > -1 ||
          this.langSkills.indexOf(i) > -1)
      {
        this.skill[i] = true;
      }
      else
        this.skill[i] = false;
    }
    console.log("skill", this.skill);
    let taskRef = this.db.collection('tasks').doc(this.taskId);
    taskRef.set({
        taskName : this.taskCreateForm.value.taskName,
        taskId : this.taskId,
        taskDescription : this.taskCreateForm.value.taskDescription,
        location : this.taskCreateForm.value.location,
        compensation : this.taskCreateForm.value.compensation,
        wantedSkills : this.skill,
        startDate : this.startDate,
        endDate : this.endDate,
        duration : this.duration,
        completed : false,
        ownerName : this.curUserToken.displayName,
        ownerUserId : this.curUserToken.uid,
        photoUrl : this.photoUrl,
        comment : '',
    });
    console.log("task name input is ", this.taskCreateForm.value.taskName);
    //add this task to current user's ownedtask
    this.cloudModule.addTaskToList(this.curUserToken.uid, 'ownedTask', this.taskId,this.taskCreateForm.value.taskName);
    //add index to this task file
    taskRef.get().then(doc=>{
      let tIndex = this.client.initIndex('tasks');
      var task = doc.data();
      task.objectID = task.taskId;
      tIndex.saveObject(task);
    });
    //if its the first time create this task, incease creator's task count by 1
    //  and update it in database.
    if(this.created ==true )
    {
      let userRef = this.db.collection('users').doc(this.curUID);
      userRef.get().then(doc=>{
        let newCount = doc.data().taskCount + 1;
          userRef.update({
            taskCount : newCount,
          });
        });
      userRef.get().then(doc=>{
        let index = this.client.initIndex('users');
        var user = doc.data();
        user.objectID = user.userId;
        index.saveObject(user);
      });
    }
    this.task = new TaskObjectProvider(
      this.taskCreateForm.value.taskName,
      this.taskId,
      this.duration,
      this.startDate,
      this.endDate,
      this.taskCreateForm.value.taskDescription,
      this.skillHolder,
      false,
      this.curUserToken.displayName,
      this.curUserToken.uid,
      this.taskCreateForm.value.location
    );
    this.navCtrl.push(TaskViewPage, {
      'task' : this.task
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskEditPage');
  }

  changePicture() {
    const actionsheet = this.actionsheetCtrl.create({
      title: 'upload picture',
      buttons: [
        {
          text: 'camera',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: !this.platform.is('ios') ? 'gallery' : 'camera roll',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.getPicture();
          }
        },
        {
          text: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }
      ]
    });
    this.pictureChanged = true;
    return actionsheet.present();
  }

  takePicture() {
    const loading = this.loadingCtrl.create();

    loading.present();
    return this.cameraProvider.getPictureFromCamera().then(picture => {
      if (picture) {
        this.chosenPicture = picture;
        this.pictureChanged = true;
      }
      loading.dismiss();
    }, error => {
      alert(error);
    });
  }

  getPicture() {
    const loading = this.loadingCtrl.create();

    loading.present();
    return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
        this.chosenPicture = picture;
        this.pictureChanged = true;
      }
      loading.dismiss();
    }, error => {
      alert(error);
    });
  }

  completeTask($event) {
    //TODO
    // mark this task as completed, update record in firebase
    // jump to rating page.
    // this.navCtrl.push(RatingPage);
    console.log("It's running the method");
    let popover = this.popoverCtrl.create(CommentPopover, {
      'taskId': this.taskId
    });
    popover.present();
  }

  deleteTask() {
    this.cloudModule.removeTaskFromUser(this.curUserToken.uid, 'ownedTask', this.taskId);
    let taskRef = this.db.collection('tasks').doc(this.taskId);
    taskRef.delete().then(doc=>{console.log("I'm here.")});
    this.navCtrl.push(ProfilePage);
  }

  goBack() {
    if(this.navParams.get('taskId') != undefined) {
      console.log("popping");
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot(ProfilePage);
    }
  }
}

