import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, LoadingController,
  PopoverController, ViewController } from 'ionic-angular';
import { TaskObjectProvider } from '../../providers/task-object/task-object';
import { ProfileProvider } from '../../providers/profile/profile'
import { CameraProvider } from '../../providers/camera';
import { CommentPopover } from "./comment-popover";
import { AngularFireAuth } from "angularfire2/auth"
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as algoliasearch from 'algoliasearch';
import firebase from 'firebase';
import { skill } from '../../interface/skills'
import { DatePicker } from "@ionic-native/date-picker"
import { TaskViewPage } from "../task-view/task-view"

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
  skill = [];
  csSkills = [];
  mechSkills = [];
  artSkills = [];
  sciSkills = [];
  econSkills = [];
  langSkills = [];
  month : string;
  day : string;
  skillinterface = new skill();
  chosenPicture: any;
  pictureChanged = false;
  curUserToken = this.AFcurUser.auth.currentUser;
  taskCreateForm : FormGroup;
  task : TaskObjectProvider;
  user : ProfileProvider;
  db = firebase.firestore();
  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6', {protocol: 'https:'});
  taskId = this.curUserToken.uid;
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
    public datePicker: DatePicker,
  ) {


    this.taskCreateForm = formBuilder.group ({
      taskName : [''],
      taskDescription : [''],
      location : [''],
      compensation : [''],
    });

    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );

  }


  updateTask(event){
    console.log(this.navParams.get('taskID'));
    let userRef = this.db.collection('users').doc(this.curUserToken.uid);
    if(this.navParams.get('taskID') != undefined) {
      this.taskId = this.navParams.get('taskID');
    } else {
      userRef.get().then(doc=>{
        this.taskId += doc.data().taskCount.toString();
      })
    }

    let taskRef = this.db.collection('tasks').doc(this.taskId);
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
    taskRef.set({
        taskName : this.taskCreateForm.value.taskName,
        taskId : this.taskId,
        TaskDescription : this.taskCreateForm.value.taskDescription,
        Location : this.taskCreateForm.value.location,
        Compensation : this.taskCreateForm.value.compensation,
        Skill : this.skill
    });
    console.log("task name input is ", this.taskCreateForm.value.taskName);
    taskRef.get().then(doc=>{
      let tIndex = this.client.initIndex('tasks');
      console.log("this is the data", doc.data().taskName);
      this.task = new TaskObjectProvider(
                  doc.data().taskName,
                  5,
                  "right now",
                  this.month + " " + this.day,
                  doc.data().taskDescription,
                  "unused",
                  this.skill,
                  false,
                  this.curUserToken.uid
      );
      console.log("the task", this.task);
      //this.navCtrl.push( some page here);
    });
    userRef.get().then(doc=>{
      let uIndex = this.client.initIndex('users');
      let newCount = doc.data().taskCount + 1;
      let newOwned = doc.data().ownedTasks;
      if (newOwned.indexOf(this.taskId) < 0) {
        newOwned.push(this.taskId);
        userRef.update({
          taskCount : newCount,
          ownedTasks : newOwned
        });
      }
    });
    this.navCtrl.push(TaskViewPage, {
      task: this.task
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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CommentPopover);
    popover.present({
      ev: myEvent
    });
  }
}

