import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule} from "angularfire2";
import { FIREBASE_CONFIG} from "./app.firebase.config";
import { AngularFireAuthModule} from "angularfire2/auth";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { DashboardPage} from '../pages/dashboard/dashboard';

// import { CompletedPage} from '../pages/completed/completed';
// import { CreatePage} from '../pages/create/create';
// import { ConfirmedPage } from '../pages/confirmed/confirmed';
// import { PendingPage} from '../pages/pending/pending';
// import { SuggestedPage} from '../pages/suggested/suggested';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),  //initialize fire base
    AngularFireAuthModule, //import auth module


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    DashboardPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
