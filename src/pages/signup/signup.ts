import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import { EditProfilePage } from "../edit-profile/edit-profile";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';
import 'firebase/firestore';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  //for validation
import { emailValidator} from '../../validators/emailValidator';
import { passwordValidator } from '../../validators/passwordValidator';
import * as algoliasearch from 'algoliasearch';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signUpForm : FormGroup;
  ALGOLIA_INDEX_NAME = "notes";
  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6', {protocol: 'https:'});
  db = firebase.firestore();
  constructor(
    private authp: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder : FormBuilder,)
    {
      this.signUpForm = formBuilder.group({
        email : ['', Validators.compose([emailValidator.isValid])],
        password : ['',Validators.compose([Validators.required, passwordValidator.isValid])],
        passwordRe :  ['',Validators.compose([Validators.required, passwordValidator.isValid])],
      })
    }


  /*
  / This function takes user inputs and pass it to firebase server
  / use firebase API. Which will create a new user in firebase.
   */
  signUp = function() {

    console.log("asd" ,this.signUpForm.value);
    if (!this.signUpForm.controls.email.valid) //prompt error message if the email address is not wisc.edu address.
    {

        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Please use a valid wisc.edu email',
          buttons: ['OK']
        });
        alert.present();

    }
    //password doesn't match the reenter password.
    else if (this.signUpForm.value.password.localeCompare(this.signUpForm.value.passwordRe) != 0)
    {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Two passwords are not the same',
        buttons: ['OK']
      });
      alert.present();

    }
    else if (!this.signUpForm.controls.password.valid) //passwaord should be in range 6-20
    {

      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Password should have at least 6 letters and at most 20 letters',
        buttons: ['OK']
      });
      alert.present();

    }
    else
    {
       //declare alert instance
       let alert = this.alertCtrl.create({
          title: '',
          subTitle: '',
          buttons: ['OK']
        });
       //save current frame

       //call create method which is provided by firebase
       this.authp.auth.createUserWithEmailAndPassword(this.signUpForm.value.email, this.signUpForm.value.password)
          .then(result=>{                 //on success, log returned value to the path user/userid
            var docRef = this.db.collection('users').doc(result.uid);
            docRef.set({
              email: this.signUpForm.value.email,
              lastName : '',
              firstName : '',
              taskCount : 1,
            });
            docRef.get().then(doc=>{
              var index = this.client.initIndex('users');
              var user = doc.data();
              user.objectID = result.uid;
              index.saveObject(user);
              this.navCtrl.push(EditProfilePage);
            })
          
            
          })
          .catch(function (error)        //on failure, display the error massage.
          {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert.setTitle(errorCode);
            alert.setMessage(errorMessage);
            alert.present();
          });
    }
  }


  /*
  / This function takes user back to login page
   */
  backToLogin(){
    this.navCtrl.push(LoginPage);
  }
}
