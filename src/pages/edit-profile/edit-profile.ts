import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, AlertController, App, LoadingController } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";  //provider
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import {ProfilePage} from '../profile/profile';
import { cloudProvider } from '../../providers/cloudbase'
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  //for validation
import { emailValidator} from '../../validators/emailValidator';
import { nameValidator} from '../../validators/nameValidator';
import { CameraProvider } from '../../providers/camera';


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  curUserToken = this.AFcurUser.auth.currentUser;
  CURRENT_USER = {} as ProfileProvider;
  editProfileForm : FormGroup;
  storage = firebase.storage();
  chosenPicture: any;
  pictureChanged = false;
  db = firebase.firestore();
  //constructor of the page.
  constructor(
    private AFcurUser: AngularFireAuth,
    private AFdatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public cloudBaseModule : cloudProvider,
    public formBuilder : FormBuilder,
    public actionsheetCtrl: ActionSheetController,
    public cameraProvider: CameraProvider,
    public platform: Platform,
    //public currUser : ProfileProvider
  ) {

    this.editProfileForm = formBuilder.group({
      lastName : ['', Validators.compose([nameValidator.isValid, Validators.required])],
      firstName :  ['', Validators.compose([nameValidator.isValid, Validators.required])],
      phone : [''],
      introduction : ['', Validators.required],
      travelRadius : [''],
      zipCode : [''],
    });



    var userRef = this.db.collection('users').doc(this.curUserToken.uid);
    userRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
          for(const field in doc.data())
          {
              //have to be careful that we have to store exactly same property
              //  in userProvider obeject and users node.
              this.CURRENT_USER[field] = doc.data()[field];
          }

        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

  };

  //
  // writeUp = function(message : any)
  // {
  //   //document.getElementById("FN").textContent = message.firstName;
  // }
  /*
  / This funtion will take all the user inputs and update it to corresponding node.
  */
  update = function()
  {

    //if firstName is invalid
    if(!this.editProfileForm.controls.firstName.valid)
    {

      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please enter a valid first name',
        buttons: ['OK']
      });
      alert.present();
    }
    //if lastname is invalid
    else if(!this.editProfileForm.controls.lastName.valid)
    {

      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please enter a valid last name',
        buttons: ['OK']
      });
      alert.present();
    }
    //if introduction is invalid
    else if(!this.editProfileForm.controls.introduction.valid)
    {

      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please enter a valid introduction',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.curUserToken)
    {
      //initialize new User object using input lastname, firstname and current author's uid and email.
      var newUser = new ProfileProvider(this.editProfileForm.value.lastName,
        this.editProfileForm.value.firstName, this.curUserToken.uid, this.curUserToken.email, this.editProfileForm.value.introduction,
        [true], this.editProfileForm.value.zipCode, this.editProfileForm.value.phone, this.editProfileForm.value.travelRadius);

      // for simplicity i wrote an abstract function to update each field.
      // a crash during multiple independent writes may cause inconsistency in database,
      //  but that issue is beyond our scope at this time. Will come back to this and using
      //  batch or write a function to update the whole profile.
      this.cloudBaseModule.singleStringUpdate("lastName", newUser.lastName, newUser.userId);
      this.cloudBaseModule.singleStringUpdate("firstName", newUser.firstName, newUser.userId);
      this.cloudBaseModule.singleStringUpdate("introduction", newUser.introduction, newUser.userId);
      if(this.pictureChanged)
        this.updateUserPhoto();
      this.editProfileForm.reset();
    }
    else {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'login first',
        buttons: ['OK']
      });
      alert.present();
    }

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

  updateUserPhoto(){
    var imageRef = this.storage.ref('userPic/' + this.curUserToken.uid + '.jpg');
    var metadata = {
      contentType: 'image/jpeg'
    };
     imageRef.putString(this.chosenPicture, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      var downloadURL = snapshot.downloadURL;
      console.log('URL is', downloadURL);
      this.curUserToken.updateProfile({
          displayName: this.CURRENT_USER.firstName + this.CURRENT_USER.lastName,
          photoURL: downloadURL,
         }).catch(function(error) {
            console.log("native update has an error");
      });
   });

  }

  /*
  /  this function will find user node using userId and return value
  /  of the node
   */
  getUserProfile = function(userId : string, profile) : any
  {
    var user;
    var userRef = firebase.database().ref('user/' + userId);            //get a node reference with path specified by userId
    userRef.once('value', function(snapshot)         // read node value once use firebase API
    {
      user = snapshot.val()                                               //return node value.
      profile(user);
      return user;
    })
  }




}
