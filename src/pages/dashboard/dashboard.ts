import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';



/**
 * Generated class for the DashboardPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  confirmedRoot = 'ConfirmedPage';
  pendingRoot = 'PendingPage';
  suggestedRoot = 'SuggestedPage';
  completedRoot = 'CompletedPage';
  myTasksRoot = 'MyTasksPage';

  constructor(public navCtrl: NavController) {}

  backButtonClick(){
    this.navCtrl.pop();
  }

}
