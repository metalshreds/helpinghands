import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {SignupPage} from "../pages/signup/signup";
import firebase from 'firebase';

import {DashboardPage} from "../pages/dashboard/dashboard";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    firebase.initializeApp({
      apiKey: "AIzaSyAtXUZCmJgRa_DjLRqqlEiXtGNCMXO0lXo",
      authDomain: "helpinghands506.firebaseapp.com",
      databaseURL: "https://helpinghands506.firebaseio.com",
      projectId: "helpinghands506",
      storageBucket: "helpinghands506.appspot.com",
      messagingSenderId: "652958427997"
    })

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Login', component: LoginPage},
      { title: 'Sign up', component: SignupPage},
      { title: 'Dashboard', component: DashboardPage}
    ];

  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
