import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { TaskEditPage } from "./task-edit";
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import {FirebaseApp, AngularFireModule} from "angularfire2";
import { CameraProvider } from '../../providers/camera';
import { CommentPopover } from "./comment-popover";
import { skill } from '../../interface/skills';
import { DatePicker } from "@ionic-native/date-picker";
import { ProfilePage } from "../profile/profile";
import { cloudProvider } from '../../providers/cloudbase';
import { HelpingHands } from '../../app/app.component';


class MockNavParams{
  data = {
    'taskID': 'yP7n3Tv1WPNXL6T27GiAeWjPupu2',
  };

  get(param){
    return this.data[param];
  }
}
describe('My Service', () => {

  let comp: TaskEditPage;
  let fixture: ComponentFixture<TaskEditPage>;
  // let firebaseConfig = firebase.initializeApp({
  //   apiKey: "AIzaSyAtXUZCmJgRa_DjLRqqlEiXtGNCMXO0lXo",
  //   authDomain: "helpinghands506.firebaseapp.com",
  //   databaseURL: "https://helpinghands506.firebaseio.com",
  //   projectId: "helpinghands506",
  //   storageBucket: "helpinghands506.appspot.com",
  //   messagingSenderId: "652958427997"
  // });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskEditPage],
      providers: [
        NavController,
        AngularFireAuth,
        { provide: NavParams, useClass: MockNavParams },
        CameraProvider,
        CommentPopover,
        skill,
        DatePicker,
        ProfilePage,
        cloudProvider,
        HelpingHands
      ],
      imports: [
        IonicModule.forRoot(TaskEditPage),
        AngularFireModule.initializeApp(FIREBASE_CONFIG)
      ]
    }).compileComponents()
      .then(() => {
      this.fixture = TestBed.createComponent(TaskEditPage);
      this.comp = this.fixture.componentInstance;
    });
  }));

  afterEach(() => {
    this.fixture.destroy();
    this.comp = null;
  });

  it('is created', () => {
    expect(this.fixture).toBeTruthy();
    expect(this.comp).toBeTruthy();
  });

});
