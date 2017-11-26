import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HelpingHands } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreatePage } from "../pages/create/create";
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from "angularfire2";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { AngularFireAuthModule } from "angularfire2/auth";
import { SearchPage } from '../pages/search/search';
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { ProfilePage } from "../pages/profile/profile";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { DatePicker } from "@ionic-native/date-picker"
import { ProfileProvider } from '../providers/profile/profile';
import { TaskObjectProvider } from '../providers/task-object/task-object'; //provider
import { DashboardPage } from "../pages/dashboard/dashboard";
import { TaskViewPage } from "../pages/task-view/task-view";
import { FormsModule } from '@angular/forms';
import { TaskEditPage } from "../pages/task-edit/task-edit";
import { CameraProvider } from '../providers/camera';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { cloudProvider } from "../providers/cloudbase";
import { AngularFirestoreModule} from "angularfire2/firestore";
import { CommentPopoverModule } from "../pages/task-edit/comment-popover.module";
import { CommentPopover } from "../pages/task-edit/comment-popover";

//import { emailValidator} from "../validators/emailValidator";

@NgModule({
  declarations: [
    HelpingHands,
    HomePage,
    LoginPage,
    SignupPage,
    DashboardPage,
    SearchPage,
    EditProfilePage,
    DashboardPage,
    ProfilePage,
    TaskEditPage,
    TaskViewPage,
    CreatePage,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(HelpingHands),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),  //initialize fire base
    AngularFireAuthModule, //import auth module
    AngularFireDatabaseModule,

    CommentPopoverModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HelpingHands,
    HomePage,
    LoginPage,
    SignupPage,
    DashboardPage,
    SearchPage,
    EditProfilePage,
    DashboardPage,
    ProfilePage,
    TaskEditPage,
    TaskViewPage,
    CommentPopover,
    CreatePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfileProvider,
    TaskObjectProvider,
    CameraProvider,
    Camera,
    PhotoViewer,
    cloudProvider,
    DatePicker
  ]
})
export class AppModule {}
