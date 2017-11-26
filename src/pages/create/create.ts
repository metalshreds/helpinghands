import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as algoliasearch from 'algoliasearch';
import firebase from 'firebase';
import { cloudProvider } from '../../providers/cloudbase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  //for validation



/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
  curUserToken = this.AFcurUser.auth.currentUser;
  taskCreateForm : FormGroup;
  db = firebase.firestore();
  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6', {protocol: 'https:'});
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      private AFcurUser : AngularFireAuth,
      public formBuilder : FormBuilder,
     ) {

      this.taskCreateForm = formBuilder.group ({
        taskName : [''],
      });

  }
  taskId = this.curUserToken.uid + '11' //change 11 to counter later


  createTask(){
    var docRef = this.db.collection('tasks').doc(this.taskId);
    docRef.set({
        taskName : this.taskCreateForm.value.taskName,
        taskId : this.taskId,

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
    console.log('ionViewDidLoad CreatePage');
  }



}
