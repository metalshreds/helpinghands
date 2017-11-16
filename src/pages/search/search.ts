import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  items;
  /*
  / Search page:
  / normal search : search whole word:
  / advance search : (use a load/activesheet)
  /           1. search user only(toggle maybe)
  /           2. search task only
  /                  
  / ranking method: 
  /           1. by time
  /           2. by rating
  /           3. by relavence (need figure out how to calculate it)
  /           4. by location (use google map api)
  */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();

  }

    initializeItems() {
      this.items = [
        'Amsterdam',
        'Bogota',
        'Buenos Aires',
        'Cairo',
        'Dhaka',
        'Edinburgh',
        'Geneva',
        'Genoa',
        'Glasglow',
        'Hanoi',
        'Hong Kong',
        'Islamabad',
        'Istanbul',
        'Jakarta',
        'Kiel',
        'Kyoto',
        'Le Havre',
        'Lebanon',
        'Lhasa',
        'Lima',
        'London',
        'Los Angeles',
        'Madrid',
        'Manila',
        'New York',
        'Olympia',
        'Oslo',
        'Panama City',
        'Peking',
        'Philadelphia',
        'San Francisco',
        'Seoul',
        'Taipeh',
        'Tel Aviv',
        'Tokio',
        'Uelzen',
        'Washington'
      ];
    }

    getItems(ev) {
      // Reset items back to all of the items
      this.initializeItems();

      // set val to the value of the ev target
      var val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
