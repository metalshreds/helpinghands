import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { LoginPage } from '../login/login'
import { SignupPage } from '../signup/signup'
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from "angularfire2";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  //for validation
import { emailValidator} from '../../validators/emailValidator';
import { passwordValidator } from '../../validators/passwordValidator';
import { IonicPage, NavController, NavParams, AlertController, App, LoadingController, Platform } from 'ionic-angular';
import { FIREBASE_CONFIG } from "../../app/app.firebase.config";
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import {} from 'jasmine'
import { FormControl } from '@angular/forms/src/model';
import {NavMock,
    alarmControllerMock} from '../../../test-config/mocks-ionic'
describe('sign up page', () => {
    let fixture;
    let comp;


  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [SignupPage],
      providers: [
        AngularFireAuth,
        {provide : AlertController, usedClass : alarmControllerMock},
        NavController,
        FormBuilder,
        AngularFireAuthModule,
        AngularFireDatabase,
      ],
      imports: [
        IonicModule.forRoot(SignupPage),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
      ]

    })

  }));
  
  beforeEach(() => {

    fixture = TestBed.createComponent(SignupPage);
    comp    = fixture.componentInstance;
    console.log((comp.signUpForm.controls.email));
    console.log(comp)
    //comp.login();
  });



  it('signup page is created', () => {
    expect(comp instanceof SignupPage).toBe(true);
   
  });

  it('signup form is created correctly', () =>{
    expect(Object.keys(comp.signUpForm.controls) == (['email','password']));
  })
  it('signup form is invalid when empty', ()=>{
    expect(comp.signUpForm.valid).toBe(false);
  })
  it('submitting a correct form and validator will return true', ()=>{
    expect(comp.signUpForm.valid).toBe(false);
    comp.signUpForm.controls['email'].setValue('s@wisc.edu');
    comp.signUpForm.controls['password'].setValue('1234567');
    comp.signUpForm.controls['passwordRe'].setValue('1234567');
    expect(comp.signUpForm.valid).toBe(true);
  })

  it('submitting an invaild emaill address and validator will return false', ()=>{
    expect(comp.signUpForm.valid).toBe(false);
    comp.signUpForm.controls['email'].setValue('szhao34@wiswc.edu');
    comp.signUpForm.controls['password'].setValue('1234567');
    comp.signUpForm.controls['passwordRe'].setValue('1234567');
    expect(comp.signUpForm.valid).toBe(false);
  })

  it('submitting an invaild password and validator will return false', ()=>{
    expect(comp.signUpForm.valid).toBe(false);
    comp.signUpForm.controls['email'].setValue('s@wiesc.edu');
    comp.signUpForm.controls['password'].setValue('67');
    expect(comp.signUpForm.valid).toBe(false);
  })


  it('signup with valid email&password', ()=>{
    comp.signUpForm.controls['email'].setValue('szhao3@wisc.edu');
    comp.signUpForm.controls['password'].setValue('1234567');
    comp.signUpForm.controls['passwordRe'].setValue('1234567');
    comp.signUp().then(res=>{
      expect(res  == 'sign in successfully');
    })
  });



  it('login with correct email but wrong password', ()=>{
    comp.signUpForm.controls['email'].setValue('szhao34@wisc.edu');
    comp.signUpForm.controls['password'].setValue('12345678');
    comp.signUp(comp.signUpForm.controls.email.value, comp.signUpForm.controls.password.value).catch(error=>{
        var result = error.code;
        expect(result == 'user already exist');  
    });
  })
  


  
 

  // it('login form get the correct value', () =>{
  //   expect(Object.keys(comp.loginForm.controls) == (['email','password']));
  // })



  // it('loginfunction', ()=>{
  //     let result = login.login(email, password);
  //       expect(result.displayName).toBe('ZhaoSong')

  // })


});
