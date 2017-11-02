import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
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
import { ProfileProvider } from '../providers/profile/profile';
import { FirebaseProvider } from '../providers/firebase/firebase'; //provider
import { TaskObjectProvider } from '../providers/task-object/task-object'; //provider
import { DashboardPage } from "../pages/dashboard/dashboard";
import { TaskViewPage } from "../pages/task-view/task-view";
import { FormsModule } from '@angular/forms'
import { TaskEditPage } from "../pages/task-edit/task-edit";
//import { emailValidator} from "../validators/emailValidator";

@NgModule({
  declarations: [
    MyApp,
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

  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),  //initialize fire base
    AngularFireAuthModule, //import auth module
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    DashboardPage,
    SearchPage,
    EditProfilePage,
    DashboardPage,
    ProfilePage,
    TaskEditPage,
    TaskViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfileProvider,
    FirebaseProvider,
    TaskObjectProvider,
  ]
})
export class AppModule {}
