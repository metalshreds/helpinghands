import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Platform, ActionSheetController, AlertController, App, LoadingController } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";  //provider
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { ProfilePage} from '../profile/profile';
import { cloudProvider } from '../../providers/cloudbase';
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  //for validation
import { emailValidator} from '../../validators/emailValidator';
import { nameValidator} from '../../validators/nameValidator';
import { CameraProvider } from '../../providers/camera';
import * as algoliasearch from 'algoliasearch';
import { skill } from '../../interface/skills';
import { TaskViewPage } from "../task-view/task-view"
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
  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6', {protocol: 'https:'});
  skillInterface = new skill();
  csSkillInterface = ['Programming', 'Excel', 'Hardware'];
  mechSkillInterface = ["Welding", "Mechanic", "Soldering", "Drafting",];
  artSkillInterface = ["GraphicDesign","Photography","DrawingAndPainting"];
  sciSkillInterface = ["Biology", "Physics","Chemistry","Agriculture"];
  econSkillInterface = ["Management", "Accounting", "Economics"];
  langSkillInterface = ["Spanish", "Japanese", "German", "Mandarin", "Cantonese","Portuguese",
                        "Russian", "English", "OtherLanguage"];
  skill =  new Object();
  csSkills = [];
  mechSkills = [];
  artSkills = [];
  sciSkills = [];
  econSkills = [];
  langSkills = [];
  helper = false;
  displaySkill = [];
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
          for (const i in this.CURRENT_USER.skills)
          {
            if (this.CURRENT_USER.skills[i] == true)
              this.displaySkill.push(i);
          }
          var tmpCsSkill = [], tmpMechSkill = [], tmpArtSkill = [];
          var tmpSciSkill = [],tmpEconSkill = [], tmpLangSkill = [];
          for(const j in this.displaySkill)
          {
            if(this.csSkillInterface.indexOf(this.displaySkill[j]) >= 0)
              tmpCsSkill.push(this.displaySkill[j]);
            else if(this.mechSkillInterface.indexOf(this.displaySkill[j]) >= 0)
              tmpMechSkill.push(this.displaySkill[j]);
            else if(this.artSkillInterface.indexOf(this.displaySkill[j]) >= 0)
              tmpArtSkill.push(this.displaySkill[j]);
            else if(this.sciSkillInterface.indexOf(this.displaySkill[j]) >= 0)
              tmpSciSkill.push(this.displaySkill[j]);
            else if(this.econSkillInterface.indexOf(this.displaySkill[j]) >= 0)
              tmpEconSkill.push(this.displaySkill[j]);
            else if(this.langSkillInterface.indexOf(this.displaySkill[j]) >= 0)
              tmpLangSkill.push(this.displaySkill[j]);

          }
          this.csSkills = tmpCsSkill;
          this.mechSkills = tmpMechSkill;
          this.artSkills = tmpArtSkill;
          this.sciSkills = tmpSciSkill;
          this.econSkills = tmpEconSkill;
          this.langSkills = tmpLangSkill;
          this.helper = this.CURRENT_USER.isHelper;
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    console.log("name is ", this.curUserToken.displayName);
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
      console.log('csskill is ', this.csSkills);
      for (const i in this.skillInterface)
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
      console.log("mechSkill", this.mechSkills);
      console.log("skill", this.skill);
      //initialize new User object using input lastname, firstname and current author's uid and email.
      var newUser = new ProfileProvider(this.editProfileForm.value.lastName,
        this.editProfileForm.value.firstName, this.curUserToken.uid, this.curUserToken.email, this.editProfileForm.value.introduction,
        this.skill, this.editProfileForm.value.zipCode, this.editProfileForm.value.phone, this.editProfileForm.value.travelRadius,
        this.CURRENT_USER.taskCount, this.CURRENT_USER.photoUrl, this.CURRENT_USER.isHelper);


      console.log("newUser is ", newUser);
      // for simplicity i wrote an abstract function to update each field.
      // a crash during multiple independent writes may cause inconsistency in database,
      //  but that issue is beyond our scope at this time. Will come back to this and using
      //  batch or write a function to update the whole profile.
      var userRef = this.db.collection('users').doc(this.curUserToken.uid);
      userRef.update({
        lastName : this.editProfileForm.value.lastName,
        firstName : this.editProfileForm.value.firstName,
        introduction : this.editProfileForm.value.introduction,
        zipCode : this.editProfileForm.value.zipCode,
        skills : this.skill,
        taskCount : this.CURRENT_USER.taskCount,
        isHelper : this.helper,
        userId : this.curUserToken.uid,
      });



      if(this.pictureChanged)
      {
        this.updateUserPhoto();
      }
      else //setUser's display name we will use his display name's value to decide whether lead the use to profile or login page.
      {

        this.curUserToken.updateProfile({
          displayName: newUser.firstName + ' ' + newUser.lastName,
          photoURL: this.curUserToken.photoURL ? this.curUserToken.photoURL : 'assets/icon/logo-login.png',
         }).catch(function(error) {
          console.log("native update has an error");
        });
        this.editProfileForm.reset();

        //TODO moduliraze following code maybe
        var docRef = this.db.collection('users').doc(newUser.userId);
        docRef.get().then(doc=>{
          var index = this.client.initIndex('users');
          var user = doc.data();
          user.objectID = newUser.userId;
          index.saveObject(user);
          this.navCtrl.setRoot(ProfilePage);
        })


      }
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

        // this.crop.crop(picture, {quality:75})
        // .then(newImage=>{this.chosenPicture = newImage})
        //   .catch(error=>{console.error('Error in croping image in edit-user', error)});
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
      if(!(this.chosenPicture == null)){
        imageRef.putString(this.chosenPicture, firebase.storage.StringFormat.DATA_URL).then((snapshot)=>
        {
          var downloadURL = snapshot.downloadURL;
          console.log('URL is', downloadURL);
          this.curUserToken.updateProfile({
            displayName: this.CURRENT_USER.firstName + this.CURRENT_USER.lastName,
            photoURL: downloadURL,

          }).catch(function(error) {
            console.log("native update has an error");
          });
          this.db.collection('users').doc(this.curUserToken.uid).update({
            photoUrl : downloadURL,
          });
          //TODO moduliraze following code maybe
          var docRef = this.db.collection('users').doc(this.curUserToken.uid);
          docRef.get().then(doc=>{
            var index = this.client.initIndex('users');
            var user = doc.data();
            user.objectID = this.curUserToken.uid;
            index.saveObject(user);
            this.editProfileForm.reset();
            this.navCtrl.push(ProfilePage);
          })

        });
      }
      else
      {
        console.log("no pic chosen, something is wrong");
      }
  }
}
