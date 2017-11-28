import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { LoginPage } from '../login/login'
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
import {NavMock} from '../../../test-config/mocks-ionic'
describe('login page', () => {
    let fixture;
    let comp;
    let login;

    let email = 'szhao34@wisc.edu';
    let password = '1234567'
    let authApp = AngularFireModule.initializeApp(FIREBASE_CONFIG);
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [LoginPage],
      providers: [
        AngularFireAuth,
        AlertController,
        NavController,
        FormBuilder,
        AngularFireAuthModule,
        AngularFireDatabase
      ],
      imports: [
        IonicModule.forRoot(LoginPage),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
      ]

    })

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(LoginPage);
    comp    = fixture.componentInstance;
    comp.loginForm.controls.email._value = 'szhao34@wisc.edu';
    comp.loginForm.controls.password._value = '1234567';
    console.log((comp.loginForm.controls.email));
    console.log(comp)
    //comp.login();

  });



  it('login page is created', () => {
    expect(comp instanceof LoginPage).toBe(true);
  });

  it('login form is created correctly', () =>{
    expect(Object.keys(comp.loginForm.controls) == (['email','password']));
  })
  it('form is invalid when empty', ()=>{
    expect(comp.loginForm.valid).toBe(false);
  })
  it('submitting a correct form and validator will return true', ()=>{
    expect(comp.loginForm.valid).toBe(false);
    comp.loginForm.controls['email'].setValue('s@wisc.edu');
    comp.loginForm.controls['password'].setValue('1234567');
    expect(comp.loginForm.valid).toBe(true);
  })

  it('submitting an invaild emaill address', ()=>{
    expect(comp.loginForm.valid).toBe(false);
    comp.loginForm.controls['email'].setValue('s@wiesc.edu');
    comp.loginForm.controls['password'].setValue('1234567');
    expect(comp.loginForm.valid).toBe(false);
  })


  it('login with correct email&password', ()=>{
    comp.loginForm.controls['email'].setValue('szhao34@wisc.edu');
    comp.loginForm.controls['password'].setValue('1234567');
    comp.login(comp.loginForm.controls.email.value, comp.loginForm.controls.password.value).then(res=>{
      console.log("res is ", res);
      expect(res  == 'login success');
    })
  });

  it('login with email that is not registered to the server', ()=>{
    comp.loginForm.controls['email'].setValue('s342@wisc.edu');
    comp.loginForm.controls['password'].setValue('1234567');
    comp.login(comp.loginForm.controls.email.value, comp.loginForm.controls.password.value).catch(error=>{
        var result = error.code;
        console.log("result is ", result);
        expect(result == 'auth/user-not-found');
    });
  })

  it('login with correct email but wrong password', ()=>{
    comp.loginForm.controls['email'].setValue('szhao34@wisc.edu');
    comp.loginForm.controls['password'].setValue('12345678');
    comp.login(comp.loginForm.controls.email.value, comp.loginForm.controls.password.value).catch(error=>{
        var result = error.code;
        expect(result == 'auth/wrong-password');
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
