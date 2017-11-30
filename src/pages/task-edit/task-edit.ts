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
import { ProfilePage } from "../profile/profile"
import { cloudProvider } from '../../providers/cloudbase';
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
  month : string = '';
  day : string = '';
  startDate : string = '';
  endDate:string = '';
  duration: string = '';
  skillinterface = new skill();
  chosenPicture: any;
  pictureChanged = false;
  curUserToken = this.AFcurUser.auth.currentUser;
  taskCreateForm : FormGroup;
  task = {} as TaskObjectProvider;
  user = {} as ProfileProvider;
  db = firebase.firestore();
  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6', {protocol: 'https:'});
  taskId = this.curUserToken.uid;
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
    public datePicker: DatePicker,
    public clouldModule : cloudProvider, 
  ) {
    this.taskCreateForm = formBuilder.group ({
      taskName : [''],
      taskDescription : [''],
      location : [''],
      compensation : [''],
    });






    let userRef = this.db.collection('users').doc(this.curUserToken.uid);
    if(this.navParams.get('taskID') != undefined) {
      this.created = false;
      this.taskId = this.navParams.get('taskID');
      let taskRef = this.db.collection('tasks').doc(this.taskId);
      taskRef.get().then(doc=>{
        this.nameHolder = doc.data().TaskName;
        this.descriptionHolder = doc.data().TaskDescription;
        this.locationHolder = doc.data().Location;
        this.compensationHolder = doc.data().Compensation;
        //this.startDate = ("2017-"+doc.data().month+"-"+doc.data().day);
        this.skill = doc.data().Skill;
        for (const field in this.skill) {
          if (this.skill[field]) {
            if (field == "Programming" || field == "Excel" || field == "Hardware") {
              this.csSkills.push(field);
            }
            else if (field == "Welding" || field == "Mechanic" || field == "Soldering" || field == "Drafting") {
              this.mechSkills.push(field);
            }
            else if (field == "GraphicDesign" || field == "Photography" || field == "DrawingandPainting") {
              this.artSkills.push(field);
            }
            else if (field == "Bio" || field == "Physics" || field == "Chem" || field == "Agriculture") {
              this.sciSkills.push(field);
            }
            else if (field == "Management" || field == "Accounting" || field == "Economics") {
              this.econSkills.push(field);
            }
            else if (field == "Spanish" || field == "Japanese" || field == "German" || field == "Mandarin" ||
              field == "Cantonese" || field == "Portuguese" || field == "Russian" || field == "English" ||
              field == "OtherLang") {
              this.langSkills.push(field);
            }
          }
        }
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
        wantedskill : this.skill,
        startDate : this.startDate,
        endDate : this.endDate,
        duration : this.duration,
        complete : false,
        ownerName : this.curUserToken.displayName,
        ownerUserId : this.curUserToken.uid,
        photoUrl : this.photoUrl,

    });
    console.log("task name input is ", this.taskCreateForm.value.taskName);
    //add this task to current user's ownedtask
    this.clouldModule.addTaskToList(this.curUserToken.uid, 'ownedTask', this.taskId,this.taskCreateForm.value.taskName);
    taskRef.get().then(doc=>{
      let tIndex = this.client.initIndex('tasks');
      console.log("this is the data", doc.data().taskName);
      console.log("the task", this.task);
      //this.navCtrl.push( some page here);
    });
    if(this.created ==true )
    {
      let userRef = this.db.collection('users').doc(this.curUserToken.uid);
      userRef.get().then(doc=>{
        let newCount = doc.data().taskCount + 1;
          userRef.update({
            taskCount : newCount,
          });
        });
    }

    this.navCtrl.push(ProfilePage);
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

  completeTask() {
    let popover = this.popoverCtrl.create(CommentPopover);
  }

  deleteTask() {
    this.navCtrl.push(ProfilePage);
  }

  goBack() {
    if(this.navParams.get('taskID') != undefined) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.push(ProfilePage);
    }
  }

  // <button ion-button (click)="pickADate()">pick a date</button>
  // pickADate(){
  //   this.datePicker.show({
  //     date: new Date(),
  //     mode: 'date',
  //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  //   }).then(
  //     date => console.log('Got date: ', date),
  //     err => console.log('Error occurred while getting date: ', err)
  //   );
  // }

}

