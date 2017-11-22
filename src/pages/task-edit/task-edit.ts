import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, LoadingController,
  PopoverController, ViewController } from 'ionic-angular';
import { TaskObjectProvider } from '../../providers/task-object/task-object';
import { CameraProvider } from '../../providers/camera';
import { CommentPopover } from "./comment-popover";
import { AngularFireAuth } from "angularfire2/auth"
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as algoliasearch from 'algoliasearch';
import firebase from 'firebase';
import {skill} from '../../interface/skills'

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
  skill = new Object();
  CSskills;
  skillinterface = new skill();
  task: TaskObjectProvider;
  chosenPicture: any;
  pictureChanged = false;
  curUserToken = this.AFcurUser.auth.currentUser;
  taskCreateForm : FormGroup;
  db = firebase.firestore();
  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6', {protocol: 'https:'});
  taskId = this.curUserToken.uid + '11';
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

  ) {

    this.taskCreateForm = formBuilder.group ({
      taskName : [''],
      taskDescription : [''],
      Location : [''],
      Compensation : [''],
    });


  }

  createTask(){
    var docRef = this.db.collection('tasks').doc(this.taskId);
    console.log(this.CSskills);
    console.log(this.skillinterface);
    for (const i in this.skillinterface)
    {
      if (this.CSskills.includes(i))
      {
        this.skill[i] = true;
      }
      else
        this.skill[i] = false;

    }
    console.log("skill", this.skill);
    docRef.update({
        taskName : this.taskCreateForm.value.taskName,
        taskId : this.taskId,
        taskDescription : this.taskCreateForm.value.taskDescription,
        Location : this.taskCreateForm.value.Location,
        Compensation : this.taskCreateForm.value.Compensation,
        wantedSkills : this.skill,
        ownerUserId : this.curUserToken.uid,
    });
    console.log("task name input is ", this.taskCreateForm.value.taskName);
    docRef.get().then(doc=>{
      var index = this.client.initIndex('tasks');
      var task = doc.data();
      task.objectID = this.taskId;
      index.saveObject(task);
      //this.navCtrl.push( some page here);
    })
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

