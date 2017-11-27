import {IonicModule, NavController} from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth"
import firebase from 'firebase';
import { LoginPage } from '../login/login'
import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {HelpingHands} from "../../app/app.component";
import {AngularFireModule} from "angularfire2";

let comp;
let fixture;
let firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAtXUZCmJgRa_DjLRqqlEiXtGNCMXO0lXo",
  authDomain: "helpinghands506.firebaseapp.com",
  databaseURL: "https://helpinghands506.firebaseio.com",
  projectId: "helpinghands506",
  storageBucket: "helpinghands506.appspot.com",
  messagingSenderId: "652958427997"
});

describe('Login Page', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        NavController,
        AngularFireAuth,
        HelpingHands
      ],
      imports: [
        IonicModule.forRoot(LoginPage),
        AngularFireModule.initializeApp(this.firebaseConfig)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    this.fixture = TestBed.createComponent(LoginPage);
    this.comp = this.fixture.componentInstance;
  });

  afterEach(() => {
    this.fixture.destroy();
    this.comp = null;
  });

  it('is created', () => {
    expect(this.fixture).toBeTruthy();
    expect(this.comp).toBeTruthy();
  });

});
