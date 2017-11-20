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

  completedRoot = 'CompletedPage';
  pendingRoot = 'PendingPage';
  suggestedRoot = 'SuggestedPage';
  confirmedRoot = 'ConfirmedPage';


  constructor(public navCtrl: NavController) {}

  backButtonClick(){
    this.navCtrl.pop();
  }

}
